// === INTERPRETER ===
G.interpret=(code)=>{
const rawLines=code.split('\n');const lines=[];
rawLines.forEach((l,i)=>{if(l.trim()&&!l.trim().startsWith('#'))lines.push({text:l,origLine:i})});
const actions=[];const vars={};const funcs={};let err=null;
const getIndent=(l)=>{let s=0;for(let i=0;i<l.length;i++){if(l[i]===' ')s++;else if(l[i]==='\t')s+=4;else break}return s};

function parseBlock(si,bi){
const stmts=[];let i=si;
while(i<lines.length){const lo=lines[i],line=lo.text,ol=lo.origLine,ind=getIndent(line),tr=line.trim();
if(ind<bi)break;if(ind>bi){i++;continue}
if(tr.startsWith('def ')){const m=tr.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/);if(!m){err={line:ol,msg:'函数定义格式错误'};return{stmts,next:i+1}}const fn=m[1],ps=m[2]?m[2].split(',').map(s=>s.trim()).filter(Boolean):[];const bd=parseBlock(i+1,bi+4);stmts.push({type:'def',name:fn,params:ps,body:bd.stmts,line:ol});i=bd.next;continue}
if(tr.startsWith('for ')){const m=tr.match(/^for\s+(\w+)\s+in\s+(.+):\s*$/);if(!m){err={line:ol,msg:'for 格式错误'};return{stmts,next:i+1}}const bd=parseBlock(i+1,bi+4);stmts.push({type:'for',varName:m[1],iter:m[2].trim(),body:bd.stmts,line:ol});i=bd.next;continue}
if(tr.startsWith('while ')){const m=tr.match(/^while\s+(.+):\s*$/);if(!m){err={line:ol,msg:'while 格式错误'};return{stmts,next:i+1}}const bd=parseBlock(i+1,bi+4);stmts.push({type:'while',cond:m[1].trim(),body:bd.stmts,line:ol});i=bd.next;continue}
if(tr.startsWith('if ')){const m=tr.match(/^if\s+(.+):\s*$/);if(!m){err={line:ol,msg:'if 格式错误'};return{stmts,next:i+1}}const bd=parseBlock(i+1,bi+4);const nd={type:'if',cond:m[1].trim(),body:bd.stmts,elifs:[],elseBody:null,line:ol};i=bd.next;
while(i<lines.length&&getIndent(lines[i].text)===bi){const el=lines[i].text.trim();
if(el.startsWith('elif ')){const em=el.match(/^elif\s+(.+):\s*$/);if(!em)break;const eb=parseBlock(i+1,bi+4);nd.elifs.push({cond:em[1].trim(),body:eb.stmts});i=eb.next}
else if(el==='else:'||el.startsWith('else:')){const eb=parseBlock(i+1,bi+4);nd.elseBody=eb.stmts;i=eb.next}else break}
stmts.push(nd);continue}
const am=tr.match(/^(\w+)\s*=\s*(.+)$/);if(am&&!tr.includes('==')){stmts.push({type:'assign',name:am[1],expr:am[2].trim(),line:ol});i++;continue}
stmts.push({type:'expr',expr:tr,line:ol});i++}
return{stmts,next:i}}

const parsed=parseBlock(0,0);if(err)return{actions:[],err};
let steps=0;const MAX=80;

function evalExpr(expr,lv){
const av={...vars,...(lv||{})};let e=expr;
e=e.replace(/get_hp\(\)/g,String(Math.max(0,G.B.php)));
e=e.replace(/get_enemy_hp\(\)/g,String(Math.max(0,G.B.ehp)));
e=e.replace(/get_energy\(\)/g,String(G.B.pen));
const ks=Object.keys(av).sort((a,b)=>b.length-a.length);
for(const k of ks){const v=av[k];if(typeof v==='number')e=e.replace(new RegExp('\\b'+k+'\\b','g'),String(v));else if(typeof v==='string')e=e.replace(new RegExp('\\b'+k+'\\b','g'),'"'+v+'"')}
try{return Function('"use strict";return('+e+')')()}catch(ex){return undefined}}

