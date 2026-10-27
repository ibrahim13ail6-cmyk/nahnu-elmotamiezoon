/* ===== خطة السبع أيام: لُمّ المنهج! — تحديث منفصل (plan7.js) =====
   يضيف بطاقة بجوار المواد + صفحة داخلية بتصميم داكن متحرك.
   كل يوم = مادة، والأيام تُفتح يومًا بعد يوم من تاريخ بدء الخطة.
   التقدم يُحفظ على نفس الجهاز (localStorage) لكل اسم مستخدم. */
(function(){
"use strict";
const DAY=864e5, AR=n=>Number(n).toLocaleString("ar-EG");
/* فريق العمل: عدّل الأسماء والصور هنا (img = رابط/مسار صورة اختياري) */
const TEAM=[
 {role:"خبير مناهج",ico:"🧭",name:"",img:""},
 {role:"مطوّر محتوى",ico:"🧩",name:"",img:""},
 {role:"مدقّق علمي",ico:"🔬",name:"",img:""},
 {role:"أستاذ مادة",ico:"🎓",name:"",img:""},
 {role:"مهندس تعليمي",ico:"🛠️",name:"",img:""},
 {role:"باحث تربوي",ico:"📚",name:"",img:""}
];
const KEY=()=>"p7_"+(typeof user!=="undefined"&&user?user:"guest");
function load(){try{return Object.assign({start:null,done:{}},JSON.parse(localStorage.getItem(KEY())||"{}"))}catch(e){return{start:null,done:{}}}}
function store(s){try{localStorage.setItem(KEY(),JSON.stringify(s))}catch(e){}}
const d0=t=>{const x=new Date(t);x.setHours(0,0,0,0);return x.getTime()};
const subs=()=>(typeof SUBJECTS!=="undefined"?SUBJECTS:[]).slice(0,7);
const isOpen=(s,i)=>!!s.start&&Math.round((d0(Date.now())-d0(s.start))/DAY)>=i-1;
const opensAt=(s,i)=>d0(s.start)+(i-1)*DAY;
function fmt(ms){ms=Math.max(0,ms);const h=Math.floor(ms/36e5),m=Math.floor(ms%36e5/6e4),c=Math.floor(ms%6e4/1e3);return [h,m,c].map(v=>AR(v).padStart?String(v).padStart(2,"0"):v).join(":")}

/* ---------- الأنماط ---------- */
const css=`
.card.p7c{background:radial-gradient(120% 90% at 50% 0%,#0f5a6b 0%,#0a2f4a 45%,#071a2e 100%);border:1px solid #1f6f86;color:#e8f6f4;position:relative;overflow:hidden;padding:18px 14px 22px;box-shadow:0 10px 30px rgba(3,20,40,.45)}
.p7c .back{color:#7dd3fc}
.p7c *{position:relative}
.p7bg{position:absolute!important;inset:0;pointer-events:none;overflow:hidden;z-index:0}
.p7bg i{position:absolute;border-radius:50%;background:#fde68a;width:3px;height:3px;animation:p7tw 3s ease-in-out infinite;opacity:.2}
.p7gear{position:absolute!important;opacity:.16;animation:p7spin 24s linear infinite}
.p7gear.r{animation-direction:reverse;animation-duration:32s}
.p7c>*:not(.p7bg){z-index:1}
.p7rib{margin:6px auto 4px;width:max-content;max-width:100%;padding:8px 26px;border:2px solid #c9a24b;border-radius:14px;background:linear-gradient(180deg,#0e3a55,#082338);font-size:21px;font-weight:800;color:#f5d98a;text-align:center;overflow:hidden;box-shadow:0 0 18px rgba(201,162,75,.35);animation:p7glow 3.2s ease-in-out infinite}
.p7rib:after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);animation:p7sh 3.6s ease-in-out infinite}
.p7h{margin:14px 0 2px;text-align:center;font-size:25px;font-weight:900;color:#f2d27a;text-shadow:0 2px 12px rgba(242,210,122,.4);animation:p7in .7s both}
.p7s{margin:0 0 12px;text-align:center;color:#d3ece8;font-size:15px;animation:p7in .9s both}
.p7bar{height:14px;border-radius:99px;background:#07202f;border:1px solid #2c7a90;overflow:hidden;margin:6px 4px 4px}
.p7bar b{display:block;height:100%;width:0;border-radius:99px;background:repeating-linear-gradient(45deg,#34d399 0 10px,#6ee7b7 10px 20px);background-size:28px 28px;animation:p7str 1s linear infinite;transition:width 1.2s cubic-bezier(.2,.8,.2,1);box-shadow:0 0 12px #34d399}
.p7pl{text-align:center;font-size:13px;color:#9fd8d0;margin-bottom:4px}
.p7cdp{width:max-content;max-width:100%;margin:8px auto 0;padding:6px 16px;border-radius:99px;background:#082338;border:1px solid #2c7a90;font-size:14px;color:#bdf0e6;animation:p7in .8s both}
.p7cdp b{color:#fcd34d;font-variant-numeric:tabular-nums;letter-spacing:1px}
.p7start{display:block;margin:12px auto 0;padding:13px 26px;border:0;border-radius:99px;font-size:17px;font-weight:800;color:#06222f;background:linear-gradient(90deg,#fcd34d,#34d399);box-shadow:0 0 20px rgba(52,211,153,.5);animation:p7pulse 1.8s ease-in-out infinite}
.p7path{height:var(--H);margin:6px 0 0}
.p7path svg{position:absolute!important;inset:0;width:100%;height:100%}
.p7path path.flow{fill:none;stroke:#5eead4;stroke-width:3;stroke-linecap:round;stroke-dasharray:2 9;opacity:.75;animation:p7dash 1.4s linear infinite;filter:drop-shadow(0 0 4px #5eead4)}
.p7path path.base{fill:none;stroke:#1d5a73;stroke-width:9;stroke-linecap:round;opacity:.55}
.p7n{position:absolute!important;width:78px;margin-left:-39px;text-align:center;border:0;background:none;color:inherit;padding:0;animation:p7pop .6s both}
.p7n .o{width:62px;height:62px;margin:0 auto;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:25px;font-weight:900;border:3px solid #6b8ea3;background:radial-gradient(circle at 35% 30%,#3b5d77,#142c42);box-shadow:inset 0 0 12px rgba(255,255,255,.12),0 4px 14px rgba(0,0,0,.4)}
.p7n .t{display:block;margin-top:5px;font-size:12px;font-weight:700;color:#c8dde6;line-height:1.3}
.p7n.lock .o{filter:saturate(.6)}
.p7n.open .o{border-color:#fcd34d;background:radial-gradient(circle at 35% 30%,#34d3b0,#0b6b6b);color:#fff;animation:p7ring 1.8s ease-out infinite}
.p7n.open .t{color:#fde68a}
.p7n.done .o{border-color:#4ade80;background:radial-gradient(circle at 35% 30%,#4ade80,#15803d);color:#fff;box-shadow:0 0 18px rgba(74,222,128,.7)}
.p7n.shake .o{animation:p7shk .5s}
.p7n small{display:block;font-size:10px;color:#9fb8c6}
.p7sec{margin:18px 0 8px;text-align:center;font-weight:800;color:#a7f3e3;font-size:16px}
.p7chips{display:flex;flex-wrap:wrap;gap:7px;justify-content:center}
.p7chip{padding:5px 12px;border-radius:99px;font-size:13px;background:#0b3550;border:1px solid #2c7a90;color:#d6f5ef;animation:p7pop .5s both}
.p7chip.on{background:#0f766e;border-color:#fcd34d;color:#fff}
.p7team{margin-top:16px;padding:12px 6px 6px;border:1px solid #2c7a90;border-radius:18px;background:rgba(7,32,47,.6)}
.p7tt{display:block;width:max-content;margin:-26px auto 10px;padding:3px 24px;border-radius:12px;border:2px solid #c9a24b;background:#082338;color:#f5d98a;font-weight:800;font-size:17px}
.p7tm{display:grid;grid-template-columns:repeat(3,1fr);gap:10px 4px}
.p7p{text-align:center;font-size:12px;font-weight:700;color:#d6eee9;animation:p7flt 4s ease-in-out infinite}
.p7p:nth-child(2n){animation-delay:-1.3s}.p7p:nth-child(3n){animation-delay:-2.4s}
.p7av{width:54px;height:54px;margin:0 auto 4px;border-radius:50%;border:2px solid #c9a24b;background:radial-gradient(circle at 35% 30%,#2c6f8c,#0b2a40);display:flex;align-items:center;justify-content:center;font-size:24px;overflow:hidden;box-shadow:0 0 12px rgba(201,162,75,.35)}
.p7av img{width:100%;height:100%;object-fit:cover}
.p7p em{display:block;font-style:normal;font-size:11px;color:#9fd8d0;font-weight:400}
.p7day{margin:10px 0;padding:14px;border-radius:16px;background:rgba(8,35,56,.8);border:1px solid #2c7a90;animation:p7in .6s both}
.p7day h3{margin:0 0 6px;color:#fde68a;font-size:18px}
.p7btn{display:flex;align-items:center;gap:10px;width:100%;margin:8px 0 0;padding:13px;border-radius:14px;border:1px solid #2c7a90;background:#0b3550;color:#e8f6f4;font-size:16px;font-weight:700;text-align:right;transition:transform .15s,background .2s}
.p7btn:hover{background:#0f4a6b;transform:translateY(-2px)}
.p7btn.ok{background:linear-gradient(90deg,#16a34a,#0f766e);border-color:#4ade80}
.p7cf{position:absolute!important;top:40%;left:50%;width:9px;height:9px;border-radius:2px;pointer-events:none;animation:p7cf 1.2s ease-out forwards;z-index:5}
/* مربع الدخول داخل شبكة المواد */
.sub.p7tile{position:relative;overflow:hidden;color:#fde68a;border:1px solid #1f6f86;background:linear-gradient(135deg,#0a2f4a,#0f766e,#0a2f4a);background-size:220% 100%;animation:p7bgm 6s ease-in-out infinite;box-shadow:0 6px 16px rgba(15,118,110,.35)}
.sub.p7tile .ic{font-size:30px;animation:p7flt 3s ease-in-out infinite}
.sub.p7tile small{font-size:12px;font-weight:600;color:#bdf0e6}
.sub.p7tile:after{content:"";position:absolute;top:0;bottom:0;width:35%;left:-50%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.3),transparent);animation:p7sh 3.4s ease-in-out infinite}
@keyframes p7spin{to{transform:rotate(360deg)}}
@keyframes p7tw{50%{opacity:.95;transform:scale(1.8)}}
@keyframes p7glow{50%{box-shadow:0 0 30px rgba(201,162,75,.65)}}
@keyframes p7sh{to{left:130%}}
@keyframes p7in{from{opacity:0;transform:translateY(14px)}}
@keyframes p7str{to{background-position:28px 0}}
@keyframes p7pulse{50%{transform:scale(1.06)}}
@keyframes p7dash{to{stroke-dashoffset:-22}}
@keyframes p7pop{from{opacity:0;transform:scale(.4)}}
@keyframes p7ring{0%{box-shadow:0 0 0 0 rgba(252,211,77,.7)}100%{box-shadow:0 0 0 20px rgba(252,211,77,0)}}
@keyframes p7shk{20%{transform:translateX(-7px) rotate(-8deg)}40%{transform:translateX(7px) rotate(8deg)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
@keyframes p7flt{50%{transform:translateY(-5px)}}
@keyframes p7bgm{50%{background-position:100% 0}}
@keyframes p7cf{to{transform:translate(var(--x),var(--y)) rotate(540deg);opacity:0}}

/* ===== صفحة اليوم الأول: تصميم النعناع (جدول المواد) ===== */
.card.p7m{background:linear-gradient(160deg,#eafcf6,#c9f3e7 60%,#e7fbf6);border:1px solid #9edfce;color:#12352f;padding:16px 12px 22px;position:relative;overflow:hidden;box-shadow:0 10px 30px rgba(15,118,110,.18)}
.p7m .back{color:#0f766e}
.p7mh{font-size:26px;font-weight:900;color:#0b2f2a;margin:8px 4px 10px;animation:p7in .6s both}
.p7mp{display:flex;align-items:center;gap:8px;margin:0 4px 14px}
.p7mp .bar{flex:1;height:12px;border-radius:99px;background:rgba(255,255,255,.75);border:1px solid #9edfce;overflow:hidden}
.p7mp .bar b{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#34d399,#0f9b86);transition:width .8s cubic-bezier(.2,.8,.2,1)}
.p7mp span{font-weight:800;font-size:13px;min-width:40px;text-align:left;direction:ltr}
.p7ml{margin:0 4px 6px;font-weight:800;font-size:15px;color:#164e45}
.p7mt{border-radius:16px;overflow:hidden;border:1px solid #8fd8c5;background:rgba(255,255,255,.35)}
.p7mr{display:grid;grid-template-columns:62px minmax(0,1fr) minmax(0,1fr);gap:5px;padding:7px 5px;align-items:center;border-top:1px solid #b5e8db;animation:p7in .5s both}
.p7mr.hd{background:#2f9e8a;color:#fff;font-weight:800;font-size:11.5px;text-align:center;border:0;line-height:1.4}
.p7ms{font-weight:800;font-size:12px;text-align:center;line-height:1.4}
.p7ms i{display:block;font-style:normal;font-size:22px}
.p7mc{box-sizing:border-box;min-width:0;display:flex;align-items:center;gap:4px;padding:8px 6px;background:#fff;border-radius:12px;border:1.5px solid #cdeee5;box-shadow:0 2px 6px rgba(15,118,110,.12);text-align:right;width:100%;color:#12352f;font-family:inherit;transition:transform .15s,border-color .2s}
.p7mc:active{transform:scale(.97)}
.p7mc .t{flex:1;min-width:0;font-weight:800;font-size:12px;line-height:1.4}
.p7mc small{display:block;font-weight:600;color:#5b7a73;font-size:10.5px}
.p7ck{flex:0 0 28px;height:28px;margin:-2px;border-radius:9px;display:flex;align-items:center;justify-content:center}
.p7ck:before{content:"";width:22px;height:22px;box-sizing:border-box;border-radius:7px;border:2px solid #7fcdb9;background:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;line-height:1}
.p7mc.on{border-color:#14a38b;box-shadow:0 0 0 3px rgba(20,163,139,.18)}
.p7mc.on .p7ck:before{content:"✓";background:#14a38b;border-color:#14a38b}
.p7mrep{display:flex;align-items:center;gap:10px;width:100%;margin-top:16px;padding:12px 14px;border-radius:14px;border:1px solid #8fd8c5;background:#fff;color:#12352f;font-size:15px;font-weight:800;text-align:right;font-family:inherit}
.p7mrep small{margin-right:auto;font-weight:600;color:#5b7a73;font-size:12px}
.p7m .p7team{background:rgba(255,255,255,.55);border-color:#8fd8c5;margin-top:22px}
.p7m .p7tt{background:#fff;color:#0f766e;border-color:#2f9e8a}
.p7m .p7p{color:#12352f}.p7m .p7p em{color:#2c6b60}
.p7m .p7av{border-color:#2f9e8a;background:radial-gradient(circle at 35% 30%,#d7f6ee,#8fd8c5);box-shadow:none}
.p7mw{padding:10px 12px;margin-top:8px;border-radius:12px;background:#fff;border:1px solid #cdeee5;font-weight:700;font-size:14px}

/* ===== لوحة الأوائل الخاصة بالخطة ===== */
.p7lb{margin:6px 0 0;padding:8px;border:1px solid #2c7a90;border-radius:16px;background:rgba(7,32,47,.6)}
.p7lr{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:12px;margin:4px 0;background:#0b3550;border:1px solid transparent;animation:p7in .4s both}
.p7lr.me{border-color:#fcd34d;background:#0f4a6b}
.p7lr .k{flex:0 0 32px;text-align:center;font-size:20px;font-weight:900;color:#fde68a}
.p7lr .n{flex:1;font-weight:800;font-size:14px;color:#e8f6f4}
.p7lr small{display:block;color:#9fd8d0;font-size:11px;font-weight:600}
.p7lr .v{font-weight:900;color:#a7f3e3;font-size:15px}
.p7lbm{text-align:center;color:#bdf0e6;font-size:13px;padding:8px 4px;line-height:1.7}
.p7fin{text-align:center;font-weight:800;color:#fde68a;font-size:14px;margin:2px 0 6px}
@media (prefers-reduced-motion:reduce){.p7c *,.sub.p7tile,.sub.p7tile *{animation:none!important;transition:none!important}}
`;
function inject(){if(document.getElementById("p7css"))return;const st=document.createElement("style");st.id="p7css";st.textContent=css;document.head.appendChild(st)}

/* ---------- خلفية متحركة ---------- */
const gear=(sz,top,side,cls)=>`<svg class="p7gear ${cls||""}" style="width:${sz}px;height:${sz}px;top:${top}px;${side}" viewBox="0 0 100 100"><path fill="#9ad6e6" d="M50 8l6 10a32 32 0 0 1 9 3.700l11-4 8 8-4 11a32 32 0 0 1 3.700 9l10 6v12l-10 6a32 32 0 0 1-3.700 9l4 11-8 8-11-4a32 32 0 0 1-9 3.700l-6 10H38l-6-10a32 32 0 0 1-9-3.700l-11 4-8-8 4-11a32 32 0 0 1-3.700-9L-6 56V44l10-6a32 32 0 0 1 3.700-9l-4-11 8-8 11 4a32 32 0 0 1 9-3.700L38 8zM44 34a16 16 0 1 0 .1 0z"/></svg>`;
function bg(){let s="";for(let i=0;i<22;i++)s+=`<i style="top:${(i*37)%100}%;left:${(i*53+11)%100}%;animation-delay:${(i%7)*.45}s"></i>`;
 return `<div class="p7bg">${gear(110,-20,"left:-26px")}${gear(70,160,"right:-18px","r")}${gear(90,520,"left:-30px","r")}${gear(60,820,"right:-12px")}${s}</div>`}


/* ---------- لوحة الأوائل: تحسب إنجاز الخطة فقط (منفصلة عن أي ترتيب آخر في الموقع) ---------- */
function score(){const s=load(),c=s.chk||{};return{tasks:Object.keys(c).filter(k=>c[k]).length,days:Object.keys(s.done).filter(k=>s.done[k]).length}}
function pushScore(){try{
 if(typeof db==="undefined"||!db||typeof UID==="undefined"||!UID)return;
 const sc=score();let at;try{at=SVT()}catch(e){at=Date.now()}
 db.collection("plan7_board").doc(UID).set({name:(typeof user!=="undefined"&&user)||"طالب",tasks:sc.tasks,days:sc.days,at:at},{merge:true}).catch(()=>{})}catch(e){}}
async function board(){
 const me=score();let rows=null,fin=null,mine=(typeof UID!=="undefined"&&UID)||null;
 try{if(typeof db!=="undefined"&&db&&mine){
   pushScore();
   const q=await db.collection("plan7_board").orderBy("tasks","desc").limit(10).get();rows=[];
   q.forEach(d=>{const o=d.data()||{};rows.push({id:d.id,name:o.name||"طالب",tasks:+o.tasks||0,days:+o.days||0})});
   const f=await db.collection("plan7_board").where("days",">=",7).get();fin=f.size}}catch(e){rows=null}
 const el=document.getElementById("p7lb");if(!el)return;
 const medal=i=>["🥇","🥈","🥉"][i]||AR(i+1);
 const own=`<div class="p7lbm">إنجازك: <b>${AR(me.tasks)}</b> مهمة • <b>${AR(me.days)}</b> من ٧ أيام</div>`;
 if(rows===null){el.innerHTML=`<div class="p7lbm">${mine?"تعذر تحميل لوحة الأوائل الآن.":"سجّل الدخول بحسابك لتظهر في لوحة الأوائل."}</div>${own}`;return}
 const list=rows.filter(r=>r.tasks>0);
 el.innerHTML=`<div class="p7fin">🏁 أنهوا الخطة كاملة: ${AR(fin||0)}</div>`+
  (list.length?list.map((r,i)=>`<div class="p7lr ${r.id===mine?"me":""}" style="animation-delay:${i*.05}s"><span class="k">${medal(i)}</span><span class="n">${esc(r.name)}<small>${AR(r.days)} من ٧ أيام</small></span><span class="v">${AR(r.tasks)}</span></div>`).join(""):`<div class="p7lbm">لا يوجد أوائل بعد — كن أول من ينجز مهام الخطة!</div>`)+
  (list.some(r=>r.id===mine)?"":own)}

/* ---------- الصفحة الرئيسية للخطة ---------- */
let tick=null;
function stop(){if(tick){clearInterval(tick);tick=null}}
function plan(){
 inject();stop();
 const s=load(),S=subs(),N=S.length||7;
 const doneN=Object.keys(s.done).filter(k=>s.done[k]).length;
 const H=N*112+50, xs=[72,28,72,28,72,28,50,28,72];
 const pts=S.map((_,i)=>[xs[i%xs.length],50+i*112]);
 let d="M"+pts[0][0]+" "+pts[0][1];
 for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],m=(a[1]+b[1])/2;d+=` C ${a[0]} ${m} ${b[0]} ${m} ${b[0]} ${b[1]}`}
 const nodes=S.map((x,i)=>{const n=i+1,op=isOpen(s,n),dn=!!s.done[n];
  const cls=dn?"done":op?"open":"lock",o=dn?"✔":op?"📚":"🔒",tt=(DAYS[n]&&DAYS[n].t)||x[0];
  const t=dn?`${tt} ✔`:op?tt:(s.start?`يُفتح بعد ${AR(Math.max(1,Math.ceil((opensAt(s,n)-Date.now())/DAY)))} يوم`:"يُفتح لاحقًا");
  return `<button class="p7n ${cls}" data-i="${n}" style="top:${pts[i][1]-31}px;left:${pts[i][0]}%;animation-delay:${i*.12}s"><div class="o">${o}</div><span class="t">يوم ${AR(n)}</span><small>${t}</small></button>`}).join("");
 const chips=S.map((x,i)=>`<span class="p7chip ${isOpen(s,i+1)?"on":""}" style="animation-delay:${i*.08}s">${x[1]} ${x[0]}</span>`).join("");
 const team=TEAM.map(p=>`<div class="p7p"><div class="p7av">${p.img?`<img src="${p.img}" alt="">`:p.ico}</div>${p.name?`${p.name}<em>${p.role}</em>`:p.role}</div>`).join("");
 page(`${bg()}<div class="p7rib">لوحة الأوائل</div>
 <div class="p7h">خطة السبع أيام: لُمّ المنهج!</div>
 <div class="p7s">الأيام مغلقة، يُفتح يوم تلو الآخر!</div>
 <div class="p7bar"><b id="p7f"></b></div><div class="p7pl">أنجزت ${AR(doneN)} من ${AR(N)} أيام</div>
 ${s.start?`<div class="p7cdp" id="p7cd"></div>`:`<button class="p7start" id="p7go">🚀 ابدأ الخطة الآن</button>`}
 <div class="p7path" style="--H:${H}px"><svg viewBox="0 0 100 ${H}" preserveAspectRatio="none"><path class="base" vector-effect="non-scaling-stroke" d="${d}"/><path class="flow" vector-effect="non-scaling-stroke" d="${d}"/></svg>${nodes}</div>
 <div class="p7sec">التصنيفات والخطط</div><div class="p7chips">${chips}</div>
 <div class="p7sec">🏆 لوحة الأوائل</div><div class="p7lb" id="p7lb"><div class="p7lbm">جاري التحميل…</div></div>
 <div class="p7team"><span class="p7tt">فريق العمل</span><div class="p7tm">${team}</div></div>
 ${s.start?`<button class="back" id="p7rs" style="margin-top:14px;font-size:13px;opacity:.8">↺ إعادة ضبط الخطة</button>`:""}`,subjects);
 const c=app.querySelector(".card");if(c)c.classList.add("p7c");
 board();
 const f=document.getElementById("p7f");if(f)setTimeout(()=>{f.style.width=Math.round(doneN/N*100)+"%"},120);
 const go=document.getElementById("p7go");if(go)go.onclick=()=>{s.start=Date.now();store(s);plan();confetti()};
 const rs=document.getElementById("p7rs");if(rs)rs.onclick=()=>{if(confirm("هل تريد إعادة ضبط الخطة من البداية؟")){store({start:null,done:{},chk:{}});plan()}};
 app.querySelectorAll(".p7n").forEach(b=>b.onclick=()=>{const n=+b.dataset.i;
  if(isOpen(s,n))day(n);else{b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");
   toast(s.start?"🔒 اليوم مغلق — يُفتح "+(n-1===Math.round((d0(Date.now())-d0(s.start))/DAY)+1?"غدًا":"في موعده"):"🔒 اضغط «ابدأ الخطة» أولًا")}});
 if(s.start){const cd=document.getElementById("p7cd");let nx=null;
  for(let i=1;i<=N;i++)if(!isOpen(s,i)){nx=opensAt(s,i);break}
  const up=()=>{const el=document.getElementById("p7cd");if(!el){stop();return}
   if(nx===null){el.innerHTML="🎉 كل الأيام مفتوحة — لُمّ المنهج!";return}
   const r=nx-Date.now();if(r<=0){stop();plan();return}
   el.innerHTML="⏳ اليوم التالي يُفتح بعد <b>"+fmt(r)+"</b>"};
  up();tick=setInterval(up,1000)}
}


