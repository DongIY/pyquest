const G={};
// === Audio ===
G.A=(()=>{let c,g,m=false;try{m=localStorage.getItem('pyq_mute')==='1'}catch(e){}const I=()=>{if(c)return;c=new(window.AudioContext||window.webkitAudioContext)();g=c.createGain();g.connect(c.destination);g.gain.value=.3};const P=(t)=>{if(m||!c)return;try{const o=c.createOscillator(),gn=c.createGain();o.connect(gn);gn.connect(g);const n=c.currentTime;const S={attack:()=>{o.type='sawtooth';o.frequency.setValueAtTime(220,n);o.frequency.exponentialRampToValueAtTime(440,n+.1);gn.gain.setValueAtTime(.4,n);gn.gain.exponentialRampToValueAtTime(.01,n+.15);o.start(n);o.stop(n+.15)},defend:()=>{o.type='sine';o.frequency.setValueAtTime(600,n);o.frequency.exponentialRampToValueAtTime(800,n+.2);gn.gain.setValueAtTime(.2,n);gn.gain.exponentialRampToValueAtTime(.01,n+.3);o.start(n);o.stop(n+.3)},heal:()=>{o.type='sine';o.frequency.setValueAtTime(440,n);o.frequency.exponentialRampToValueAtTime(880,n+.4);gn.gain.setValueAtTime(.2,n);gn.gain.exponentialRampToValueAtTime(.01,n+.5);o.start(n);o.stop(n+.5)},charge:()=>{o.type='sawtooth';o.frequency.setValueAtTime(110,n);o.frequency.exponentialRampToValueAtTime(660,n+.5);gn.gain.setValueAtTime(.3,n);gn.gain.exponentialRampToValueAtTime(.01,n+.6);o.start(n);o.stop(n+.6)},hit:()=>{o.type='square';o.frequency.setValueAtTime(150,n);o.frequency.exponentialRampToValueAtTime(50,n+.1);gn.gain.setValueAtTime(.4,n);gn.gain.exponentialRampToValueAtTime(.01,n+.12);o.start(n);o.stop(n+.12)},error:()=>{o.type='sawtooth';o.frequency.setValueAtTime(100,n);gn.gain.setValueAtTime(.3,n);gn.gain.exponentialRampToValueAtTime(.01,n+.3);o.start(n);o.stop(n+.3)},victory:()=>{o.type='square';o.frequency.setValueAtTime(523,n);o.frequency.setValueAtTime(659,n+.15);o.frequency.setValueAtTime(784,n+.3);o.frequency.setValueAtTime(1047,n+.45);gn.gain.setValueAtTime(.25,n);gn.gain.exponentialRampToValueAtTime(.01,n+.7);o.start(n);o.stop(n+.7)},defeat:()=>{o.type='sawtooth';o.frequency.setValueAtTime(440,n);o.frequency.exponentialRampToValueAtTime(55,n+.8);gn.gain.setValueAtTime(.3,n);gn.gain.exponentialRampToValueAtTime(.01,n+1);o.start(n);o.stop(n+1)},click:()=>{o.type='sine';o.frequency.setValueAtTime(800,n);gn.gain.setValueAtTime(.15,n);gn.gain.exponentialRampToValueAtTime(.01,n+.05);o.start(n);o.stop(n+.06)},levelup:()=>{o.type='sine';o.frequency.setValueAtTime(440,n);o.frequency.setValueAtTime(554,n+.12);o.frequency.setValueAtTime(659,n+.24);o.frequency.setValueAtTime(880,n+.36);gn.gain.setValueAtTime(.3,n);gn.gain.exponentialRampToValueAtTime(.01,n+.6);o.start(n);o.stop(n+.6)},skill:()=>{o.type='square';o.frequency.setValueAtTime(330,n);o.frequency.exponentialRampToValueAtTime(990,n+.2);o.frequency.exponentialRampToValueAtTime(660,n+.35);gn.gain.setValueAtTime(.35,n);gn.gain.exponentialRampToValueAtTime(.01,n+.4);o.start(n);o.stop(n+.4)},combo:()=>{o.type='sawtooth';o.frequency.setValueAtTime(220,n);o.frequency.exponentialRampToValueAtTime(1760,n+.3);gn.gain.setValueAtTime(.3,n);gn.gain.exponentialRampToValueAtTime(.01,n+.35);o.start(n);o.stop(n+.35)},reveal:()=>{o.type='sine';o.frequency.setValueAtTime(880,n);o.frequency.exponentialRampToValueAtTime(1760,n+.15);o.frequency.exponentialRampToValueAtTime(880,n+.3);gn.gain.setValueAtTime(.3,n);gn.gain.exponentialRampToValueAtTime(.01,n+.4);o.start(n);o.stop(n+.4)}};if(S[t])S[t]()}catch(e){}};const updUI=()=>{const btns=document.querySelectorAll('#muteBtn,#titleMute');btns.forEach(b=>{if(b)b.textContent=m?'🔇':'🔊'})};return{I,P,T(){m=!m;try{localStorage.setItem('pyq_mute',m?'1':'0')}catch(e){}updUI();return m},M:()=>m,updUI}})();
G.toggleMute=()=>{G.A.I();G.A.T()};

// === Code Rain ===
(()=>{const cv=document.getElementById('bgC'),c=cv.getContext('2d');let cols,drops;const kw='attack defend heal for if else def while range print True False return charge skill'.split(' ');const rs=()=>{cv.width=innerWidth;cv.height=innerHeight;cols=Math.floor(cv.width/18);drops=Array(cols).fill(0).map(()=>Math.random()*cv.height/18|0)};const dr=()=>{c.fillStyle='rgba(10,26,10,.06)';c.fillRect(0,0,cv.width,cv.height);c.fillStyle='#4ade8022';c.font='13px Courier New';for(let i=0;i<cols;i++){c.fillText(kw[Math.random()*kw.length|0],i*18,drops[i]*18);if(drops[i]*18>cv.height&&Math.random()>.98)drops[i]=0;drops[i]++}requestAnimationFrame(dr)};addEventListener('resize',rs);rs();dr()})();

