/* ===== lab.js — «امتحانات في المعمل»: كشف الملح المجهول بالتجارب ثم كتابة اسمه والتصحيح ===== */
(function(){
"use strict";
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const AR=n=>Number(n).toLocaleString("ar-EG");
const SK=()=>"agri_lab_"+((typeof UID!=="undefined"&&UID)||"guest");
const load=()=>{try{return Object.assign({n:0,ok:0},JSON.parse(localStorage.getItem(SK())||"{}"))}catch(e){return{n:0,ok:0}}};
const save=o=>{try{localStorage.setItem(SK(),JSON.stringify(o))}catch(e){}};

/* ---------- الكواشف (رقم، اسم، صيغة، لون السائل في الأنبوبة) ---------- */
const RG2=[
 [1,"حمض الهيدروكلوريك","HCl","#f2e87a"],
 [2,"هيدروكسيد الصوديوم","NaOH","#cfe8f1"],
 [3,"كلوريد الباريوم","BaCl₂","#cfe8f1"],
 [4,"نترات الفضة","AgNO₃","#cfe8f1"],
 [5,"كبريتيد الهيدروجين","H₂S","#e8efc0"],
 [6,"الأمونيا","NH₃","#cfe8f1"]
];

/* ---------- بنك الأملاح: عدّل أو أضف ملحًا بنفس الشكل ----------
 n=الاسم، f=الصيغة، a=المظهر، sol=لون المحلول، solid=لا يذوب (يظهر راسبًا أبيض)،
 c/an=الكاتيون/الأنيون للتصحيح الجزئي، k=أسماء مقبولة، why=تفسير بعد التصحيح
 r[رقم الكاشف]=[ملاحظة، لون الراسب، لون المحلول، غاز؟، يذوب الراسب في الزيادة→لون، يذوب الملح؟] */
const NO=["لا يحدث تغيّر ظاهر"];
const CLR="rgba(190,225,240,.5)";
const SALTS2=[
 {n:"كربونات الصوديوم",f:"Na₂CO₃",a:"مسحوق أبيض يذوب في الماء",sol:CLR,c:"صوديوم",an:"كربونات",
  k:["كربونات الصوديوم","Na2CO3","كربونات صوديوم"],
  r:{1:["فوران شديد وتصاعد غاز عديم اللون والرائحة يعكّر ماء الجير",null,null,1],2:NO,3:["راسب أبيض يذوب في الأحماض مع فوران","#fff"],4:["راسب أبيض يتحوّل إلى بني عند الغليان","#fff"],5:NO,6:NO},
  why:"الفوران مع HCl يدل على كربونات أو بيكربونات، والراسب الأبيض مع BaCl₂ و AgNO₃ يؤكد الكربونات."},
 {n:"كربونات الكالسيوم",f:"CaCO₃",a:"مسحوق أبيض لا يذوب في الماء",sol:CLR,solid:1,c:"كالسيوم",an:"كربونات",
  k:["كربونات الكالسيوم","CaCO3","كربونات كالسيوم"],
  r:{1:["يذوب الملح بفوران وتصاعد غاز عديم اللون والرائحة يعكّر ماء الجير",null,null,1,null,1],2:["الملح لا يذوب ولا يتفاعل"],3:["الملح لا يذوب ولا يتفاعل"],4:["الملح لا يذوب ولا يتفاعل"],5:["الملح لا يذوب ولا يتفاعل"],6:["الملح لا يذوب ولا يتفاعل"]},
  why:"ملح أبيض لا يذوب في الماء ويذوب في HCl بفوران، فهو كربونات غير ذائبة (الكالسيوم)."},
 {n:"بيكربونات الصوديوم",f:"NaHCO₃",a:"مسحوق أبيض يذوب في الماء",sol:CLR,c:"صوديوم",an:"بيكربونات",
  k:["بيكربونات الصوديوم","NaHCO3","بيكربونات صوديوم","كربونات الصوديوم الهيدروجينية","كربونات الصوديوم الحامضية"],
  r:{1:["فوران وتصاعد غاز عديم اللون والرائحة يعكّر ماء الجير",null,null,1],2:NO,3:["لا يتكوّن راسب على البارد"],4:["لا يتكوّن راسب على البارد"],5:NO,6:NO},
  why:"فوران مع HCl لكن بلا راسب مع BaCl₂ و AgNO₃ على البارد، فهو بيكربونات وليس كربونات."},
 {n:"كبريتات النحاس",f:"CuSO₄",a:"بلورات زرقاء تذوب في الماء",sol:"#5aa0e8",c:"نحاس",an:"كبريتات",
  k:["كبريتات النحاس","CuSO4","كبريتات النحاس الثنائيه","كبريتات النحاس 2","كبريتات النحاس II","كبريتات النحاسيك"],
  r:{1:NO,2:["راسب أزرق باهت هلامي","#6fb4f0"],3:["راسب أبيض لا يذوب في الأحماض","#fff"],4:NO,5:["راسب أسود","#1a1a1a"],6:["راسب أزرق باهت يذوب في الزيادة مكوّنًا محلولًا أزرق غامقًا","#6fb4f0",null,0,"#1c3fa0"]},
  why:"اللون الأزرق، وراسب أزرق مع NaOH، وأسود مع H₂S، وأبيض مع BaCl₂ (كبريتات)."},
 {n:"كلوريد الصوديوم",f:"NaCl",a:"بلورات بيضاء تذوب في الماء",sol:CLR,c:"صوديوم",an:"كلوريد",
  k:["كلوريد الصوديوم","NaCl","ملح الطعام","كلوريد صوديوم"],
  r:{1:NO,2:NO,3:NO,4:["راسب أبيض متجبّن يذوب في محلول النشادر","#fff"],5:NO,6:NO},
  why:"لا يعطي راسبًا إلا مع AgNO₃ (راسب أبيض متجبّن) فهو كلوريد، ولا كاتيون ملوّن أو راسب مع القلويات."},
 {n:"كلوريد الحديد III",f:"FeCl₃",a:"مادة صفراء مائلة للبني تذوب في الماء",sol:"#e0b83a",c:"حديد",an:"كلوريد",
  k:["كلوريد الحديد III","كلوريد الحديديك","FeCl3","كلوريد الحديد الثلاثي","كلوريد الحديد 3","كلوريد الحديد"],
  r:{1:NO,2:["راسب بني محمر","#9a3b1e"],3:NO,4:["راسب أبيض متجبّن","#fff"],5:["عكارة صفراء ويتحوّل المحلول إلى أخضر باهت","#f5eb9a","#bfe0b0"],6:["راسب بني محمر","#9a3b1e"]},
  why:"راسب بني محمر مع القلويات (حديد III) وراسب أبيض متجبّن مع AgNO₃ (كلوريد)."},
 {n:"كبريتات الصوديوم",f:"Na₂SO₄",a:"بلورات بيضاء تذوب في الماء",sol:CLR,c:"صوديوم",an:"كبريتات",
  k:["كبريتات الصوديوم","Na2SO4","كبريتات صوديوم"],
  r:{1:NO,2:NO,3:["راسب أبيض لا يذوب في الأحماض","#fff"],4:NO,5:NO,6:NO},
  why:"الراسب الأبيض الذي لا يذوب في الأحماض مع BaCl₂ هو كبريتات الباريوم، فالأنيون كبريتات."},
 {n:"كلوريد الأمونيوم",f:"NH₄Cl",a:"بلورات بيضاء تذوب في الماء",sol:CLR,c:"امونيوم",an:"كلوريد",
  k:["كلوريد الامونيوم","NH4Cl","كلوريد امونيوم","نشادر"],
  r:{1:NO,2:["عند التسخين يتصاعد غاز نفّاذ الرائحة يزرّق ورقة عباد الشمس الحمراء",null,null,1],3:NO,4:["راسب أبيض متجبّن","#fff"],5:NO,6:NO},
  why:"غاز الأمونيا مع NaOH والتسخين يدل على الأمونيوم، وراسب AgNO₃ الأبيض يدل على الكلوريد."},
 {n:"كبريتات الحديد II",f:"FeSO₄",a:"بلورات خضراء باهتة تذوب في الماء",sol:"#bfe3b4",c:"حديد",an:"كبريتات",
  k:["كبريتات الحديد II","كبريتات الحديدوز","FeSO4","كبريتات الحديد الثنائي","كبريتات الحديد 2","كبريتات الحديد"],
  r:{1:NO,2:["راسب أخضر متسخ يتحوّل إلى بني عند التعرّض للهواء","#6b8e4e"],3:["راسب أبيض لا يذوب في الأحماض","#fff"],4:NO,5:NO,6:["راسب أخضر متسخ يتحوّل إلى بني عند التعرّض للهواء","#6b8e4e"]},
  why:"اللون الأخضر الباهت وراسب أخضر متسخ مع القلويات (حديد II) وراسب BaSO₄ الأبيض (كبريتات)."}
];

/* ---------- التصحيح ---------- */
const norm=s=>String(s).toLowerCase()
 .replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[₀-₉]/g,d=>"₀₁₂₃₄₅₆₇₈₉".indexOf(d))
 .replace(/²/g,"2").replace(/³/g,"3").replace(/⁺/g,"+").replace(/[\u064B-\u065F\u0640]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه")
 .replace(/[()\-–_,.،]/g," ").trim().split(/\s+/).map(w=>w.replace(/^ال/,"")).join("");
function grade(salt,ans){
 const a=norm(ans);if(!a)return{ok:false,empty:true};
 if(salt.k.some(k=>norm(k)===a))return{ok:true};
 const has=w=>{w=norm(w);return a.includes(w)&&!(w==="كربونات"&&a.includes("بيكربونات"))};
 return{ok:false,cat:has(salt.c),an:has(salt.an)};
}

/* ---------- الأنماط ---------- */
function css(){
 if(document.getElementById("lbcss"))return;
 const st=document.createElement("style");st.id="lbcss";
 st.textContent=`
.lb{display:flex;flex-direction:column;gap:12px}
.lb h2{margin:0}.lb .lbp{margin:0;color:var(--mut,#667);font-size:14px;line-height:1.6}
.lbb{border-radius:18px;padding:12px 8px 14px;border:2px solid #bfe0ea;background:linear-gradient(180deg,#eaf7fb,#cfe9f2);color:#10303c}
.lbinfo{text-align:center;font-size:14px;margin-bottom:8px;line-height:1.5}
.lbtubes{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;align-items:start}
.lbsl{display:flex;flex-direction:column;align-items:center;text-align:center;gap:3px;min-width:0}
.lbsl b{font-size:clamp(14px,4.2vw,18px)}.lbsl small{font-size:11.5px;color:#456472;min-height:2.7em;line-height:1.25}
.lbst{width:100%;max-width:128px;aspect-ratio:1/1.45;border-radius:16px;position:relative;border:2px solid transparent}
.lbst.r{background:#e1efd9;border-color:#c4dcb9}.lbst.s{background:#e7dcea;border-color:#d0bfd5}
.tw{position:absolute;top:31%;height:55%;width:34%;inset-inline-start:33%;transform-origin:50% 12%;transition:transform .6s ease}
.tw.pour{transform:rotate(-72deg)}
.tw.shake{animation:lbSh .1s linear infinite alternate}
@keyframes lbSh{from{transform:translateX(-1.5px)}to{transform:translateX(1.5px)}}
.lbt{position:relative;width:100%;height:100%;border:3px solid #7fa9b8;border-radius:4px 4px 999px 999px;background:rgba(255,255,255,.55);overflow:hidden}
.lbt:after{content:"";position:absolute;top:8%;bottom:16%;inset-inline-start:14%;width:12%;background:linear-gradient(180deg,rgba(255,255,255,.85),transparent);border-radius:99px;pointer-events:none}
.lbt .f{position:absolute;inset-inline:0;bottom:0;transition:height .7s ease,background .9s ease,opacity .6s ease}
.lbt .liq{height:58%}.lbt .sld{height:0;background:#fff}.lbt .ppt{height:0;opacity:0}
.lbt .cl{height:58%;opacity:0;pointer-events:none}
.lbt i.bb{position:absolute;bottom:6%;border-radius:50%;background:rgba(255,255,255,.9);border:1px solid #7fa9b8;opacity:0;animation:lbRise 1.3s ease-in forwards;z-index:2}
@keyframes lbRise{0%{opacity:0;transform:translate(0,0)}12%{opacity:1}50%{transform:translate(var(--sx),calc(var(--rise)*.5))}100%{opacity:0;transform:translate(calc(var(--sx)*-1),var(--rise))}}
.lbdp{position:absolute;top:0;inset-inline-start:41%;width:18%;pointer-events:none;overflow:visible}
.lbdp .bulb{transform-box:fill-box;transform-origin:center}
.lbdp.sq .bulb{animation:lbSq .5s ease}
@keyframes lbSq{50%{transform:scale(.78,.68)}}
.lbdr{position:absolute;top:27%;inset-inline-start:calc(50% - 4px);width:8px;height:11px;background:#6fb7dd;border-radius:50% 50% 50% 50%/65% 65% 35% 35%;opacity:0;z-index:3}
.lbdr.go{animation:lbFall .55s ease-in forwards}
@keyframes lbFall{0%{opacity:1;top:27%}85%{opacity:1}100%{opacity:0;top:51%}}
.fl{position:absolute;top:85%;inset-inline-start:39%;width:22%;height:15%;opacity:0;transition:opacity .25s;pointer-events:none}
.fl.on{opacity:1}
.fl i{position:absolute;bottom:0;inset-inline-start:0;width:100%;height:100%;transform-origin:50% 100%;border-radius:50% 50% 50% 50%/72% 72% 28% 28%;background:radial-gradient(circle at 50% 78%,#fff7b8,#ffb320 55%,#ef5a1a);animation:lbFl .17s infinite alternate}
@keyframes lbFl{from{transform:scale(1,1) skewX(-5deg)}to{transform:scale(.82,1.15) skewX(6deg)}}
.lbans2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.lbans2 label{display:flex;flex-direction:column;gap:4px;font-weight:800;font-size:14px}
.lbans2 .lbin{flex:none;width:100%;min-width:0}
.lbo{margin:3px 0 0;padding-inline-start:8px;border-inline-start:3px solid #7fa9b8}
.lbrv details{border:1px solid var(--line,#ddd);border-radius:12px;padding:8px 10px;margin-top:6px;background:var(--bg,#f6f8f7)}.lbrv summary{font-weight:800;cursor:pointer}
.lbrg{display:grid;grid-template-columns:repeat(3,1fr);gap:12px 8px;justify-items:center}
.lbrb{width:clamp(88px,26vw,110px);aspect-ratio:1;border-radius:50%;border:4px solid var(--c,#2e9c6a);background:var(--card,#fff);color:var(--ink,#123);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:6px;line-height:1.15;font:inherit;text-align:center;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.15);transition:transform .15s,background .2s;touch-action:manipulation}
.lbrb:nth-child(3n+2){--c:#2f78c4}.lbrb:nth-child(4){--c:#e0932f}
.lbrb .nu{width:22px;height:22px;border-radius:50%;background:var(--c);color:#fff;font-size:13px;font-weight:800;display:grid;place-items:center}
.lbrb .nm{font-size:clamp(12px,3.3vw,14px);font-weight:800}.lbrb .fm{font-size:clamp(11px,3vw,12px);color:var(--mut,#667)}
.lbrb:active{transform:scale(.94)}
.lbrb[aria-pressed=true]{background:var(--c);color:#fff;transform:scale(1.06)}.lbrb[aria-pressed=true] .nu{background:#fff;color:var(--c)}.lbrb[aria-pressed=true] .fm{color:#fff}
.lbrb:disabled{opacity:.5}
.lbrb:focus-visible,.lbin:focus-visible{outline:3px solid #ef8a2b;outline-offset:2px}
.lblg{border:1px solid var(--line,#ddd);border-radius:14px;padding:10px 12px;background:var(--bg,#f6f8f7);font-size:14px;line-height:1.7}
.lblg h4{margin:0 0 4px;font-size:15px}.lblg .em{color:var(--mut,#667)}
.lblg li{margin:0 0 4px}.lblg ul{margin:0;padding-inline-start:20px}
.lbans{display:flex;gap:8px;flex-wrap:wrap}
.lbin{flex:1 1 180px;min-height:48px;border-radius:12px;border:2px solid var(--line,#ccc);background:var(--card,#fff);color:var(--ink,#123);padding:0 12px;font:inherit;font-size:16px}
.lbfb{border-radius:14px;padding:12px;line-height:1.7;font-size:15px}
.lbfb.ok{background:rgba(22,163,74,.14);border:1px solid #16a34a}.lbfb.no{background:rgba(185,28,28,.12);border:1px solid #b91c1c}
.lbft{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;font-size:13px;color:var(--mut,#667)}

.lbact{display:flex;gap:8px;flex-wrap:wrap}.lbact button{flex:1 1 140px;min-height:46px;border-radius:12px;border:2px solid var(--line,#ccc);background:var(--card,#fff);color:var(--ink,#123);font:inherit;font-weight:800;cursor:pointer;touch-action:manipulation}
.lbact button:disabled{opacity:.45;cursor:default}.lbact button:not(:disabled):active{transform:scale(.96)}
.lbeq{display:block;direction:ltr;text-align:left;font-family:ui-monospace,Consolas,monospace;font-size:12.5px;background:var(--card,#fff);border:1px solid var(--line,#ddd);border-radius:8px;padding:4px 8px;margin:4px 0;overflow-x:auto;white-space:nowrap}
.lbtag{display:inline-block;font-size:11px;font-weight:800;border-radius:99px;padding:1px 8px;margin-inline-start:4px;color:#fff;background:#2f78c4}.lbtag.m{background:#d97706}
textarea.lbin{padding:8px 12px;line-height:1.6;resize:vertical;width:100%;min-height:78px}
.lbmsg{min-height:1.4em;font-size:13px;color:var(--mut,#667)}
.lbsec{display:flex;align-items:center;gap:12px;width:100%;padding:14px;border-radius:16px;border:2px solid var(--line,#ddd);background:var(--card,#fff);color:var(--ink,#123);font:inherit;text-align:right;cursor:pointer}
.lbsec .ic{font-size:30px}.lbsec b{display:block;font-size:16px}.lbsec span{font-size:13px;color:var(--mut,#667);line-height:1.5}.lbsec:active{transform:scale(.98)}
.lbleg{font-size:13px;color:var(--mut,#667);margin:0}
@media (max-width:380px){.lbrg{gap:10px 4px}}
@media (min-width:560px){.lbrg{grid-template-columns:repeat(auto-fit,minmax(92px,1fr))}.lbrb{width:92px}}
html[data-theme=dark] .lbb{background:linear-gradient(180deg,#13394a,#0f2430);border-color:#2b5668;color:#e6f4f8}
html[data-theme=dark] .lbsl small{color:#9bbac6}
html[data-theme=dark] .lbst.r{background:#24432f;border-color:#3a6a49}html[data-theme=dark] .lbst.s{background:#3d2f48;border-color:#5d4a6c}
@media (prefers-color-scheme:dark){html:not([data-theme=light]) .lbb{background:linear-gradient(180deg,#13394a,#0f2430);border-color:#2b5668;color:#e6f4f8}html:not([data-theme=light]) .lbsl small{color:#9bbac6}html:not([data-theme=light]) .lbst.r{background:#24432f;border-color:#3a6a49}html:not([data-theme=light]) .lbst.s{background:#3d2f48;border-color:#5d4a6c}}
@media (prefers-reduced-motion:reduce){.lbdr.go,.lbt i.bb,.fl i,.tw.shake,.lbdp.sq .bulb{animation:none}.lbt .f,.tw{transition:none}}`;
 document.head.appendChild(st);
}

/* ---------- بيانات السكشن الأول: الكربونات والبيكربونات (من ملخص الكشف عن الكربونات) ---------- */
const RG1=[
 [1,"حمض HCl المخفف","HCl","#f2e87a","أساسية"],
 [2,"كلوريد الباريوم","BaCl₂","#cfe8f1","تأكيدية"],
 [3,"نترات الفضة","AgNO₃","#cfe8f1","تأكيدية"],
 [4,"كبريتات الماغنسيوم (بارد)","MgSO₄","#cfe8f1","تأكيدية ⭐ أهم تجربة للتمييز"],
 [5,"كلوريد الزئبقيك","HgCl₂","#cfe8f1","تأكيدية"],
 [6,"الفينولفثالين","PhPh","#f1ecea","تأكيدية"],
 [7,"كلوريد الكالسيوم","CaCl₂","#cfe8f1","تأكيدية"]
];
const NOPPT={t:"لا يتكوّن راسب على البارد"};
const HEATPPT=(f)=>({t:"بعد الغليان يظهر راسب أبيض",p:"#fff",g:1,e:[f+" (بالقياس)"]});
const SALTS1=[
 {n:"كربونات الصوديوم",f:"Na₂CO₃",a:"مسحوق أبيض يذوب في الماء",sol:CLR,c:"صوديوم",an:"كربونات",
  k:["كربونات الصوديوم","Na2CO3","كربونات صوديوم","كربونات"],
  r:{
   1:{t:"فوران فوري مع تصاعد غاز عديم اللون والرائحة يعكّر ماء الجير",g:1,e:["Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑","CO₂ + Ca(OH)₂ → CaCO₃↓ (أبيض) + H₂O","CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂ (يختفي العكر مع زيادة CO₂)"]},
   2:{t:"راسب أبيض يذوب في الأحماض المعدنية (HCl وH₂SO₄ وHNO₃)",p:"#fff",e:["Na₂CO₃ + BaCl₂ → BaCO₃↓ + 2NaCl","أو: Na₂CO₃ + Ba(NO₃)₂ → BaCO₃↓ + 2NaNO₃"]},
   3:{t:"راسب أبيض يذوب في NH₄OH وفي HNO₃ المخفف",p:"#fff",e:["Na₂CO₃ + 2AgNO₃ → Ag₂CO₃↓ (أبيض) + 2NaNO₃"],
      h:{t:"بالغليان يتغيّر لون الراسب إلى البني (أكسيد الفضة)",p:"#7a4a2a",g:1,e:["Ag₂CO₃ —(غليان)→ Ag₂O (بني) + CO₂↑"]}},
   4:{t:"يتكوّن راسب أبيض على البارد (كربونات الماغنسيوم)",p:"#fff",e:["MgSO₄ + Na₂CO₃ → MgCO₃↓ + Na₂SO₄"]},
   5:{t:"راسب بني محمر (كربونات الزئبقيك القاعدية)",p:"#a0452a",e:["4Na₂CO₃ + 4HgCl₂ → 3HgO·HgCO₃↓ (بني محمر) + 8NaCl + 3CO₂"]},
   6:{t:"يتلوّن المحلول باللون الأحمر (دلالة على قلوية المحلول)",l:"#ff4f7a",e:[]},
   7:{t:"راسب أبيض يذوب في الأحماض المخففة مع فوران",p:"#fff",e:["Na₂CO₃ + CaCl₂ → CaCO₃↓ + 2NaCl"]}},
  why:"فوران مع HCl (كربونات أو بيكربونات)، ثم راسب أبيض مع MgSO₄ على البارد، فالأنيون كربونات وليس بيكربونات."},
 {n:"بيكربونات الصوديوم",f:"NaHCO₃",a:"مسحوق أبيض يذوب في الماء",sol:CLR,c:"صوديوم",an:"بيكربونات",
  k:["بيكربونات الصوديوم","NaHCO3","بيكربونات صوديوم","بيكربونات","كربونات الصوديوم الهيدروجينية","كربونات الصوديوم الحامضية"],
  r:{
   1:{t:"فوران وتصاعد غاز عديم اللون والرائحة يعكّر ماء الجير (نفس نتيجة الكربونات)",g:1,e:["NaHCO₃ + HCl → NaCl + H₂O + CO₂↑ (بالقياس)","CO₂ + Ca(OH)₂ → CaCO₃↓ (أبيض) + H₂O"]},
   2:{...NOPPT,h:HEATPPT("Ba(HCO₃)₂ —(غليان)→ BaCO₃↓ + H₂O + CO₂↑")},
   3:{...NOPPT},
   4:{t:"لا يتكوّن راسب على البارد (يبقى المحلول رائقًا)",h:{t:"بعد الغليان يظهر راسب أبيض",p:"#fff",g:1,e:["Mg(HCO₃)₂ —(غليان)→ MgCO₃↓ + H₂O + CO₂↑ (بالقياس)"]}},
   5:{t:"لا يحدث شيء"},
   6:{t:"لا يتلوّن بالأحمر الواضح (قلوية ضعيفة جدًا)"},
   7:{...NOPPT,h:HEATPPT("Ca(HCO₃)₂ —(غليان)→ CaCO₃↓ + H₂O + CO₂↑")}},
  why:"فوران مع HCl لكن لا راسب مع MgSO₄ على البارد (يظهر بعد الغليان)، فالأنيون بيكربونات وليس كربونات."}
];

/* ---------- بيانات السكشن الثاني: الكلوريد والبروميد (مجموعة H₂SO₄ المركز) ---------- */
const RG3=[
 [1,"H₂SO₄ المركز","ملح صلب","#f3e9b5","أساسية"],
 [2,"نترات الفضة","AgNO₃","#cfe8f1","تأكيدية"],
 [3,"AgNO₃ ثم NH₄OH","نشادر","#cfe8f1","تأكيدية"],
 [4,"MnO₂ + H₂SO₄ مركز","","#d9d0c0","تأكيدية"],
 [5,"أسيتات الرصاص","(CH₃COO)₂Pb","#cfe8f1","تأكيدية"],
 [6,"ماء الكلور + CHCl₃","Cl₂","#e6f0c8","تأكيدية"]
];
const PBHEAT={t:"يذوب الراسب بالغليان (ويعود يترسب بالتبريد)",x:1,e:[]};
const SALTS3=[
 {n:"كلوريد الصوديوم",f:"NaCl",a:"بلورات بيضاء تذوب في الماء",sol:CLR,c:"صوديوم",an:"كلوريد",
  k:["كلوريد الصوديوم","NaCl","ملح الطعام","كلوريد صوديوم","كلوريد"],
  r:{
   1:{t:"يتصاعد غاز عديم اللون نفّاذ الرائحة، وتتكوّن سحب بيضاء مع ساق مبللة بـ NH₄OH",g:1,e:["NaCl + H₂SO₄ → NaHSO₄ + HCl↑"],h:{t:"يزداد تصاعد الغاز النفّاذ",g:1,e:[]}},
   2:{t:"راسب أبيض يتحوّل إلى البنفسجي بالضوء ولا يذوب في HNO₃ المخفف",p:"#fff",e:["NaCl + AgNO₃ → NaNO₃ + AgCl↓ (أبيض)"]},
   3:{t:"يتكوّن راسب أبيض ثم يذوب بإضافة NH₄OH (ويترسب من جديد بإضافة HNO₃ المخفف)",p:"#fff",d:CLR,e:["NaCl + AgNO₃ → NaNO₃ + AgCl↓","AgCl + 2NH₄OH → [Ag(NH₃)₂]Cl + 2H₂O"]},
   4:{t:"يتصاعد غاز أخضر مصفر نفّاذ الرائحة يُزيل لون ورقة عباد الشمس المبللة",g:1,bc:"#c9e04a",e:["2NaCl + MnO₂ + 3H₂SO₄ → 2NaHSO₄ + MnSO₄ + Cl₂↑ + 2H₂O (بالقياس)"]},
   5:{t:"راسب أبيض يذوب بالغليان",p:"#fff",e:["2NaCl + (CH₃COO)₂Pb → PbCl₂↓ + 2CH₃COONa"],h:PBHEAT},
   6:{t:"لا يتغيّر لون المحلول ولا تتلوّن طبقة الكلوروفورم"}},
  why:"غاز نفّاذ عديم اللون مع H₂SO₄ المركز، وراسب أبيض مع AgNO₃ يذوب في NH₄OH، ولا تتلوّن طبقة الكلوروفورم بماء الكلور: كلوريد."},
 {n:"بروميد البوتاسيوم",f:"KBr",a:"بلورات بيضاء تذوب في الماء",sol:CLR,c:"بوتاسيوم",an:"بروميد",
  k:["بروميد البوتاسيوم","KBr","بروميد بوتاسيوم","بروميد"],
  r:{
   1:{t:"يتلوّن المحلول بالأحمر ويتصاعد بخار بني محمر مختلط ببخار HBr",l:"#f4a6a0",g:1,bc:"#b5531f",e:["KBr + H₂SO₄ → KHSO₄ + HBr","2HBr + H₂SO₄ → Br₂↑ + SO₂ + 2H₂O"],h:{t:"تزداد الأبخرة البنية المحمرة",g:1,bc:"#b5531f",e:[]}},
   2:{t:"راسب أصفر باهت يسودّ في ضوء الشمس ولا يذوب في HNO₃ المخفف",p:"#f5e6a0",e:["KBr + AgNO₃ → KNO₃ + AgBr↓ (أصفر باهت)"]},
   3:{t:"راسب أصفر باهت شحيح الذوبان في NH₄OH المخفف (يذوب في المركز)",p:"#f5e6a0",e:["AgBr + 2NH₄OH (مركزة) → [Ag(NH₃)₂]Br + 2H₂O"]},
   4:{t:"أبخرة بنية محمرة أكثر كثافة تُزيل لون ورقة عباد الشمس المبللة",l:"#f4a6a0",g:1,bc:"#b5531f",e:["2KBr + MnO₂ + 3H₂SO₄ → Br₂↑ + 2KHSO₄ + MnSO₄ + 2H₂O"]},
   5:{t:"راسب أبيض يذوب بالغليان ويعود يترسب بالتبريد",p:"#fff",e:["2KBr + (CH₃COO)₂Pb → PbBr₂↓ + 2CH₃COOK"],h:PBHEAT},
   6:{t:"يتلوّن المحلول بالأحمر البرتقالي وتتلوّن طبقة الكلوروفورم السفلية بالأحمر",l:"#f2a257",p:"#d62828",e:["2KBr + Cl₂ → 2KCl + Br₂"]}},
  why:"بخار بني محمر مع H₂SO₄ المركز، وراسب أصفر باهت مع AgNO₃، وطبقة كلوروفورم حمراء مع ماء الكلور: بروميد."}
];

/* ---------- بيانات السكشن الثالث: كاتيونات Pb²⁺ وCu²⁺ وFe²⁺ وFe³⁺ (من ملخص معادلات السبورة) ----------
 المعادلات الموسومة «(خارج الملخص)» غير مذكورة في الملف وكُتبت من الكيمياء العامة، فراجعها مع المدرّس */
const RG4=[
 [1,"HCl المخفف","","#f2e87a"],
 [2,"يوديد البوتاسيوم KI","","#cfe8f1"],
 [3,"NaOH (نقطة نقطة ثم زيادة)","","#cfe8f1"],
 [4,"كرومات البوتاسيوم","K₂CrO₄","#f4d95a"],
 [5,"NH₄Cl + NH₄OH","","#cfe8f1"]
];
const X=" (خارج الملخص)";
const SALTS4=[
 {n:"أسيتات الرصاص",f:"(CH₃COO)₂Pb",a:"بلورات عديمة اللون تذوب في الماء",sol:CLR,c:"رصاص",an:"اسيتات",
  k:["أسيتات الرصاص","خلات الرصاص","Pb(CH3COO)2","Pb(OAc)2","رصاص","كاتيون الرصاص","Pb2+","Pb²⁺","أسيتات الرصاص II","أسيتات الرصاص الثنائي"],
  r:{
   1:{t:"راسب أبيض على البارد يذوب في الماء الساخن",p:"#fff",e:["(CH₃COO)₂Pb + 2HCl → PbCl₂↓ + 2CH₃COOH"],h:{t:"يذوب الراسب في الماء الساخن",x:1,e:[]}},
   2:{t:"راسب أصفر يذوب في الماء المغلي ويظهر ثانية رقائق صفراء بالتبريد، ويذوب أيضًا في زيادة KI",p:"#f2d12e",e:["(CH₃COO)₂Pb + 2KI → PbI₂↓ + 2CH₃COOK","PbI₂ + 2KI → K₂[PbI₄] (يذوب بالزيادة)"],h:{t:"يذوب الراسب بالماء المغلي ويعود رقائق صفراء بالتبريد",x:1,e:[]}},
   3:{t:"راسب أبيض يذوب في زيادة NaOH",p:"#fff",d:CLR,e:["(CH₃COO)₂Pb + 2NaOH → Pb(OH)₂↓ + 2CH₃COONa","Pb(OH)₂ + 2NaOH → Na₂PbO₂ + 2H₂O (يذوب بالزيادة)"]},
   4:{t:"راسب أصفر لا يذوب في حمض الخليك (يذوب في HNO₃ المخفف وفي NaOH)",p:"#f4c20d",e:["(CH₃COO)₂Pb + K₂CrO₄ → PbCrO₄↓ + 2CH₃COOK"]},
   5:{t:"راسب أبيض لا يذوب في الزيادة",p:"#fff",e:["(CH₃COO)₂Pb + 2NH₄OH → Pb(OH)₂↓ + 2CH₃COONH₄"+X]}},
  why:"راسب أبيض مع HCl يذوب بالتسخين، وأصفر مع KI وK₂CrO₄، وأبيض مع NaOH يذوب بالزيادة: كاتيون الرصاص Pb²⁺."},
 {n:"كبريتات النحاس",f:"CuSO₄",a:"بلورات زرقاء تذوب في الماء",sol:"#5aa0e8",c:"نحاس",an:"كبريتات",
  k:["كبريتات النحاس","كبريتات النحاسيك","CuSO4","نحاس","نحاسيك","كاتيون النحاس","Cu2+","Cu²⁺","كبريتات النحاس II","كبريتات النحاس الثنائية"],
  r:{
   1:{t:"لا يحدث تغيّر ظاهر"},
   2:{t:"راسب أبيض مع تلوّن المحلول بالبني (يتحرر اليود)",p:"#fff",l:"#a9702f",e:["2CuSO₄ + 4KI → 2CuI↓ + I₂ + 2K₂SO₄"+X]},
   3:{t:"راسب أزرق يتحوّل إلى الأسود بالغليان (أكسيد النحاس)",p:"#6fb4f0",e:["CuSO₄ + 2NaOH → Cu(OH)₂↓ (أزرق) + Na₂SO₄","Cu(OH)₂ —(غلي)→ CuO (أسود) + H₂O"],h:{t:"يتحوّل الراسب الأزرق إلى الأسود بالغليان",p:"#1a1a1a",e:["Cu(OH)₂ —(غلي)→ CuO (أسود) + H₂O"]}},
   4:{t:"لا يتكوّن راسب أصفر مميّز (يصير لون المحلول بنيًّا مصفرًّا)",l:"#b58a2f"},
   5:{t:"راسب أزرق باهت يذوب في زيادة النشادر مكوّنًا محلولًا أزرق غامقًا",p:"#6fb4f0",d:"#1c3fa0",e:["CuSO₄ + 2NH₄OH → Cu(OH)₂↓ + (NH₄)₂SO₄"+X,"Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄](OH)₂"+X]}},
  why:"اللون الأزرق، وراسب أزرق مع NaOH يسودّ بالغليان (CuO)، ولا يعطي راسبًا أصفر مع K₂CrO₄: كاتيون النحاس Cu²⁺."},
 {n:"كبريتات الحديدوز",f:"FeSO₄",a:"بلورات خضراء باهتة تذوب في الماء",sol:"#bfe3b4",c:"حديدوز",an:"كبريتات",
  k:["كبريتات الحديدوز","FeSO4","كبريتات الحديد II","كبريتات الحديد الثنائي","كبريتات الحديد 2","حديدوز","كاتيون الحديدوز","Fe2+","Fe²⁺","Fe(II)","Fe II","حديد II","الحديد الثنائي","كبريتات حديدوز"],
  r:{
   1:{t:"لا يحدث تغيّر ظاهر"},
   2:{t:"لا يحدث تغيّر ظاهر"},
   3:{t:"راسب أخضر لا يذوب في زيادة NaOH",p:"#7fb069",e:["FeSO₄ + 2NaOH → Fe(OH)₂↓ (أخضر) + Na₂SO₄"]},
   4:{t:"لا يتكوّن راسب أصفر مميّز (يصير لون المحلول بنيًّا مصفرًّا)",l:"#b58a2f"},
   5:{t:"راسب أخضر يتغيّر في الهواء إلى البني (يتأكسد إلى هيدروكسيد الحديديك)",p:"#7fb069",m:"#8a4b2a",e:["FeSO₄ + 2NH₄OH → Fe(OH)₂↓ (أخضر) + (NH₄)₂SO₄","4Fe(OH)₂ + 2H₂O + O₂ → 4Fe(OH)₃↓ (بني)"]}},
  why:"لون الملح أخضر باهت، وراسب أخضر مع NaOH وNH₄OH يبني في الهواء: كاتيون الحديدوز Fe²⁺."},
 {n:"كلوريد الحديديك",f:"FeCl₃",a:"مادة صفراء مائلة للبني تذوب في الماء",sol:"#e0b83a",c:"حديديك",an:"كلوريد",
  k:["كلوريد الحديديك","FeCl3","كلوريد الحديد III","كلوريد الحديد الثلاثي","كلوريد الحديد 3","حديديك","كاتيون الحديديك","Fe3+","Fe³⁺","Fe(III)","Fe III","حديد III","الحديد الثلاثي","كلوريد حديديك"],
  r:{
   1:{t:"لا يحدث تغيّر ظاهر"},
   2:{t:"يتلوّن المحلول بالبني (يتحرر اليود)",l:"#a9702f",e:["2FeCl₃ + 2KI → 2FeCl₂ + I₂ + 2KCl"+X]},
   3:{t:"راسب بني محمر لا يذوب في زيادة NaOH",p:"#9a3b1e",e:["FeCl₃ + 3NaOH → Fe(OH)₃↓ (بني محمر) + 3NaCl"]},
   4:{t:"لا يتكوّن راسب أصفر مميّز (يصير لون المحلول بنيًّا مصفرًّا)",l:"#b58a2f"},
   5:{t:"راسب بني محمر جيلاتيني يذوب في الأحماض المعدنية",p:"#9a3b1e",e:["FeCl₃ + 3NH₄OH → Fe(OH)₃↓ (بني محمر) + 3NH₄Cl"]}},
  why:"لون الملح أصفر مائل للبني، وراسب بني محمر مع NaOH وNH₄OH لا يذوب بالزيادة: كاتيون الحديديك Fe³⁺."}
];

/* ---------- بيانات السكشن الرابع: Mn²⁺ وCa²⁺ وBa²⁺ + اختبار اللهب (Na⁺ وK⁺ وBa²⁺) ----------
 ما لم يُذكر في الملخص (مثل لهب الكالسيوم، وسلوك بعض الكواشف مع الكاتيونات الأخرى) كُتب من الكيمياء العامة، فراجعه مع المدرّس */
const RG5=[
 [1,"NaOH","","#cfe8f1"],
 [2,"NH₄OH","","#cfe8f1"],
 [3,"كرومات البوتاسيوم","K₂CrO₄","#f4d95a"],
 [4,"K₂CrO₄ + حمض الخليك","","#f4d95a"],
 [5,"اختبار اللهب 🔥","سلك بلاتين","#e8e4d8"]
];
const NOP={t:"لا يتكوّن راسب"};
const NOY={t:"لا يتكوّن راسب أصفر"};
const SALTS5=[
 {n:"كبريتات المنجنيز",f:"MnSO₄",a:"بلورات وردية باهتة (أرجواني باهت) تذوب في الماء",sol:"#f3dce6",c:"منجنيز",an:"كبريتات",
  k:["كبريتات المنجنيز","MnSO4","منجنيز","كاتيون المنجنيز","Mn2+","Mn²⁺","كبريتات المنجنيز II","منغنيز","كبريتات المنغنيز"],
  r:{
   1:{t:"راسب أبيض لا يذوب في زيادة NaOH ويتحوّل بسرعة إلى البني في الهواء",p:"#fff",m:"#7a4a2a",e:["MnSO₄ + 2NaOH → Mn(OH)₂↓ (أبيض) + Na₂SO₄","2Mn(OH)₂ + ½O₂ → Mn₂O₃↓ (بني) + 2H₂O"]},
   2:{t:"راسب أبيض لا يذوب في زيادة NH₄OH (ويذوب في أملاح الأمونيوم) ويتحوّل إلى البني في الهواء",p:"#fff",m:"#7a4a2a",e:["MnSO₄ + 2NH₄OH → Mn(OH)₂↓ (أبيض) + (NH₄)₂SO₄","2Mn(OH)₂ + ½O₂ → 2MnOOH↓ (بني) + H₂O"]},
   3:{...NOY},4:{...NOY},
   5:{t:"لا يعطي لونًا مميّزًا للهب",fc:""}},
  why:"راسب أبيض مع NaOH وNH₄OH يتحوّل إلى البني في الهواء ولا يذوب بالزيادة: كاتيون المنجنيز Mn²⁺."},
 {n:"كلوريد الكالسيوم",f:"CaCl₂",a:"بلورات بيضاء تذوب في الماء",sol:CLR,c:"كالسيوم",an:"كلوريد",
  k:["كلوريد الكالسيوم","CaCl2","كالسيوم","كاتيون الكالسيوم","Ca2+","Ca²⁺","كلوريد كالسيوم"],
  r:{
   1:{...NOP},2:{...NOP},
   3:{t:"راسب أصفر (مع محلول الملح المركز)",p:"#f4c20d",e:["CaCl₂ + K₂CrO₄ → CaCrO₄↓ (أصفر) + 2KCl"]},
   4:{t:"راسب أصفر يذوب في حمض الخليك",p:"#f4c20d",d:CLR,e:["CaCl₂ + K₂CrO₄ → CaCrO₄↓ (أصفر) + 2KCl"]},
   5:{t:"لهب أحمر قرميدي",fc:"#ff5a2e",e:[]}},
  why:"راسب أصفر مع K₂CrO₄ (محلول مركز) يذوب في حمض الخليك: كاتيون الكالسيوم Ca²⁺ (وليس الباريوم)."},
 {n:"كلوريد الباريوم",f:"BaCl₂",a:"بلورات بيضاء تذوب في الماء",sol:CLR,c:"باريوم",an:"كلوريد",
  k:["كلوريد الباريوم","BaCl2","باريوم","كاتيون الباريوم","Ba2+","Ba²⁺","كلوريد باريوم"],
  r:{
   1:{...NOP},2:{...NOP},
   3:{t:"راسب أصفر يذوب في الأحماض المعدنية المخففة",p:"#f4c20d",e:["BaCl₂ + K₂CrO₄ → BaCrO₄↓ (أصفر) + 2KCl"]},
   4:{t:"راسب أصفر لا يذوب في حمض الخليك",p:"#f4c20d",e:["BaCl₂ + K₂CrO₄ → BaCrO₄↓ (أصفر) + 2KCl"]},
   5:{t:"لهب أخضر تفاحي",fc:"#7be37b",e:[]}},
  why:"راسب أصفر مع K₂CrO₄ لا يذوب في حمض الخليك، ولهب أخضر تفاحي: كاتيون الباريوم Ba²⁺."},
 {n:"كلوريد الصوديوم",f:"NaCl",a:"بلورات بيضاء تذوب في الماء",sol:CLR,c:"صوديوم",an:"كلوريد",
  k:["كلوريد الصوديوم","NaCl","ملح الطعام","صوديوم","كاتيون الصوديوم","Na+","Na⁺","كلوريد صوديوم"],
  r:{1:{...NOP},2:{...NOP},3:{...NOY},4:{...NOY},5:{t:"لهب أصفر ذهبي",fc:"#ffd23a",e:[]}},
  why:"لا يعطي راسبًا مع الكواشف، ويعطي لهبًا أصفر ذهبيًّا: كاتيون الصوديوم Na⁺."},
 {n:"كلوريد البوتاسيوم",f:"KCl",a:"بلورات بيضاء تذوب في الماء",sol:CLR,c:"بوتاسيوم",an:"كلوريد",
  k:["كلوريد البوتاسيوم","KCl","بوتاسيوم","كاتيون البوتاسيوم","K+","K⁺","كلوريد بوتاسيوم"],
  r:{1:{...NOP},2:{...NOP},3:{...NOY},4:{...NOY},5:{t:"لهب بنفسجي",fc:"#b36bff",e:[]}},
  why:"لا يعطي راسبًا مع الكواشف، ويعطي لهبًا بنفسجيًّا: كاتيون البوتاسيوم K⁺."}
];
const CONV=r=>Array.isArray(r)?{t:r[0],p:r[1],l:r[2],g:r[3],d:r[4],s:r[5]}:r;
const SEC={
 1:{ic:"⚗️",title:"السكشن الأول: الكربونات والبيكربونات",short:"السكشن الأول",desc:"تجربة أساسية (HCl) وتجارب تأكيدية بمعادلاتها، مع التسخين للتمييز بين الكربونات والبيكربونات.",RG:RG1,SALTS:SALTS1,key:"_1",eq:1,star:1,
    intro:"أمامك أنبوبتان: ملح أ وملح ب، وفي كل منهما ملح مجهول. ابدأ بالتجربة الأساسية ★ (HCl) ثم أكّد بالتجارب التأكيدية، وقارن بين الأنبوبتين. سخّن عند الحاجة، وأفرغ الأنبوبتين قبل كاشف جديد. دوّن ملاحظاتك في المفكرة، والمعادلات والتفسير يظهران بعد تسليم الإجابة.",ph:"مثال: كربونات الصوديوم"},
 2:{ic:"🧂",title:"السكشن الثاني: الكلوريد والبروميد",short:"السكشن الثاني",desc:"مجموعة H₂SO₄ المركز: تجربة أساسية وتجارب تأكيدية (AgNO₃ وMnO₂ وأسيتات الرصاص وماء الكلور) للتمييز بين الكلوريد والبروميد.",RG:RG3,SALTS:SALTS3,key:"_2",eq:1,star:1,
    intro:"أمامك أنبوبتان: ملح أ وملح ب، وفي كل منهما ملح مجهول. ابدأ بالتجربة الأساسية ★ (H₂SO₄ المركز على الملح الصلب) ثم أكّد بالتجارب التأكيدية، وقارن بين الأنبوبتين. أفرغ الأنبوبتين قبل كاشف جديد. دوّن ملاحظاتك في المفكرة، والمعادلات والتفسير يظهران بعد تسليم الإجابة.",ph:"مثال: كلوريد الصوديوم"},
 3:{ic:"🔬",title:"السكشن الثالث: كاتيونات الرصاص والنحاس والحديد",short:"السكشن الثالث",desc:"الرصاص Pb²⁺ والنحاس Cu²⁺ والحديدوز Fe²⁺ والحديديك Fe³⁺: كواشف HCl وKI وNaOH وK₂CrO₄ وNH₄Cl + NH₄OH، مع التسخين ومعادلات السبورة.",RG:RG4,SALTS:SALTS4,key:"_3",eq:1,
    intro:"أمامك أنبوبتان: ملح أ وملح ب، وفي كل منهما ملح مجهول فيه أحد الكاتيونات (الرصاص أو النحاس أو الحديدوز أو الحديديك). انتبه للون الملح واللون والذوبان في الراسب، وقارن بين الأنبوبتين. أفرغ الأنبوبتين قبل كاشف جديد. دوّن ملاحظاتك في المفكرة، والمعادلات والتفسير يظهران بعد تسليم الإجابة.",ph:"اسم الملح أو الكاتيون، مثال: النحاس"},
 4:{ic:"🔥",title:"السكشن الرابع: المنجنيز والكالسيوم والباريوم + اختبار اللهب",short:"السكشن الرابع",desc:"Mn²⁺ وCa²⁺ وBa²⁺ بكواشف NaOH وNH₄OH وK₂CrO₄، مع اختبار اللهب للصوديوم والبوتاسيوم والباريوم.",RG:RG5,SALTS:SALTS5,key:"_4",eq:1,
    intro:"أمامك أنبوبتان: ملح أ وملح ب، وفي كل منهما ملح مجهول فيه أحد الكاتيونات (المنجنيز أو الكالسيوم أو الباريوم أو الصوديوم أو البوتاسيوم). جرّب الكواشف، واستعن باختبار اللهب 🔥 للتمييز بينها. أفرغ الأنبوبتين قبل كاشف جديد. دوّن ملاحظاتك في المفكرة، والمعادلات والتفسير يظهران بعد تسليم الإجابة.",ph:"اسم الملح أو الكاتيون، مثال: الباريوم"},
 5:{ic:"🧫",title:"السكشن الخامس (إضافي): كشف أملاح عامة",short:"السكشن الخامس",short:"السكشن الثالث",desc:"ملحان مجهولان من بنك أملاح متنوع (كلوريدات وكبريتات وأملاح الحديد والنحاس…) بستة كواشف.",RG:RG2,SALTS:SALTS2,key:"",
    intro:"أمامك أنبوبتان: ملح أ وملح ب، وفي كل منهما ملح مجهول مختلف. جرّب الكواشف واحدًا بعد الآخر (أفرغ الأنبوبتين بين كل تجربة)، دوّن ملاحظاتك في المفكرة، ثم اكتب اسم كل ملح. سجل الملاحظات والمعادلات يظهر بعد تسليم الإجابة.",ph:"مثال: كلوريد الصوديوم"}
};
const loadS=sec=>{try{return Object.assign({n:0,ok:0},JSON.parse(localStorage.getItem(SK()+SEC[sec].key)||"{}"))}catch(e){return{n:0,ok:0}}};
const saveS=(sec,o)=>{try{localStorage.setItem(SK()+SEC[sec].key,JSON.stringify(o))}catch(e){}};

const HK=()=>"agri_labh_"+((typeof UID!=="undefined"&&UID)||"guest");
const getH=()=>{try{return JSON.parse(localStorage.getItem(HK())||"[]")}catch(e){return[]}};
function addH(rec){try{const h=getH();h.push(rec);localStorage.setItem(HK(),JSON.stringify(h.slice(-100)))}catch(e){}
 try{if(typeof cloudAttempt==="function"){window.__bonus=0;cloudAttempt("الكيمياء","🧪 معمل – "+SEC[rec.s].title,rec.ok,2)}}catch(e){}}
function histPage(){
 css();const h=getH().slice().reverse(),tot=h.reduce((a,x)=>a+x.ok,0),n=h.length*2;
 page(`<div class="lb"><h2>📊 نتائجي المحفوظة</h2>
  <p class="lbp">${h.length?`عدد المحاولات: ${AR(h.length)} • مجموع الدرجات: ${AR(tot)} من ${AR(n)} (${AR(Math.round(tot/n*100))}٪)`:"لم تحفظ أي نتيجة بعد. تُحفظ نتيجتك تلقائيًا عند الضغط على «الإجابة»."}</p>
  ${h.map(x=>`<div class="lblg"><b>${E(SEC[x.s]?SEC[x.s].short:"")}</b> — <b style="color:${x.ok===2?"#16a34a":x.ok===1?"#d97706":"#b91c1c"}">${AR(x.ok)} من ٢</b><br><span class="em">${E(new Date(x.t).toLocaleString("ar-EG",{dateStyle:"medium",timeStyle:"short"}))} • ${E((x.a||[]).join(" + "))} • تجارب: ${AR(x.k||0)}</span></div>`).join("")}
  </div>`,openLab);
 window.scrollTo(0,0);
}
/* ---------- شاشة اختيار السكشن ---------- */
function openLab(){
 css();
 page(`<div class="lb"><h2>🧪 امتحانات في المعمل</h2><p class="lbp">اختر السكشن، وسيعطيك ملحًا مجهولًا لتكشف عنه بالتجارب ثم تكتب اسمه.</p>
  ${[1,2,3,4,5].map(i=>{const S=loadS(i);return `<button class="lbsec" data-s="${i}"><span class="ic">${SEC[i].ic}</span><div><b>${SEC[i].title}</b><span>${SEC[i].desc}<br>نتيجتك: ${AR(S.ok)} من ${AR(S.n)}</span></div></button>`}).join("")}
  <button class="lbsec" id="lbhist"><span class="ic">📊</span><div><b>نتائجي المحفوظة</b><span>سجل محاولاتك ودرجاتك في المعمل</span></div></button></div>`,typeof subjects==="function"?subjects:null);
 document.querySelectorAll(".lbsec").forEach(b=>b.onclick=()=>start(+b.dataset.s));
 const hb=document.getElementById("lbhist");if(hb)hb.onclick=histPage;
 window.scrollTo(0,0);
}

/* ---------- صفحة الامتحان: أنبوبتان (ملح أ وملح ب) ---------- */
function start(sec){
 css();
 const C=SEC[sec],RG=C.RG,L=C.SALTS;
 const pick=()=>{let a=L.slice().sort(()=>Math.random()-.5);return sec===1?a.slice(0,2):a.slice(0,2)};
 const salts=pick(),NM=["ملح أ","ملح ب"],S=loadS(sec),log={};
 let done=false,used=false,heated=false,cur=null,curId=0,timer=0,busy=false;
 const reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
 const dropper='<svg class="lbdp" viewBox="0 0 40 90" aria-hidden="true"><ellipse class="bulb" cx="20" cy="12" rx="10" ry="9" fill="#e8742f"/><rect x="14" y="18" width="12" height="34" rx="3" fill="#e9f4f9" stroke="#7fa9b8" stroke-width="2"/><path d="M16 52l4 32 4-32z" fill="#e9f4f9" stroke="#7fa9b8" stroke-width="2"/></svg>';
 const tube=i=>`<div class="lbsl"><b>${NM[i]}</b><small>${E(salts[i].a)}</small>
   <div class="lbst s" data-t="${i}">${dropper}<i class="lbdr"></i><div class="tw"><div class="lbt"><div class="f liq"></div><div class="f sld"></div><div class="f cl"></div><div class="f ppt"></div></div></div><div class="fl"><i></i></div></div></div>`;
 const html=`<div class="lb">
  <h2>${C.ic} ${E(C.title)}</h2>
  <p class="lbp">${E(C.intro)}</p>
  <div class="lbb"><div class="lbtubes">
   <div class="lbsl"><b>الكاشف</b><small id="lbrl">اختر كاشفًا من الأسفل</small>
    <div class="lbst r"><div class="tw"><div class="lbt"><div class="f liq" id="lbrq" style="height:70%;background:#cfe8f1"></div></div></div></div></div>
   ${tube(0)}${tube(1)}
  </div></div>
  ${C.star?'<p class="lbleg">★ التجربة الأساسية • باقي الكواشف تأكيدية • الكاشف يُضاف إلى الأنبوبتين معًا</p>':'<p class="lbleg">الكاشف يُضاف إلى الأنبوبتين معًا لتقارن بينهما</p>'}
  <div class="lbrg" id="lbrg">${RG.map(r=>`<button class="lbrb" data-i="${r[0]}" aria-pressed="false"><span class="nu">${r[0]}</span><span class="nm">كاشف ${AR(r[0])}${r[4]==="أساسية"?" ★":""}</span><span class="fm">${r[1]}</span></button>`).join("")}</div>
  <div class="lbact"><button id="lbht" type="button" disabled>🔥 تسخين</button><button id="lbem" type="button" disabled>🗑️ إفراغ الأنبوبتين</button></div>
  <div class="lbmsg" id="lbmsg" aria-live="polite"></div>
  <textarea class="lbin lbnote" id="lbnote" rows="3" placeholder="📝 مفكرتك: دوّن ملاحظاتك أثناء التجارب (لا تُصحَّح)"></textarea>
  <div class="lbans2">${[0,1].map(i=>`<label>${NM[i]}<input class="lbin" id="lbin${i}" placeholder="${E(C.ph)}" autocomplete="off"></label>`).join("")}</div>
  <button class="bt" id="lbok" type="button" style="margin:0">✅ الإجابة</button>
  <div id="lbfb" aria-live="polite"></div><div class="lblg" id="lblg" hidden></div><div class="lbrv" id="lbrv"></div>
  <div class="lbft"><span>نتيجتك المحفوظة في هذا السكشن: ${AR(S.ok)} من ${AR(S.n)}</span><button class="bt alt" id="lbnx" type="button" style="margin:0">التالي ⬅</button></div>
 </div>`;
 page(html,openLab);
 const $=id=>document.getElementById(id),msg=$("lbmsg"),rbs=()=>document.querySelectorAll(".lbrb");
 const T=[0,1].map(i=>{const st=document.querySelector('.lbst[data-t="'+i+'"]');
  return{salt:salts[i],st,tw:st.querySelector(".tw"),q:st.querySelector(".liq"),sd:st.querySelector(".sld"),cl:st.querySelector(".cl"),pp:st.querySelector(".ppt"),dp:st.querySelector(".lbdp"),dr:st.querySelector(".lbdr"),fl:st.querySelector(".fl")}});
 const reset=t=>{t.q.style.height="58%";t.q.style.background=t.salt.sol;t.sd.style.height=t.salt.solid?"26%":"0";t.pp.style.height="0";t.pp.style.opacity="0";t.tw.classList.remove("pour","shake");t.st.querySelectorAll(".bb").forEach(b=>b.remove())};
 T.forEach(reset);
 function bubbles(t,n,fast,col){const h=t.tw.clientHeight;for(let k=0;k<n;k++){const b=document.createElement("i"),z=3+Math.random()*4;b.className="bb";if(col){b.style.background=col;b.style.borderColor=col}
  b.style.cssText=`left:${14+Math.random()*58}%;width:${z}px;height:${z}px;--sx:${(Math.random()*10-5).toFixed(1)}px;--rise:${-(h*.78).toFixed(0)}px;animation-duration:${(fast?.7:1)+Math.random()*.7}s;animation-delay:${(Math.random()*(fast?1.2:1.6)).toFixed(2)}s`;
  t.tw.querySelector(".lbt").appendChild(b);setTimeout(()=>b.remove(),3600)}}
 function show(r,t){
  if(r.l)t.q.style.background=r.l;
  if(r.p){t.pp.style.background=r.p;t.pp.style.transition="height 2.2s ease-out,opacity .4s";t.pp.style.height="30%";t.pp.style.opacity="1";
   if(!reduce){t.cl.style.background=r.p;t.cl.animate([{opacity:0},{opacity:.85,offset:.22},{opacity:.35,offset:.6},{opacity:0}],{duration:2300,easing:"ease-out"})}}
  if(r.g)bubbles(t,r.g===1?26:r.g,false,r.bc);
  if(r.m)setTimeout(()=>{t.pp.style.background=r.m},1800);
  if(r.x){t.pp.style.transition="height 1.2s ease,opacity .9s";t.pp.style.opacity="0";t.pp.style.height="0"}
  if(r.s)t.sd.style.height="0";
  if(r.d)setTimeout(()=>{t.pp.style.opacity="0";t.q.style.background=r.d},1500);
 }
 const eqs=a=>(a||[]).map(x=>`<code class="lbeq">${E(x)}</code>`).join("");
 function renderLog(){
  if(!done)return;
  const ks=Object.keys(log).sort((a,b)=>a-b);
  $("lblg").hidden=false;
  $("lblg").innerHTML="<h4>📋 سجل ملاحظاتك ومعادلاتها</h4><ul>"+ks.map(k=>{const g=RG[k-1],o=log[k];
   const tag=g[4]?`<span class="lbtag${g[4]==="أساسية"?"":" m"}">${E(g[4]==="أساسية"?"تجربة أساسية":g[4].replace("تأكيدية","تجربة تأكيدية"))}</span>`:"";
   return `<li><b>كاشف ${AR(k)} (${E(g[1])})</b>${tag}${[0,1].map(i=>{const x=o[i];if(!x)return"";
    return `<div class="lbo"><b>${NM[i]}:</b> ${E(x.t)}${eqs(x.e)}${x.h?`<div>🔥 <b>بالتسخين:</b> ${E(x.h.t)}${eqs(x.h.e)}</div>`:""}</div>`}).join("")}</li>`}).join("")+"</ul>";
 }
 const dis=(a,b)=>{$("lbht").disabled=a;$("lbem").disabled=b};
 function flameTest(btn,id,rg){
  busy=true;log[id]={};msg.textContent="اختبار اللهب: الملح على سلك بلاتين (مغموس في HCl) في المنطقة غير المضيئة من لهب بنزن.";
  rbs().forEach(b=>{b.setAttribute("aria-pressed",b===btn?"true":"false");b.disabled=true});
  $("lbrl").textContent="كاشف "+AR(id)+": "+rg[1];
  T.forEach((t,i)=>{const r=CONV(t.salt.r[id]);log[id][i]={t:r.t,e:r.e||[]};
   t.fl.querySelector("i").style.background=r.fc?`radial-gradient(circle at 50% 78%,#fff,${r.fc} 48%,${r.fc})`:"";t.fl.classList.add("on")});
  setTimeout(()=>{T.forEach(t=>{t.fl.classList.remove("on");t.fl.querySelector("i").style.background=""});
   rbs().forEach(b=>{b.setAttribute("aria-pressed","false");b.disabled=false});busy=false;msg.textContent="";$("lbrl").textContent="اختر كاشفًا من الأسفل"},3200);
 }
 function run(btn){
  if(done||busy)return;
  if(used){msg.textContent="أفرغ الأنبوبتين أولًا (زر 🗑️) ثم جرّب كاشفًا جديدًا.";return}
  const id=+btn.dataset.i,rg=RG[id-1];
  if(CONV(T[0].salt.r[id]).fc!==undefined){flameTest(btn,id,rg);return}
  used=true;busy=true;heated=false;curId=id;msg.textContent="";
  cur=T.map(t=>CONV(t.salt.r[id]));log[id]={};
  rbs().forEach(b=>{b.setAttribute("aria-pressed",b===btn?"true":"false");b.disabled=true});
  $("lbrl").textContent="كاشف "+AR(id)+": "+rg[1];$("lbrq").style.background=rg[3];
  T.forEach((t,i)=>{reset(t);t.dp.querySelector(".bulb");t.dp.classList.remove("sq");void t.dp.getBoundingClientRect();t.dp.classList.add("sq");
   setTimeout(()=>{t.dr.classList.remove("go");void t.dr.offsetWidth;t.dr.classList.add("go")},180+i*220)});
  $("lbrq").style.height="58%";
  clearTimeout(timer);
  timer=setTimeout(()=>{T.forEach((t,i)=>{show(cur[i],t);log[id][i]={t:cur[i].t,e:cur[i].e}});renderLog();busy=false;dis(false,false)},1150);
 }
 function heat(){
  if(!used||heated||done||busy)return;heated=true;busy=true;dis(true,true);
  T.forEach(t=>{t.fl.classList.add("on");t.tw.classList.add("shake");bubbles(t,18,true)});
  setTimeout(()=>{T.forEach((t,i)=>{t.tw.classList.remove("shake");const h=cur[i].h||{t:"لا يحدث تغيّر إضافي بالتسخين",e:[]};show(h,t);log[curId][i].h=h});
   renderLog();setTimeout(()=>{T.forEach(t=>t.fl.classList.remove("on"));busy=false;dis(true,false)},700)},1800);
 }
 function empty(){
  if(!used||busy)return;busy=true;clearTimeout(timer);dis(true,true);
  T.forEach(t=>{t.fl.classList.remove("on");t.tw.classList.remove("shake");t.tw.classList.add("pour");t.q.style.height="0";t.sd.style.height="0";t.pp.style.opacity="0"});
  setTimeout(()=>{T.forEach(reset);used=false;heated=false;cur=null;busy=false;
   rbs().forEach(b=>{b.setAttribute("aria-pressed","false");b.disabled=done});
   $("lbrl").textContent="اختر كاشفًا من الأسفل";$("lbrq").style.background="#cfe8f1";$("lbrq").style.height="70%";msg.textContent="تم إفراغ الأنبوبتين، اختر كاشفًا جديدًا."},reduce?50:1100);
 }
 rbs().forEach(b=>b.onclick=()=>run(b));$("lbht").onclick=heat;$("lbem").onclick=empty;
 function check(){
  if(done)return;
  const G=T.map((t,i)=>grade(t.salt,$("lbin"+i).value)),fb=$("lbfb");
  if(G.some(g=>g.empty)){fb.className="lbfb no";fb.textContent="اكتب اسم الملحين (أ و ب) ثم اضغط «الإجابة».";return}
  done=true;const St=loadS(sec),okN=G.filter(g=>g.ok).length;St.n+=2;St.ok+=okN;saveS(sec,St);addH({s:sec,t:Date.now(),ok:okN,a:T.map(t=>t.salt.n),k:Object.keys(log).length});
  rbs().forEach(b=>b.disabled=true);$("lbok").disabled=true;[0,1].forEach(i=>$("lbin"+i).disabled=true);dis(true,true);
  const tried=Object.keys(log).length;
  let h=G.map((g,i)=>{const s=T[i].salt;let x;
   if(g.ok)x=`✅ <b>${NM[i]}:</b> صحيح، هو ${E(s.n)} (${s.f}).`;
   else{const part=[g.an?"الأنيون صحيح":"",g.cat?"الكاتيون صحيح":""].filter(Boolean).join(" و");
    x=`❌ <b>${NM[i]}:</b> غير صحيح${part?" (لكن "+part+")":""}. الصحيح: <b>${E(s.n)}</b> (${s.f}).`}
   return x+`<br><span style="color:var(--mut,#667)">${E(s.why)}</span>`}).join("<hr style='border:0;border-top:1px solid var(--line,#ddd)'>");
  h=`<b>النتيجة: ${AR(okN)} من ٢</b> <span style="color:var(--mut,#667)">💾 تم حفظ النتيجة (على جهازك وفي حسابك إن كنت مسجّلًا)</span><br>`+h;
  if(tried<3)h+=`<br>💡 جرّبت ${AR(tried)} كواشف فقط؛ كلما جرّبت أكثر كان الاستنتاج أدق.`;
  fb.className="lbfb "+(okN===2?"ok":"no");fb.innerHTML=h;
  if(tried)renderLog();else{$("lblg").hidden=false;$("lblg").innerHTML="<h4>📋 سجل الملاحظات</h4><span class=\"em\">لم تجرِ أي تجربة.</span>"}
  if(C.eq){
   $("lbrv").innerHTML=T.map((t,i)=>`<details><summary>📘 معادلات ${NM[i]} (${E(t.salt.n)})</summary><ul>`+RG.map(r=>{const x=CONV(t.salt.r[r[0]]);
    return `<li><b>${E(r[1])}:</b> ${E(x.t)}${eqs(x.e)}${x.h?`<div>🔥 ${E(x.h.t)}${eqs(x.h.e)}</div>`:""}</li>`}).join("")+`</ul></details>`).join("")+'<p class="lbleg">المعادلات المكتوبة «بالقياس» غير منصوص عليها في الملخص، وهي من قاعدة: «البيكربونات تتفاعل مثل الكربونات لكن بالتسخين».</p>';
  }
  fb.scrollIntoView({behavior:"smooth",block:"center"});
 }
 $("lbok").onclick=check;[0,1].forEach(i=>$("lbin"+i).onkeydown=e=>{if(e.key==="Enter")check()});
 $("lbnx").onclick=()=>start(sec);
 window.scrollTo(0,0);
}
window.openLab=openLab;window.__labSalts=SALTS2.concat(SALTS1,SALTS3,SALTS4,SALTS5);
})();