/* ---------- أيام الخطة السبعة بالتصميم الجديد (جدول المواد + خانات الإنجاز) ----------
   للتعديل: غيّر المواد أو أرقام المحاضرات/السكاشن هنا. كل خلية = [نوع, رقم] حيث النوع lec (محاضرة) أو sec (سكشن). */
const DAYS=[
 null,
 {t:"الانطلاق",r:[["اقتصاد",[["lec",1],["lec",2]]],["الكيمياء",[["lec",1],["sec",1]]],["رياضة عامة",[["lec",1],["sec",1]]],["محاصيل",[["lec",1],["sec",1]]]]},
 {t:"المتابعة والانتظام",r:[["حيوان زراعي",[["lec",1],["sec",1]]],["نبات",[["lec",1],["sec",1]]],["حاسب آلي",[["lec",1],["sec",1]]],["اقتصاد",[["lec",3],["sec",1]]]]},
 {t:"الإنجاز والتركيز",r:[["رياضة عامة",[["lec",2],["sec",2]]],["محاصيل",[["lec",2],["sec",2]]],["الكيمياء",[["lec",2],["sec",2]]],["حيوان زراعي",[["lec",2],["sec",2]]]]},
 {t:"الاستمرار والثبات",r:[["اقتصاد",[["lec",4],["sec",2]]],["نبات",[["lec",2],["sec",2]]],["حاسب آلي",[["lec",2],["sec",2]]],["رياضة عامة",[["lec",3],["sec",3]]]]},
 {t:"العزيمة والتقدم",r:[["الكيمياء",[["lec",3],["sec",3]]],["حيوان زراعي",[["lec",3],["sec",3]]],["محاصيل",[["lec",3],["sec",3]]],["نبات",[["lec",3],["sec",3]]]]},
 {t:"المثابرة والتفوق",r:[["رياضة عامة",[["lec",4],["sec",4]]],["حاسب آلي",[["lec",3],["sec",3]]],["الكيمياء",[["lec",4],["lec",5]]],["اقتصاد",[["lec",5],["sec",3]]]]},
 {t:"الاحتفال والختام",r:[["حيوان زراعي",[["lec",4],["lec",5]]],["محاصيل",[["lec",4],["sec",4]]],["نبات",[["lec",4],["lec",5]]],["اقتصاد",[["sec",4],["sec",5]]]]}
];
const KL={lec:"المحاضرة",sec:"السكشن"};
const icoOf=n=>{const f=(typeof SUBJECTS!=="undefined"?SUBJECTS:[]).find(x=>x[0]===n);return f?f[1]:"📘"};
const ckey=(d,sub,k,n)=>"d"+d+"|"+sub+"|"+k+n;
function openCell(d,sub,k,n){
 const back=()=>dayN(d),fl=FILES[[sub,k,"pdf",n].join("|")],lab=KL[k]+" "+AR(n);
 if(!fl||!fl.length){page(`<h2>${lab} – ${esc(sub)}</h2><div class="empty">لم يتم رفع محتوى هنا بعد.</div>`,back);return}
 if(fl.length===1){viewer(fl[0],back);return}
 page(`<h2>${lab} – ${esc(sub)}</h2><div class="list">${fl.map(f=>`<button class="opt"><span>📄</span>${esc(f.name)}</button>`).join("")}</div>`,back);
 btns(fl,"opt",f=>viewer(f,()=>openCell(d,sub,k,n)));
}
function weekReport(d){
 const s=load(),c=s.chk||{};let html="",any=false;
 for(let i=1;i<=7;i++){if(!isOpen(s,i))continue;
  const miss=[];DAYS[i].r.forEach(r=>r[1].forEach(x=>{if(!c[ckey(i,r[0],x[0],x[1])])miss.push(`⚠️ ${icoOf(r[0])} ${r[0]} – ${KL[x[0]]} ${AR(x[1])}`)}));
  if(miss.length){any=true;html+=`<div class="p7ml" style="margin-top:12px">يوم ${AR(i)}: ${DAYS[i].t}</div>${miss.map(m=>`<div class="p7mw">${m}</div>`).join("")}`}}
 page(`<h2>📊 تقرير نقاط الضعف الأسبوعي</h2><div style="font-size:14px;margin:4px 0 4px">المهام التي لم تُنجز بعد في الأيام المفتوحة:</div>${any?html:`<div class="p7mw">🎉 لا توجد نقاط ضعف، أنجزت كل مهام الأيام المفتوحة!</div>`}`,()=>dayN(d));
 const cd=app.querySelector(".card");if(cd)cd.classList.add("p7m");
}
function dayN(n){
 inject();stop();
 const D=DAYS[n];if(!D)return plan();
 const s=load();s.chk=s.chk||{};
 const total=D.r.reduce((a,r)=>a+r[1].length,0);
 const cnt=()=>D.r.reduce((a,r)=>a+r[1].filter(x=>s.chk[ckey(n,r[0],x[0],x[1])]).length,0);
 const rows=D.r.map((r,i)=>`<div class="p7mr" style="animation-delay:${i*.08}s"><div class="p7ms"><i>${icoOf(r[0])}</i>${r[0]}</div>${r[1].map(x=>{const on=!!s.chk[ckey(n,r[0],x[0],x[1])],ok=!!FILES[[r[0],x[0],"pdf",x[1]].join("|")];
  return `<div class="p7mc ${on?"on":""}" data-s="${r[0]}" data-k="${x[0]}" data-n="${x[1]}" role="button" tabindex="0"><span class="t">${KL[x[0]]} ${AR(x[1])}<small>${ok?"متاح ✓":"قريبًا"}</small></span><span class="p7ck" data-ck="1" aria-label="تم"></span></div>`}).join("")}</div>`).join("");
 const team=TEAM.map(p=>`<div class="p7p"><div class="p7av">${p.img?`<img src="${p.img}" alt="">`:p.ico}</div>${p.name?`${p.name}<em>${p.role}</em>`:p.role}</div>`).join("");
 page(`<div class="p7mh">اليوم ${AR(n)}: ${D.t}</div>
 <div class="p7mp"><div class="bar"><b id="p7mf"></b></div><span id="p7mpc">٠٪</span></div>
 <div class="p7ml">اليوم الدراسي</div>
 <div class="p7mt"><div class="p7mr hd"><div>الموضوع</div><div>المحاضرة</div><div>السكشن / المحاضرة ٢</div></div>${rows}</div>
 <button class="p7mrep" id="p7rp"><span>📊</span>تقرير نقاط الضعف الأسبوعي<small>اضغط للعرض</small></button>
 <div class="p7team"><span class="p7tt">فريق العمل</span><div class="p7tm">${team}</div></div>`,plan);
 const c=app.querySelector(".card");if(c)c.classList.add("p7m");
 const upd=(anim)=>{const p=Math.round(cnt()/total*100);const f=document.getElementById("p7mf"),t=document.getElementById("p7mpc");
  if(t)t.textContent=AR(p)+"٪";if(f)setTimeout(()=>{f.style.width=p+"%"},anim?120:0)};
 upd(true);
 app.querySelectorAll(".p7mc").forEach(el=>{
  el.onclick=e=>{
   if(e.target.closest("[data-ck]")){
    e.stopPropagation();const t=load();t.chk=t.chk||{};const k=ckey(n,el.dataset.s,el.dataset.k,el.dataset.n);
    t.chk[k]=!t.chk[k];
    const all=D.r.every(r=>r[1].every(x=>t.chk[ckey(n,r[0],x[0],x[1])]));
    t.done[n]=all;store(t);s.chk=t.chk;pushScore();
    el.classList.toggle("on",!!t.chk[k]);upd(false);
    if(t.chk[k]&&all){confetti();setTimeout(plan,1400)}
    return}
   openCell(n,el.dataset.s,el.dataset.k,+el.dataset.n)};
  el.onkeydown=e=>{if(e.key==="Enter")el.click()};
 });
 document.getElementById("p7rp").onclick=()=>weekReport(n);
}

