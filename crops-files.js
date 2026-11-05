/* ===== المحاصيل ← المحاضرات ← PDF : روابط Drive (المحاضرات 1-4 و 5-6) =====
   يضيف الملفين فقط ولا يحذف/يغيّر أي شيء موجود. يستعمل نفس شكل ملفات Drive الموجودة في الموقع (مثل zoo.js). */
(function(){
var SUBJ="محاصيل";
var LINKS=[
 {nums:[1,2,3,4],id:"1a77G6FazC_CeXvvuR4j1UPWk69UrK00q",name:"أساسيات علوم المحاصيل – المحاضرات 1 إلى 4"},
 {nums:[5,6],id:"1MwOtbFW1Xu3mYgFhCYXHNvg0JSoT5zWm",name:"شرائح المحاضرتين 5 و6 مع الشرح"}
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
 var u=drv(L.id),id="cr-l"+n+"-"+(L.nums.length>1?L.nums[0]+"-"+L.nums[L.nums.length-1]:n);
 if(!tpl)return{id:id,name:L.name,view:u.view,dl:u.dl};
 var e=JSON.parse(JSON.stringify(tpl));e.id=id;e.name=L.name;fill(e,0,u);return e}
function apply(){
 var tpl=findTpl(),tries=apply.t=(apply.t||0)+1;
 if(!tpl&&tries<30){setTimeout(apply,300);return}
 LINKS.forEach(function(L){L.nums.forEach(function(n){
  var key=SUBJ+"|lec|pdf|"+n,arr=FILES[key]||(FILES[key]=[]);
  if(!arr.some(function(x){return x&&x.id&&x.id.indexOf("cr-l"+n+"-")===0}))arr.push(make(tpl,L,n))})})}
if(typeof window!=="undefined"){
 if(document.readyState==="complete")apply();else window.addEventListener("load",apply)}
})();
