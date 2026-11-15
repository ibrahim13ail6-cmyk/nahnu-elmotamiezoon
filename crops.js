/* ===== crops.js — المحاصيل: روابط Drive (محاضرات 1-4 و5-6 · سكاشن 1-4 · أسئلة مهمة) =====
   لا يغيّر شكل الواجهة: يضيف الملفات في نفس الخانات الموجودة. لو الخانات مش ظاهرة افتح crops.html?debug=1 وابعت سكرين شوت. */
(function(){
if(window.__cropsLoaded)return;window.__cropsLoaded=true;
var SUBJ="محاصيل";
var LINKS=[
 {kind:"lec",nums:[1,2,3,4],id:"1a77G6FazC_CeXvvuR4j1UPWk69UrK00q",name:"أساسيات علوم المحاصيل – المحاضرات 1 إلى 4"},
 {kind:"lec",nums:[5,6],id:"1MwOtbFW1Xu3mYgFhCYXHNvg0JSoT5zWm",name:"شرائح المحاضرتين 5 و6 مع الشرح"},
 {kind:"sec",nums:[1,2,3,4],id:"1yYzmi9CIzMquvM8VRPijNQU4mB0pNBZh",name:"خدمة الأرض قبل الزراعة"}
];
var IMP={name:"أسئلة مهمة",id:"1ZyY_cAiSHWEtB1Uu3W64z739IqvZEaH_"};
var LOG=[];function log(m){LOG.push(m);try{console.log("[crops.js]",m)}catch(e){}}
function drv(id){return{view:"https://drive.google.com/file/d/"+id+"/view?usp=drivesdk",dl:"https://drive.google.com/uc?export=download&id="+id}}

/* FILES قد يكون const/let عام أو window.FILES */
function getFiles(){try{if(typeof FILES!=="undefined"&&FILES)return FILES}catch(e){}return window.FILES||null}

/* نسخة من أي ملف Drive موجود في الموقع لنأخذ منه نفس شكل الكائن */
function findTpl(F){
 var found=null;
 function has(o,d){if(found||!o||typeof o!=="object"||d>4)return;
  if(typeof o.view==="string"&&o.view.indexOf("drive.google.com")>=0){found=true;return}
  for(var k in o)has(o[k],d+1)}
 var ks=Object.keys(F);
 for(var i=0;i<ks.length;i++){var arr=F[ks[i]];if(!Array.isArray(arr))continue;
  for(var j=0;j<arr.length;j++){found=null;has(arr[j],0);if(found)return arr[j]}}
 return null}
function fill(o,d,u){
 if(!o||typeof o!=="object"||d>4)return;
 if(typeof o.view==="string"){o.view=u.view;if("dl" in o)o.dl=u.dl}
 for(var k in o){if(typeof o[k]==="object")fill(o[k],d+1,u)}}
function make(tpl,L,n){
 var u=drv(L.id),id="cr-"+L.kind+n+"-"+(L.nums.length>1?L.nums[0]+"-"+L.nums[L.nums.length-1]:n);
 if(!tpl)return{id:id,name:L.name,view:u.view,dl:u.dl,ext:u.view};
 var e=JSON.parse(JSON.stringify(tpl));e.id=id;e.name=L.name;fill(e,0,u);
 if("ext" in e)e.ext=u.view;return e}

/* اكتشاف شكل المفاتيح الفعلي: لو الموقع بيستعمل مفاتيح للمحاصيل بنستعملها زي ما هي */
function keyFor(F,kind,n){
 var want=kind==="lec"?["lec","lecture","lect","lectures","lecs"]:["sec","section","sect","sections"];
 var ks=Object.keys(F);
 for(var i=0;i<ks.length;i++){var p=ks[i].split("|");
  if(p[0]===SUBJ&&p.length>=4&&p[2]==="pdf"&&want.indexOf(p[1])>=0)return SUBJ+"|"+p[1]+"|pdf|"+n}
 return SUBJ+"|"+kind+"|pdf|"+n}

var applied=0;
function apply(){
 var F=getFiles(),t=apply.t=(apply.t||0)+1;
 if(!F){if(t<40){setTimeout(apply,250);return}log("FILES غير موجود");return}
 var tpl=findTpl(F);
 if(!tpl&&t<12){setTimeout(apply,250);return}
 LINKS.forEach(function(L){L.nums.forEach(function(n){
  var key=keyFor(F,L.kind,n),arr=F[key]||(F[key]=[]),pre="cr-"+L.kind+n+"-";
  if(!arr.some(function(x){return x&&x.id&&String(x.id).indexOf(pre)===0})){arr.push(make(tpl,L,n));applied++}})});
 log("تمت إضافة "+applied+" ملف · قالب الملفات: "+(tpl?"موجود":"غير موجود"))}

/* خانة "أسئلة مهمة" داخل قائمة اختبارات المحاصيل */
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
 var q;try{q=(typeof quizList==="function")?quizList:null}catch(e){q=null}
 if(!q){if((hookQuiz.t=(hookQuiz.t||0)+1)<30)setTimeout(hookQuiz,300);else log("quizList غير موجودة");return}
 if(q.__cr)return;
 var w=function(s){var r=q.apply(this,arguments);if(s===SUBJ)addImportant();return r};
 w.__cr=true;try{quizList=w}catch(e){window.quizList=w}}

/* لوحة تشخيص: تظهر فقط مع ?debug=1 في الرابط */
function debugPanel(){
 if(!/[?&]debug=1/.test(location.search))return;
 setTimeout(function(){
  var F=getFiles(),d=document.createElement("pre");
  var keys=F?Object.keys(F):[];
  d.style.cssText="position:fixed;bottom:0;left:0;right:0;max-height:45vh;overflow:auto;margin:0;padding:8px;background:#111;color:#0f0;font:12px/1.5 monospace;z-index:99999;direction:ltr;white-space:pre-wrap";
  d.textContent=["crops.js debug","FILES: "+(F?"موجود ("+keys.length+" مفتاح)":"غير موجود"),
   "PAGE: "+JSON.stringify(window.PAGE),
   "مفاتيح المحاصيل: "+keys.filter(function(k){return k.indexOf(SUBJ)===0}).join(" , "),
   "أمثلة مفاتيح: "+keys.slice(0,12).join(" , "),
   "quizList: "+(function(){try{return typeof quizList}catch(e){return "n/a"}})(),
   "---"].concat(LOG).join("\n");
  (document.body||document.documentElement).appendChild(d)},2500)}

function boot(){apply();hookQuiz();debugPanel()}
if(document.readyState==="complete")boot();else window.addEventListener("load",boot);
})();