function execStmts(stmts,lv){
if(err)return;
for(const s of stmts){if(err||steps>=MAX)return;steps++;
if(s.type==='def'){funcs[s.name]={params:s.params,body:s.body};continue}
if(s.type==='assign'){const val=evalExpr(s.expr,lv);const lm=s.expr.match(/^\[(.+)\]$/);
if(lm){vars[s.name]={type:'actionList',items:lm[1].split(',').map(x=>x.trim())}}
else{if(lv)lv[s.name]=val;else vars[s.name]=val}
actions.push({type:'info',msg:`${s.name} = ${val!==undefined?val:s.expr}`,line:s.line});continue}
if(s.type==='if'){const cv=evalExpr(s.cond,lv);if(cv){execStmts(s.body,lv)}else{let h=false;for(const ei of s.elifs){if(evalExpr(ei.cond,lv)){execStmts(ei.body,lv);h=true;break}}if(!h&&s.elseBody)execStmts(s.elseBody,lv)}continue}
if(s.type==='for'){const it=s.iter;const rm=it.match(/^range\((.+)\)$/);
if(rm){const n=evalExpr(rm[1],lv);if(typeof n!=='number'||n<0){err={line:s.line,msg:'range() 需要正整数'};return}const mx=Math.min(n,15);for(let j=0;j<mx;j++){if(steps>=MAX)break;execStmts(s.body,{...lv,[s.varName]:j})}}
else{const lval=vars[it]||(lv&&lv[it]);if(lval&&lval.type==='actionList'){for(const item of lval.items){if(steps>=MAX)break;actions.push(parseAction(item+'()',s.line))}}else{err={line:s.line,msg:`无法遍历: ${it}`};return}}continue}
if(s.type==='while'){let wc=0;while(evalExpr(s.cond,lv)&&wc<30&&steps<MAX){wc++;execStmts(s.body,lv)}continue}
if(s.type==='expr'){const fcm=s.expr.match(/^(\w+)\(([^)]*)\)$/);
if(fcm){const fn=fcm[1];const vv=lv&&lv[fn];
if(typeof vv==='string'){const act=parseAction(vv+'('+(fcm[2]||'')+')',s.line);if(act.type!=='error'){actions.push(act);continue}}
if(funcs[fn]){const fd=funcs[fn];const args=fcm[2]?fcm[2].split(',').map(a=>evalExpr(a.trim(),lv)):[];const nlv={};fd.params.forEach((p,i)=>nlv[p]=args[i]);actions.push({type:'info',msg:`🎯 ${fn}() 连招！`,line:s.line});execStmts(fd.body,{...lv,...nlv})}
else{const act=parseAction(s.expr,s.line);if(act.type==='error'){err={line:s.line,msg:act.msg};return}actions.push(act)}}
else{const act=parseAction(s.expr,s.line);if(act.type==='error'){err={line:s.line,msg:act.msg};return}actions.push(act)}}}}

function parseAction(expr,line){const tr=expr.trim();
let m=tr.match(/^attack\((\d*)\)$/);if(m)return{type:'attack',power:m[1]?parseInt(m[1]):null,line};
m=tr.match(/^attack\((\w+)\)$/);if(m){const v=vars[m[1]];return{type:'attack',power:typeof v==='number'?v:null,line}}
if(tr==='defend()')return{type:'defend',line};
if(tr==='heal()')return{type:'heal',line};
if(tr==='charge()')return{type:'charge',line};
m=tr.match(/^skill\("(\w+)"\)$/);if(m)return{type:'skill',name:m[1],line};
m=tr.match(/^print\((.+)\)$/);if(m)return{type:'print',expr:m[1],line};
if(tr.match(/^get_(hp|enemy_hp|energy)\(\)$/))return{type:'noop',line};
return{type:'error',msg:`未知指令: ${tr}`,line}}

