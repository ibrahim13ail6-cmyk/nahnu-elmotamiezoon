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
 .replace(/[\u064B-\u065F\u0640]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه")
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
.lbtubes{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:end}
.lbsl{display:flex;flex-direction:column;align-items:center;text-align:center;gap:3px;min-width:0}
.lbsl b{font-size:clamp(15px,4.4vw,19px)}.lbsl small{font-size:12px;color:#456472;min-height:2.4em;line-height:1.2}
.lbst{width:100%;max-width:150px;aspect-ratio:1/1.15;border-radius:16px;display:grid;place-items:center;position:relative;border:2px solid transparent}
.lbst.r{background:#e1efd9;border-color:#c4dcb9}.lbst.s{background:#e7dcea;border-color:#d0bfd5}
.lbt{position:relative;width:34%;height:78%;margin-top:6%;border:3px solid #7fa9b8;border-radius:4px 4px 999px 999px;background:rgba(255,255,255,.55);overflow:hidden}
.lbt:after{content:"";position:absolute;top:10%;bottom:18%;inset-inline-start:12%;width:12%;background:linear-gradient(180deg,rgba(255,255,255,.8),transparent);border-radius:99px}
.lbt .f{position:absolute;inset-inline:0;bottom:0;transition:height .6s ease,background .8s ease,opacity .6s ease}
.lbt .liq{height:58%}.lbt .sld{height:0;background:#fff}.lbt .ppt{height:0;opacity:0}
.lbt i.bb{position:absolute;bottom:8%;width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.9);border:1px solid #7fa9b8;animation:lbRise 1.6s ease-in forwards;z-index:2}
@keyframes lbRise{to{transform:translateY(-110px);opacity:0}}
.lbdp{position:absolute;top:-7%;inset-inline-end:-12%;width:44%;transform:rotate(28deg);transform-origin:50% 100%;pointer-events:none}
.lbdr{position:absolute;top:30%;inset-inline-start:34%;width:9px;height:13px;background:#6fb7dd;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;opacity:0}
.lbdr.go{animation:lbFall .8s ease-in forwards}
@keyframes lbFall{0%{opacity:1;transform:translateY(0)}80%{opacity:1}100%{opacity:0;transform:translateY(46px)}}
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
@media (prefers-reduced-motion:reduce){.lbdr.go,.lbt i.bb{animation:none}.lbt .f{transition:none}}`;
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
const CONV=r=>Array.isArray(r)?{t:r[0],p:r[1],l:r[2],g:r[3],d:r[4],s:r[5]}:r;
const SEC={
 1:{ic:"⚗️",title:"السكشن الأول: الكربونات والبيكربونات",desc:"تجربة أساسية (HCl) وتجارب تأكيدية بمعادلاتها، مع التسخين للتمييز بين الكربونات والبيكربونات.",RG:RG1,SALTS:SALTS1,key:"_1",
    intro:"ابدأ بالتجربة الأساسية ★ (HCl) ثم أكّد بالتجارب التأكيدية. سخّن الأنبوب عند الحاجة، وأفرغه قبل تجربة كاشف جديد.",ph:"اكتب اسم الملح، مثال: كربونات الصوديوم"},
 2:{ic:"🧫",title:"السكشن الثاني: كشف أملاح عامة",desc:"ملح مجهول من بنك أملاح متنوع (كلوريدات وكبريتات وأملاح الحديد والنحاس…) بستة كواشف.",RG:RG2,SALTS:SALTS2,key:"",
    intro:"اضغط على الكواشف لتجربتها واحدًا بعد الآخر (أفرغ الأنبوب بين كل تجربة)، سجّل ملاحظاتك، ثم اكتب اسم الملح.",ph:"اكتب اسم الملح، مثال: كلوريد الصوديوم"}
};
const lastIdx={1:-1,2:-1};
const loadS=sec=>{try{return Object.assign({n:0,ok:0},JSON.parse(localStorage.getItem(SK()+SEC[sec].key)||"{}"))}catch(e){return{n:0,ok:0}}};
const saveS=(sec,o)=>{try{localStorage.setItem(SK()+SEC[sec].key,JSON.stringify(o))}catch(e){}};

/* ---------- شاشة اختيار السكشن ---------- */
function openLab(){
 css();
 page(`<div class="lb"><h2>🧪 امتحانات في المعمل</h2><p class="lbp">اختر السكشن، وسيعطيك ملحًا مجهولًا لتكشف عنه بالتجارب ثم تكتب اسمه.</p>
  ${[1,2].map(i=>{const S=loadS(i);return `<button class="lbsec" data-s="${i}"><span class="ic">${SEC[i].ic}</span><div><b>${SEC[i].title}</b><span>${SEC[i].desc}<br>نتيجتك: ${AR(S.ok)} من ${AR(S.n)}</span></div></button>`}).join("")}</div>`,typeof subjects==="function"?subjects:null);
 document.querySelectorAll(".lbsec").forEach(b=>b.onclick=()=>start(+b.dataset.s));
 window.scrollTo(0,0);
}

/* ---------- صفحة الامتحان ---------- */
function start(sec){
 css();
 const C=SEC[sec],RG=C.RG,L=C.SALTS;
 let idx;do{idx=Math.floor(Math.random()*L.length)}while(idx===lastIdx[sec]&&L.length>1);lastIdx[sec]=idx;
 const salt=L[idx],S=loadS(sec),log={};let done=false,used=false,heated=false,cur=null,curId=0,timer=0;
 const dropper='<svg class="lbdp" viewBox="0 0 40 90" aria-hidden="true"><ellipse cx="20" cy="9" rx="10" ry="8" fill="#e8742f"/><rect x="14" y="14" width="12" height="32" rx="3" fill="#e9f4f9" stroke="#7fa9b8" stroke-width="2"/><path d="M16 46l4 36 4-36z" fill="#e9f4f9" stroke="#7fa9b8" stroke-width="2"/></svg>';
 const html=`<div class="lb">
  <h2>${C.ic} ${E(C.title)}</h2>
  <p class="lbp">${E(C.intro)}</p>
  <div class="lbb">
   <div class="lbinfo"><b>الملح المجهول:</b> ${E(salt.a)}</div>
   <div class="lbtubes">
    <div class="lbsl"><b>أضف كاشف</b><small id="lbrl">اختر كاشفًا من الأسفل</small>
     <div class="lbst r">${dropper}<i class="lbdr" id="lbdr"></i><div class="lbt"><div class="f liq" id="lbrq" style="background:#cfe8f1"></div></div></div></div>
    <div class="lbsl"><b>الملح المجهول</b><small id="lbsm">أنبوبة الاختبار</small>
     <div class="lbst s"><div class="lbt" id="lbtb"><div class="f liq" id="lbq"></div><div class="f sld" id="lbsd"></div><div class="f ppt" id="lbpp"></div></div></div></div>
   </div></div>
  ${sec===1?'<p class="lbleg">★ التجربة الأساسية • باقي الكواشف تأكيدية</p>':""}
  <div class="lbrg" id="lbrg">${RG.map(r=>`<button class="lbrb" data-i="${r[0]}" aria-pressed="false"><span class="nu">${r[0]}</span><span class="nm">كاشف ${AR(r[0])}${r[4]==="أساسية"?" ★":""}</span><span class="fm">${r[1]}</span></button>`).join("")}</div>
  <div class="lbact"><button id="lbht" type="button" disabled>🔥 تسخين</button><button id="lbem" type="button" disabled>🗑️ إفراغ الأنبوب</button></div>
  <div class="lbmsg" id="lbmsg" aria-live="polite"></div>
  <div class="lblg" id="lblg"><h4>📋 سجل الملاحظات</h4><span class="em">لم تجرِ أي تجربة بعد.</span></div>
  <div class="lbans"><input class="lbin" id="lbin" placeholder="${E(C.ph)}" autocomplete="off" enterkeyhint="done"><button class="bt" id="lbok" type="button" style="margin:0">✅ الإجابة</button></div>
  <div id="lbfb" aria-live="polite"></div><div id="lbrv"></div>
  <div class="lbft"><span>نتيجتك المحفوظة: ${AR(S.ok)} من ${AR(S.n)}</span><button class="bt alt" id="lbnx" type="button" style="margin:0">التالي ⬅</button></div>
 </div>`;
 page(html,openLab);
 const $=id=>document.getElementById(id),q=$("lbq"),sd=$("lbsd"),pp=$("lbpp"),tb=$("lbtb"),msg=$("lbmsg");
 const rbs=()=>document.querySelectorAll(".lbrb");
 const reset=()=>{q.style.height="58%";q.style.background=salt.sol;sd.style.height=salt.solid?"26%":"0";pp.style.height="0";pp.style.opacity="0";tb.querySelectorAll(".bb").forEach(b=>b.remove())};
 reset();
 function bubbles(){for(let i=0;i<14;i++){const b=document.createElement("i");b.className="bb";b.style.left=(8+Math.random()*70)+"%";b.style.animationDelay=(Math.random()*1.2)+"s";tb.appendChild(b);setTimeout(()=>b.remove(),3200)}}
 function show(r){
  if(r.l)q.style.background=r.l;
  if(r.p){pp.style.background=r.p;pp.style.height="30%";pp.style.opacity="1"}
  if(r.g)bubbles();
  if(r.s)sd.style.height="0";
  if(r.d)setTimeout(()=>{pp.style.opacity="0";q.style.background=r.d},1500);
 }
 const eqs=a=>(a||[]).map(x=>`<code class="lbeq">${E(x)}</code>`).join("");
 function renderLog(){
  const ks=Object.keys(log).sort((a,b)=>a-b);
  $("lblg").innerHTML="<h4>📋 سجل الملاحظات</h4><ul>"+ks.map(k=>{const g=RG[k-1],o=log[k];
   const tag=g[4]?`<span class="lbtag${g[4]==="أساسية"?"":" m"}">${E(g[4]==="أساسية"?"تجربة أساسية":g[4].replace("تأكيدية","تجربة تأكيدية"))}</span>`:"";
   return `<li><b>كاشف ${AR(k)} (${E(g[1])}):</b> ${E(o.t)}${tag}${eqs(o.e)}${o.h?`<div>🔥 <b>بالتسخين:</b> ${E(o.h.t)}${eqs(o.h.e)}</div>`:""}</li>`}).join("")+"</ul>";
 }
 function run(btn){
  if(done)return;
  if(used){msg.textContent="أفرغ الأنبوب أولًا (زر 🗑️) ثم جرّب كاشفًا جديدًا.";return}
  const id=+btn.dataset.i,rg=RG[id-1],r=CONV(salt.r[id]);
  used=true;heated=false;cur=r;curId=id;msg.textContent="";
  rbs().forEach(b=>{b.setAttribute("aria-pressed",b===btn?"true":"false");b.disabled=true});
  $("lbrl").textContent="كاشف "+AR(id)+": "+rg[1];$("lbrq").style.background=rg[3];
  clearTimeout(timer);reset();
  const d=$("lbdr");d.classList.remove("go");void d.offsetWidth;d.classList.add("go");
  timer=setTimeout(()=>{show(r);log[id]={t:r.t,e:r.e};renderLog();$("lbht").disabled=false;$("lbem").disabled=false},750);
 }
 function heat(){
  if(!used||heated||done)return;heated=true;$("lbht").disabled=true;
  const h=cur.h||{t:"لا يحدث تغيّر إضافي بالتسخين",e:[]};
  show(h);log[curId].h=h;renderLog();
 }
 function empty(){
  if(!used)return;clearTimeout(timer);
  q.style.height="0";sd.style.height="0";pp.style.opacity="0";
  $("lbht").disabled=true;$("lbem").disabled=true;
  setTimeout(()=>{reset();used=false;heated=false;cur=null;
   rbs().forEach(b=>{b.setAttribute("aria-pressed","false");b.disabled=done});
   $("lbrl").textContent="اختر كاشفًا من الأسفل";$("lbrq").style.background="#cfe8f1";msg.textContent="تم إفراغ الأنبوب، اختر كاشفًا جديدًا."},500);
 }
 rbs().forEach(b=>b.onclick=()=>run(b));$("lbht").onclick=heat;$("lbem").onclick=empty;
 function check(){
  if(done)return;
  const v=$("lbin").value,g=grade(salt,v),fb=$("lbfb");
  if(g.empty){fb.className="lbfb no";fb.textContent="اكتب اسم الملح أولًا ثم اضغط «الإجابة».";return}
  done=true;const St=loadS(sec);St.n++;if(g.ok)St.ok++;saveS(sec,St);
  rbs().forEach(b=>b.disabled=true);$("lbok").disabled=true;$("lbin").disabled=true;$("lbht").disabled=true;$("lbem").disabled=true;
  const tried=Object.keys(log).length;let h;
  if(g.ok)h=`<b>✅ إجابة صحيحة!</b> الملح هو ${E(salt.n)} (${salt.f}).`;
  else{const part=[g.an?"الأنيون (الشق الحمضي) صحيح":"",g.cat?"الكاتيون (الشق القاعدي) صحيح":""].filter(Boolean).join(" و");
   h=`<b>❌ إجابة غير صحيحة.</b>${part?"<br>لكن "+part+".":""}<br>الإجابة الصحيحة: <b>${E(salt.n)}</b> (${salt.f}).`}
  h+=`<br><span style="color:var(--mut,#667)">${E(salt.why)}</span>`;
  if(tried<3)h+=`<br>💡 جرّبت ${AR(tried)} كواشف فقط؛ كلما جرّبت أكثر كان الاستنتاج أدق.`;
  fb.className="lbfb "+(g.ok?"ok":"no");fb.innerHTML=h;
  if(sec===1){/* مراجعة معادلات الملح من الملخص */
   $("lbrv").innerHTML='<div class="lblg"><h4>📘 معادلات '+E(salt.n)+' (للمراجعة)</h4><ul>'+RG.map(r=>{const x=CONV(salt.r[r[0]]);
    return `<li><b>${E(r[1])}:</b> ${E(x.t)}${eqs(x.e)}${x.h?`<div>🔥 ${E(x.h.t)}${eqs(x.h.e)}</div>`:""}</li>`}).join("")+'</ul><p class="lbleg">المعادلات المكتوبة «بالقياس» غير منصوص عليها في الملخص، وهي من قاعدة: «البيكربونات تتفاعل مثل الكربونات لكن بالتسخين».</p></div>';
  }
  fb.scrollIntoView({behavior:"smooth",block:"center"});
 }
 $("lbok").onclick=check;$("lbin").onkeydown=e=>{if(e.key==="Enter")check()};
 $("lbnx").onclick=()=>start(sec);
 window.scrollTo(0,0);
}
window.openLab=openLab;window.__labSalts=SALTS2.concat(SALTS1);
})();
