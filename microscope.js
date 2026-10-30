/* ===== الميكروسكوب: الأجزاء + ضبط العينة + سؤال النسيج ===== */

/* ---------- وصف الأجزاء ---------- */
const PARTS={
  eyepiece:{name:"العدسة العينية",text:"العدسة اللي بتقرّب فيها عينك، وبتكبّر الصورة اللي جاية من العدسة الشيئية (غالباً ×10)."},
  tube:{name:"رأس الميكروسكوب",text:"الجزء العلوي اللي بيحمل العدسات العينية والمنشور، وبيوصّل بينها وبين العدسات الشيئية."},
  objectives:{name:"العدسات الشيئية",text:"بتكوّن صورة حقيقية للعينة وبتكبّرها بدرجات مختلفة: 4x و10x و40x و100x. العدسة 100x بتتغمس في زيت الأرز."},
  nosepiece:{name:"القرص الدوار",text:"بيحمل العدسات الشيئية ويتدار عشان تغيّر التكبير. ابدأ دايماً بالعدسة الصغرى 4x أو 10x."},
  arm:{name:"الذراع",text:"الجزء المنحني اللي بتمسكه عند النقل. امسك الذراع بإيد واليد التانية تحت القاعدة."},
  coarse:{name:"المفتاح الخشن (مقبض الضبط الكبير)",text:"بيحرّك المنصة بحركة كبيرة وسريعة عشان تقرّب العينة من العدسة. استخدمه في البداية."},
  fine:{name:"المفتاح الدقيق (مقبض الضبط الدقيق)",text:"بيعمل حركة بطيئة وبسيطة عشان توصل للوضوح الكامل. استخدمه بعد الخشن."},
  stage:{name:"المنضدة (المسرح)",text:"المكان اللي بتحط عليه الشريحة، والماسكين بيثبّتوها."},
  condenser:{name:"المكثّف",text:"بيجمع الضوء ويوجّهه على العينة عشان تكون واضحة ومضاءة."},
  diaphragm:{name:"الحاجز (القزحي)",text:"بينظّم كمية الضوء الداخلة للعدسة. الضوء الكتير بيباهت الصورة، والقليل بيعتّمها."},
  light:{name:"مصدر الضوء",text:"بينوّر العينة من تحت، وده اللي بيخلّي الصورة ظاهرة."},
  base:{name:"القاعدة",text:"الجزء السفلي اللي بيحمل الميكروسكوب كله ويثبّته على الطاولة، وفيها مصدر الضوء."}
};