execStmts(parsed.stmts,{});
if(err)return{actions:[],err};
return{actions,err:null}};

// === Execute Code with AP System ===
G.exec=async()=>{
if(!G.B||G.B.executing||G.B.done)return;
G.B.executing=true;G.B.apUsed=0;G.B.combo=0;
document.getElementById('exBtn').disabled=true;
const code=G._mode==='block'?G.getBC():document.getElementById('cTa').value;
if(!code.trim()){document.getElementById('cOut').innerHTML='<span class="er">⚠️ 请先编写代码！</span>';G.B.executing=false;document.getElementById('exBtn').disabled=false;return}

const result=G.interpret(code);
G.B.codeLines=code.split('\n').filter(l=>l.trim()&&!l.trim().startsWith('#')).length;

if(result.err){G.A.P('error');document.getElementById('cOut').innerHTML=`<span class="er">❌ 第${result.err.line+1}行: ${result.err.msg}</span>`;G.animSprite('pSp','shake',400);if(G._mode==='block'){const el=document.getElementById('bL'+result.err.line);if(el)el.classList.add('errl')}G.B.executing=false;document.getElementById('exBtn').disabled=false;return}

// Filter to only action-producing items (not info/noop)
const realActions=result.actions.filter(a=>['attack','defend','heal','charge','skill','print'].includes(a.type));
if(realActions.length===0){document.getElementById('cOut').innerHTML='<span class="er">⚠️ 代码没有产生任何行动！</span>';G.B.executing=false;document.getElementById('exBtn').disabled=false;return}

document.getElementById('cOut').innerHTML='<span class="ok">▶️ 执行中...</span>';
G.B.defending=false;

for(let i=0;i<result.actions.length;i++){
if(G.B.done)break;
const act=result.actions[i];

// AP check for real actions
if(['attack','defend','heal','charge','skill','print'].includes(act.type)){
if(G.B.apUsed>=G.B.apMax){
document.getElementById('cOut').innerHTML=`<span class="er">⚡ 行动点用完了！本回合只能执行 ${G.B.apMax} 个行动</span>`;
break}
G.B.apUsed++;G.updAP()}

if(G._mode==='block'){document.querySelectorAll('.dl').forEach(d=>d.classList.remove('exec'));const el=document.getElementById('bL'+(act.line!==undefined?act.line:i));if(el)el.classList.add('exec')}

await G.execAction(act);
if(G.B.ehp<=0){G.B.done=true;break}
await G.delay(450)}

document.querySelectorAll('.dl').forEach(d=>d.classList.remove('exec','errl'));

if(G.B.done&&G.B.ehp<=0){await G.delay(300);G.victory()}
else if(!G.B.done){
await G.delay(400);
// Enemy pre-turn effects
await G.enemyPreTurn();
if(!G.B.done){
await G.enemyTurn();
if(G.B.php<=0){G.B.done=true;await G.delay(300);G.defeat()}
else{
G.B.executing=false;document.getElementById('exBtn').disabled=false;
G.B.round++;G.B.apUsed=0;G.updAP();
const enRec=Math.min(G.B.pmen-G.B.pen,2);G.B.pen=Math.min(G.B.pmen,G.B.pen+2);
// Player poison tick
if(G.B.pPoisonT>0){const pd=G.B.lv.en.poisonDmg||3;G.B.php-=pd;G.B.pPoisonT--;G.B.dmgTaken+=pd;G.floatDmg('pF','☠️-'+pd,'dm');G.updBUI();
if(G.B.php<=0){G.B.done=true;await G.delay(300);G.defeat();return}}
// Enemy poison tick
if(G.B.poisonT>0){G.B.ehp-=5;G.B.poisonT--;G.floatDmg('eF','☠️-5','dm');G.updBUI();
if(G.B.ehp<=0){G.B.done=true;await G.delay(300);G.victory();return}}
G.B.charged=false;G.B.defending=false;
G.updRound();G.showIntent();
let statusMsg=`💻 第${G.B.round}回合`;
if(enRec>0)statusMsg+=` ⚡+${enRec}`;
if(G.B.pPoisonT>0)statusMsg+=` ☠️毒${G.B.pPoisonT}回合`;
statusMsg+=' — 编排你的行动！';
document.getElementById('cOut').innerHTML=statusMsg}}}
};

