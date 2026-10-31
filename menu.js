/* ===== menu.js — شريط علوي + قائمة جانبية متحركة + لوحة «خدماتنا» + وضع ليلي/نهاري + لوجو شفاف ===== */
(function(){
"use strict";
const root=document.documentElement;
const LS=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
const LOGO_MODE="halo"; /* "halo" = لوجو بلا خلفية مع حافة بيضاء واضحة | "box" = اللوجو الأصلي داخل صندوق أبيض */
const HIDE_OLD_BUTTONS=true; /* إخفاء أزرار (تنظيم الوقت/المؤقت/لوحة الأوائل/تغيير الاسم/الخروج) من شاشة المواد لأنها صارت في القائمة */
/* خدماتنا — عدّل النصوص كما تريد */
const SERVICES=[
 {i:"🎓",t:"تعليم رقمي بلا حدود",d:"تعلّم من أي مكان وفي أي وقت من هاتفك."},
 {i:"📄",t:"محاضرات وملخصات PDF",d:"ملخصات منظمة وخرائط ذهنية جاهزة للتحميل."},
 {i:"✅",t:"اختبارات بتصحيح فوري",d:"اختبر نفسك واعرف نتيجتك وإجاباتك فورًا."},
 {i:"🤖",t:"برمجة وذكاء اصطناعي",d:"محتوى وأدوات حديثة في البرمجة والذكاء الاصطناعي."},
 {i:"🏆",t:"تابع تقدّمك وإنجازاتك",d:"نقاط ومستويات ولوحة الأوائل لتحفيزك."},
 {i:"🌱",t:"زراعة بتقنية حديثة",d:"ربط المنهج الزراعي بالتقنيات الحديثة."}
];
/* ---------- الثيم ---------- */
const saved=LS("agri_theme");if(saved==="dark"||saved==="light")root.setAttribute("data-theme",saved);
const isDark=()=>{const t=root.getAttribute("data-theme");return t?t==="dark":!!(window.matchMedia&&matchMedia("(prefers-color-scheme:dark)").matches)};
function paintTheme(){const b=document.getElementById("mxTheme");if(!b)return;const d=isDark();b.querySelector("span").textContent=d?"☀️":"🌙";b.setAttribute("aria-label",d?"التبديل إلى الوضع الفاتح":"التبديل إلى الوضع الداكن");
 const m=document.querySelector('meta[name=theme-color]');if(m)m.content=d?"#0e1814":"#1b7f5c"}
function toggleTheme(){const b=document.getElementById("mxTheme");root.classList.add("mxtr");setTimeout(()=>root.classList.remove("mxtr"),700);
 const n=isDark()?"light":"dark";root.setAttribute("data-theme",n);LS("agri_theme",n);
 if(b){b.classList.remove("spin");void b.offsetWidth;b.classList.add("spin")}paintTheme()}

/* ---------- الأنماط ---------- */
const css=`
header{position:relative;padding-top:60px!important}
.mxtb{position:absolute;top:10px;left:12px;right:12px;display:flex;justify-content:space-between;align-items:center;z-index:5}
.mxbtn{width:44px;height:44px;border-radius:14px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.16);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;padding:0;transition:transform .2s,background .2s;box-shadow:0 4px 12px rgba(0,0,0,.18)}
.mxbtn:hover{background:rgba(255,255,255,.28)}.mxbtn:active{transform:scale(.9)}
.mxbtn.spin span{animation:mxSpin .7s cubic-bezier(.3,1.4,.5,1)}
.mxham{flex-direction:column;gap:5px}
.mxham i{display:block;width:22px;height:3px;border-radius:3px;background:#fff;transition:transform .35s,opacity .25s,width .25s}
.mxham.open i:nth-child(1){transform:translateY(8px) rotate(45deg)}
.mxham.open i:nth-child(2){opacity:0}
.mxham.open i:nth-child(3){transform:translateY(-8px) rotate(-45deg)}
.mxbadge{position:absolute;top:-3px;left:-3px;width:11px;height:11px;border-radius:50%;background:#fcd34d;box-shadow:0 0 0 0 rgba(252,211,77,.8);animation:mxPing 2s infinite}
.mxov{position:fixed;inset:0;background:rgba(3,15,10,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity .3s;z-index:900}
.mxov.on{opacity:1;pointer-events:auto}
.mxdr,.mxsv{position:fixed;top:0;bottom:0;right:0;width:min(84vw,330px);background:var(--card);color:var(--ink);transform:translateX(106%);transition:transform .42s cubic-bezier(.2,.9,.25,1);display:flex;flex-direction:column;overflow:hidden;box-shadow:-12px 0 36px rgba(0,0,0,.35);border-radius:22px 0 0 22px}
.mxdr{z-index:910}.mxsv{z-index:920;width:min(90vw,350px)}
.mxdr.on,.mxsv.on{transform:none}
.mxhd{position:relative;padding:calc(18px + env(safe-area-inset-top,0px)) 16px 16px;background:linear-gradient(135deg,var(--pri2),var(--pri));color:#fff;text-align:center;overflow:hidden}
.mxhd:before,.mxhd:after{content:"";position:absolute;border-radius:50%;background:rgba(255,255,255,.12);animation:mxBub 7s ease-in-out infinite}
.mxhd:before{width:110px;height:110px;top:-40px;left:-30px}.mxhd:after{width:80px;height:80px;bottom:-30px;right:-20px;animation-delay:-3s}
.mxhd img{position:relative;display:block;width:130px;max-width:62%;margin:0 auto 6px;filter:drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff) drop-shadow(0 4px 8px rgba(0,0,0,.35));animation:mxFl 4s ease-in-out infinite}
.mxhd b{position:relative;display:block;font-size:17px}.mxhd small{position:relative;opacity:.9;font-size:13px}
.mxls{flex:1;overflow:auto;padding:12px 12px 16px;display:flex;flex-direction:column;gap:8px}
.mxit{display:flex;align-items:center;gap:12px;width:100%;padding:13px 14px;border:1px solid var(--line);border-radius:14px;background:var(--bg);color:var(--ink);font-size:16px;font-weight:700;text-align:right;opacity:0;transform:translateX(30px);transition:background .2s,transform .2s,border-color .2s}
.mxdr.on .mxit{animation:mxIn .5s cubic-bezier(.2,.9,.3,1) forwards;animation-delay:calc(var(--k)*70ms + 150ms)}
.mxit:hover{border-color:var(--pri);background:var(--card);transform:translateX(-4px)}
.mxit:active{transform:scale(.97)}
.mxit .ic{width:36px;height:36px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;background:linear-gradient(135deg,var(--pri2),var(--pri));flex:none}
.mxit:hover .ic{animation:mxWig .6s}
.mxit .ch{margin-right:auto;color:var(--mut);font-size:18px}
.mxit.out{color:var(--bad);border-color:rgba(185,28,28,.35)}
.mxit.out .ic{background:linear-gradient(135deg,#b91c1c,#ef4444)}
.mxit.sv{border-color:#d4a843;background:linear-gradient(120deg,var(--bg),rgba(252,211,77,.14))}
.mxit.sv .ic{background:linear-gradient(135deg,#d97706,#fcd34d)}
.mxft{padding:10px;text-align:center;font-size:12px;color:var(--mut);border-top:1px solid var(--line)}
.mxsvh{display:flex;align-items:center;gap:10px;padding:calc(14px + env(safe-area-inset-top,0px)) 14px 12px;background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;font-weight:800;font-size:18px}
.mxcl{position:absolute;top:calc(12px + env(safe-area-inset-top,0px));left:12px;z-index:2}
.mxbk{width:38px;height:38px;border-radius:12px;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.18);color:#fff;font-size:18px;padding:0}
.mxsc{position:relative;padding:12px 12px 20px;overflow:auto;flex:1;display:flex;flex-direction:column;gap:10px}
.mxsc:before{content:"";position:absolute;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.18),transparent 70%);top:20%;left:-60px;animation:mxBub 8s ease-in-out infinite;pointer-events:none}
.mxcd{position:relative;display:flex;gap:12px;align-items:center;padding:13px;border-radius:16px;border:1px solid var(--line);background:var(--bg);opacity:0;transform:translateY(18px) scale(.96)}
.mxsv.on .mxcd{animation:mxUp .55s cubic-bezier(.2,.9,.3,1) forwards;animation-delay:calc(var(--k)*90ms + 200ms)}
.mxcd .ic{flex:none;width:50px;height:50px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:27px;background:linear-gradient(135deg,rgba(124,58,237,.2),rgba(37,99,235,.25));animation:mxFl 3.6s ease-in-out infinite;animation-delay:calc(var(--k)*-.5s)}
.mxcd b{display:block;font-size:15px;color:var(--pri)}.mxcd span{font-size:13px;color:var(--mut);line-height:1.5}
.mxcd:after{content:"";position:absolute;top:0;bottom:0;width:30%;left:-40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.22),transparent);animation:mxSh 5s ease-in-out infinite;animation-delay:calc(var(--k)*.6s);pointer-events:none}
${HIDE_OLD_BUTTONS?'#tp,#tm,#lbb,#out,#lo{display:none!important}':''}
.brand.lgok{background:transparent!important;box-shadow:none!important;padding:0!important;overflow:visible!important;animation:brIn .9s cubic-bezier(.2,1.3,.4,1) both,brFloat 4.6s ease-in-out .9s infinite!important}
.brand.lgok::after{display:none!important}
.brand.lgok img{filter:drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff) drop-shadow(0 0 7px rgba(255,255,255,.75)) drop-shadow(0 7px 10px rgba(0,0,0,.35))}
html.mxtr *,html.mxtr body{transition:background-color .5s,color .5s,border-color .5s,fill .5s!important}
@keyframes mxSpin{from{transform:rotate(-200deg) scale(.3);opacity:0}to{transform:none;opacity:1}}
@keyframes mxIn{to{opacity:1;transform:none}}
@keyframes mxUp{to{opacity:1;transform:none}}
@keyframes mxFl{50%{transform:translateY(-5px)}}
@keyframes mxWig{25%{transform:rotate(-14deg)}50%{transform:rotate(12deg)}75%{transform:rotate(-6deg)}}
@keyframes mxBub{50%{transform:translate(14px,10px) scale(1.12)}}
@keyframes mxSh{to{left:140%}}
@keyframes mxPing{70%{box-shadow:0 0 0 9px rgba(252,211,77,0)}100%{box-shadow:0 0 0 0 rgba(252,211,77,0)}}
@media (prefers-reduced-motion:reduce){.mxdr *,.mxsv *,.mxbtn *{animation:none!important}.mxit,.mxcd{opacity:1!important;transform:none!important}}
`;
const st=document.createElement("style");st.id="mxcss";st.textContent=css;document.head.appendChild(st);

/* ---------- لوجو بدون خلفية (يزيل الخلفية البيضاء تلقائيًا) ---------- */
let LOGO="";
function cutLogo(){const img=document.querySelector(".brand img");if(!img||LOGO_MODE==="box")return;
 const run=()=>{try{
  const w=img.naturalWidth,h=img.naturalHeight;if(!w||!h)return;
  const cv=document.createElement("canvas");cv.width=w;cv.height=h;const cx=cv.getContext("2d",{willReadFrequently:true});cx.drawImage(img,0,0);
  const id=cx.getImageData(0,0,w,h),p=id.data;
  /* لون الخلفية = متوسط الأركان */
  const cs=[[0,0],[w-1,0],[0,h-1],[w-1,h-1]];let R=0,G=0,B=0;cs.forEach(c=>{const o=(c[1]*w+c[0])*4;R+=p[o];G+=p[o+1];B+=p[o+2]});R/=4;G/=4;B/=4;
  if(Math.min(R,G,B)<150)return; /* الخلفية ليست فاتحة: لا نغيّر */
  const T=34,near=o=>Math.abs(p[o]-R)<T&&Math.abs(p[o+1]-G)<T&&Math.abs(p[o+2]-B)<T;
  const seen=new Uint8Array(w*h),stack=new Int32Array(w*h);let sp=0;
  const push=(x,y)=>{const k=y*w+x;if(seen[k])return;if(!near(k*4))return;seen[k]=1;stack[sp++]=k};
  for(let x=0;x<w;x++){push(x,0);push(x,h-1)}for(let y=0;y<h;y++){push(0,y);push(w-1,y)}
  while(sp){const k=stack[--sp],x=k%w,y=(k/w)|0;if(x>0)push(x-1,y);if(x<w-1)push(x+1,y);if(y>0)push(x,y-1);if(y<h-1)push(x,y+1)}
  /* تنعيم الحواف */
  const a=new Uint8Array(w*h).fill(255);for(let k=0;k<w*h;k++)if(seen[k])a[k]=0;
  for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const k=y*w+x;if(seen[k])continue;
   if(seen[k-1]||seen[k+1]||seen[k-w]||seen[k+w]){const o=k*4,m=Math.min(p[o],p[o+1],p[o+2]);const v=Math.max(0,Math.min(1,(255-m)/(255-Math.min(R,G,B)+40)*1.6));a[k]=Math.round(255*Math.max(.25,v))}}
  for(let k=0;k<w*h;k++)p[k*4+3]=a[k];
  cx.putImageData(id,0,0);LOGO=cv.toDataURL("image/png");img.src=LOGO;
  img.closest(".brand").classList.add("lgok");
 }catch(e){/* مثلًا فتح الملف مباشرة من file:// — يبقى الشكل القديم */}};
 if(img.complete&&img.naturalWidth)run();else img.addEventListener("load",run,{once:true})}

/* ---------- القائمة ---------- */
const $=id=>document.getElementById(id);
const fnOk=n=>{try{return typeof (0,eval)(n)==="function"}catch(e){return false}};
const call=(n,...a)=>{try{(0,eval)(n)(...a)}catch(e){console.warn("menu:",n,e)}};
const hasUser=()=>{try{return !!(0,eval)("user")}catch(e){return false}};
const hasUID=()=>{try{return !!(0,eval)("UID")}catch(e){return false}};
const ITEMS=[
 {ic:"🏠",t:"الرئيسية",f:"subjects",run:()=>call("subjects")},
 {ic:"✏️",t:"تغيير الاسم",f:"home",run:()=>call("home")},
 {ic:"⏰",t:"تنظيم الوقت",f:"planner",run:()=>call("planner")},
 {ic:"🎯",t:"مؤقت المذاكرة",f:"timer",run:()=>call("timer")},
 {ic:"🏆",t:"لوحة الأوائل",f:"board",run:()=>call("board","lb")},
 {ic:"📊",t:"إحصائياتي وتقريري",f:"openStats",run:()=>{typeof window.openStats==="function"&&window.openStats()}},
 {ic:"🗓️",t:"خطة الأيام السبعة",f:"openPlan7",run:()=>{typeof window.openPlan7==="function"&&window.openPlan7()}},
 {ic:"🧪",t:"امتحانات في المعمل",run:()=>{
  if(typeof window.openLab==="function")return window.openLab();
  const s=document.createElement("script");s.src="lab.js?v="+Date.now();
  s.onload=()=>{typeof window.openLab==="function"&&window.openLab()};
  s.onerror=()=>alert("ملف lab.js غير موجود على السيرفر. ارفعه في نفس مجلد المنصة (بجانب menu.js) ثم امسح الكاش.");
  document.head.appendChild(s)}},
 {ic:"🌟",t:"خدماتنا",cls:"sv",chev:true,always:true,run:()=>openSv()},
 {ic:"🚪",t:"تسجيل الخروج",cls:"out",need:"uid",run:()=>{try{(0,eval)("auth").signOut()}catch(e){location.reload()}}}
];
let ham,dr,sv,ov;
function build(){
 const hd=document.querySelector("header");if(!hd||$("mxTheme"))return;
 const tb=document.createElement("div");tb.className="mxtb";
 tb.innerHTML=`<button class="mxbtn mxham" id="mxHam" aria-label="القائمة" aria-expanded="false"><i></i><i></i><i></i></button><button class="mxbtn" id="mxTheme"><span></span></button>`;
 hd.insertBefore(tb,hd.firstChild);
 ov=document.createElement("div");ov.className="mxov";
 dr=document.createElement("aside");dr.className="mxdr";dr.setAttribute("aria-label","القائمة الرئيسية");
 sv=document.createElement("aside");sv.className="mxsv";sv.setAttribute("aria-label","خدماتنا");
 sv.innerHTML=`<div class="mxsvh"><button class="mxbk" id="mxBk" aria-label="رجوع">→</button><span>🌟 خدماتنا</span></div><div class="mxsc">${SERVICES.map((s,i)=>`<div class="mxcd" style="--k:${i}"><div class="ic">${s.i}</div><div><b>${s.t}</b><span>${s.d}</span></div></div>`).join("")}</div>`;
 document.body.append(ov,dr,sv);
 ham=$("mxHam");ham.onclick=()=>dr.classList.contains("on")?closeAll():openDr();
 $("mxTheme").onclick=toggleTheme;ov.onclick=closeAll;$("mxBk").onclick=()=>sv.classList.remove("on");
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){sv.classList.contains("on")?sv.classList.remove("on"):closeAll()}});
 paintTheme();
 if(window.matchMedia)try{matchMedia("(prefers-color-scheme:dark)").addEventListener("change",()=>{if(!root.getAttribute("data-theme"))paintTheme()})}catch(e){}
}
function render(){
 const u=hasUser(),uid=hasUID();let name="";try{name=(0,eval)("user")||""}catch(e){}
 const logo=LOGO||(document.querySelector(".brand img")||{}).src||"";
 const list=ITEMS.filter(i=>i.always||(u&&(!i.f||fnOk(i.f))&&(i.need!=="uid"||uid)));
 dr.innerHTML=`<div class="mxhd"><button class="mxbk mxcl" id="mxCl" aria-label="إغلاق">✕</button>${logo?`<img src="${logo}" alt="">`:""}<b>${name?"أهلًا "+String(name).replace(/[<>&"]/g,""):"كلية الزراعة"}</b><small>نحن المتميزون</small></div><div class="mxls">${list.map((i,k)=>`<button class="mxit ${i.cls||""}" style="--k:${k}" data-k="${ITEMS.indexOf(i)}"><span class="ic">${i.ic}</span>${i.t}${i.chev?'<span class="ch">‹</span>':""}</button>`).join("")}</div><div class="mxft">إعداد: إبراهيم علي السيد أبو يحيى</div>`;
 $("mxCl").onclick=closeAll;
 dr.querySelectorAll(".mxit").forEach(b=>b.onclick=()=>{const it=ITEMS[+b.dataset.k];if(it.chev){it.run();return}closeAll();setTimeout(it.run,260)});
}
function openDr(){render();ov.classList.add("on");dr.classList.remove("on");void dr.offsetWidth;dr.classList.add("on");ham.classList.add("open");ham.setAttribute("aria-expanded","true");document.body.style.overflow="hidden"}
function openSv(){sv.classList.remove("on");void sv.offsetWidth;sv.classList.add("on")}
function closeAll(){sv.classList.remove("on");dr.classList.remove("on");ov.classList.remove("on");ham&&ham.classList.remove("open");ham&&ham.setAttribute("aria-expanded","false");document.body.style.overflow=""}
function init(){build();cutLogo();paintTheme()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
/* تحميل قسم امتحانات المعمل تلقائيًا */
if(!window.openLab&&!document.querySelector('script[src^="lab.js"]')){var _ls=document.createElement("script");_ls.src="lab.js?v=6";_ls.async=false;(document.head||document.documentElement).appendChild(_ls)}
window.openMenu=()=>{build();openDr()};
})();