/* ---------- رسم الميكروسكوب ---------- */
const NS="http://www.w3.org/2000/svg";
const svg=document.getElementById("diagram");
function el(t,a={},p=svg){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
function group(key,cls=""){const g=el("g",{class:"part "+cls,"data-k":key});g.addEventListener("click",()=>select(key));return g}
const BODY="#eef1f4",BODY_D="#9aa5b1",BLACK="#1c1f24";

// القاعدة + الضوء
{const g=group("base");
 el("path",{d:"M 60 448 Q 60 422 92 422 L 310 422 Q 345 422 345 448 L 345 460 L 60 460 Z",class:"shape",fill:BODY,stroke:BODY_D,"stroke-width":2},g);
 el("rect",{x:150,y:440,width:110,height:8,rx:3,fill:BODY_D},g);}
{const g=group("light");el("circle",{cx:200,cy:410,r:9,class:"shape",fill:"#ffe066",stroke:"#c9a400","stroke-width":1.5},g)}

// الذراع
{const g=group("arm");
 el("path",{d:"M 300 420 C 335 360 345 265 305 185 L 292 128",fill:"none",stroke:BODY_D,"stroke-width":40,"stroke-linecap":"round"},g);
 el("path",{d:"M 300 420 C 335 360 345 265 305 185 L 292 128",class:"shape",fill:"none",stroke:BODY,"stroke-width":32,"stroke-linecap":"round"},g);}

// رأس الميكروسكوب والأنبوب
{const g=group("tube");
 el("path",{d:"M 128 128 Q 128 92 170 92 L 260 92 Q 292 92 292 128 Z",class:"shape",fill:BODY,stroke:BODY_D,"stroke-width":2},g);
 el("rect",{x:112,y:112,width:192,height:26,rx:12,class:"shape",fill:BODY,stroke:BODY_D,"stroke-width":2},g);}

// العدسات العينية
{const g=group("eyepiece");
 [[160,-8],[204,8]].forEach(([x,r])=>el("rect",{x:x,y:14,width:32,height:86,rx:10,transform:`rotate(${r} ${x+16} 100)`,class:"shape",fill:BLACK,stroke:"#000","stroke-width":1},g));
 el("text",{x:200,y:8,"text-anchor":"middle",fill:"#333","font-size":11,"pointer-events":"none"},g).textContent="10x";}

// برج العدسات (القرص الدوار)
{const g=group("nosepiece");
 el("ellipse",{cx:200,cy:146,rx:58,ry:14,class:"shape",fill:BODY_D,stroke:"#6b7785","stroke-width":1.5},g);}

// العدسات الشيئية (4 عدسات، كل واحدة قابلة للنقر)
const OBJ=[{m:4,x:150,h:40,c:"#e25555"},{m:10,x:176,h:52,c:"#f0c040"},{m:40,x:202,h:64,c:"#4a90d9"},{m:100,x:228,h:76,c:"#f2f2f2"}];
const objGroups={};
OBJ.forEach(o=>{
  const g=el("g",{class:"obj",id:"obj"+o.m,"data-m":o.m});
  el("rect",{x:o.x,y:156,width:20,height:o.h,rx:4,fill:BLACK,stroke:"#000","stroke-width":1},g);
  el("rect",{x:o.x,y:156+o.h*0.3,width:20,height:5,fill:o.c},g);
  el("text",{x:o.x+10,y:156+o.h+12,"text-anchor":"middle","font-size":10,fill:"#222","pointer-events":"none"},g).textContent=o.m+"x";
  g.addEventListener("click",e=>{e.stopPropagation();setMag(o.m);select("objectives")});
  objGroups[o.m]=g;
});

// المنضدة والماسكين
{const g=group("stage");
 el("rect",{x:95,y:236,width:210,height:12,rx:3,class:"shape",fill:"#2b2f36",stroke:"#000","stroke-width":1},g);
 el("rect",{x:150,y:226,width:18,height:10,rx:2,fill:"#7f8c99"},g);
 el("rect",{x:212,y:226,width:18,height:10,rx:2,fill:"#7f8c99"},g);}

// المكثّف
{const g=group("condenser");el("rect",{x:172,y:250,width:58,height:26,rx:5,class:"shape",fill:"#3d444d",stroke:"#000","stroke-width":1},g)}

// الحاجز (لفاعل الضوء)
{const g=group("diaphragm");
 el("line",{x1:236,y1:272,x2:272,y2:276,stroke:BLACK,"stroke-width":5,"stroke-linecap":"round"},g);
 el("circle",{cx:272,cy:276,r:5,fill:"#7f8c99"},g);}

// مفاتيح الضبط (تتحرك بالسحب)
function knob(id,cx,cy,r,fill,key){
  const g=el("g",{class:"knob part","data-k":key,id:id});
  el("circle",{cx,cy,r,fill,stroke:"#000","stroke-width":1.5},g);
  const ind=el("g",{transform:`rotate(0 ${cx} ${cy})`},g);
  el("line",{x1:cx,y1:cy-r+4,x2:cx,y2:cy-r+11,stroke:"#fff","stroke-width":3,"stroke-linecap":"round"},ind);
  g.addEventListener("click",()=>select(key));
  g.indicator=ind;g.cx=cx;g.cy=cy;
  return g;
}
const knobCoarse=knob("kCoarse",312,190,26,"#1f2328","coarse");
const knobFine=knob("kFine",312,238,15,"#33383f","fine");

// الأسماء والخطوط الواصلة
const LABELS=[
  {k:"eyepiece",side:"L",y:28,tx:168,ty:36},
  {k:"tube",side:"L",y:106,tx:140,ty:110},
  {k:"objectives",side:"L",y:176,tx:150,ty:184},
  {k:"nosepiece",side:"L",y:150,tx:160,ty:146},
  {k:"stage",side:"L",y:244,tx:95,ty:242},
  {k:"condenser",side:"L",y:280,tx:172,ty:266},
  {k:"diaphragm",side:"L",y:312,tx:262,ty:276},
  {k:"light",side:"L",y:398,tx:192,ty:410},
  {k:"base",side:"L",y:452,tx:110,ty:448},
  {k:"arm",side:"R",y:300,tx:300,ty:300},
  {k:"coarse",side:"R",y:182,tx:338,ty:190},
  {k:"fine",side:"R",y:246,tx:327,ty:238}
];
const SHORT={eyepiece:"العدسة العينية",tube:"رأس الميكروسكوب",objectives:"العدسات الشيئية",nosepiece:"القرص الدوار",
  arm:"الذراع",coarse:"المفتاح الخشن",fine:"المفتاح الدقيق",stage:"المنضدة",condenser:"المكثّف",
  diaphragm:"الحاجز",light:"مصدر الضوء",base:"القاعدة"};
LABELS.forEach(L=>{
  const x=L.side==="L"?6:358, anchorX=L.side==="L"?96:358;
  el("line",{x1:anchorX,y1:L.y-4,x2:L.tx,y2:L.ty,class:"leader"});
  const t=el("text",{x:x,y:L.y,class:"lab","data-k":L.k,"text-anchor":"start"});
  t.textContent=SHORT[L.k];
  t.addEventListener("click",()=>select(L.k));
});

/* ---------- عرض الاختيار ---------- */
function select(k){
  const p=PARTS[k];
  document.getElementById("info").innerHTML=`<b>${p.name}</b><br>${p.text}`;
  svg.querySelectorAll(".part,.knob").forEach(x=>x.classList.remove("sel"));
  svg.querySelectorAll(".lab").forEach(x=>x.classList.toggle("sel",x.dataset.k===k));
  let target=svg.querySelector(`[data-k="${k}"]`);
  if(k==="objectives"){target=null;Object.values(objGroups).forEach(g=>g.classList.add("on"));Object.values(objGroups).forEach(g=>{if(+g.dataset.m!==mag)g.classList.remove("on")})}
  else Object.values(objGroups).forEach(g=>g.classList.toggle("on",+g.dataset.m===mag));
  if(target&&target.classList)target.classList.add("sel");
}

/* ---------- العينات ---------- */
const TYPES={
  cube:{name:"بسيط مكعب",info:"خلايا مكعبة في طبقة واحدة، نواتها في المنتصف، ومكانها القنوات الصفراوية والأنابيب الكلوية."},
  col:{name:"بسيط عمادي",info:"خلايا عمودية مستطيلة في طبقة واحدة، نوى قرب القاعدة، ومكانها المعدة والأمعاء، وسطحها الحر فيه زغابات."},
  strat:{name:"مركب حرشفي",info:"عدة طبقات من الخلايا، والسطحية مفلطحة، ومكانها بشرة الجلد."}
};
const ORDER=["cube","col","strat"];
function rnd(seed){let a=seed|0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function makeSample(type){
  const c=document.createElement("canvas");c.width=c.height=800;const g=c.getContext("2d");
  const r=rnd(Math.floor(Math.random()*1e9));
  g.fillStyle="#f7eaf1";g.fillRect(0,0,800,800);
  if(type==="cube"){
    for(let y=0;y<8;y++)for(let x=0;x<8;x++){
      const s=100+r()*4-2,px=x*100+r()*6,py=y*100+r()*6;
      g.fillStyle="#f0a9c9";g.fillRect(px,py,s,s);
      g.strokeStyle="#9c4c7c";g.lineWidth=3;g.strokeRect(px,py,s,s);
      g.fillStyle="#5b2a86";g.beginPath();g.arc(px+s/2,py+s/2,s*0.16,0,Math.PI*2);g.fill();
    }
  }else if(type==="col"){
    for(let x=0;x<16;x++){
      const w=50+r()*4,px=x*50;
      g.fillStyle="#e596bb";g.fillRect(px,120,w,600);
      g.strokeStyle="#9c4c7c";g.lineWidth=2;g.strokeRect(px,120,w,600);
      for(let k=0;k<5;k++){g.beginPath();g.moveTo(px+6+k*9,120);g.lineTo(px+6+k*9,108);g.stroke()}
      g.fillStyle="#4b2170";g.beginPath();g.ellipse(px+w/2,600,w*0.22,w*0.16,0,0,Math.PI*2);g.fill();
    }
    g.fillStyle="#d9b3c9";g.fillRect(0,720,800,80);
  }else{
    for(let L=0;L<6;L++){
      const y=120+L*100;
      for(let i=0;i<22;i++){
        const x=i*38+r()*4,ry=L===0?16:36,rx=L===0?30:20;
        g.fillStyle=L===0?"#f9d5e4":"#f0a9c9";
        g.beginPath();g.ellipse(x+19,y+ry+r()*8,rx,ry,0,0,Math.PI*2);g.fill();
        g.strokeStyle="#9c4c7c";g.lineWidth=2;g.stroke();
        g.fillStyle="#5b2a86";g.beginPath();g.arc(x+19,y+ry+r()*8,4,0,Math.PI*2);g.fill();
      }
    }
    g.fillStyle="#d9b3c9";g.fillRect(0,740,800,60);
  }
  return c;
}
/* صورة حقيقية من الشريحة (من محاضرة الميكروسكوب): بتتعرض كعينة من نوع بسيط عمادي */
const realImg=new Image();let realReady=false;
realImg.onload=()=>{realReady=true};realImg.src="microscope_sample_real.jpg";
function makeRealSample(){
  const c=document.createElement("canvas");c.width=c.height=800;const g=c.getContext("2d");
  g.drawImage(realImg,0,0,800,800);return c;
}

/* ---------- الضبط والعرض ---------- */
const cv=document.getElementById("cv"),ctx=cv.getContext("2d");
const $=id=>document.getElementById(id);
const TOL={4:4,10:2,40:0.7,100:0.3}, SCALE={4:0.7,10:1.3,40:3.2,100:6};
let mag=10,target=0,coarse=0,fine=0,sample=null,sampleType=null,answered=false,results=[];

function setMag(m){
  mag=m;
  document.querySelectorAll("#objs button").forEach(b=>b.classList.toggle("on",+b.dataset.m===m));
  Object.values(objGroups).forEach(g=>g.classList.toggle("on",+g.dataset.m===m));
  draw();
}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function setFocus(c,f){
  coarse=clamp(c,-100,100);fine=clamp(f,-5,5);
  $("coarse").value=coarse;$("fine").value=fine;
  draw();
}
function draw(){
  const focusVal=coarse+fine;
  const err=Math.abs(focusVal-target),tol=TOL[mag];
  const blur=err>tol?Math.min(12,1+(err-tol)*0.5):0;
  const light=+$("light").value/100;
  ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,600,600);
  ctx.fillStyle="#000";ctx.fillRect(0,0,600,600);
  const s=SCALE[mag]*0.75;
  ctx.save();ctx.translate(300,300);ctx.scale(s,s);ctx.translate(-400,-400);
  try{ctx.filter=`blur(${blur.toFixed(2)}px)`}catch(e){}
  ctx.globalAlpha=light;ctx.drawImage(sample,0,0);
  ctx.restore();ctx.filter="none";ctx.globalAlpha=1;
  // تظليل الإضاءة (الحاجز)
  const g=ctx.createRadialGradient(300,300,40,300,300,300);
  g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,`rgba(0,0,0,${(1-light)*0.7})`);
  ctx.fillStyle=g;ctx.fillRect(0,0,600,600);

  $("bar").style.width=Math.max(0,100-Math.min(err,100)).toFixed(0)+"%";
  $("bar").style.background=err<=tol?"var(--ok)":(err<12?"#f9a825":"var(--bad)");
  const focused=err<=tol;
  if(focused){$("msg").textContent="✅ العينة واضحة، حدّد النسيج";$("msg").className="msg ok"}
  else if(err<12){$("msg").textContent="قربت، ضبّط المفتاح الدقيق";$("msg").className="msg"}
  else {$("msg").textContent="العينة مش واضحة، حرّك المفتاح الخشن";$("msg").className="msg bad"}
  $("hint").textContent=`التكبير ${mag}x · مدى الضبط المسموح ±${tol}`;
  setQuestionEnabled(focused && !answered);
}

