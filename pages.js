/* التنقل بين صفحات المنصة (كل مادة في صفحة HTML مستقلة) */
const PGS={"اقتصاد":"economics.html","حاسب آلي":"computer.html","حيوان زراعي":"animal.html","رياضة عامة":"math.html","نبات":"botany.html","الكيمياء":"chemistry.html","محاصيل":"crops.html"};
const PG=window.PAGE||{};
const _subjectsHome=subjects;let _firstOpen=true;
subjects=function(){
 if((PG.subject||PG.fn)&&_firstOpen){_firstOpen=false;
  if(PG.subject)subject(PG.subject);else if(PG.fn==="board")board("lb");else if(PG.fn==="planner")planner();else if(PG.fn==="timer")timer();
  return}
 if(PG.subject||PG.fn){location.href="index.html";return}
 _subjectsHome();
 document.querySelectorAll(".sub").forEach((b,i)=>{const u=PGS[SUBJECTS[i][0]];if(u)b.onclick=()=>{location.href=u}});
 const L=(id,u)=>{const e=document.getElementById(id);if(e)e.onclick=()=>{location.href=u}};
 L("lbb","leaderboard.html");L("tp","planner.html");L("tm","timer.html");
};
boot();
