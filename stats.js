/* ===== stats.js — إحصائيات الطالب: تقرير شامل + نقاط الضعف + ما يركّز عليه في كل مادة ===== */
(function(){
"use strict";
const SK=()=>"agri_stats_"+((typeof UID!=="undefined"&&UID)||"guest");
const LV=/^\[(مبتدئ|متوسط|صعب)\]\s*/;
const AR=n=>Number(n).toLocaleString("ar-EG");
const E=s=>typeof esc==="function"?esc(s):String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function loadS(){try{return Object.assign({miss:{},hist:[],lv:{}},JSON.parse(localStorage.getItem(SK())||"{}"))}catch(e){return{miss:{},hist:[],lv:{}}}}
function saveS(o){try{localStorage.setItem(SK(),JSON.stringify(o))}catch(e){}}

/* ---------- تسجيل كل محاولة (تفاصيل كل سؤال) ---------- */
function record(s,qz,items,ans){
 try{const S=loadS(),t=Date.now(),title=String(qz[0]);let sc=0;
  const L=S.lv[s]=S.lv[s]||{},M=S.miss[s]=S.miss[s]||[];
  items.forEach((it,i)=>{const ok=ans[i]>=0&&!!it.o[ans[i]][1];if(ok)sc++;
   const m=LV.exec(it.q);if(m){const a=L[m[1]]=L[m[1]]||[0,0];a[ok?0:1]++}
   const ix=M.findIndex(x=>x.q===it.q);
   if(ok){if(ix>=0){M[ix].r++;M[ix].c=(M[ix].c||0)+1;if(M[ix].c>=2)M.splice(ix,1)}}
   else{const cor=it.o.find(o=>o[1])[0],wr=it.o.filter(o=>!o[1]).map(o=>o[0]);
    if(ix>=0){M[ix].w++;M[ix].c=0;M[ix].t=t}else M.push({q:it.q,o:[cor].concat(wr),w:1,r:0,c:0,u:title,t})}});
  M.sort((a,b)=>b.t-a.t);if(M.length>60)M.length=60;
  S.hist.push({s,u:title,sc,n:items.length,t});if(S.hist.length>400)S.hist=S.hist.slice(-400);
  saveS(S)}catch(e){}}
if(typeof result==="function"){const _r=result;result=function(s,qz,items,ans){record(s,qz,items,ans);return _r.apply(this,arguments)}}

/* ---------- جلب السجل السحابي (إن وُجد) ---------- */
async function cloudHist(){
 try{if(typeof db==="undefined"||!db||typeof UID==="undefined"||!UID)return null;
  const sn=await Promise.race([db.collection("users/"+UID+"/attempts").get(),new Promise((_,r)=>setTimeout(()=>r(0),6000))]);
  const a=[];sn.forEach(x=>{const d=x.data();a.push({s:d.subject,u:d.quiz,sc:+d.score||0,n:+d.total||0,t:d.at&&d.at.toMillis?d.at.toMillis():(+d.at||0)})});return a}catch(e){return null}}

/* ---------- التحليل ---------- */
const DR="🎯";
function analyze(hist,S){
 const subs=(typeof SUBJECTS!=="undefined"?SUBJECTS:[]);
 return subs.map(sb=>{const s=sb[0],H=hist.filter(h=>h.s===s&&h.n>0).sort((a,b)=>a.t-b.t);
  const real=H.filter(h=>String(h.u).indexOf(DR)!==0);
  const sc=H.reduce((a,h)=>a+h.sc,0),n=H.reduce((a,h)=>a+h.n,0),pct=n?sc/n:null;
  const rate=h=>h.sc/h.n,avg=a=>a.length?a.reduce((x,h)=>x+rate(h),0)/a.length:null;
  const last3=avg(H.slice(-3)),prev=avg(H.slice(-6,-3)),trend=(last3!=null&&prev!=null)?last3-prev:null;
  const U={};real.forEach(h=>{const u=U[h.u]=U[h.u]||{u:h.u,sc:0,n:0,k:0};u.sc+=h.sc;u.n+=h.n;u.k++});
  const units=Object.values(U).map(u=>({u:u.u,pct:u.sc/u.n,k:u.k})).sort((a,b)=>a.pct-b.pct);
  const weakUnits=units.filter(u=>u.pct<.7).slice(0,3);
  const titles=((typeof QUIZZES!=="undefined"&&QUIZZES[s])||[]).map(q=>String(q[0]));
  const untried=titles.filter(t=>!U[t]);
  const lv=S.lv[s]||{};let lvWeak=null;
  ["مبتدئ","متوسط","صعب"].forEach(k=>{const v=lv[k];if(v&&v[0]+v[1]>=4){const p=v[0]/(v[0]+v[1]);if(p<.7&&(!lvWeak||p<lvWeak.p))lvWeak={k,p}}});
  const miss=(S.miss[s]||[]).filter(m=>m.w>m.r||m.c<2).sort((a,b)=>(b.w-b.r)-(a.w-a.r)||b.t-a.t);
  return{s,ic:sb[1],cnt:H.length,pct,best:H.length?Math.max(...H.map(rate)):null,last:H.length?rate(H[H.length-1]):null,trend,units,weakUnits,untried,total:titles.length,done:titles.length-untried.length,lvWeak,lv,miss}})}
const band=p=>p==null?{c:"#94a3b8",t:"لم تبدأ",e:"⚪"}:p>=.8?{c:"#16a34a",t:"قوي",e:"🟢"}:p>=.6?{c:"#d97706",t:"متوسط",e:"🟡"}:{c:"#dc2626",t:"يحتاج تركيز",e:"🔴"};
const pc=p=>Math.round(p*100)+"٪";
function advise(a){const o=[];
 if(!a.cnt)return["لم تبدأ هذه المادة بعد — ابدأ بأول اختبار فيها ثم ارجع هنا لتحصل على تقريرك."];
 if(a.pct<.6)o.push("مستواك العام في المادة يحتاج دعمًا: راجع المحاضرات أولًا ثم أعد الاختبارات.");
 a.weakUnits.forEach(u=>o.push("ركّز على «"+u.u.replace(/\s*\(.*?\)\s*$/,"")+"» — نسبتك فيها "+pc(u.pct)));
 if(a.lvWeak)o.push("أخطاؤك أكثر في الأسئلة «"+a.lvWeak.k+"» (نسبة صوابك "+pc(a.lvWeak.p)+")"+(a.lvWeak.k==="مبتدئ"?" — ثبّت الأساسيات أولًا.":"."));
 if(a.miss.length)o.push("لديك "+AR(a.miss.length)+" سؤال تكرر فيه الخطأ — اضغط «تدريب نقاط ضعفي».");
 if(a.untried.length)o.push("لم تجرّب بعد: "+a.untried.slice(0,2).map(t=>"«"+t.replace(/\s*\(.*?\)\s*$/,"")+"»").join(" ، ")+(a.untried.length>2?" وغيرها ("+AR(a.untried.length)+")":""));
 if(a.trend!=null&&a.trend<-.05)o.push("تنبيه: أداؤك في آخر المحاولات أقل من السابق — خذ مراجعة سريعة.");
 if(!o.length)o.push("ممتاز! حافظ على مستواك وجرّب الاختبارات الأصعب.");return o}

/* ---------- الأنماط ---------- */
const css=`
.stp .sthd{display:flex;align-items:center;gap:14px;padding:16px;border-radius:18px;background:linear-gradient(135deg,var(--pri2),var(--pri));color:#fff;position:relative;overflow:hidden;animation:stIn .6s both}
.stp .sthd:after{content:"";position:absolute;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.1);top:-60px;left:-40px;animation:stBub 7s ease-in-out infinite}
.stp .sthd h3{margin:0 0 2px;font-size:19px;color:#fff}.stp .sthd small{opacity:.92;font-size:13px;line-height:1.5;display:block}
.stp .strg{position:relative;flex:none;width:96px;height:96px}
.stp .strg svg{width:100%;height:100%;transform:rotate(-90deg)}
.stp .strg circle{fill:none;stroke-width:9;stroke-linecap:round}
.stp .strg .bg{stroke:rgba(255,255,255,.28)}.stp .strg .fg{stroke:#fde68a;stroke-dasharray:264;stroke-dashoffset:264;transition:stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 0 4px rgba(253,230,138,.7))}
.stp .strg b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900}
.stp .stt{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}
.stp .stc{padding:12px;border:1px solid var(--line);border-radius:14px;background:var(--bg);text-align:center;animation:stUp .55s both}
.stp .stc b{display:block;font-size:22px;color:var(--pri)}.stp .stc span{font-size:12px;color:var(--mut)}
.stp .stsec{margin:16px 0 8px;font-weight:800;font-size:17px;color:var(--pri)}
.stp .stpr{display:flex;gap:10px;align-items:flex-start;padding:11px 12px;margin-bottom:8px;border-radius:14px;border:1px solid var(--line);background:var(--bg);font-size:14.5px;line-height:1.6;animation:stUp .55s both}
.stp .stpr i{flex:none;font-style:normal;font-size:20px}
.stp .sts{border:1px solid var(--line);border-radius:16px;margin-bottom:10px;background:var(--card);overflow:hidden;animation:stUp .55s both}
.stp .sth{display:flex;align-items:center;gap:10px;width:100%;padding:12px;border:0;background:none;text-align:right;font-size:16px;font-weight:800;color:var(--ink)}
.stp .sth .ic{font-size:24px}.stp .sth .pp{margin-right:auto;font-size:15px}
.stp .sth .ar{transition:transform .3s;color:var(--mut)}.stp .sts.open .ar{transform:rotate(90deg)}
.stp .stbar{height:9px;margin:0 12px 10px;border-radius:99px;background:var(--line);overflow:hidden}
.stp .stbar b{display:block;height:100%;width:0;border-radius:99px;transition:width 1.2s cubic-bezier(.2,.8,.2,1)}
.stp .stbd{max-height:0;overflow:hidden;transition:max-height .5s ease;padding:0 12px}
.stp .sts.open .stbd{max-height:2400px;padding-bottom:12px}
.stp .stbd h4{margin:10px 0 4px;font-size:14px;color:var(--pri)}
.stp .stbd ul{margin:0;padding:0 18px 0 0;font-size:14px;line-height:1.7}
.stp .chip{display:inline-block;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:700;color:#fff}
.stp .mq{margin:6px 0;padding:8px 10px;border-radius:12px;background:var(--bg);border:1px solid var(--line);font-size:13.5px;line-height:1.6}
.stp .mq b{color:var(--bad)}.stp .mq span{color:var(--ok);font-weight:700}
.stp .bt{display:block;width:100%;margin-top:8px;padding:11px;border-radius:12px;border:0;font-weight:800;font-size:15px;background:var(--pri);color:#fff}
.stp .bt.alt{background:var(--card);color:var(--pri);border:2px solid var(--pri)}
@keyframes stIn{from{opacity:0;transform:translateY(-12px)}}@keyframes stUp{from{opacity:0;transform:translateY(16px)}}@keyframes stBub{50%{transform:translate(16px,12px) scale(1.15)}}
@media (prefers-reduced-motion:reduce){.stp *{animation:none!important;transition:none!important}}`;
function inject(){if(document.getElementById("stcss"))return;const s=document.createElement("style");s.id="stcss";s.textContent=css;document.head.appendChild(s)}

/* ---------- نص التقرير (PDF) ---------- */
function pdfLines(A,tot){
 const L=[["كلية الزراعة – نحن المتميزون",40,1,"#0f5a41"],["تقرير الأداء الشامل",34,1],["اسم الطالب: "+(typeof user!=="undefined"?user:""),30,1],["التاريخ: "+new Date().toLocaleDateString("ar-EG"),26,0,"#555"],["",12],
 ["المتوسط العام: "+(tot.pct==null?"—":pc(tot.pct))+"  ·  عدد المحاولات: "+AR(tot.cnt)+"  ·  تغطية الاختبارات: "+pc(tot.cov),30,1,"#c2410c"],["",14]];
 A.forEach(a=>{const b=band(a.pct);L.push([a.ic+" "+a.s+" — "+(a.pct==null?"لم تبدأ":pc(a.pct)+" ("+b.t+")"),32,1,a.pct==null?"#555":a.pct>=.8?"#15803d":a.pct>=.6?"#b45309":"#b91c1c"]);
  advise(a).forEach(t=>L.push(["• "+t,26,0,"#111",30]));
  a.miss.slice(0,3).forEach(m=>L.push(["سؤال للمراجعة: "+m.q,24,0,"#b91c1c",40],["الإجابة الصحيحة: "+m.o[0],24,1,"#15803d",60]));L.push(["",14])});
 return L}

/* ---------- الصفحة ---------- */
async function openStats(){
 inject();
 page('<div class="empty">جاري إعداد تقريرك…</div>',subjects);
 const S=loadS(),ch=await cloudHist(),hist=(ch&&ch.length?ch:S.hist);
 const A=analyze(hist,S),started=A.filter(a=>a.cnt),tot=hist.reduce((o,h)=>(o.sc+=h.sc,o.n+=h.n,o),{sc:0,n:0});
 const T={pct:tot.n?tot.sc/tot.n:null,cnt:hist.filter(h=>h.n>0).length,cov:(()=>{const d=A.reduce((x,a)=>x+a.done,0),t=A.reduce((x,a)=>x+a.total,0);return t?d/t:0})()};
 let mins=0,pts=0;try{const ss=ld("agri_sess","[]");mins=ss.reduce((x,y)=>x+(y.m||0),0);pts=ss.reduce((x,y)=>x+(y.p||0),0)}catch(e){}
 const weakest=started.slice().sort((a,b)=>a.pct-b.pct)[0],strongest=started.slice().sort((a,b)=>b.pct-a.pct)[0];
 const pri=[];
 started.filter(a=>a.pct<.8).sort((a,b)=>a.pct-b.pct).slice(0,3).forEach(a=>pri.push(["🔴",`<b>${E(a.s)}</b> — ${a.weakUnits.length?"ابدأ بـ «"+E(a.weakUnits[0].u.replace(/\s*\(.*?\)\s*$/,""))+"»":"راجع الأساسيات وأعد الاختبار"} (نسبتك ${pc(a.pct)})`]));
 const ns=A.filter(a=>!a.cnt&&a.total);if(ns.length)pri.push(["⚪",`لم تبدأ بعد: <b>${ns.map(a=>E(a.s)).join("، ")}</b>`]);
 if(!pri.length&&started.length)pri.push(["🌟","أداؤك ممتاز في كل المواد التي بدأتها — جرّب المستويات الأصعب."]);
 if(!started.length)pri.push(["🚀","لا توجد اختبارات بعد. أجرِ أي اختبار وسيظهر تقريرك الكامل هنا."]);
 const html=`<div class="stp"><div class="sthd"><div class="strg"><svg viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="42"/><circle class="fg" id="stfg" cx="50" cy="50" r="42"/></svg><b><span class="cu" data-v="${T.pct==null?0:Math.round(T.pct*100)}">0</span>٪</b></div>
  <div><h3>📊 إحصائياتي وتقريري</h3><small>${E(typeof user!=="undefined"?user:"")}</small><small>${T.pct==null?"ابدأ أول اختبار لتظهر نتائجك":(strongest?"الأقوى: "+E(strongest.s):"")+(weakest&&weakest!==strongest?" · الأضعف: "+E(weakest.s):"")}</small></div></div>
  <div class="stt"><div class="stc" style="animation-delay:.1s"><b class="cu" data-v="${T.cnt}">0</b><span>محاولة اختبار</span></div><div class="stc" style="animation-delay:.18s"><b><span class="cu" data-v="${Math.round(T.cov*100)}">0</span>٪</b><span>تغطية الاختبارات</span></div><div class="stc" style="animation-delay:.26s"><b class="cu" data-v="${mins}">0</b><span>دقيقة مذاكرة</span></div><div class="stc" style="animation-delay:.34s"><b class="cu" data-v="${pts}">0</b><span>نقاط المؤقت</span></div></div>
  <div class="stsec">🎯 أولوياتك الآن</div>${pri.map((p,i)=>`<div class="stpr" style="animation-delay:${.1*i+.3}s"><i>${p[0]}</i><span>${p[1]}</span></div>`).join("")}
  <div class="stsec">📚 تقرير كل مادة</div>
  ${A.map((a,i)=>{const b=band(a.pct);return `<div class="sts ${a===weakest?"open":""}" data-i="${i}" style="animation-delay:${.08*i+.4}s"><button class="sth"><span class="ic">${a.ic}</span>${E(a.s)}<span class="chip" style="background:${b.c}">${b.e} ${b.t}</span><span class="pp" style="color:${b.c}">${a.pct==null?"—":pc(a.pct)}</span><span class="ar">‹</span></button>
   <div class="stbar"><b data-w="${a.pct==null?0:Math.round(a.pct*100)}" style="background:${b.c}"></b></div>
   <div class="stbd"><h4>📌 على ماذا تركّز؟</h4><ul>${advise(a).map(t=>`<li>${E(t)}</li>`).join("")}</ul>
   ${a.cnt?`<h4>📈 ملخص</h4><ul><li>عدد المحاولات: ${AR(a.cnt)} · أفضل نتيجة: ${pc(a.best)} · آخر نتيجة: ${pc(a.last)}${a.trend!=null?" · الاتجاه: "+(a.trend>=.03?"⬆️ تحسّن":a.trend<=-.03?"⬇️ تراجع":"➡️ ثابت"):""}</li><li>الاختبارات المنجزة: ${AR(a.done)} من ${AR(a.total)}</li></ul>`:""}
   ${a.units.length?`<h4>🧩 أداؤك حسب الاختبار/الوحدة</h4><ul>${a.units.slice(0,5).map(u=>`<li>${E(u.u)} — <b style="color:${band(u.pct).c}">${pc(u.pct)}</b></li>`).join("")}</ul>`:""}
   ${a.miss.length?`<h4>❌ أسئلة تحتاج مراجعة</h4>${a.miss.slice(0,3).map(m=>`<div class="mq"><b>${E(m.q)}</b><br><span>✓ ${E(m.o[0])}</span></div>`).join("")}<button class="bt" data-d="${i}">🎯 تدريب على نقاط ضعفي (${AR(Math.min(a.miss.length,15))} سؤال)</button>`:""}
   <button class="bt alt" data-q="${i}">📝 اختبارات ${E(a.s)}</button></div></div>`}).join("")}
  <button class="bt" id="stpdf">⬇️ حفظ التقرير (PDF)</button><button class="bt alt" id="stprt">🖨️ طباعة التقرير</button><div class="msg" id="stms" style="margin-top:8px"></div>
  <p style="color:var(--mut);font-size:12px;margin:8px 0 0">ملاحظة: تفاصيل الأسئلة التي أخطأت فيها تُحفظ على هذا الجهاز بدءًا من آخر تحديث، أما نتائج الاختبارات السابقة فتُقرأ من حسابك.</p></div>`;
 page(html,subjects);
 const root=app.querySelector(".stp");
 /* أنيميشن الأرقام والحلقة والأشرطة */
 requestAnimationFrame(()=>setTimeout(()=>{
  const fg=document.getElementById("stfg");if(fg)fg.style.strokeDashoffset=264-264*(T.pct||0);
  root.querySelectorAll(".stbar b").forEach(b=>b.style.width=b.dataset.w+"%");
  root.querySelectorAll(".cu").forEach(el=>{const v=+el.dataset.v,t0=performance.now();const st=t=>{const k=Math.min(1,(t-t0)/1200);el.textContent=AR(Math.round(v*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)})},80));
 root.querySelectorAll(".sts").forEach(c=>c.querySelector(".sth").onclick=()=>c.classList.toggle("open"));
 root.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>quizList(A[+b.dataset.q].s));
 root.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{const a=A[+b.dataset.d],M=a.miss.slice(0,15);
  const bank=M.map(m=>[m.q].concat(m.o));quiz(a.s,["🎯 تدريب نقاط ضعفي – "+a.s,bank.map((_,i)=>i),bank,0,bank.length*60])});
 const ms=document.getElementById("stms"),mk=()=>textPDF(pdfLines(A,T));
 document.getElementById("stpdf").onclick=()=>dl(ms,"تقرير_"+String(typeof user!=="undefined"?user:"طالب").replace(/\s/g,"_")+".pdf",mk);
 document.getElementById("stprt").onclick=()=>prt(ms,mk);
 window.scrollTo(0,0)}
window.openStats=openStats;window.__statsAnalyze=analyze;
})();