/* ---------- صفحة اليوم ---------- */
function day(n){
 inject();stop();
 if(n>=1&&n<=7)return dayN(n);
 const s=load(),x=subs()[n-1];if(!x)return plan();
 const dn=!!s.done[n];
 page(`${bg()}<div class="p7rib">يوم ${AR(n)}</div>
 <div class="p7day"><h3>${x[1]} ${x[0]}</h3><div style="color:#cfe9ee;font-size:14px">خطة اليوم: راجع المحاضرات، ثم اختبر نفسك، ثم سجّل إنجاز اليوم.</div>
 <button class="p7btn" id="p7a"><span>📖</span>مراجعة المحاضرات والملفات</button>
 <button class="p7btn" id="p7b"><span>📝</span>اختبر نفسك في ${x[0]}</button>
 <button class="p7btn" id="p7c"><span>🎮</span>المحتوى التفاعلي</button>
 <button class="p7btn ${dn?"ok":""}" id="p7d"><span>${dn?"✅":"⬜"}</span>${dn?"تم إنجاز اليوم (اضغط للتراجع)":"تم إنجاز اليوم"}</button></div>`,plan);
 const c=app.querySelector(".card");if(c)c.classList.add("p7c");
 document.getElementById("p7a").onclick=()=>subject(x[0]);
 document.getElementById("p7b").onclick=()=>quizList(x[0]);
 document.getElementById("p7c").onclick=()=>actNums(x[0]);
 document.getElementById("p7d").onclick=()=>{const t=load();t.done[n]=!t.done[n];store(t);if(t.done[n]){confetti();setTimeout(plan,1100)}else day(n)};
}