// === Game Data — Chapter 1: 10 levels ===
G.CH=[
{id:1,name:'第1章 初始觉醒',emoji:'🟢',desc:'函数调用、参数、字符串、变量、条件',unlocks:['attack()','defend()','heal()','attack(n)','print()','charge()','x = n','if/else'],levels:[
{id:'1-1',name:'训练木桩',ap:3,en:{name:'训练木桩',emoji:'🪵',hp:15,atk:0,def:0},teach:{title:'基础攻击 — attack()',old:'# 什么都不会...',nw:'attack()\n# 让小蛇攻击！',note:'写下 attack()，小蛇就会执行攻击！'},hint:'👆 点击上方 attack() 积木块',il:1,guide:true,blocks:['attack()'],kws:[],dlg:{b:'欢迎来到蟒境！在这里，你写的每一行代码都有力量。\n试试点击上方的 attack() 积木块！',a:'你的代码变成了真实的力量！attack() 就是调用一个"函数"——像喊出咒语的名字！'},wow:{emoji:'🎉',text:'你写了一行代码，小蛇真的攻击了！\n在蟒境，代码 = 力量。\n接下来你还能让它防御、回血，甚至连续攻击！'}},
{id:'1-2',name:'语法史莱姆',ap:3,en:{name:'语法史莱姆',emoji:'🟩',hp:25,atk:5,def:0},hint:'💡 多写几行 attack() 连续攻击！',il:3,blocks:['attack()','defend()'],kws:[],dlg:{b:'前方出现了史莱姆！它会反击。\n一行 attack() 是一次攻击，多行就是多次！小蛇从上到下依次执行。',a:'多行代码 = 多次行动！这就是编程的威力。'}},
{id:'1-3',name:'暴怒史莱姆',ap:3,en:{name:'暴怒史莱姆',emoji:'🟥',hp:30,atk:12,def:0,behavior:'charge',chargeEvery:2},teach:{title:'防御 — defend()',old:'attack()\nattack()\n# 只会攻击...',nw:'defend()\nattack()\nattack()',note:'defend() 减少本回合受到的伤害！'},hint:'💡 敌人蓄力时用 defend() 减伤！',il:3,blocks:['attack()','defend()'],kws:[],dlg:{b:'这只史莱姆攻击力很高！注意看行动预告——当它蓄力时，下回合双倍伤害！\n用 defend() 来减少伤害。',a:'学会看敌人意图，在正确时机防御——这就是策略！'}},
{id:'1-4',name:'毒液蜘蛛',ap:3,en:{name:'毒液蜘蛛',emoji:'🕷️',hp:28,atk:6,def:0,behavior:'poison',poisonDmg:3,poisonDur:3},teach:{title:'回血 — heal()',old:'# 血量不断下降...\nattack()',nw:'heal()\n# 恢复 15 HP！\nattack()',note:'heal() 可以恢复生命值！'},hint:'💡 中毒了？用 heal() 恢复生命！',il:2,blocks:['attack()','defend()','heal()'],kws:[],dlg:{b:'蜘蛛的攻击会附加毒素！中毒后每回合持续掉血。\nheal() 可以恢复生命——函数不只用来攻击，还能救命！',a:'不同函数做不同的事：attack 攻击、defend 防御、heal 回血！'}},
{id:'1-5',name:'巨型史莱姆',ap:3,en:{name:'巨型史莱姆',emoji:'🟪',hp:45,atk:7,def:2,behavior:'harden',hardenEvery:3},teach:{title:'参数 — attack(n)',old:'attack()\n# 固定伤害...',nw:'attack(5)\n# 括号里放数字控制力度！',note:'函数括号里的值叫"参数"，它控制函数的行为！'},hint:'💡 用 attack(5) 传入更大的力量！',il:2,blocks:['attack()','attack(n)','defend()','heal()'],kws:[],dlg:{b:'巨型史莱姆皮厚防高！普通 attack() 不够。\n试试 attack(5)——括号里的数字就是"参数"，控制攻击力度！',a:'参数让函数变得灵活！不同的参数，不同的效果。'}},
{id:'1-6',name:'回声蝙蝠',ap:4,en:{name:'回声蝙蝠',emoji:'🦇',hp:35,atk:8,def:0,behavior:'stealth'},teach:{title:'字符串与输出 — print()',old:'attack()\n# 攻击无效？！',nw:'print("reveal")\n# 声波显形！\nattack()',note:'print() 输出文字。字符串要用引号 " " 包裹！'},hint:'💡 先 print("reveal") 声波显形，再攻击！',il:2,blocks:['attack()','defend()','heal()','print("reveal")'],kws:[],dlg:{b:'蝙蝠隐身了！普通攻击打不中。\nprint("reveal") 发出声波让它现形——注意字符串必须用引号！',a:'print() 是程序员最常用的工具。字符串 = 用引号包裹的文字。'}},
{id:'1-7',name:'铁壳甲虫',ap:3,en:{name:'铁壳甲虫',emoji:'🪲',hp:50,atk:8,def:5},teach:{title:'蓄力 — charge()',old:'attack(5)\n# 伤害: 5-5防=1...',nw:'charge()\nattack(5)\n# 伤害: (5×2)-5防=5！',note:'charge() 让下一次攻击伤害翻倍！'},hint:'💡 先 charge() 蓄力，再 attack() 双倍伤害！',il:2,blocks:['attack()','attack(n)','defend()','heal()','charge()'],kws:[],dlg:{b:'甲虫防御太硬！普通攻击几乎打不动。\ncharge() 蓄力后下一次攻击伤害×2——学会组合函数！',a:'函数组合的威力！charge + attack 远大于两次 attack。'}},
{id:'1-8',name:'密码门卫',ap:4,en:{name:'密码门卫',emoji:'🗿',hp:40,atk:10,def:2,behavior:'shield',shieldHP:20},teach:{title:'变量 — x = n',old:'attack(8)\nattack(8)\n# 每次都写8...',nw:'power = 8\nattack(power)\nattack(power)',note:'变量就是有名字的盒子，存值后到处用！'},hint:'💡 设置 power = 8，用 attack(power) 攻击！',il:3,blocks:['attack()','attack(n)','defend()','heal()','charge()','x = n'],kws:['='],dlg:{b:'门卫有魔法护盾！需要大伤害破盾。\n用变量：power = 8，然后 attack(power)。变量就像有名字的盒子！',a:'变量的魔力：改一个地方，所有引用都变了！'}},
{id:'1-9',name:'双生魔偶',ap:4,en:{name:'双生魔偶',emoji:'🎭',hp:55,atk:11,def:0,behavior:'swap',swapHighAtk:18,swapHighDef:8,swapLowAtk:4,swapLowDef:0},teach:{title:'条件判断 — if / else',old:'attack(5)\n# 总是攻击...',nw:'if get_hp() < 30:\n    heal()\nelse:\n    attack(5)',note:'if 条件成立做A，否则(else)做B！'},hint:'💡 血量低时 heal()，否则 attack()！',il:4,blocks:['attack()','attack(n)','defend()','heal()','charge()','get_hp()','get_enemy_hp()','if','else','x = n'],kws:['=','if','else','<','>','=='],dlg:{b:'魔偶有两种形态交替切换！\n阳面：高攻低防 → 注意防御\n阴面：低攻高防 → 用大伤害攻击\nif/else 让代码根据情况做不同的事！',a:'条件判断让代码有了"智慧"！你已经是策略家了。'}},
{id:'1-B',name:'💀 缩进之王',ap:5,en:{name:'缩进之王',emoji:'👑',hp:70,atk:13,def:3,boss:true,behavior:'boss1',enrageHP:0.4,enrageATK:5,healEvery:3,healAmt:8},hint:'💡 综合运用所有所学！低血记得 heal()！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','get_hp()','get_enemy_hp()','if','else','x = n'],kws:['=','if','else','<','>','=='],dlg:{b:'缩进之王驾到！\n• HP > 40% 时正常攻击\n• HP ≤ 40% 狂暴：攻击力+5，每3回合回血\n用你学到的一切击败它！',a:'💥 缩进之王崩溃了！你已经掌握了函数调用、参数、字符串、变量、条件判断——Python 的基础力量！'}}
]},
{id:2,name:'第2章 力量觉醒',emoji:'🟡',desc:'for循环、elif多分支、组合策略',unlocks:['for i in range(n):','elif','get_energy()'],levels:[
{id:'2-1',name:'齿轮魔像',ap:4,en:{name:'齿轮魔像',emoji:'⚙️',hp:50,atk:8,def:3,behavior:'harden',hardenEvery:2},teach:{title:'for 循环 — 连击',old:'attack()\nattack()\nattack()',nw:'for i in range(3):\n    attack()',note:'一行代码 = 三连击！循环里的代码重复执行n次。'},hint:'💡 用 for i in range(3): 连续攻击3次！',il:3,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):'],kws:['=','if','else','<','>','for','in','range'],dlg:{b:'齿轮魔像会周期性硬化减伤！\n用 for 循环连续攻击——趁它没硬化时集中输出。',a:'for 循环 = 重复的力量！一行代码顶三行！'}},
{id:'2-2',name:'铁甲魔像',ap:4,en:{name:'铁甲魔像',emoji:'🛡️',hp:65,atk:10,def:5,behavior:'shield',shieldHP:25},hint:'💡 先循环攻击破盾，再集中输出！',il:4,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):','x = n'],kws:['=','if','else','<','>','for','in','range'],dlg:{b:'铁甲魔像有能量护盾！先破盾再输出。\n用 for 循环密集攻击快速破盾！',a:'循环+蓄力组合拳，再厚的盾也挡不住！'}},
{id:'2-3',name:'毒雾蘑菇',ap:4,en:{name:'毒雾蘑菇',emoji:'🍄',hp:55,atk:7,def:2,behavior:'poison',poisonDmg:4,poisonDur:3},teach:{title:'elif — 多条件判断',old:'if hp < 30:\n    heal()\nelse:\n    attack(5)',nw:'if hp < 30:\n    heal()\nelif enemy < 20:\n    attack(8)\nelse:\n    charge()',note:'elif = else if，多条件分支！有多种情况就用 elif！'},hint:'💡 中毒了要 heal()，血量足时攻击，elif 判断多种情况！',il:4,blocks:['attack()','attack(n)','defend()','heal()','charge()','get_hp()','get_enemy_hp()','if','else','elif','for i in range(n):'],kws:['=','if','else','elif','<','>','=='],dlg:{b:'毒雾蘑菇会释放孢子让你中毒！\n用 elif 多条件判断：血少回血、敌人残血就猛攻、否则蓄力。',a:'elif 让代码像决策树——面对不同情况做不同选择！'}},
{id:'2-4',name:'暗影刺客',ap:4,en:{name:'暗影刺客',emoji:'🗡️',hp:60,atk:14,def:1,behavior:'stealth'},hint:'💡 先 print("reveal") 显形，再用循环连击！',il:4,blocks:['attack()','attack(n)','defend()','heal()','charge()','get_hp()','get_enemy_hp()','if','else','elif','for i in range(n):','print("reveal")'],kws:['=','if','else','elif','<','>','==','for','in','range'],dlg:{b:'暗影刺客隐身了！攻击力很高但防御低。\n先用 print("reveal") 显形，再用 for 循环疯狂输出！',a:'知识的组合运用！print+for+if，你的代码越来越聪明了。'}},
{id:'2-5',name:'石化蜥蜴',ap:4,en:{name:'石化蜥蜴',emoji:'🦎',hp:60,atk:9,def:4,behavior:'harden',hardenEvery:3},teach:{title:'for + 变量 = 可配置循环',old:'for i in range(3):\n    attack()',nw:'power = 5\nfor i in range(3):\n    attack(power)',note:'变量放进循环里——3次都用同样的力度！改变量一处搞定。'},hint:'💡 设定 power = 5，循环里 attack(power) 连续大伤害！',il:3,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):','x = n','if','else'],kws:['=','if','else','<','>','for','in','range'],dlg:{b:'石化蜥蜴防御高而且会周期硬化！\n用变量控制攻击力度，配合 for 循环打出持续高伤害！',a:'变量 + 循环 = 代码的乘法效应！改一个值影响所有回合。'}},
{id:'2-6',name:'雷电水母',ap:4,en:{name:'雷电水母',emoji:'🪼',hp:55,atk:12,def:1,behavior:'charge',chargeEvery:2},teach:{title:'for + defend = 攻防节奏',old:'for i in range(3):\n    attack()',nw:'defend()\nfor i in range(2):\n    attack(5)',note:'先防御扛住蓄力伤害，再循环连击输出！'},hint:'💡 蓄力回合先 defend()，安全后 for 循环攻击！',il:3,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):','x = n','if','else','elif'],kws:['=','if','else','elif','<','>','for','in','range'],dlg:{b:'雷电水母每2回合蓄力一次！蓄力后双倍伤害非常痛。\n学会攻防节奏：蓄力回合防御，安全回合循环猛攻！',a:'攻防节奏 = 战斗的呼吸！知道什么时候该攻什么时候该守。'}},
{id:'2-7',name:'迷雾狼',ap:5,en:{name:'迷雾狼',emoji:'🐺',hp:70,atk:11,def:2,behavior:'stealth'},teach:{title:'循环 + print + 条件组合',old:'print("reveal")\nattack()\n# 很基础...',nw:'print("reveal")\nfor i in range(3):\n    attack(5)\nif get_hp() < 50:\n    heal()',note:'把多种技巧组合起来！先显形→循环攻击→判断回血'},hint:'💡 先 print("reveal")，再 for 循环连击，最后 if 判断回血！',il:4,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):','x = n','if','else','elif','get_hp()','get_enemy_hp()','print("reveal")'],kws:['=','if','else','elif','<','>','for','in','range'],dlg:{b:'迷雾狼速度极快，隐身后致命一击！\n这一关考验综合运用：显形→循环→条件判断，三步连招！',a:'你已经能组合三种技巧了！编程就是把简单的积木搭成复杂的建筑。'}},
{id:'2-8',name:'钢铁螃蟹',ap:5,en:{name:'钢铁螃蟹',emoji:'🦀',hp:75,atk:10,def:6,behavior:'shield',shieldHP:30},teach:{title:'蓄力 + 循环 = 爆发输出',old:'attack()\nattack()\n# 打不动...',nw:'charge()\nfor i in range(2):\n    attack(8)',note:'蓄力后循环攻击——第一下双倍，后面正常，最大化输出！'},hint:'💡 charge() 蓄力后 for 循环攻击，第一下双倍伤害破盾！',il:4,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):','x = n','if','else','elif','get_hp()','get_enemy_hp()'],kws:['=','if','else','elif','<','>','for','in','range'],dlg:{b:'钢铁螃蟹有厚盾+高防御！普通攻击几乎打不动。\n先 charge() 蓄力，再 for 循环连击——蓄力后第一下双倍伤害！',a:'charge + for = 爆发输出！先蓄力再连击，一套组合拳破防。'}},
{id:'2-9',name:'暗焰祭司',ap:5,en:{name:'暗焰祭司',emoji:'🧙',hp:80,atk:13,def:3,behavior:'poison',poisonDmg:5,poisonDur:3},hint:'💡 综合运用 for+if+elif+变量！先打后判断回血！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):','x = n','if','else','elif','get_hp()','get_enemy_hp()','print("reveal")'],kws:['=','if','else','elif','<','>','==','for','in','range'],dlg:{b:'暗焰祭司攻击附带剧毒，而且防御不低！\n这是Boss前的最后考验——综合运用本章所有知识：\n循环连击 + 条件回血 + 变量控制 + 攻防节奏！',a:'你已经掌握了第二章所有技巧！循环+条件+变量，你的代码效率爆表！'}},
{id:'2-B',name:'💀 循环领主',ap:5,en:{name:'循环领主',emoji:'🔄',hp:100,atk:13,def:4,boss:true,behavior:'boss1',enrageHP:0.35,enrageATK:6,healEvery:3,healAmt:10},hint:'💡 Boss血量低会狂暴！用循环+条件灵活应对！',il:6,blocks:['attack()','attack(n)','defend()','heal()','charge()','get_hp()','get_enemy_hp()','if','else','elif','for i in range(n):','x = n'],kws:['=','if','else','elif','<','>','==','for','in','range'],dlg:{b:'循环领主驾到！\n• HP > 35% 正常攻击，每2回合蓄力\n• HP ≤ 35% 狂暴：ATK+6，每3回合回血10\n用循环和条件的组合策略！',a:'循环领主倒下了！for循环 + elif 条件——你已经掌握了编程的两大核心！'}}
]},
{id:3,name:'第3章 连击之道',emoji:'🟠',desc:'列表、队列编排、函数封装、技能',unlocks:['[action,...]','for a in list:','def func():','skill()'],levels:[
{id:'3-1',name:'异常幽灵',ap:4,en:{name:'异常幽灵',emoji:'👻',hp:65,atk:10,def:2,behavior:'stealth'},teach:{title:'列表 = 行动队列',old:'defend()\nattack()\nheal()',nw:'actions=[defend,attack,heal]\nfor a in actions:\n    a()',note:'列表能存一串指令，用 for 遍历依次执行！'},hint:'💡 用列表编排行动队列！先 print("reveal") 再执行队列',il:4,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):','actions = [...]','for a in actions:','print("reveal")'],kws:['=','if','else','for','in','range'],dlg:{b:'异常幽灵隐身出没！\n用列表 actions=[...] 编排好行动，用 for a in actions: a() 依次执行！',a:'列表让你的代码更有条理——像编排舞蹈动作一样！'}},
{id:'3-2',name:'疾影狐',ap:4,en:{name:'疾影狐',emoji:'🦊',hp:70,atk:12,def:2,behavior:'swap',swapHighAtk:20,swapHighDef:6,swapLowAtk:5,swapLowDef:0},hint:'💡 阳面高攻时防御，阴面高防时用大伤害！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):','actions = [...]','for a in actions:','if','else','get_hp()','get_enemy_hp()'],kws:['=','if','else','for','in','range'],dlg:{b:'疾影狐有两种形态交替切换！\n阳面高攻低防→防御保命，阴面低攻高防→蓄力猛攻！\n用列表编排不同情况的行动！',a:'面对变化莫测的敌人，精心编排的行动队列就是最好的武器！'}},
{id:'3-3',name:'火焰元素',ap:5,en:{name:'火焰元素',emoji:'🔥',hp:80,atk:11,def:3,behavior:'charge',chargeEvery:2},teach:{title:'技能 — skill()',old:'attack(5)\n# 伤害一般',nw:'skill("fireball")\n# 消耗3能量，大伤害！',note:'技能消耗能量但威力强大！不同技能有不同效果。'},hint:'💡 用 skill("fireball") 打大伤害！蓄力回合记得 defend()!',il:4,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','for i in range(n):','actions = [...]','for a in actions:'],kws:['=','if','else','for','in','range'],dlg:{b:'火焰元素会周期性蓄力！蓄力后双倍伤害！\nskill("fireball") 消耗3能量打20伤害——大招收割！\nskill("shield_bash") 消耗2能量打12伤害+眩晕1回合！',a:'技能是战斗的王牌——但能量有限，要精打细算！'}},
{id:'3-4',name:'寒冰巨人',ap:5,en:{name:'寒冰巨人',emoji:'🧊',hp:85,atk:13,def:4,behavior:'harden',hardenEvery:2},teach:{title:'skill + 节奏配合',old:'skill("fireball")\nattack()\n# 能量不够了...',nw:'attack(5)\nskill("shield_bash")\nattack(5)',note:'技能和普攻穿插使用，高效利用AP和能量！'},hint:'💡 技能和普攻搭配使用！shield_bash 附带眩晕，下回合敌人不能动！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','for i in range(n):','actions = [...]','for a in actions:','if','else'],kws:['=','if','else','for','in','range'],dlg:{b:'寒冰巨人周期硬化，防御高！\nskill("shield_bash") 打12伤害+眩晕1回合！\n眩晕后敌人不能攻击——这是你安全输出的窗口！',a:'眩晕控制 = 战术优势！shield_bash 让你主导战斗节奏。'}},
{id:'3-5',name:'水晶傀儡',ap:5,en:{name:'水晶傀儡',emoji:'💎',hp:90,atk:13,def:5,behavior:'shield',shieldHP:30},teach:{title:'自定义函数 — def',old:'charge()\nattack(8)\n# 每次都写...',nw:'def combo():\n    charge()\n    attack(8)\ncombo()',note:'def 封装你的连招，一次定义反复使用！'},hint:'💡 用 def combo(): 封装连招，反复调用！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','for i in range(n):','def combo():','actions = [...]','for a in actions:'],kws:['=','if','else','for','in','range','def',':'],dlg:{b:'水晶傀儡有厚盾！需要反复输出组合。\n用 def combo(): 定义你的连招函数，一次写好反复调用！',a:'def 封装 = 程序员的懒人哲学——写一次用到处！'}},
{id:'3-6',name:'影子巨蛛',ap:5,en:{name:'影子巨蛛',emoji:'🕸️',hp:75,atk:10,def:2,behavior:'poison',poisonDmg:4,poisonDur:3},teach:{title:'def + for = 函数连击',old:'def combo():\n    attack(5)\ncombo()\ncombo()\ncombo()',nw:'def burst():\n    for i in range(2):\n        attack(5)\nburst()',note:'函数里也能用循环！def + for = 超强连击封装'},hint:'💡 在 def 里放 for 循环！一个函数打出多次攻击！',il:4,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','for i in range(n):','def combo():','actions = [...]','for a in actions:','if','else','get_hp()'],kws:['=','if','else','for','in','range','def',':'],dlg:{b:'影子巨蛛攻击附毒！持续掉血很烦人。\ndef 里也能放 for 循环——一个函数调用打出一套连招！\n然后用 if 判断血量决定是攻击还是回血。',a:'函数里嵌套循环——你的代码组织能力越来越强了！'}},
{id:'3-7',name:'雷暴鹰',ap:5,en:{name:'雷暴鹰',emoji:'🦅',hp:80,atk:14,def:2,behavior:'charge',chargeEvery:3},teach:{title:'多技能策略选择',old:'skill("fireball")\n# 只会一招？',nw:'if get_enemy_hp() > 50:\n    skill("fireball")\nelse:\n    skill("shield_bash")',note:'不同情况用不同技能！fireball=大伤害，shield_bash=控制'},hint:'💡 血多用 fireball 猛攻，血少用 shield_bash 锁住！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','for i in range(n):','def combo():','if','else','elif','get_hp()','get_enemy_hp()'],kws:['=','if','else','elif','<','>','for','in','range','def',':'],dlg:{b:'雷暴鹰速度极快，蓄力后伤害爆炸！\n学会根据情况选择不同技能：\n• fireball 20伤害——适合收割\n• shield_bash 12伤害+眩晕——适合控制',a:'策略性技能选择！根据战场形势选最优解——这就是编程思维。'}},
{id:'3-8',name:'骸骨骑士',ap:5,en:{name:'骸骨骑士',emoji:'💀',hp:95,atk:12,def:5,behavior:'shield',shieldHP:25},teach:{title:'列表 + def = 队列函数',old:'def plan():\n    defend()\n    attack(5)\n    heal()',nw:'actions=[defend,attack,attack,heal]\ndef plan():\n    for a in actions:\n        a()\nplan()',note:'用列表定义行动序列，用 def 封装成可复用的战术函数！'},hint:'💡 列表定义行动序列 + def 封装成战术函数！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','for i in range(n):','def combo():','actions = [...]','for a in actions:','if','else','get_hp()','get_enemy_hp()'],kws:['=','if','else','for','in','range','def',':'],dlg:{b:'骸骨骑士有盾有防御，很难对付！\n用列表定义行动序列，再用 def 封装成战术函数。\n列表 + def = 可复用的行动方案！',a:'列表 + 函数 = 模块化编程！你的代码已经像专业程序员写的了。'}},
{id:'3-9',name:'暗影领主',ap:6,en:{name:'暗影领主',emoji:'🦇',hp:100,atk:14,def:3,behavior:'swap',swapHighAtk:22,swapHighDef:8,swapLowAtk:6,swapLowDef:0},hint:'💡 综合运用列表+def+skill+if！不同形态用不同策略！',il:6,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','for i in range(n):','def combo():','actions = [...]','for a in actions:','if','else','elif','get_hp()','get_enemy_hp()'],kws:['=','if','else','elif','for','in','range','def',':'],dlg:{b:'暗影领主是Boss前的终极考验！\n两种形态交替，攻守差异巨大。\n综合运用列表、函数、技能、条件判断——编排你的完美战术！',a:'你已经精通了列表编排、函数封装、技能释放和条件策略！下一关是Boss！'}},
{id:'3-B',name:'💀 列表守卫',ap:6,en:{name:'列表守卫',emoji:'📋',hp:120,atk:15,def:5,boss:true,behavior:'boss1',enrageHP:0.3,enrageATK:7,healEvery:4,healAmt:12},hint:'💡 Boss低血狂暴+回血！用 def+列表+技能全力输出！',il:7,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','for i in range(n):','def combo():','actions = [...]','for a in actions:','get_hp()','get_enemy_hp()','if','else','elif'],kws:['=','if','else','elif','for','in','range','def',':'],dlg:{b:'列表守卫驾到！\n• HP > 30% 正常攻击+周期蓄力\n• HP ≤ 30% 狂暴：ATK+7，每4回合回血12\n编排你最精妙的行动队列和连招函数！',a:'列表守卫崩溃了！你掌握了列表编排、函数封装、技能释放——你的代码已经像一位战术大师！'}}
]},
{id:4,name:'第4章 终极策略',emoji:'🔴',desc:'while循环、复杂策略、终极Boss',unlocks:['while cond:','skill("poison")','def func(param):'],levels:[
{id:'4-1',name:'暗夜蝎',ap:5,en:{name:'暗夜蝎',emoji:'🦂',hp:85,atk:12,def:3,behavior:'poison',poisonDmg:5,poisonDur:3},teach:{title:'while 循环',old:'attack()\nattack()\n# 要写多少行？',nw:'while get_enemy_hp() > 0:\n    attack(5)',note:'while 条件满足就一直执行！比 for 更灵活。'},hint:'💡 while get_enemy_hp() > 0: 循环攻击到底！别忘了回血！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("poison")','for i in range(n):','while cond:','def combo():','get_hp()','get_enemy_hp()','if','else'],kws:['=','if','else','<','>','for','in','range','def','while',':','and','or','not'],dlg:{b:'暗夜蝎每次攻击附带剧毒！\nwhile 循环——不用数次数，打到条件不满足为止！\nwhile 里可以加 if 判断血量来回血。',a:'while 循环 = 不达目标不罢休！再加 if 判断，代码就有了"智能"！'}},
{id:'4-2',name:'沙漠蜃蜥',ap:5,en:{name:'沙漠蜃蜥',emoji:'🦎',hp:80,atk:10,def:2,behavior:'stealth'},teach:{title:'while + if = 智能循环',old:'while get_enemy_hp() > 0:\n    attack(5)\n# 可能会死...',nw:'while get_enemy_hp() > 0:\n    if get_hp() < 30:\n        heal()\n    else:\n        attack(5)',note:'while 里面放 if——循环的每一轮都做不同判断！'},hint:'💡 while 循环里用 if 判断：血少回血，血多攻击！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','for i in range(n):','while cond:','if','else','get_hp()','get_enemy_hp()','print("reveal")'],kws:['=','if','else','<','>','for','in','range','while',':'],dlg:{b:'沙漠蜃蜥隐身偷袭！先显形！\nwhile 循环里加 if 判断——每回合根据血量做不同选择。\n这就是"自适应策略"！',a:'while + if = 自适应循环！你的代码每一轮都在"思考"。'}},
{id:'4-3',name:'双面魔镜',ap:5,en:{name:'双面魔镜',emoji:'🪞',hp:95,atk:13,def:3,behavior:'swap',swapHighAtk:22,swapHighDef:10,swapLowAtk:5,swapLowDef:0},teach:{title:'带参数的函数',old:'def combo():\n    attack(5)\n# 只能打5...',nw:'def combo(power):\n    charge()\n    attack(power)\ncombo(8)',note:'参数让函数更灵活——同一个combo，不同的力度！'},hint:'💡 用 def combo(power): 让连招可配置！',il:6,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("poison")','for i in range(n):','while cond:','def combo():','def func(param):','get_hp()','get_enemy_hp()','if','else'],kws:['=','if','else','<','>','for','in','range','def','while',':','and','or','not'],dlg:{b:'双面魔镜形态交替！阳面致命攻击→防御，阴面高防→combo(大伤害)！\n用 def combo(power): 让你的连招参数化！',a:'参数化函数 = 可复用的策略！同样的套路，不同的力度。'}},
{id:'4-4',name:'深渊水母',ap:5,en:{name:'深渊水母',emoji:'🪼',hp:100,atk:10,def:2,behavior:'poison',poisonDmg:6,poisonDur:4},teach:{title:'毒技能 — skill("poison")',old:'attack(5)\n# 伤害少...',nw:'skill("poison")\n# 让敌人中毒持续掉血！',note:'毒技能：8伤害 + 3回合持续掉血，消耗2能量'},hint:'💡 用 skill("poison") 让水母中毒，while 循环防御回血等它毒死！',il:6,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','skill("poison")','for i in range(n):','while cond:','def combo():','actions = [...]','for a in actions:','get_hp()','get_enemy_hp()','if','else','elif'],kws:['=','if','else','elif','<','>','==','for','in','range','def','while',':','and','or','not'],dlg:{b:'深渊水母毒性极强但防御低！\nskill("poison") 让敌人每回合掉5血！\n试试"放毒+防御回血"的消耗战术。',a:'不同策略应对不同敌人——这就是战术编程的魅力！'}},
{id:'4-5',name:'熔岩巨像',ap:6,en:{name:'熔岩巨像',emoji:'🌋',hp:110,atk:14,def:5,behavior:'shield',shieldHP:35},teach:{title:'while + def = 循环策略',old:'combo(8)\ncombo(8)\ncombo(8)',nw:'def combo(n):\n    charge()\n    attack(n)\nwhile get_enemy_hp() > 0:\n    combo(8)',note:'用 while 循环调用你定义的函数——自动执行策略到胜利！'},hint:'💡 def combo(n) 定义连招，while 循环自动执行到敌人倒下！',il:6,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','for i in range(n):','while cond:','def combo():','def func(param):','get_hp()','get_enemy_hp()','if','else','elif'],kws:['=','if','else','elif','<','>','for','in','range','def','while',':','and','or','not'],dlg:{b:'熔岩巨像有厚盾+高防+高血量！需要持续输出。\n用 def 定义你的连招函数，再用 while 循环反复调用。\n自动化策略——让代码替你战斗！',a:'while + def = 自动战斗策略！你的代码已经能独立运行了。'}},
{id:'4-6',name:'虹蛇',ap:6,en:{name:'虹蛇',emoji:'🐍',hp:90,atk:11,def:2,behavior:'poison',poisonDmg:5,poisonDur:3},teach:{title:'复合条件 — and / or',old:'if get_hp() < 30:\n    heal()',nw:'if get_hp() < 30 and get_enemy_hp() > 20:\n    heal()\nelif get_hp() < 30 or get_enemy_hp() < 10:\n    attack(8)',note:'and = 两个条件都满足，or = 任一条件满足'},hint:'💡 用 and/or 写出更精确的条件判断！',il:5,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("poison")','for i in range(n):','while cond:','def combo():','def func(param):','get_hp()','get_enemy_hp()','if','else','elif'],kws:['=','if','else','elif','<','>','==','for','in','range','def','while',':','and','or','not'],dlg:{b:'虹蛇毒性不弱但血量也不多！\n学会用 and/or 写更复杂的条件：\n• "血少 且 敌人血多" → heal\n• "血少 或 敌人快死" → 全力攻击\n精确判断 = 精准策略！',a:'and/or 让你的条件判断更精确！代码越精确，策略越聪明。'}},
{id:'4-7',name:'混沌先锋',ap:6,en:{name:'混沌先锋',emoji:'⚡',hp:120,atk:17,def:5,behavior:'charge',chargeEvery:2},teach:{title:'全技能综合战术',old:'attack(5)\ndefend()\nheal()',nw:'def smart_fight():\n    if get_hp() < 30:\n        heal()\n    elif get_enemy_hp() > 60:\n        skill("poison")\n    else:\n        skill("fireball")\nsmart_fight()',note:'把所有技巧封装成一个"智能战斗函数"！'},hint:'💡 用 def 封装完整的智能策略，while 循环自动执行！',il:7,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','skill("poison")','for i in range(n):','while cond:','def combo():','def func(param):','get_hp()','get_enemy_hp()','if','else','elif'],kws:['=','if','else','elif','<','>','==','for','in','range','def','while',':','and','or','not'],dlg:{b:'混沌先锋每2回合蓄力一次！蓄力后双倍伤害！\n这是你写"智能战斗AI"的时刻——把所有技巧装进一个函数：\nif/elif 判断情况 → 选择最优行动 → while 循环自动执行。',a:'你写出了一个真正的战斗AI函数！从一行 attack() 到完整策略——了不起！'}},
{id:'4-8',name:'暗影巫妖',ap:6,en:{name:'暗影巫妖',emoji:'☠️',hp:130,atk:15,def:4,behavior:'boss1',enrageHP:0.4,enrageATK:5,healEvery:4,healAmt:10},hint:'💡 小Boss！低血会狂暴回血。用poison消耗+smart策略持续压制！',il:7,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','skill("poison")','for i in range(n):','while cond:','def combo():','def func(param):','actions = [...]','for a in actions:','get_hp()','get_enemy_hp()','if','else','elif'],kws:['=','if','else','elif','<','>','==','for','in','range','def','while',':','and','or','not'],dlg:{b:'暗影巫妖是Boss级的强敌！\n• HP > 40%：正常攻击，周期蓄力\n• HP ≤ 40%：狂暴！ATK+5，每4回合回血10\n先用 poison 消耗，配合 while+if 智能策略持续压制！',a:'暗影巫妖倒下了！你已经能应对Boss级敌人了！'}},
{id:'4-9',name:'深渊守望者',ap:7,en:{name:'深渊守望者',emoji:'👁️',hp:140,atk:16,def:4,behavior:'swap',swapHighAtk:25,swapHighDef:12,swapLowAtk:6,swapLowDef:0},hint:'💡 终极预演！形态切换+高属性——用完整策略函数应对！',il:8,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','skill("poison")','for i in range(n):','while cond:','def combo():','def func(param):','actions = [...]','for a in actions:','get_hp()','get_enemy_hp()','if','else','elif'],kws:['=','if','else','elif','<','>','==','for','in','range','def','while',':','and','or','not'],dlg:{b:'深渊守望者——最终Boss前的终极考验！\n阳面攻击25！阴面防御12！形态不断交替。\n你需要写出最完善的自适应策略函数来应对。',a:'你击败了深渊守望者！准备好面对蟒境霸主了吗？'}},
{id:'4-B',name:'💀💀 蟒境霸主',ap:7,en:{name:'蟒境霸主',emoji:'🐲',hp:180,atk:18,def:6,boss:true,behavior:'boss1',enrageHP:0.35,enrageATK:8,healEvery:3,healAmt:15},hint:'💡 终极Boss！综合运用while+for+if+def+skill编写最强策略！',il:9,blocks:['attack()','attack(n)','defend()','heal()','charge()','skill("fireball")','skill("shield_bash")','skill("poison")','for i in range(n):','while cond:','def combo():','def func(param):','actions = [...]','for a in actions:','get_hp()','get_enemy_hp()','if','else','elif'],kws:['=','if','else','elif','<','>','==','for','in','range','def','while',':','and','or','not'],dlg:{b:'🐲 蟒境霸主降临！\n• HP > 35%：正常攻击，周期蓄力\n• HP ≤ 35%：狂暴！ATK+8，每3回合回血15\n用你学到的所有知识编写终极战斗策略！',a:'🏆 蟒境已被净化！你从一行 attack() 开始，到编写完整的自适应战斗AI——你已经是真正的 Pythonista！'}}
]}
];

// === Player State ===
G.defP=()=>({lv:1,xp:0,xpN:30,gold:0,hp:100,mhp:100,atk:3,def:1,en:10,men:10,uch:[1],comp:{},stars:{}});
G.P=null;G.B=null;
G.show=(id)=>{document.querySelectorAll('.sc').forEach(s=>s.classList.remove('on'));document.getElementById(id).classList.add('on');G.A.I()};
G.save=()=>{try{localStorage.setItem('pyquest2',JSON.stringify(G.P))}catch(e){}};
G.load=()=>{try{const d=localStorage.getItem('pyquest2');return d?JSON.parse(d):null}catch(e){return null}};
G.start=()=>{G.A.I();G.A.P('click');G.P=G.defP();G.save();G.showMap()};
G.cont=()=>{G.A.I();G.A.P('click');G.showMap()};

// === Map ===
G.showMap=()=>{
const p=G.P;
document.getElementById('mLv').textContent=p.lv;
document.getElementById('mAt').textContent=p.atk;
document.getElementById('mDf').textContent=p.def;
document.getElementById('mEn').textContent=p.men;
const grid=document.getElementById('cGrid');grid.innerHTML='';
G.CH.forEach(ch=>{
const ul=p.uch.includes(ch.id);
const card=document.createElement('div');card.className='cc'+(ul?'':' lk');
let lh='';
ch.levels.forEach((lv,i)=>{
const done=p.comp[lv.id];const sc=p.stars[lv.id]||0;
const ss='⭐'.repeat(sc)+'☆'.repeat(3-sc);
const prev=i===0||p.comp[ch.levels[i-1].id];
const ok=ul&&(prev||done);
lh+=`<div class="lb ${ok?'':'lk'}" onclick="${ok?`G.startLv(${ch.id},'${lv.id}')`:''}">`+`<span>${lv.id} ${lv.name}</span>`+`<span class="ls">${done?ss:(ok?'挑战':'🔒')}</span></div>`;
});
card.innerHTML=`<h3>${ch.emoji} ${ch.name}</h3><p style="font-size:11px;color:var(--text-m);margin-bottom:6px">${ch.desc}</p><div class="ll">${lh}</div>`;
grid.appendChild(card);
});
const ft=document.getElementById('cUnlk');
// Progress stats
let totalLevels=0,doneCount=0,totalStars=0;
G.CH.forEach(c=>c.levels.forEach(l=>{totalLevels++;if(p.comp[l.id])doneCount++;totalStars+=(p.stars[l.id]||0)}));
ft.innerHTML=`<div style="width:100%;display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><span style="font-size:11px;color:var(--text-m)">📊 进度 ${doneCount}/${totalLevels} ⭐ ${totalStars}</span><span style="font-size:11px;color:var(--gold)">💰 ${p.gold}</span></div><div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center"><span style="font-size:11px;color:var(--text-m);margin-right:4px">📖 代码:</span>`;
G.CH.forEach(ch=>{const ul=p.uch.includes(ch.id);ch.unlocks.forEach(u=>{const t=document.createElement('span');t.className='ct'+(ul?'':' lk');t.textContent=u;ft.appendChild(t)})});
G.show('map');
};

// === Start Level ===
G.startLv=(cid,lid)=>{
G.A.P('click');
let lv=null,ch=null;
for(const c of G.CH){if(c.id===cid){ch=c;for(const l of c.levels)if(l.id===lid){lv=l;break}break}}
if(!lv)return;
const p=G.P,ap=lv.ap||3;
G.B={ch,lv,php:p.mhp,pmhp:p.mhp,patk:p.atk,pdef:p.def,pen:p.men,pmen:p.men,
ehp:lv.en.hp,emhp:lv.en.hp,eatk:lv.en.atk,edef:lv.en.def,
charged:false,defending:false,poisonT:0,stunT:0,round:1,executing:false,dmgTaken:0,codeLines:0,done:false,
ap,apMax:ap,apUsed:0,combo:0,revealed:!lv.en.behavior||lv.en.behavior!=='stealth',
eCharging:false,eShield:lv.en.shieldHP||0,enraged:false,pPoisonT:0};
document.getElementById('bLn').textContent=`${lv.id} ${lv.name}`;
document.getElementById('bPl').textContent=p.lv;
document.getElementById('eSp').textContent=lv.en.emoji;
document.getElementById('eNm').textContent=lv.en.name;
G.updBUI();G.updAP();G.setupEd(lv);G.showIntent();G.updRound();
if(lv.teach&&!p.comp[lv.id]){
G.showTeach(lv.teach,()=>{G.show('battle');if(lv.dlg&&lv.dlg.b)G.showDlg('🐍 引导精灵',lv.dlg.b);if(lv.guide&&!p.comp[lv.id])setTimeout(()=>G.startGuide(),800)});
}else{G.show('battle');if(lv.dlg&&lv.dlg.b&&!p.comp[lv.id])G.showDlg('🐍 引导精灵',lv.dlg.b)}
};

// === AP ===
G.updAP=()=>{const b=G.B;if(!b)return;let h='🎯 ';for(let i=0;i<b.apMax;i++)h+=`<div class="ap-dot ${i<(b.apMax-b.apUsed)?'filled':'used'}"></div>`;document.getElementById('apBar').innerHTML=h};
G.updRound=()=>{const b=G.B;if(!b)return;document.getElementById('roundInfo').textContent=`═══ 第 ${b.round} 回合 ═══`};

// === Enemy Intent ===
G.showIntent=()=>{
const b=G.B;if(!b)return;
const bar=document.getElementById('intentBar'),en=b.lv.en;
bar.style.color='var(--danger)';
if(!en.behavior){bar.textContent=en.atk>0?`⚠️ ${en.name} 准备攻击`:'';return}
switch(en.behavior){
case 'charge':if(b.eCharging){bar.textContent=`🔴 蓄力完毕！本回合双倍伤害！`;bar.style.color='#ef4444'}else if(b.round%en.chargeEvery===0){bar.textContent=`⚡ 正在蓄力...下回合双倍攻击`;bar.style.color='var(--ap)'}else{bar.textContent=`⚠️ 准备普通攻击`}break;
case 'poison':bar.textContent=`☠️ 准备毒液攻击（附带${en.poisonDur}回合中毒）`;bar.style.color='#a855f7';break;
case 'stealth':bar.textContent=b.revealed?`⚠️ 已现形，准备攻击`:`👻 隐身中！攻击无效！用 print("reveal") 显形`;bar.style.color=b.revealed?'var(--danger)':'var(--text-m)';break;
case 'harden':bar.textContent=b.round%en.hardenEvery===0?`🛡️ 正在硬化！受到伤害减半`:`⚠️ 准备攻击`;break;
case 'shield':bar.textContent=b.eShield>0?`🔰 护盾值: ${b.eShield}`:`⚠️ 护盾已破！准备攻击`;bar.style.color=b.eShield>0?'var(--energy)':'var(--danger)';break;
case 'swap':bar.textContent=b.round%2===1?`😈 阳面：高攻(${en.swapHighAtk})低防 → 注意防御！`:`😇 阴面：低攻 高防(${en.swapHighDef}) → 用大伤害！`;bar.style.color=b.round%2===1?'var(--danger)':'var(--energy)';break;
case 'boss1':if(b.enraged){bar.textContent=`💀 狂暴！ATK+${en.enrageATK}${b.round%en.healEvery===0?' 本回合回血'+en.healAmt:''}`;bar.style.color='#ef4444'}else{bar.textContent=`⚠️ 准备攻击${b.ehp<=b.emhp*en.enrageHP?' ⚠️即将狂暴！':''}`}break;
}
};

// === Teach/Dialog/Wow ===
G.showTeach=(t,cb)=>{document.getElementById('tTi').textContent=t.title;document.getElementById('tOld').innerHTML=t.old.replace(/\n/g,'<br>');document.getElementById('tNew').innerHTML=G.hl(t.nw).replace(/\n/g,'<br>');document.getElementById('tNo').textContent=t.note;G.show('teach');G._tcb=cb};
G.closeTeach=()=>{G.A.P('click');if(G._tcb)G._tcb()};
G.showDlg=(sp,tx)=>{document.getElementById('dlgSp').textContent=sp;document.getElementById('dlgTx').textContent=tx;document.getElementById('dlgOv').classList.add('on')};
G.closeDlg=()=>{G.A.P('click');document.getElementById('dlgOv').classList.remove('on')};
G.showWow=(emoji,text)=>{document.getElementById('wowEmoji').textContent=emoji;document.getElementById('wowText').textContent=text;document.getElementById('wowOv').classList.add('on')};
G.closeWow=()=>{G.A.P('click');document.getElementById('wowOv').classList.remove('on')};

// === Guide (1-1) ===
G._guideStep=0;
G.startGuide=()=>{G._guideStep=1;G.showGuideStep()};
G.showGuideStep=()=>{
document.querySelectorAll('.guide-hl,.guide-tip').forEach(e=>e.remove());
const s=G._guideStep;
if(s===1){const bl=document.querySelector('#bPal .cb');if(!bl)return;const r=bl.getBoundingClientRect();const hl=document.createElement('div');hl.className='guide-hl';hl.style.cssText=`left:${r.left-4}px;top:${r.top-4}px;width:${r.width+8}px;height:${r.height+8}px`;const tp=document.createElement('div');tp.className='guide-tip';tp.style.cssText=`left:${r.left}px;top:${r.bottom+12}px`;tp.innerHTML='👆 点击这个积木块！';document.body.appendChild(hl);document.body.appendChild(tp);bl.addEventListener('click',()=>{setTimeout(()=>{G._guideStep=2;G.showGuideStep()},300)},{once:true})}
else if(s===2){const dz=document.getElementById('bDz');const r=dz.getBoundingClientRect();const tp=document.createElement('div');tp.className='guide-tip';tp.style.cssText=`left:${r.left+10}px;top:${r.top-50}px`;tp.innerHTML='✅ 代码已添加到编排区！';document.body.appendChild(tp);setTimeout(()=>{G._guideStep=3;G.showGuideStep()},1500)}
else if(s===3){const btn=document.getElementById('exBtn');const r=btn.getBoundingClientRect();const hl=document.createElement('div');hl.className='guide-hl';hl.style.cssText=`left:${r.left-4}px;top:${r.top-4}px;width:${r.width+8}px;height:${r.height+8}px`;const tp=document.createElement('div');tp.className='guide-tip';tp.style.cssText=`left:${Math.max(10,r.left-100)}px;top:${r.top-50}px`;tp.innerHTML='👆 点击执行代码！';document.body.appendChild(hl);document.body.appendChild(tp);btn.addEventListener('click',()=>{document.querySelectorAll('.guide-hl,.guide-tip').forEach(e=>e.remove());G._guideStep=0},{once:true})}
};

// === Battle UI ===
G.updBUI=()=>{
const b=G.B;if(!b)return;
document.getElementById('pHb').style.width=Math.max(0,b.php/b.pmhp*100)+'%';
document.getElementById('eHb').style.width=Math.max(0,b.ehp/b.emhp*100)+'%';
document.getElementById('pHt').textContent=`${Math.max(0,b.php|0)}/${b.pmhp}`;
document.getElementById('pEn').textContent=`${b.pen}/${b.pmen}`;
document.getElementById('eHt').textContent=`${Math.max(0,b.ehp|0)}/${b.emhp}`;
let ps='';if(b.charged)ps+='<span class="si">⚡蓄力×2</span>';if(b.defending)ps+='<span class="si">🛡️防御</span>';if(b.pPoisonT>0)ps+=`<span class="si">☠️毒${b.pPoisonT}</span>`;
document.getElementById('pSt').innerHTML=ps;
let es='';if(b.poisonT>0)es+=`<span class="si">☠️毒${b.poisonT}</span>`;if(b.stunT>0)es+=`<span class="si">💫晕${b.stunT}</span>`;if(!b.revealed)es+='<span class="si">👻隐身</span>';if(b.eShield>0)es+=`<span class="si">🔰盾${b.eShield}</span>`;if(b.eCharging)es+='<span class="si">🔴蓄力</span>';if(b.enraged)es+='<span class="si">💀狂暴</span>';
document.getElementById('eSt').innerHTML=es;
document.getElementById('eSp').textContent=b.revealed?b.lv.en.emoji:'❓';
};
G.floatDmg=(target,text,cls)=>{const el=document.createElement('div');el.className='df '+cls;el.textContent=text;const fi=document.getElementById(target);fi.style.position='relative';el.style.left='50%';el.style.top='0';el.style.transform='translateX(-50%)';fi.appendChild(el);setTimeout(()=>el.remove(),1000)};
G.animSprite=(id,cls,dur)=>{const el=document.getElementById(id);el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),dur||500)};

// === Editor ===
G._mode='block';G._bl=[];
G.mode=(m)=>{G._mode=m;G.A.P('click');document.getElementById('bEd').classList.toggle('on',m==='block');document.getElementById('tEd').classList.toggle('on',m==='text');document.getElementById('bmBtn').classList.toggle('on',m==='block');document.getElementById('tmBtn').classList.toggle('on',m==='text');if(m==='text')document.getElementById('cTa').value=G.getBC();document.getElementById('eHi').textContent=m==='block'?'💡 点击代码块添加':'💡 直接输入代码'};
G.setupEd=(lv)=>{
G.mode('block');const pal=document.getElementById('bPal');pal.innerHTML='';
(lv.blocks||[]).forEach(bt=>{const el=document.createElement('div');el.className='cb'+(bt.startsWith('if')||bt.startsWith('for')||bt.startsWith('while')||bt.startsWith('def')||bt.startsWith('actions')||bt==='else'||bt==='elif'?' kw':'');el.textContent=bt;
el.onclick=()=>{G.A.P('click');
if(bt==='attack(n)'){const n=prompt('攻击力度(数字):','5');if(n!==null)G.addBL('attack('+n+')')}
else if(bt==='x = n'){const nm=prompt('变量名:','power');const v=prompt('值:','5');if(nm&&v!==null)G.addBL(nm+' = '+v)}
else if(bt==='for i in range(n):'){const n=prompt('循环次数:','3');if(n!==null)G.addBL('for i in range('+n+'):')}
else if(bt==='while cond:'){const c=prompt('条件:','get_enemy_hp() > 0');if(c)G.addBL('while '+c+':')}
else if(bt==='def combo():'){const nm=prompt('函数名:','combo');if(nm)G.addBL('def '+nm+'():')}
else if(bt==='def func():'){const nm=prompt('函数名:','combo');if(nm)G.addBL('def '+nm+'():')}
else if(bt==='def func(param):'){const nm=prompt('函数名:','combo');const p=prompt('参数名:','n');if(nm&&p)G.addBL('def '+nm+'('+p+'):')}
else if(bt==='actions = [...]'){const a=prompt('行动序列(逗号分隔):\n可用: attack, defend, heal, charge','defend, attack, attack');if(a)G.addBL('actions = ['+a+']')}
else if(bt==='for a in actions:'){G.addBL('for a in actions:')}
else if(bt==='get_hp()'||bt==='get_enemy_hp()'||bt==='get_energy()'){G.addBL(bt)}
else if(bt==='if'||bt==='elif'){const c=prompt('条件:','get_hp() < 30');if(c)G.addBL(bt+' '+c+':')}
else if(bt==='else'){G.addBL('else:')}
else{G.addBL(bt)}};
pal.appendChild(el)});
document.getElementById('bDz').innerHTML='<div class="bdz-empty">💡 点击上方积木块来编排你的行动</div>';G._bl=[];
document.getElementById('cTa').value='';document.getElementById('cOut').innerHTML='💻 指令终端就绪';document.getElementById('exBtn').disabled=false;document.getElementById('eHi').textContent='💡 '+(lv.hint||'点击代码块')};
G.addBL=(t)=>{G._bl.push(t);G.renBL()};
G.remBL=(i)=>{G._bl.splice(i,1);G.renBL()};
G.renBL=()=>{const dz=document.getElementById('bDz');dz.innerHTML='';if(!G._bl.length){dz.innerHTML='<div class="bdz-empty">💡 点击上方积木块来编排你的行动</div>';return}let indent=0;G._bl.forEach((ln,i)=>{if(ln.startsWith('else')||ln.startsWith('elif'))indent=Math.max(0,indent-1);const d=document.createElement('div');d.className='dl';d.id='bL'+i;d.innerHTML=`<span class="lno">${i+1}</span><span class="lc" style="padding-left:${indent*16}px">${G.hl(ln)}</span><span class="rb" onclick="G.remBL(${i})">✕</span>`;dz.appendChild(d);if(ln.endsWith(':'))indent++})};
G.getBC=()=>{let c='',ind=0;G._bl.forEach(ln=>{if(ln.startsWith('else')||ln.startsWith('elif'))ind=Math.max(0,ind-1);c+='    '.repeat(ind)+ln+'\n';if(ln.endsWith(':'))ind++});return c.trim()};
G.hl=(c)=>c.replace(/\b(if|else|elif|for|while|in|range|def|return|and|or|not|True|False)\b/g,'<span style="color:var(--kw)">$1</span>').replace(/\b(attack|defend|heal|charge|skill|get_hp|get_enemy_hp|get_energy|print|combo)\b/g,'<span style="color:var(--fn)">$1</span>').replace(/"([^"]*)"/g,'<span style="color:var(--str)">"$1"</span>').replace(/\b(\d+)\b/g,'<span style="color:var(--num)">$1</span>').replace(/#(.*)/g,'<span style="color:var(--cmt)">#$1</span>');
G.clr=()=>{G.A.P('click');G._bl=[];G.renBL();document.getElementById('cTa').value='';document.getElementById('cOut').innerHTML='💻 已清空'};
G.retreat=()=>{G.A.P('click');G.B=null;document.querySelectorAll('.guide-hl,.guide-tip').forEach(e=>e.remove());G.showMap()};
G.delay=(ms)=>new Promise(r=>setTimeout(r,ms));

// === Visibility Change — pause when tab hidden ===
document.addEventListener('visibilitychange',()=>{
if(document.hidden&&G.B&&G.B.executing){/* let exec finish naturally */}
});

// === Init mute UI on load ===
setTimeout(()=>G.A.updUI(),100);