/* سحب المفاتيح */
function bindKnob(g,onDelta){
  let last=null;
  const angle=e=>{const r=g.getBoundingClientRect();return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))};
  g.addEventListener("pointerdown",e=>{last=angle(e);g.setPointerCapture(e.pointerId);select(g.id==="kCoarse"?"coarse":"fine")});
  g.addEventListener("pointermove",e=>{
    if(last===null)return;
    const a=angle(e);let d=a-last;
    if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;
    last=a;onDelta(d);
    g.indicator.setAttribute("transform",`rotate(${(d*180/Math.PI+0).toFixed(1)} ${g.cx} ${g.cy})`);
  });
  const end=()=>{last=null};
  g.addEventListener("pointerup",end);g.addEventListener("pointercancel",end);
}
bindKnob(knobCoarse,d=>setFocus(coarse+d*20/(2*Math.PI),fine));
bindKnob(knobFine,d=>setFocus(coarse,fine+d*1/(2*Math.PI)));

/* ---------- السؤال والإجابات ---------- */
function buildAnswers(){
  const box=$("answers");box.innerHTML="";
  ORDER.forEach(k=>{
    const b=document.createElement("button");b.className="ans";b.dataset.k=k;b.textContent="🔹 "+TYPES[k].name;
    b.onclick=()=>answer(k,b);b.disabled=true;box.appendChild(b);
  });
}
function setQuestionEnabled(on){
  if(answered)return;
  document.querySelectorAll("#answers .ans").forEach(b=>b.disabled=!on);
  $("qtext").textContent=on?"ما هو هذا النسيج؟":"🔒 أجب بعد ما تتضح العينة";
}
function answer(k,btn){
  if(answered)return;answered=true;
  const ok=k===sampleType;
  document.querySelectorAll("#answers .ans").forEach(b=>{b.disabled=true;if(b.dataset.k===sampleType)b.classList.add("right")});
  if(!ok)btn.classList.add("wrong");
  $("fb").textContent=(ok?"✅ إجابة صحيحة! ":"❌ إجابة خاطئة. ")+TYPES[sampleType].info;
  $("fb").className="msg "+(ok?"ok":"bad");
  $("next").disabled=false;
  const res={n:results.length+1,type:sampleType,answer:k,correct:ok,mag,focusErr:+Math.abs(coarse+fine-target).toFixed(2)};
  results.push(res);renderLog();
  try{window.parent.postMessage({ch:"microscope",res},"*")}catch(e){}
}
function renderLog(){
  const right=results.filter(r=>r.correct).length;
  $("score").textContent=`الإجابات الصح: ${right} من ${results.length}`;
  $("log").querySelector("tbody").innerHTML=results.map(r=>
    `<tr><td>${r.n}</td><td>${TYPES[r.type].name}</td><td>${TYPES[r.answer].name}</td><td>${r.correct?"✅":"❌"}</td></tr>`).join("");
}
function newSample(){
  sampleType=ORDER[Math.floor(Math.random()*ORDER.length)];
  sample=(sampleType==="col"&&realReady&&Math.random()<0.5)?makeRealSample():makeSample(sampleType);
  target=(Math.random()*160-80);
  answered=false;
  setFocus(0,0);
  $("fb").textContent="";$("next").disabled=true;
  buildAnswers();
  draw();
}

/* ---------- عناصر التحكم ---------- */
$("coarse").oninput=e=>setFocus(+e.target.value,fine);
$("fine").oninput=e=>setFocus(coarse,+e.target.value);
$("light").oninput=draw;
document.querySelectorAll("#objs button").forEach(b=>b.onclick=()=>{setMag(+b.dataset.m);select("objectives")});
$("next").onclick=newSample;

select("tube");
newSample();