/* ---------- احتفال ---------- */
function confetti(){const c=app.querySelector(".card");if(!c)return;
 const cols=["#fcd34d","#34d399","#5eead4","#f472b6","#60a5fa"];
 for(let i=0;i<26;i++){const e=document.createElement("i");e.className="p7cf";
  e.style.cssText=`background:${cols[i%5]};--x:${Math.round((Math.random()-.5)*300)}px;--y:${Math.round(-60+Math.random()*260)}px;animation-delay:${Math.random()*.15}s`;
  c.appendChild(e);setTimeout(()=>e.remove(),1500)}}

/* ---------- مربع الدخول داخل شبكة المواد ---------- */
function entry(){
 inject();const s=load(),N=subs().length||7;
 const dn=Object.keys(s.done).filter(k=>s.done[k]).length;
 const g=app.querySelector(".grid");if(!g||g.querySelector("#p7e"))return;
 const b=document.createElement("button");b.className="sub p7tile";b.id="p7e";
 b.innerHTML=`<span class="ic">🗓️</span>خطة الأيام السبعة<small>${s.start?AR(dn)+" / "+AR(N)+" أيام":"ابدأ الآن"}</small>`;
 b.onclick=plan;g.appendChild(b)}
/* يراقب شاشة المواد ويضيف المربع مهما كان ترتيب تحميل الملفات أو أي تعديل على subjects */
function mount(){try{const a=document.getElementById("app");if(!a)return;const g=a.querySelector(".grid");
 if(g&&!g.querySelector("#p7e")&&g.querySelectorAll(".sub").length===subs().length&&!a.querySelector(".p7c"))entry()}catch(e){}}
function watch(){const a=document.getElementById("app");if(!a){document.addEventListener("DOMContentLoaded",watch);return}
 new MutationObserver(()=>{mount()}).observe(a,{childList:true});mount()}
watch();
window.openPlan7=plan;window.PLAN7_LOADED=true;try{console.log("plan7.js محمّل – نسخة اليوم الأول الجديدة");}catch(e){}
})();