// === Execute Single Action ===
G.execAction=async(act)=>{
const b=G.B;
switch(act.type){
case 'attack':{
if(!b.revealed){G.floatDmg('eF','MISS 隐身中','inf');G.A.P('error');break}
let dmg=(act.power||b.patk);
if(b.charged){dmg*=2;b.charged=false}
const en=b.lv.en;
// Apply defense based on behavior
if(en.behavior==='swap'){
const eDef=b.round%2===1?(en.swapLowDef||0):en.swapHighDef;
dmg=Math.max(1,dmg-eDef);
}else{dmg=Math.max(1,dmg-b.edef)}
// Harden: half damage
if(en.behavior==='harden'&&b.round%en.hardenEvery===0){dmg=Math.ceil(dmg/2);G.floatDmg('eF','🛡️硬化','inf')}
// Shield
if(b.eShield>0){const sd=Math.min(b.eShield,dmg);b.eShield-=sd;dmg-=sd;G.floatDmg('eF','🔰-'+sd,'inf');if(b.eShield<=0)G.floatDmg('eF','💥 破盾！','combo')}
if(dmg>0)b.ehp-=dmg;
// Combo: 3+ hits get bonus damage
b.combo++;
if(b.combo>=3){const bonus=Math.floor(b.combo/2);b.ehp-=bonus;G.floatDmg('pF',b.combo+'连击! +'+bonus,'combo');G.A.P('combo')}
else if(b.combo>=2){G.floatDmg('pF',b.combo+' 连击！','combo');G.A.P('combo')}
G.A.P('attack');G.animSprite('pSp','atk-a',500);await G.delay(200);G.animSprite('eSp','shake',400);
if(dmg>0)G.floatDmg('eF','-'+dmg,'dm');G.updBUI();break}
case 'defend':G.A.P('defend');G.animSprite('pSp','def-a',600);b.defending=true;b.combo=0;G.updBUI();break;
case 'heal':{const h=Math.min(15,b.pmhp-b.php);b.php=Math.min(b.pmhp,b.php+15);G.A.P('heal');G.animSprite('pSp','heal-a',800);G.floatDmg('pF','+'+h,'hl');b.combo=0;G.updBUI();break}
case 'charge':G.A.P('charge');G.animSprite('pSp','chg-a',700);b.charged=true;b.combo=0;G.updBUI();break;
case 'skill':{
const skills={fireball:{dmg:20,cost:3},shield_bash:{dmg:12,cost:2,stun:1},poison:{dmg:8,cost:2,poison:3}};
const sk=skills[act.name];if(!sk){G.floatDmg('pF','未知技能','inf');break}
if(b.pen<sk.cost){G.floatDmg('pF','⚡不足','inf');break}
b.pen-=sk.cost;let dmg=Math.max(1,sk.dmg-b.edef);if(b.charged){dmg*=2;b.charged=false}
b.ehp-=dmg;if(sk.stun)b.stunT+=sk.stun;if(sk.poison)b.poisonT+=sk.poison;
G.A.P('skill');G.animSprite('pSp','atk-a',500);await G.delay(200);G.animSprite('eSp','shake',400);
G.floatDmg('eF','-'+dmg+'🔥','dm');b.combo=0;G.updBUI();break}
case 'print':{
const val=act.expr.replace(/['"]/g,'');
document.getElementById('cOut').innerHTML=`<span class="ok">📤 ${val}</span>`;
// Special: reveal stealth enemy
if(val==='reveal'&&!b.revealed){b.revealed=true;G.A.P('reveal');G.animSprite('eSp','shake',400);G.floatDmg('eF','👁️ 现形！','inf');G.updBUI();G.showIntent()}
b.combo=0;break}
case 'info':document.getElementById('cOut').innerHTML=`<span class="ok">💡 ${act.msg}</span>`;break;
case 'noop':break;
}};

// === Enemy Pre-Turn (special behaviors) ===
G.enemyPreTurn=async()=>{
const b=G.B,en=b.lv.en;if(!en.behavior)return;
switch(en.behavior){
case 'charge':
if(b.round%en.chargeEvery===0&&!b.eCharging){b.eCharging=true;G.floatDmg('eF','⚡蓄力！','inf');G.animSprite('eSp','chg-a',700);G.updBUI();await G.delay(300)}
break;
case 'boss1':
if(!b.enraged&&b.ehp<=b.emhp*en.enrageHP){b.enraged=true;b.eatk+=en.enrageATK;G.floatDmg('eF','💀 狂暴！','combo');G.animSprite('eSp','chg-a',700);G.updBUI();await G.delay(500)}
if(b.enraged&&b.round%en.healEvery===0){b.ehp=Math.min(b.emhp,b.ehp+en.healAmt);G.floatDmg('eF','+'+en.healAmt,'hl');G.updBUI();await G.delay(300)}
break;
}};

// === Enemy Turn ===
G.enemyTurn=async()=>{
const b=G.B,en=b.lv.en;
if(b.stunT>0){b.stunT--;G.floatDmg('eF','💫 眩晕','inf');return}
if(en.atk===0&&!b.eCharging)return;

let dmg=Math.max(1,b.eatk-b.pdef);
// Charge double damage
if(b.eCharging){dmg*=2;b.eCharging=false;G.floatDmg('eF','💥双倍！','combo')}
// Swap behavior
if(en.behavior==='swap'){dmg=b.round%2===1?Math.max(1,en.swapHighAtk-b.pdef):Math.max(1,(en.swapLowAtk||4)-b.pdef)}
// Stealth: don't attack if not revealed
if(en.behavior==='stealth'&&!b.revealed){G.floatDmg('eF','暗中窥伺...','inf');return}

if(b.defending){dmg=Math.max(1,Math.floor(dmg*0.5));b.defending=false}
b.php-=dmg;b.dmgTaken+=dmg;

G.A.P('hit');G.animSprite('eSp','eatk',500);await G.delay(200);G.animSprite('pSp','hurt-a',400);
G.floatDmg('pF','-'+dmg,'dm');

// Poison behavior: add poison on attack
if(en.behavior==='poison'&&b.pPoisonT<=0){b.pPoisonT=en.poisonDur;G.floatDmg('pF','☠️中毒!','inf')}

G.updBUI()};

// === Victory ===
G.victory=()=>{
G.A.P('victory');
const b=G.B,p=G.P,lv=b.lv;
let stars=1;
const idealRounds=lv.il||Math.ceil(lv.en.hp/(p.atk*2))+1;
if(b.round<=idealRounds+1)stars=3;
else if(b.round<=idealRounds+3)stars=2;
const prev=p.stars[lv.id]||0;if(stars>prev)p.stars[lv.id]=stars;
p.comp[lv.id]=true;
if(lv.id.endsWith('B')){const nc=b.ch.id+1;if(nc<=4&&!p.uch.includes(nc))p.uch.push(nc)}
const xp=(lv.en.boss?30:15)*stars,gd=(lv.en.boss?20:8)*stars;
p.xp+=xp;p.gold+=gd;
let msg=lv.dlg&&lv.dlg.a?lv.dlg.a:'代码执行完美！';
msg+=`\n\n📊 ${b.round}回合 · ${b.codeLines}行代码 · 受伤${b.dmgTaken}`;
document.getElementById('vicMsg').textContent=msg;
document.getElementById('vicSt').textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars);
document.getElementById('rwXp').textContent='+'+xp;
document.getElementById('rwGd').textContent='+'+gd;
document.getElementById('vicOv').classList.add('on');
while(p.xp>=p.xpN){p.xp-=p.xpN;p.lv++;p.xpN=Math.floor(p.xpN*1.4);G._pendingLvUp=true}
G.save();
// Wow moment for 1-1
if(lv.wow&&!p.comp['_wow_'+lv.id]){p.comp['_wow_'+lv.id]=true;setTimeout(()=>G.showWow(lv.wow.emoji,lv.wow.text),600)}
};

// === Defeat ===
G.defeat=()=>{G.A.P('defeat');
let msg='💀 代码崩溃……但别灰心！';
const b=G.B;
if(b&&b.pPoisonT>0)msg+='\n💡 提示：中毒了记得用 heal() 回血！';
else if(b&&b.dmgTaken>b.pmhp*0.8)msg+='\n💡 提示：试试在敌人攻击前用 defend() 减伤！';
else if(b&&b.round<=2)msg+='\n💡 提示：合理利用所有行动点(AP)，多写几行代码！';
else msg+='\n💡 提示：观察敌人意图预告，调整你的策略！';
document.getElementById('defMsg').textContent=msg;
document.getElementById('defOv').classList.add('on')};

// === Navigation ===
G.toMap=()=>{G.A.P('click');document.querySelectorAll('.ov').forEach(o=>o.classList.remove('on'));document.getElementById('wowOv').classList.remove('on');if(G._pendingLvUp){G._pendingLvUp=false;G.showLvUp();return}G.showMap()};
G.nextLv=()=>{G.A.P('click');document.querySelectorAll('.ov').forEach(o=>o.classList.remove('on'));document.getElementById('wowOv').classList.remove('on');if(G._pendingLvUp){G._pendingLvUp=false;G.showLvUp();return}const b=G.B;if(!b)return G.showMap();const ch=b.ch,lv=b.lv,idx=ch.levels.indexOf(lv);if(idx<ch.levels.length-1)G.startLv(ch.id,ch.levels[idx+1].id);else{const nc=G.CH.find(c=>c.id===ch.id+1);if(nc&&G.P.uch.includes(nc.id))G.startLv(nc.id,nc.levels[0].id);else G.showMap()}};
G.retry=()=>{G.A.P('click');document.querySelectorAll('.ov').forEach(o=>o.classList.remove('on'));const b=G.B;if(b)G.startLv(b.ch.id,b.lv.id);else G.showMap()};

// === Level Up ===
G.showLvUp=()=>{
const p=G.P;document.getElementById('nLv').textContent=p.lv;
const ch=document.getElementById('stCh');ch.innerHTML='';
[{icon:'❤️',name:'HP上限 +10',key:'mhp',val:10},{icon:'⚔️',name:'基础攻击 +1',key:'atk',val:1},{icon:'🛡️',name:'防御力 +1',key:'def',val:1},{icon:'⚡',name:'能量上限 +3',key:'men',val:3}].forEach(o=>{
const d=document.createElement('div');d.className='sc2';
d.innerHTML=`<span class="sn">${o.icon} ${o.name}</span><span class="sv">${p[o.key]} → ${p[o.key]+o.val}</span>`;
d.onclick=()=>{G.A.P('levelup');p[o.key]+=o.val;if(o.key==='mhp')p.hp=p.mhp;G.save();document.getElementById('lvOv').classList.remove('on');G.showMap()};
ch.appendChild(d)});
document.getElementById('lvOv').classList.add('on');G.A.P('levelup')};

// === Init ===
(()=>{const saved=G.load();if(saved){G.P=saved;document.getElementById('contBtn').style.display=''}else{G.P=G.defP()}
// Remove loading mask
const mask=document.getElementById('loadMask');if(mask){mask.style.transition='opacity .5s';mask.style.opacity='0';setTimeout(()=>mask.remove(),500)}
})();
