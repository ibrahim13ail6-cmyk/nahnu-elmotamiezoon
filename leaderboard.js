/* ===== نقاط الاختبارات + لوحة الأوائل + لوحتي ===== */
const BK="agri_best";
const bestMap=()=>{try{return JSON.parse(localStorage.getItem(BK)||"{}")}catch(e){return{}}};
const bkey=(s,q)=>(s+"~"+q).replace(/[.\/\[\]*`]/g,"_");
const totals=B=>{let p=0,c=0,sp=0;Object.values(B).forEach(o=>{p+=o.s+(o.b||0);c++;sp+=o.t?o.s/o.t:0});return{p,c,avg:c?Math.round(sp/c*100):0}};
function pushLB(name){if(!db||!UID)return;const B=bestMap(),T=totals(B);
 db.doc("leaderboard/"+UID).set({name:String(name||user||"طالب").slice(0,40),points:T.p,quizzes:T.c,updatedAt:SVT()}).catch(()=>{});
 db.doc("users/"+UID).set({best:B},{merge:true}).catch(()=>{})}
function recordScore(s,q,sc,n){
 const bn=+window.__bonus||0;window.__bonus=0;
 const B=bestMap(),k=bkey(s,q),pv=B[k],tot=sc+bn,old=pv?pv.s+(pv.b||0):0;
 if(!pv||tot>old){const gain=tot-old;B[k]={s:sc,t:n,b:bn};try{localStorage.setItem(BK,JSON.stringify(B))}catch(e){}pushLB();
  if(gain>0)toast("🏆 +"+gain+" نقطة · مجموع نقاطك "+totals(B).p)}
 else toast("لم تتجاوز أفضل نتيجة سابقة لك في هذا الاختبار، فلا نقاط جديدة.")}
const _cloudAttempt=cloudAttempt;cloudAttempt=function(s,q,sc,n){_cloudAttempt(s,q,sc,n);recordScore(s,q,sc,n)};
const _cloudName=cloudName;cloudName=function(v){_cloudName(v);pushLB(v)};
const _subjects=subjects;subjects=function(){_subjects();const t=document.getElementById("tm");
 if(t){t.insertAdjacentHTML("afterend",'<button class="bk2" id="lbb"><span>🏆</span>لوحة الأوائل ونقاطي</button>');document.getElementById("lbb").onclick=()=>board("lb")}};
const tms=v=>v&&v.toMillis?v.toMillis():(+v||0);
async function board(tab){
 page(`<h2>🏆 لوحة الأوائل ونقاطي</h2><div style="display:flex;gap:8px"><button class="btn ${tab==="lb"?"":"alt"}" id="t1">🏆 الأوائل</button><button class="btn ${tab==="me"?"":"alt"}" id="t2">📊 لوحتي</button></div><div id="bd" class="msg" style="margin:12px 0">جاري التحميل…</div>`,subjects);
 document.getElementById("t1").onclick=()=>board("lb");document.getElementById("t2").onclick=()=>board("me");
 const bd=document.getElementById("bd");
 if(!db||!UID){bd.textContent="سجّل الدخول لعرض اللوحة والنقاط.";return}
 let att=[],rows=[];
 try{const sn=await db.collection("users/"+UID+"/attempts").get();sn.forEach(x=>att.push(x.data()));
  const B=bestMap();let ch=false;att.forEach(a=>{if(!a||!a.quiz)return;const k=bkey(a.subject,a.quiz);if(!B[k]||(a.score+(a.bonus||0))>(B[k].s+(B[k].b||0))){B[k]={s:a.score,t:a.total,b:a.bonus||0};ch=true}});
  if(ch){try{localStorage.setItem(BK,JSON.stringify(B))}catch(e){}pushLB()}}catch(e){}
 try{const sn=await db.collection("leaderboard").orderBy("points","desc").limit(50).get();sn.forEach(x=>{const o=x.data();if(o)rows.push({id:x.id,name:o.name||"طالب",p:o.points||0,c:o.quizzes||0})})}
 catch(e){bd.textContent="تعذر تحميل لوحة الأوائل ("+(e.code||"خطأ")+"). تأكد من نشر قواعد Firestore الجديدة.";if(tab==="lb")return}
 rows.sort((a,b)=>b.p-a.p||b.c-a.c);
 const B=bestMap(),T=totals(B),pos=rows.findIndex(r=>r.id===UID);
 bd.className="";bd.style.margin="12px 0";
 if(tab==="lb"){
  const md=["🥇","🥈","🥉"];
  bd.innerHTML=`<div class="q" style="margin:0 0 10px;text-align:center"><b>${pos>=0?"ترتيبك: "+(pos+1)+" من "+rows.length:"لم تدخل قائمة الأوائل بعد — حل اختبارا لتحصل على نقاط"}</b><div style="color:var(--mut);font-size:13px;margin-top:4px">نقاطك: ${T.p} · النقاط = مجموع أفضل نتيجة لك في كل اختبار (إعادة الاختبار لا تضاعف النقاط إلا إذا تحسّنت نتيجتك)</div></div>`+
  (rows.length?rows.map((r,i)=>`<div class="q" style="margin-top:8px;display:flex;align-items:center;gap:10px;${r.id===UID?"border-color:var(--pri);background:rgba(27,127,92,.08)":""}"><span style="font-size:22px;min-width:34px;text-align:center">${md[i]||i+1}</span><b style="flex:1">${esc(r.name)}${r.id===UID?" (أنت)":""}</b><span style="text-align:left"><b>${r.p}</b> نقطة<div style="color:var(--mut);font-size:12px">${r.c} اختبار</div></span></div>`).join(""):'<div class="msg">لا توجد نتائج بعد. كن أول من يحل اختبارا!</div>');
 }else{
  const sub={};Object.keys(B).forEach(k=>{const s=k.split("~")[0];(sub[s]=sub[s]||{p:0,t:0,c:0});sub[s].p+=B[k].s;sub[s].t+=B[k].t;sub[s].c++});
  att.sort((a,b)=>tms(b.at)-tms(a.at));
  bd.innerHTML=`<div class="q" style="margin:0;text-align:center"><div class="score" style="margin:0">${T.p} نقطة</div><div style="color:var(--mut);margin-top:4px">${T.c} اختبار · متوسط أفضل النتائج ${T.avg}%${pos>=0?" · ترتيبك "+(pos+1):""}</div></div>`+
  `<h3 style="color:var(--pri);margin:14px 0 4px">درجاتك حسب المادة</h3>`+(Object.keys(sub).length?Object.keys(sub).map(s=>`<div class="q" style="margin-top:6px;display:flex;justify-content:space-between"><b>${esc(s)}</b><span>${sub[s].p} / ${sub[s].t} · ${Math.round(sub[s].p/sub[s].t*100)}% · ${sub[s].c} اختبار</span></div>`).join(""):'<div class="msg">لم تحل أي اختبار بعد.</div>')+
  `<h3 style="color:var(--pri);margin:14px 0 4px">آخر محاولاتك</h3>`+(att.length?att.slice(0,15).map(a=>`<div class="q" style="margin-top:6px"><b>${esc(a.quiz||"")}</b><div style="display:flex;justify-content:space-between;color:var(--mut);font-size:13px;margin-top:4px"><span>${esc(a.subject||"")}</span><span>${a.score} / ${a.total}${a.bonus?" · ⚡+"+a.bonus:""} · ${tms(a.at)?new Date(tms(a.at)).toLocaleDateString("ar-EG"):""}</span></div></div>`).join(""):'<div class="msg">لا توجد محاولات بعد.</div>');
 }}


