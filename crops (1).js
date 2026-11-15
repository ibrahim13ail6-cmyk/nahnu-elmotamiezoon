/* ===== المحاصيل ← المحاضرات ← PDF (1-4 و 5-6) + المحاصيل ← السكاشن ← PDF (1-4) + المحاصيل ← الاختبارات ← أسئلة مهمة : روابط Drive =====
   يضيف الملفين فقط ولا يحذف/يغيّر أي شيء موجود. يستعمل نفس شكل ملفات Drive الموجودة في الموقع (مثل zoo.js). */
(function(){
if(window.__cropsLoaded)return;window.__cropsLoaded=true;
var SUBJ="محاصيل";
var LINKS=[
 {nums:[1,2,3,4],id:"1a77G6FazC_CeXvvuR4j1UPWk69UrK00q",name:"أساسيات علوم المحاصيل – المحاضرات 1 إلى 4"},
 {nums:[5,6],id:"1MwOtbFW1Xu3mYgFhCYXHNvg0JSoT5zWm",name:"شرائح المحاضرتين 5 و6 مع الشرح"},
 {kind:"sec",nums:[1,2,3,4],id:"1yYzmi9CIzMquvM8VRPijNQU4mB0pNBZh",name:"خدمة الأرض قبل الزراعة"}
];
function drv(id){return{view:"https://drive.google.com/file/d/"+id+"/view?usp=drivesdk",dl:"https://drive.google.com/uc?export=download&id="+id}}
function findTpl(){
 if(typeof FILES==="undefined")return null;
 var found=null;
 function has(o,d){if(found||!o||typeof o!=="object"||d>4)return;
  if(typeof o.view==="string"&&o.view.indexOf("drive.google.com")>=0){found=true;return}
  for(var k in o)has(o[k],d+1)}
 var all=[];Object.keys(FILES).forEach(function(k){(FILES[k]||[]).forEach(function(e){all.push(e)})});
 for(var i=0;i<all.length;i++){found=null;has(all[i],0);if(found)return all[i]}
 return null}
function fill(o,d,u){
 if(!o||typeof o!=="object"||d>4)return;
 if(typeof o.view==="string"){o.view=u.view;if("dl"in o)o.dl=u.dl}
 for(var k in o){if(typeof o[k]==="object")fill(o[k],d+1,u)}}
function make(tpl,L,n){
 var u=drv(L.id),id="cr-"+(L.kind==="sec"?"s":"l")+n+"-"+(L.nums.length>1?L.nums[0]+"-"+L.nums[L.nums.length-1]:n);
 if(!tpl)return{id:id,name:L.name,view:u.view,dl:u.dl};
 var e=JSON.parse(JSON.stringify(tpl));e.id=id;e.name=L.name;fill(e,0,u);return e}
function apply(){
 var tpl=findTpl(),tries=apply.t=(apply.t||0)+1;
 if(!tpl&&tries<30){setTimeout(apply,300);return}
 LINKS.forEach(function(L){L.nums.forEach(function(n){
  var pre="cr-"+(L.kind==="sec"?"s":"l"),key=SUBJ+(L.kind==="sec"?"|sec|pdf|":"|lec|pdf|")+n,arr=FILES[key]||(FILES[key]=[]);
  if(!arr.some(function(x){return x&&x.id&&x.id.indexOf(pre+n+"-")===0}))arr.push(make(tpl,L,n))})})}

/* ---- المحاصيل ← الاختبارات: خانة "أسئلة مهمة" (رابط Drive) — بتتضاف فوق قائمة الاختبارات ولا تمس أي اختبار موجود ---- */
var IMP={name:"أسئلة مهمة",id:"1ZyY_cAiSHWEtB1Uu3W64z739IqvZEaH_"};
function addImportant(){
 var tries=0;
 (function go(){
  var lists=document.querySelectorAll(".list"),host=lists[lists.length-1];
  if(!host){if(tries++<10)setTimeout(go,100);return}
  if(host.querySelector(".cr-imp"))return;
  var a=document.createElement("a");
  a.className="opt cr-imp";a.href=drv(IMP.id).view;a.target="_blank";a.rel="noopener noreferrer";
  a.innerHTML="📄 "+IMP.name+"<small>PDF</small>";
  host.insertBefore(a,host.firstChild)})()}
function hookQuiz(){
 if(typeof quizList!=="function"){if((hookQuiz.t=(hookQuiz.t||0)+1)<30)setTimeout(hookQuiz,300);return}
 if(quizList.__cr)return;
 var orig=quizList,w=function(s){var r=orig.apply(this,arguments);if(s===SUBJ)addImportant();return r};
 w.__cr=true;quizList=w}
if(typeof window!=="undefined"){
 if(document.readyState==="complete"){apply();hookQuiz()}else window.addEventListener("load",function(){apply();hookQuiz()})}
})();
