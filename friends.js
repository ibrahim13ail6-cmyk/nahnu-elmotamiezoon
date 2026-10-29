/* ===== friends.js — تحدّي الأصحاب: كود لكل طالب + أصحاب + تحدّيات (معركة الأبواب) =====
   يحتاج: Firebase Auth + Firestore (موجودين في core.js) وقواعد firestore-rules-add.txt
   الواجهة العامة: openChallenge() و chPing()  */
(function(){
"use strict";
const GAME=`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>تحدّي المتميزون</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lalezar&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
:root{
  --ink:#10305a; --ink-soft:#4b6a8c; --sky:#e4f3fa; --sky-2:#c6e3f1; --paper:#fff;
  --orange:#ff8a1f; --orange-d:#d96a00; --wa:#25d366; --wa-d:#17a34a; --bad:#c62828; --line:#c9dfeb;
  --display:"Lalezar","Tajawal",system-ui,sans-serif; --body:"Tajawal",system-ui,-apple-system,"Segoe UI",sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html{-webkit-text-size-adjust:100%}
body{font-family:var(--body);color:var(--ink);min-height:100vh;min-height:100dvh;line-height:1.6;
  background:
    radial-gradient(420px 420px at 100% 0%,#fff6 0,#fff0 70%),
    radial-gradient(520px 520px at 0% 100%,#ffb76b55 0,#ffb76b00 70%),
    linear-gradient(180deg,var(--sky),var(--sky-2));
  background-attachment:fixed}
.app{max-width:520px;margin:0 auto;padding:max(16px,env(safe-area-inset-top)) 16px max(28px,env(safe-area-inset-bottom))}
.brand{display:flex;align-items:center;gap:8px;font-weight:800;font-size:.95rem;color:var(--ink-soft);padding:6px 0 2px;margin-bottom:10px}
.brand i{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--paper);font-style:normal;box-shadow:0 2px 0 var(--line)}
.hero{font-family:var(--display);font-weight:400;font-size:clamp(2.7rem,13vw,4rem);line-height:1.05;margin:14px 0 8px;
  text-shadow:3px 3px 0 #fff,6px 6px 0 #10305a22}
.lead{font-size:1.05rem;color:var(--ink-soft);margin-bottom:18px;max-width:34ch}
.view[hidden]{display:none}
.card{background:var(--paper);border-radius:20px;padding:16px;margin-bottom:14px;box-shadow:0 3px 0 var(--line),0 14px 28px -18px #10305a66}
.card h2{font-size:1.05rem;font-weight:800;margin-bottom:10px}
label.f{display:block;font-weight:700;font-size:.92rem;margin:12px 0 6px}
input[type=text]{width:100%;min-height:48px;border:2px solid var(--line);border-radius:14px;padding:8px 14px;font:inherit;font-size:1.05rem;color:var(--ink);background:#f7fcff}
input[type=text]:focus{outline:3px solid #ff8a1f55;border-color:var(--orange)}
.chips,.seg{display:grid;gap:8px}
.chips{grid-template-columns:repeat(2,1fr)}
.seg{grid-template-columns:repeat(4,1fr)}
.opt input{position:absolute;opacity:0;pointer-events:none}
.opt span{display:flex;align-items:center;justify-content:center;gap:6px;min-height:46px;padding:6px 8px;border-radius:14px;border:2px solid var(--line);background:#f7fcff;font-weight:700;cursor:pointer;text-align:center;transition:transform .1s}
.opt input:checked+span{background:var(--ink);border-color:var(--ink);color:#fff}
.opt input:focus-visible+span{outline:3px solid var(--orange);outline-offset:2px}
.opt span:active{transform:scale(.97)}
.opt{position:relative}
.btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:52px;border:0;border-radius:16px;padding:10px 16px;font:inherit;font-weight:800;font-size:1.1rem;color:#fff;cursor:pointer;text-decoration:none;
  background:var(--orange);box-shadow:0 4px 0 var(--orange-d);transition:transform .08s,box-shadow .08s}
.btn:active{transform:translateY(3px);box-shadow:0 1px 0 var(--orange-d)}
.btn:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.btn.wa{background:var(--wa);box-shadow:0 4px 0 var(--wa-d)}
.btn.wa:active{box-shadow:0 1px 0 var(--wa-d)}
.btn.ghost{background:#fff;color:var(--ink);box-shadow:0 3px 0 var(--line);border:2px solid var(--line);min-height:46px;font-size:1rem}
.btn.ink{background:var(--ink);box-shadow:0 4px 0 #0a1f3c}
.row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
.join{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:end}
.join .btn{width:auto;min-width:96px}
.join input{direction:ltr;text-align:center;letter-spacing:.15em;font-weight:800;font-family:ui-monospace,Menlo,Consolas,monospace;text-transform:uppercase}
.err{color:var(--bad);font-weight:700;font-size:.9rem;min-height:1.4em;margin-top:6px}

/* تذكرة التحدي */
.ticket{position:relative;background:var(--paper);border-radius:22px;box-shadow:0 3px 0 var(--line),0 18px 30px -18px #10305a88;margin-bottom:14px;overflow:hidden}
.t-top{padding:18px 18px 16px;text-align:center}
.t-top .who{font-weight:700;color:var(--ink-soft);font-size:.95rem}
.t-top .subj{font-family:var(--display);font-size:2.1rem;line-height:1.2;margin:2px 0 10px}
.facts{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.facts b{background:var(--sky);border-radius:999px;padding:4px 14px;font-weight:800;font-size:.95rem}
.tear{position:relative;border-top:3px dashed var(--line);margin:0 22px}
.tear::before,.tear::after{content:"";position:absolute;top:-17px;width:30px;height:30px;border-radius:50%;background:var(--sky-2)}
.tear::before{right:-37px}.tear::after{left:-37px}
.t-bot{padding:14px 18px 18px;text-align:center}
.t-bot small{display:block;color:var(--ink-soft);font-weight:700;margin-bottom:4px}
.code{direction:ltr;unicode-bidi:isolate;font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:800;font-size:clamp(2rem,11vw,2.9rem);letter-spacing:.14em;line-height:1.2;user-select:all;-webkit-user-select:all;padding-inline-start:.14em}
.pop{animation:pop .35s cubic-bezier(.2,1.4,.4,1)}
@keyframes pop{from{transform:scale(.92) translateY(10px);opacity:0}to{transform:none;opacity:1}}

/* العدّ التنازلي */
.ready{min-height:60vh;display:grid;place-content:center;text-align:center;gap:8px}
.ready .n{font-family:var(--display);font-size:7rem;line-height:1}
.ready p{color:var(--ink-soft);font-weight:700}

.toast{position:fixed;inset-inline:16px;bottom:max(18px,env(safe-area-inset-bottom));margin:auto;max-width:360px;background:var(--ink);color:#fff;padding:12px 16px;border-radius:14px;text-align:center;font-weight:700;opacity:0;transform:translateY(12px);pointer-events:none;transition:.25s}
.toast.on{opacity:1;transform:none}
@media (max-width:360px){.seg{grid-template-columns:repeat(2,1fr)}}
@media (min-width:700px){.app{padding-top:36px}.hero{font-size:4.4rem}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

#vBattle{padding-bottom:20px}
.bt-top{display:flex;align-items:center;justify-content:space-between;gap:10px;font-weight:800;margin:6px 0 8px}
.bt-rnd{background:#fff;border-radius:999px;padding:4px 14px;box-shadow:0 2px 0 var(--line)}
.bt-time{font-family:var(--display);font-size:1.9rem;min-width:2.2ch;text-align:center;line-height:1}
.bt-bar{height:10px;border-radius:99px;background:#fff;overflow:hidden;box-shadow:inset 0 0 0 2px var(--line)}
.bt-bar i{display:block;height:100%;width:100%;background:var(--orange);transform-origin:right;transition:transform .1s linear}
.bt-arena{position:relative;display:flex;justify-content:space-between;align-items:flex-end;gap:8px;margin:14px 0 10px;padding:14px 10px;border-radius:22px;
  background:linear-gradient(180deg,#ffffffcc,#ffffff66);box-shadow:inset 0 0 0 2px #fff,0 12px 24px -18px #10305a88;perspective:900px;overflow:hidden}
.bt-arena::after{content:"";position:absolute;inset:0;background:#ef4444;opacity:0;pointer-events:none}
.bt-arena.hit::after{animation:btFlash .4s ease-out}
.bt-vs{position:absolute;inset-inline:0;top:52%;text-align:center;font-family:var(--display);font-size:1.7rem;opacity:.35;pointer-events:none}
.bt-side{width:45%;max-width:185px;position:relative}
.bt-name{display:flex;justify-content:space-between;gap:6px;font-weight:800;font-size:.88rem;margin-bottom:4px}
.bt-name span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bt-track{position:relative;height:18px;border-radius:99px;background:#10305a22;overflow:hidden;box-shadow:inset 0 0 0 2px #fff;margin-bottom:12px}
.bt-ghost,.bt-fill{position:absolute;top:0;bottom:0;right:0;width:100%;border-radius:99px;transition:width .55s cubic-bezier(.3,.8,.3,1),background .3s}
.opp .bt-ghost,.opp .bt-fill{right:auto;left:0}
.bt-ghost{background:#fca5a5;transition-duration:.9s;transition-delay:.4s}
.bt-fill{background:#22c55e}.bt-fill.mid{background:#f59e0b}.bt-fill.low{background:#ef4444}

.bt-door{position:relative;height:200px;--c:#1d6fb8;--cd:#0e4a80;transform:rotateY(14deg);transform-style:preserve-3d}
.opp .bt-door{--c:#e2611a;--cd:#a8410a;transform:rotateY(-14deg)}
.bt-frame{position:absolute;inset:0;border-radius:90px 90px 8px 8px;background:var(--cd);box-shadow:0 8px 0 var(--cd),0 14px 18px -8px #0006}
.bt-room{position:absolute;inset:8px;border-radius:82px 82px 2px 2px;display:grid;place-items:center;overflow:hidden;
  background:radial-gradient(circle at 50% 65%,#fff 0,#ffe6a0 38%,#8a5a1c 100%);filter:brightness(.55);transition:filter .45s}
.bt-av{font-size:3.4rem;transform:translateY(10px) scale(.75);opacity:.4;transition:transform .45s,opacity .45s}
.open .bt-room{filter:brightness(1.15)}
.open .bt-av{transform:none;opacity:1}
.bt-leaf{position:absolute;top:8px;bottom:8px;width:calc(50% - 8px);background:linear-gradient(90deg,var(--c),var(--cd));
  box-shadow:inset 0 0 0 5px #ffffff26;transition:transform .55s cubic-bezier(.5,.1,.2,1);backface-visibility:hidden}
.bt-leaf::after{content:"";position:absolute;top:52%;width:9px;height:9px;border-radius:50%;background:#ffd36b}
.bt-l1{right:8px;border-radius:0 82px 0 2px;transform-origin:right center}
.bt-l1::after{left:8px}
.bt-l2{left:8px;border-radius:82px 0 2px 0;transform-origin:left center}
.bt-l2::after{right:8px}
.open .bt-l1{transform:rotateY(-105deg)}
.open .bt-l2{transform:rotateY(105deg)}
.bt-door.shake{animation:btShake .5s}
.bt-door.ko{filter:grayscale(1) brightness(.7)}
.bt-door.win .bt-room{filter:brightness(1.3) saturate(1.3)}
.bt-dmg{position:absolute;inset-inline:0;top:20%;text-align:center;font-family:var(--display);font-size:2.3rem;color:#ef4444;text-shadow:2px 2px 0 #fff,-1px -1px 0 #fff;opacity:0;pointer-events:none}
.bt-dmg.go{animation:btFloat .95s ease-out}
.bt-orb{position:absolute;left:0;width:38px;height:10px;border-radius:10px;display:none;pointer-events:none;background:linear-gradient(to right,#fff 0,var(--oc,#38bdf8) 35%,transparent 100%);box-shadow:0 0 14px 4px var(--oc,#38bdf8)}
@keyframes btShake{0%,100%{translate:0 0}15%{translate:-10px 0}30%{translate:9px 0}45%{translate:-7px 0}60%{translate:6px 0}80%{translate:-3px 0}}
@keyframes btFloat{0%{opacity:0;translate:0 14px;scale:.6}20%{opacity:1;scale:1.15}100%{opacity:0;translate:0 -56px;scale:1}}
@keyframes btFlash{0%{opacity:.35}100%{opacity:0}}

.bt-msg{min-height:1.7em;text-align:center;font-weight:800;margin:4px 0 8px}
.bt-q{background:#fff;border-radius:20px;padding:14px;box-shadow:0 3px 0 var(--line),0 14px 28px -18px #10305a66}
.bt-q h3{font-size:1.1rem;font-weight:800;line-height:1.55;margin-bottom:12px}
.bt-opts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.bt-ans{min-height:54px;border:2px solid var(--line);border-radius:14px;background:#f7fcff;font:inherit;font-weight:700;font-size:.98rem;color:var(--ink);padding:8px;cursor:pointer;transition:transform .08s}
.bt-ans:active{transform:scale(.97)}
.bt-ans:focus-visible{outline:3px solid var(--orange);outline-offset:2px}
.bt-ans.ok{background:#dcfce7;border-color:#22c55e}
.bt-ans.no{background:#fee2e2;border-color:#ef4444}
.bt-ans[disabled]{cursor:default;transform:none}
.bt-end{text-align:center}
.bt-end .big{font-size:4rem;line-height:1.1}
.bt-end h2{font-family:var(--display);font-weight:400;font-size:2.2rem;margin:4px 0 6px}
.bt-end p{color:var(--ink-soft);font-weight:700;margin-bottom:12px}
@media (max-width:380px){.bt-opts{grid-template-columns:1fr}.bt-door{height:170px}}
@media (prefers-reduced-motion:reduce){.bt-door{transform:none}.opp .bt-door{transform:none}}
.bt-spark{position:absolute;left:50%;top:48%;width:90px;height:90px;margin:-45px 0 0 -45px;border-radius:50%;opacity:0;pointer-events:none;scale:.3;
  background:radial-gradient(circle,#fff 0,#fde047 30%,#fb923c55 55%,transparent 70%)}
.bt-spark.go{animation:btSpark .45s ease-out}
@keyframes btSpark{0%{opacity:1;scale:.3}100%{opacity:0;scale:1.4}}
button,a.btn{touch-action:manipulation}

</style>
</head>
<body>
<main class="app">

  <header class="brand"><i>🧪</i> منصة نحن المتميزون</header>

  <!-- شاشة البداية -->
  <section id="vHome" class="view">
    <h1 class="hero">تحدّي<br>المتميزون</h1>
    <p class="lead">اختر المادة وابعت الكود لزمايلك على الواتساب، وشوفوا مين الأسرع والأدق.</p>

    <form id="fCreate" class="card" novalidate>
      <h2>اصنع تحدّيك</h2>

      <label class="f" for="name">اسمك</label>
      <input id="name" type="text" maxlength="20" autocomplete="nickname" placeholder="اكتب اسمك هنا" enterkeyhint="done">

      <label class="f" id="lSubj">المادة</label>
      <div class="chips" role="radiogroup" aria-labelledby="lSubj" id="subjects"></div>

      <label class="f" id="lCnt">عدد الأسئلة</label>
      <div class="seg" role="radiogroup" aria-labelledby="lCnt" id="counts"></div>

      <label class="f" id="lTim">وقت السؤال بالثواني</label>
      <div class="seg" role="radiogroup" aria-labelledby="lTim" id="times"></div>

      <p class="err" id="eCreate" role="alert"></p>
      <button class="btn" type="submit">أنشئ كود التحدّي</button>
    </form>

    <form id="fJoin" class="card" novalidate>
      <h2>معاك كود تحدّي؟</h2>
      <div class="join">
        <div>
          <label class="f" for="joinCode" style="margin-top:0">الكود</label>
          <input id="joinCode" type="text" maxlength="9" inputmode="text" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="XXX-XXXX">
        </div>
        <button class="btn ink" type="submit">ادخل</button>
      </div>
      <p class="err" id="eJoin" role="alert"></p>
    </form>
  </section>

  <!-- تذكرة التحدّي -->
  <section id="vTicket" class="view" hidden>
    <div class="ticket pop" id="ticket">
      <div class="t-top">
        <p class="who" id="tWho"></p>
        <h2 class="subj" id="tSubj"></h2>
        <div class="facts"><b id="tCnt"></b><b id="tTim"></b></div>
      </div>
      <div class="tear"></div>
      <div class="t-bot">
        <small>كود التحدّي</small>
        <div class="code" id="tCode"></div>
      </div>
    </div>
    <a class="btn wa" id="waBtn" target="_blank" rel="noopener">💬 شارك على الواتساب</a>
    <div class="row">
      <button class="btn ghost" id="copyBtn" type="button">نسخ الكود</button>
      <button class="btn ghost" id="copyLink" type="button">نسخ الرابط</button>
    </div>
    <button class="btn" id="startBtn" type="button" style="margin-top:14px">ابدأ التحدّي</button>
    <button class="btn ghost" id="backBtn" type="button" style="margin-top:10px">رجوع</button>
  </section>

  <!-- الاستعداد -->
  <section id="vReady" class="view ready" hidden aria-live="polite">
    <div class="n" id="rN">3</div>
    <p id="rMsg">استعد…</p>
  </section>


  <!-- شاشة المعركة -->
  <section id="vBattle" class="view" hidden>
    <div class="bt-top"><span class="bt-rnd" id="bRnd"></span><span class="bt-time" id="bTime"></span></div>
    <div class="bt-bar"><i id="bTb"></i></div>
    <div class="bt-arena" id="bArena">
    <div class="bt-side me">
      <div class="bt-name"><span id="bmN"></span><span id="bmP">100%</span></div>
      <div class="bt-track"><i class="bt-ghost" id="bmG"></i><i class="bt-fill" id="bmF"></i></div>
      <div class="bt-door" id="bmD">
        <div class="bt-frame"></div>
        <div class="bt-room"><span class="bt-av">🧑‍🔬</span></div>
        <div class="bt-leaf bt-l1"></div><div class="bt-leaf bt-l2"></div>
        <i class="bt-spark" id="bmS"></i><div class="bt-dmg" id="bmX"></div>
      </div>
    </div>
      <div class="bt-vs">VS</div>
    <div class="bt-side opp">
      <div class="bt-name"><span id="boN"></span><span id="boP">100%</span></div>
      <div class="bt-track"><i class="bt-ghost" id="boG"></i><i class="bt-fill" id="boF"></i></div>
      <div class="bt-door" id="boD">
        <div class="bt-frame"></div>
        <div class="bt-room"><span class="bt-av">🦹</span></div>
        <div class="bt-leaf bt-l1"></div><div class="bt-leaf bt-l2"></div>
        <i class="bt-spark" id="boS"></i><div class="bt-dmg" id="boX"></div>
      </div>
    </div>
      <i class="bt-orb" id="bOrb"></i>
    </div>
    <p class="bt-msg" id="bMsg" aria-live="polite"></p>
    <div class="bt-q" id="bQ"><h3 id="bQt"></h3><div class="bt-opts" id="bOpts"></div></div>
    <div class="bt-end card" id="bEnd" hidden>
      <div class="big" id="eIcon"></div><h2 id="eTitle"></h2><p id="eSub"></p>
      <a class="btn wa" id="eWa" target="_blank" rel="noopener">💬 شارك نتيجتك على الواتساب</a>
      <div class="row"><button class="btn" id="eAgain" type="button">العب تاني</button>
      <button class="btn ghost" id="eHome" type="button">الرئيسية</button></div>
    </div>
  </section>

</main>
<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script>
(()=>{
"use strict";
const SUBJECTS=(()=>{const a=(window.CH_INIT&&CH_INIT.subjects&&CH_INIT.subjects.length?CH_INIT.subjects:[{n:"نبات",e:"🌿"},{n:"حيوان زراعي",e:"🐄"},{n:"كيمياء",e:"🧪"}]).slice(0,7);a.push({n:"منوّع",e:"🎲"});return a})();
const COUNTS=[5,10,15,20];
const TIMES=[15,20,30,45];

const AL="0123456789ABCDEFGHJKMNPQRSTVWXYZ", SEED_MAX=1048576;
const chk=v=>{let s=0;while(v>0){s+=v%32;v=Math.floor(v/32)}return(s*7+3)%32};
const randSeed=()=>{try{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%SEED_MAX}catch(e){return Math.floor(Math.random()*SEED_MAX)}};
function encode(c){
  const val=((c.s*4+c.c)*4+c.t)*SEED_MAX+c.seed;
  let full=val*32+chk(val),out="";
  for(let i=0;i<7;i++){out=AL[full%32]+out;full=Math.floor(full/32)}
  return out;
}
function clean(t){return String(t||"").toUpperCase().replace(/O/g,"0").replace(/[IL]/g,"1").replace(/[^0-9A-Z]/g,"")}
function decode(raw){
  const code=clean(raw);
  if(code.length!==7)return null;
  let full=0;
  for(const ch of code){const i=AL.indexOf(ch);if(i<0)return null;full=full*32+i}
  const val=Math.floor(full/32);
  if(chk(val)!==full%32)return null;
  const seed=val%SEED_MAX;let r=Math.floor(val/SEED_MAX);
  const t=r%4;r=Math.floor(r/4);const c=r%4,s=Math.floor(r/4);
  if(s>=SUBJECTS.length)return null;
  return{s,c,t,seed,code};
}
const fmt=c=>c.slice(0,3)+"-"+c.slice(3);
const toCfg=d=>({code:d.code,subject:SUBJECTS[d.s].n,subjectIndex:d.s,count:COUNTS[d.c],seconds:TIMES[d.t],seed:d.seed});

function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

const $=id=>document.getElementById(id);
const post=(ch,x)=>{try{parent.postMessage(Object.assign({ch},x||{}),"*")}catch(e){}};
const views={home:$("vHome"),ticket:$("vTicket"),ready:$("vReady")};
const show=k=>{for(const x in views)views[x].hidden=x!==k;window.scrollTo(0,0)};
let toastT;const toast=m=>{const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("on"),2200)};

function radios(box,name,items,label,sel){
  box.innerHTML=items.map((it,i)=>`<label class="opt"><input type="radio" name="${name}" value="${i}" ${i===sel?"checked":""}><span>${label(it)}</span></label>`).join("");
}
radios($("subjects"),"subj",SUBJECTS,s=>`${s.e} ${s.n}`,0);
radios($("counts"),"cnt",COUNTS,c=>c,1);
radios($("times"),"tim",TIMES,t=>t,1);
const val=n=>+document.querySelector(`input[name=${n}]:checked`).value;

try{$("name").value=localStorage.getItem("ch_name")||""}catch(e){}
if(window.CH_INIT&&CH_INIT.name)$("name").value=CH_INIT.name;
const myName=()=>{const n=$("name").value.trim().slice(0,20);try{localStorage.setItem("ch_name",n)}catch(e){}return n};

let cur=null;
const BASE=(window.CH_INIT&&CH_INIT.base)||(location.origin+location.pathname);
const link=code=>BASE+"?c="+code;

function openTicket(d,host){
  cur=toCfg(d);cur.host=host;
  $("tWho").textContent=host?`${host} بيتحداك في`:"تحدّي جديد في";
  $("tSubj").textContent=`${SUBJECTS[d.s].e} ${cur.subject}`;
  $("tCnt").textContent=`${cur.count} أسئلة`;
  $("tTim").textContent=`${cur.seconds} ثانية للسؤال`;
  $("tCode").textContent=fmt(cur.code);
  const msg=`⚔️ ${host||"زميلك"} بيتحداك في «${cur.subject}» على منصة نحن المتميزون!\n`+
    `${cur.count} أسئلة، و${cur.seconds} ثانية للسؤال.\n\nكود التحدّي: ${fmt(cur.code)}\nادخل من هنا 👇\n`+link(cur.code);
  cur.shareText=msg;
  $("waBtn").href="https://wa.me/?text="+encodeURIComponent(msg);
  const tk=$("ticket");tk.classList.remove("pop");void tk.offsetWidth;tk.classList.add("pop");
  show("ticket");
  
  // تفعيل الاستماع اللحظي للغرفة بمجرد فتح التذكرة
  listenToRoom(cur.code);
}

// دالة المزامنة والاستماع اللحظي لانضمام وبدء المعركة بين الطرفين
let unsubRoom = null;
function listenToRoom(code){
  if(unsubRoom) unsubRoom();
  post("listen_room", {code});
}

window.addEventListener("message", e => {
  const d = e.data;
  if(d && d.ch === "start_game_signal"){
    triggerStartAnimation();
  }
});

$("fCreate").addEventListener("submit",e=>{
  e.preventDefault();
  const name=myName();
  if(name.length<2){$("eCreate").textContent="اكتب اسمك الأول (حرفين على الأقل).";$("name").focus();return}
  $("eCreate").textContent="";
  const d={s:val("subj"),c:val("cnt"),t:val("tim"),seed:randSeed()};
  d.code=encode(d);
  openTicket(d,name);
  post("created",{code:cur.code,subject:cur.subject,count:cur.count,seconds:cur.seconds,seed:cur.seed});
});

$("fJoin").addEventListener("submit",e=>{
  e.preventDefault();
  const d=decode($("joinCode").value);
  if(!d){$("eJoin").textContent="الكود غير صحيح. راجعه وجرّب تاني.";return}
  $("eJoin").textContent="";
  openTicket(d,"");
  post("joined",{code:d.code});
});
$("joinCode").addEventListener("input",e=>{
  const c=clean(e.target.value).slice(0,7);
  e.target.value=c.length>3?c.slice(0,3)+"-"+c.slice(3):c;
});

async function copy(text,ok){
  try{await navigator.clipboard.writeText(text)}
  catch(e){const t=document.createElement("textarea");t.value=text;t.style.cssText="position:fixed;opacity:0";document.body.appendChild(t);t.select();try{document.execCommand("copy")}catch(_){}t.remove()}
  toast(ok);
}
$("copyBtn").onclick=()=>copy(fmt(cur.code),"تم نسخ الكود");
$("copyLink").onclick=()=>copy(link(cur.code),"تم نسخ الرابط");
$("backBtn").onclick=()=>show("home");

function triggerStartAnimation(){
  if(views.ready.hidden === false || $("vBattle").hidden === false) return;
  show("ready");
  let n=3;$("rN").textContent=n;$("rMsg").textContent="استعد…";
  const iv=setInterval(()=>{
    n--;
    if(n>0){$("rN").textContent=n;return}
    clearInterval(iv);$("rN").textContent="🚀";$("rMsg").textContent="انطلق!";
    document.dispatchEvent(new CustomEvent("challenge:start",{detail:cur}));
  },900);
}

/* زر ابدأ التحدي: يرسل إشارة البدء للسحابة لكي تبدأ عند الاثنين معاً */
$("startBtn").onclick=()=>{
  const name=myName()||cur.host;
  if(!name||name.length<2){show("home");$("eCreate").textContent="اكتب اسمك قبل ما تبدأ.";$("name").focus();return}
  cur.player=name;
  
  // إرسال طلب البدء لأجهزة الغرفة عبر السحابة
  post("start_battle", {code: cur.code, player: name, seed: cur.seed});
  triggerStartAnimation();
};

const p=(window.CH_INIT&&CH_INIT.code)||new URLSearchParams(location.search).get("c");
if(p){const d=decode(p);if(d){$("joinCode").value=fmt(d.code);openTicket(d,"");toast("وصلك تحدّي! اكتب اسمك وابدأ")}else{$("eJoin").textContent="رابط التحدّي غير صحيح."}}

window.Challenge={encode,decode,rng,get current(){return cur},SUBJECTS,COUNTS,TIMES};
})();
</script>

<script>
(()=>{"use strict";
const BANKS={};
const QTEXT=`
## نبات
الجذور الموجودة في نبات البصل من النوع | العرضي | الابتدائي | الثانوي | الجنيني
تحيط بالقمة النامية للجذر | القلنسوة | أوراق خضرية | أوراق قنابية | شعيرات جذرية
أول الأوراق في الإنبات الهوائي هي | الأوراق الفلقية | الأوراق الأولية | الأوراق الخضرية المركبة | الأوراق الحرشفية
التعريق المتوازي يميز نباتات | ذوات الفلقة الواحدة | ذوات الفلقتين | عاريات البذور | الطحالب
الريزومات من السيقان | الأرضية | الهوائية | المائية | الشوكية
الشعيرة الجذرية امتداد لخلايا | البشرة | البريسيكل | القشرة | الأوعية
أشواك التين الشوكي عبارة عن | أوراق شوكية | ساق شوكية | شعيرات شوكية | جذور شوكية
الأوراق الملونة في الجهنمية من النوع | القنابية | الحرشفية | الخضرية | المركبة
تتكاثر الفراولة بواسطة ساق | مدادة | زاحفة | متسلقة | درنية
درنة البطاطس عبارة عن | ساق | جذر | ورقة | ثمرة
درنة البطاطا عبارة عن | جذر عرضي مخزن | ساق مخزنة | ورقة مخزنة | ثمرة
الجذور التنفسية تنمو | عكس الجاذبية الأرضية | في اتجاه الجاذبية | أفقيًا فقط | في الصحراء فقط
## حيوان زراعي
الحيوان الذي يُعد من المجترات | الجاموس | الدجاج | الأرنب | الحصان
عدد أجزاء معدة المجترات الرئيسية | 4 | 2 | 3 | 5
الأنثى البالغة من الأغنام تسمى | النعجة | الكبش | الحمل | الجدي
من الأعلاف الخشنة | الدريس (البرسيم المجفف) | الذرة المجروشة | كسب القطن | الشعير المجروش
أكبر أجزاء معدة المجترات سعة | الكرش | الشبكية | الورقية | المنفحة
المعدة الحقيقية في المجترات هي | المنفحة | الكرش | الشبكية | الورقية
مدة الحمل في الأبقار تقريبًا | تسعة أشهر | خمسة أشهر | ستة أشهر | اثنا عشر شهرًا
المصدر الأساسي للصوف | الأغنام | الأبقار | الدواجن | الخيول
مصدر بروتين مهم في علائق الدواجن | كسب فول الصويا | قش الأرز | التبن | الذرة الشامية
ذكر الماعز يسمى | التيس | الكبش | الجدي | الفحل
## كيمياء
الأيون الذي يعطي راسبًا أبيض جبنيًا مع نترات الفضة | الكلوريد | الكبريتات | النترات | الصوديوم
الأيون الذي يعطي راسبًا أبيض مع كلوريد الباريوم | الكبريتات | الكلوريد | النترات | النحاس
كبريتات النحاس مع هيدروكسيد الصوديوم تعطي راسبًا | أزرق | أبيض | أخضر | بني محمر
الغاز الناتج من كربونات الكالسيوم مع حمض الهيدروكلوريك | ثاني أكسيد الكربون | الأكسجين | الهيدروجين | النيتروجين
كلوريد الحديد III مع هيدروكسيد الصوديوم يعطي راسبًا | بني محمر | أزرق | أبيض | أسود
كبريتيد الهيدروجين مع أيونات النحاس II يعطي راسبًا | أسود | أبيض | أصفر | أزرق
الأس الهيدروجيني للمحلول المتعادل | 7 | 1 | 10 | 14
ورقة عباد الشمس الزرقاء تتحول للأحمر في | الحمض | القلوي | الماء النقي | محلول ملح الطعام
رمز عنصر الصوديوم | Na | K | S | N
الصيغة الكيميائية لكربونات الكالسيوم | CaCO₃ | CaSO₄ | CaCl₂ | Ca(OH)₂
الأمونيا بوفرة مع كبريتات النحاس تعطي محلولًا لونه | أزرق داكن | أخضر | عديم اللون | أصفر
هيدروكسيد الصوديوم مادة | قلوية | حمضية | متعادلة | غازية
`;
function addText(txt){let s="";txt.split("\n").forEach(l=>{l=l.trim();if(!l)return;
  if(l.startsWith("##")){s=l.slice(2).trim();BANKS[s]=BANKS[s]||[];return}
  const p=l.split("|").map(x=>x.trim());if(s&&p.length===5&&p.every(Boolean))BANKS[s].push(p)})};
addText(QTEXT);
if(window.CH_INIT&&CH_INIT.banks){for(const k in CH_INIT.banks)if(CH_INIT.banks[k]&&CH_INIT.banks[k].length)BANKS[k]=CH_INIT.banks[k]}
if(!(BANKS["الكيمياء"]&&BANKS["الكيمياء"].length)&&BANKS["كيمياء"])BANKS["الكيمياء"]=BANKS["كيمياء"];
delete BANKS["كيمياء"];
const NAMES=["سيف","ليلى","كريم","مريم","يوسف","نور","هدى","عمر"];

const $=id=>document.getElementById(id);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const BASE=(window.CH_INIT&&CH_INIT.base)||(location.origin+location.pathname);
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
const side=s=>s==="me"?"bm":"bo";
let S=null,hp={me:100,opp:100};

function shuffle(a,rnd){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function bankFor(subject){
  if(BANKS[subject]&&BANKS[subject].length)return BANKS[subject];
  return Object.values(BANKS).flat();
}
function build(cfg){
  const rnd=Challenge.rng(cfg.seed);
  let rows=shuffle(bankFor(cfg.subject),rnd);while(rows.length&&rows.length<cfg.count)rows=rows.concat(shuffle(bankFor(cfg.subject),rnd));rows=rows.slice(0,cfg.count);
  return rows.map(r=>{const opts=shuffle(r.slice(1),rnd);return{q:r[0],a:opts,c:opts.indexOf(r[1])}});
}

function setHP(who,v){
  v=Math.max(0,Math.min(100,Math.round(v)));hp[who]=v;const p=side(who);
  $(p+"F").style.width=$(p+"G").style.width=v+"%";
  $(p+"F").className="bt-fill"+(v<=30?" low":v<=60?" mid":"");
  $(p+"P").textContent=v+"%";
  if(v===0)$(p+"D").classList.add("ko");
}
const reset=()=>{hp={me:100,opp:100};for(const w of["me","opp"]){setHP(w,100);$(side(w)+"D").classList.remove("ko","win","open","shake")}};

const openDoor=(who,on=true)=>$(side(who)+"D").classList.toggle("open",on);
function showDmg(who,n){const e=$(side(who)+"X");e.textContent="−"+n;e.classList.remove("go");void e.offsetWidth;e.classList.add("go")}
const spark=w=>{const e=$(side(w)+"S");e.classList.remove("go");void e.offsetWidth;e.classList.add("go")};
async function attack(from,to,dmg){
  openDoor(from,true);await sleep(RM?60:480);
  const ar=$("bArena").getBoundingClientRect(),a=$(side(from)+"D").getBoundingClientRect(),t=$(side(to)+"D").getBoundingClientRect();
  const dir=from==="me"?1:-1,x0=a.left+a.width/2-ar.left-19,x1=t.left+t.width/2-ar.left-19,orb=$("bOrb");
  orb.style.cssText=`display:block;top:${a.top-ar.top+a.height*.5-5}px;--oc:${from==="me"?"#38bdf8":"#fb923c"}`;
  spark(from);
  if(orb.animate&&!RM)await orb.animate([{transform:`translateX(${x0}px) scaleX(${dir})`},{transform:`translateX(${x1}px) scaleX(${dir})`}],{duration:340,easing:"cubic-bezier(.4,0,1,1)"}).finished;
  orb.style.display="none";
  const T=$(side(to)+"D"),A=$("bArena");
  A.classList.add("hit");T.classList.remove("shake");void T.offsetWidth;T.classList.add("shake");
  spark(to);showDmg(to,dmg);setHP(to,hp[to]-dmg);
  if(to==="me"&&navigator.vibrate)navigator.vibrate(120);
  await sleep(RM?120:650);A.classList.remove("hit");openDoor(from,false);
}

const dmgOf=f=>Math.max(8,Math.round(165/S.cfg.count*(1+.5*Math.max(0,Math.min(1,f)))));
function round(){
  if(S.i>=S.qs.length||hp.me<=0||hp.opp<=0)return finish();
  const q=S.qs[S.i];S.locked=false;S.t0=performance.now();
  S.botOk=S.rb()<S.acc;S.botT=(.25+S.rb()*.55)*S.ms;
  $("bRnd").textContent=`السؤال ${S.i+1} من ${S.qs.length}`;$("bMsg").textContent="";
  $("bQt").textContent=q.q;
  $("bOpts").innerHTML=q.a.map((t,i)=>`<button type="button" class="bt-ans" data-i="${i}">${t}</button>`).join("");
  clearInterval(S.iv);S.iv=setInterval(tick,100);tick();
}
function tick(){
  const left=S.ms-(performance.now()-S.t0);
  $("bTime").textContent=Math.max(0,Math.ceil(left/1000));
  $("bTb").style.transform=`scaleX(${Math.max(0,left/S.ms)})`;
  if(left<=0)answer(-1);
}
async function answer(i){
  if(S.locked)return;S.locked=true;clearInterval(S.iv);
  const q=S.qs[S.i],pT=Math.min(performance.now()-S.t0,S.ms),pOk=i===q.c;
  document.querySelectorAll(".bt-ans").forEach((b,k)=>{b.disabled=true;if(k===q.c)b.classList.add("ok");else if(k===i)b.classList.add("no")});
  if(pOk)S.right++;
  let from=null,dmg=0,msg;
  if(pOk&&!S.botOk){from="me";dmg=dmgOf(1-pT/S.ms);msg="إجابة صح! ضربتك وصلت 💥"}
  else if(!pOk&&S.botOk){from="opp";dmg=dmgOf(1-S.botT/S.ms);msg=i<0?"انتهى الوقت! الخصم ضربك":"إجابة غلط! الخصم ضربك"}
  else if(pOk&&S.botOk){from=pT<=S.botT?"me":"opp";dmg=Math.round(dmgOf(1-Math.min(pT,S.botT)/S.ms)*.6);msg=from==="me"?"الاتنين صح، بس إنت أسرع!":"الاتنين صح، بس الخصم أسرع!"}
  else msg=i<0?"انتهى الوقت! محدش ضرب":"الاتنين غلط، محدش ضرب";
  $("bMsg").textContent=msg;
  await sleep(RM?200:700);
  if(from)await attack(from,from==="me"?"opp":"me",dmg);
  S.i++;await sleep(RM?100:350);round();
}
function finish(){
  clearInterval(S.iv);$("bRnd").textContent="انتهى التحدّي";$("bTime").textContent="";$("bTb").style.transform="scaleX(0)";
  const me=hp.me,op=hp.opp,res=me>op?"win":me<op?"lose":"draw";
  if(res==="win"){$("bmD").classList.add("win");openDoor("me")}else if(res==="lose"){$("boD").classList.add("win");openDoor("opp")}
  const T={win:["🏆","فزت بالتحدّي!"],lose:["😤","الخصم كسب المرة دي"],draw:["🤝","تعادل!"]}[res];
  $("eIcon").textContent=T[0];$("eTitle").textContent=T[1];
  $("eSub").textContent=`إجاباتك الصح ${S.right} من ${S.qs.length} · صحتك ${me}% وصحة الخصم ${op}%`;
  const txt=`${T[0]} ${T[1]}\nفي تحدّي «${S.cfg.subject}» على منصة نحن المتميزون\nإجاباتي الصح: ${S.right} من ${S.qs.length}\nجرّب تغلبني! الكود: ${S.cfg.code.slice(0,3)}-${S.cfg.code.slice(3)}\n${BASE}?c=${S.cfg.code}`;
  $("eWa").href="https://wa.me/?text="+encodeURIComponent(txt);
  try{parent.postMessage({ch:"done",res:{code:S.cfg.code,subject:S.cfg.subject,right:S.right,total:S.qs.length,hp:me,opHp:op,result:res}},"*")}catch(e){}
  $("bQ").hidden=true;$("bEnd").hidden=false;$("bMsg").textContent="";
}

function start(cfg){
  const qs=build(cfg);
  if(!qs.length){alert("مفيش أسئلة للمادة دي. استخدم Battle.setBank");return}
  document.querySelectorAll(".view").forEach(v=>v.hidden=true);
  $("vBattle").hidden=false;window.scrollTo(0,0);
  const rnd=Challenge.rng(cfg.seed^0x9e3779b1);
  S={cfg,qs,i:0,right:0,rb:rnd,ms:cfg.seconds*1000,acc:.55+(cfg.seed%25)/100,iv:0,locked:true};
  reset();
  $("bmN").textContent=cfg.player||"أنت";
  $("boN").textContent=NAMES[cfg.seed%NAMES.length]+" (خصم)";
  $("bQ").hidden=false;$("bEnd").hidden=true;
  round();
}

$("bOpts").addEventListener("click",e=>{const b=e.target.closest(".bt-ans");if(b&&S)answer(+b.dataset.i)});
$("eAgain").onclick=()=>start(S.cfg);
$("eHome").onclick=()=>{try{parent.postMessage({ch:"close"},"*")}catch(e){location.reload()}};
document.addEventListener("challenge:start",e=>start(e.detail));

window.Battle={start,setHP,openDoor,attack,addText,
  setBank(subject,rows){BANKS[subject]=rows},
  addText,
  get state(){return{hp,S}}};
})();
</script>
</body>
</html>
`;
const AL="0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const LS=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
const U=()=>typeof UID!=="undefined"?UID:null;
const D=()=>typeof db!=="undefined"?db:null;
const NAME=()=>typeof user!=="undefined"?user:"";
const ok=()=>!!(D()&&U());
const ts=()=>firebase.firestore.FieldValue.serverTimestamp();
const E=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt=c=>c.slice(0,3)+"-"+c.slice(3);
const clean=t=>String(t||"").toUpperCase().replace(/O/g,"0").replace(/[IL]/g,"1").replace(/[^0-9A-Z]/g,"");
const rcode=()=>{let o="";try{const a=new Uint8Array(7);crypto.getRandomValues(a);for(const x of a)o+=AL[x%32]}catch(e){for(let i=0;i<7;i++)o+=AL[Math.floor(Math.random()*32)]}return o};
const say=m=>{typeof toast==="function"?toast(m):alert(m)};
const base=()=>location.origin+location.pathname;
const backFn=()=>typeof subjects==="function"?subjects:null;
const PERM="ميزة الأصحاب لسه مش مفعّلة على قاعدة البيانات (صلاحيات Firestore). تواصل مع المشرف.";

const st=document.createElement("style");
st.textContent=`
.fr-card{background:var(--bg);border:1px solid var(--line);border-radius:16px;padding:14px;margin:12px 0}
.fr-card>b{display:block;margin-bottom:8px}
.fr-card small{color:var(--mut)}
.fr-code{direction:ltr;text-align:center;font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:800;font-size:2rem;letter-spacing:.14em;color:var(--pri);margin:4px 0;user-select:all;-webkit-user-select:all}
.fr-row{display:flex;gap:8px;margin-top:10px;align-items:center}.fr-row>*{flex:1;min-width:0}
.fr-in{width:100%;min-height:46px;border:2px solid var(--line);border-radius:12px;padding:6px 12px;font:inherit;font-size:1rem;background:var(--card);color:var(--ink);direction:ltr;text-align:center;letter-spacing:.12em;text-transform:uppercase;box-sizing:border-box}
.fr-b{display:flex;align-items:center;justify-content:center;gap:6px;min-height:44px;padding:6px 12px;border:2px solid var(--line);border-radius:12px;background:var(--card);color:var(--ink);font:inherit;font-weight:700;cursor:pointer;touch-action:manipulation;box-sizing:border-box}
.fr-b.pri{background:linear-gradient(135deg,var(--pri2),var(--pri));border-color:transparent;color:#fff}
.fr-b.wa{background:#25d366;border-color:transparent;color:#fff}
.fr-b.x{flex:0 0 44px;color:var(--bad)}
.fr-b.big{width:100%;min-height:52px;font-size:1.05rem;margin-top:6px}
.fr-f,.fr-n{display:flex;gap:8px;align-items:center;padding:8px 0;border-top:1px dashed var(--line)}
.fr-f:first-of-type,.fr-n:first-of-type{border-top:0}
.fr-f>span,.fr-n>span{flex:1;font-weight:700;min-width:0;overflow-wrap:anywhere}
.fr-f .fr-b,.fr-n .fr-b{flex:0 0 auto;min-height:40px}
.fr-m{min-height:1.3em;margin-top:6px;font-weight:700;font-size:.92rem}
.fr-badge{margin-inline-start:auto;font-weight:800;color:#d97706}
.fr-ov{position:fixed;inset:0;z-index:2000;background:#e4f3fa}
.fr-fr{position:absolute;inset:0;width:100%;height:100%;border:0}
.fr-x{position:absolute;top:calc(8px + env(safe-area-inset-top,0px));left:8px;z-index:2;width:42px;height:42px;border:0;border-radius:12px;background:#10305acc;color:#fff;font-size:18px;cursor:pointer}
`;
document.head.appendChild(st);

let MY="",MYU=null,FR=[],CTX=null,GW=null,lastPing=0,activeRoomUnsub=null;
const whoami=()=>{if(MYU!==U()){MYU=U();MY="";FR=[];lastPing=0}};
async function ensureCode(){
  const uid=U(),ref=D().doc("users/"+uid),snap=await ref.get(),d=snap.data()||{};
  if(d.friendCode){
    try{const c=await D().doc("codes/"+d.friendCode).get();if(!c.exists)await D().doc("codes/"+d.friendCode).set({uid,name:NAME(),at:ts()})}catch(e){}
    return d.friendCode}
  for(let k=0;k<8;k++){
    const code=rcode(),cref=D().doc("codes/"+code);
    try{await D().runTransaction(async tx=>{const c=await tx.get(cref);if(c.exists)throw"taken";tx.set(cref,{uid,name:NAME(),at:ts()});tx.set(ref,{friendCode:code},{merge:true})});return code}
    catch(e){if(e!=="taken")throw e}}
  throw new Error("no-code")}
async function loadFriends(){
  const s=await D().collection("users/"+U()+"/friends").get();FR=[];
  s.forEach(x=>{const d=x.data()||{};FR.push({uid:x.id,name:d.name||"صديق",code:d.code||""})});
  FR.sort((a,b)=>a.name.localeCompare(b.name,"ar"))}
async function inbox(){
  const out=[];if(!MY)return out;
  const s=await D().collection("codes/"+MY+"/inbox").get(),jobs=[];
  s.forEach(x=>{const d=x.data()||{},ref=x.ref;
    if(d.kind==="friend"&&d.fromUid)jobs.push(D().doc("users/"+U()+"/friends/"+d.fromUid).set({name:d.name||"صديق",code:d.code||"",at:ts()}).then(()=>ref.delete()).catch(()=>{}));
    else if(d.kind==="challenge"||d.kind==="result")out.push(Object.assign({id:x.id,ref},d));
    else jobs.push(ref.delete().catch(()=>{}))});
  await Promise.all(jobs);return out}
function sendInbox(f,data,id){
  if(!f||!f.code)return Promise.resolve();
  return D().doc("codes/"+f.code+"/inbox/"+id).set(Object.assign({fromUid:U(),name:NAME(),code:MY,at:ts()},data)).catch(e=>{if(e&&e.code==="permission-denied")say(PERM)})}
async function addFriend(raw){
  const c=clean(raw);if(c.length!==7)return["bad","الكود لازم يبقى 7 خانات (مثال: ABC-1234)."];
  const s=await D().doc("codes/"+c).get();if(!s.exists)return["bad","الكود ده مش موجود. اتأكد منه مع صاحبك."];
  const f=s.data()||{};if(f.uid===U())return["bad","ده كودك أنت 😄 ابعته لصاحبك."];
  if(FR.some(x=>x.uid===f.uid))return["ok","هو صاحبك بالفعل ✅"];
  await D().doc("users/"+U()+"/friends/"+f.uid).set({name:f.name||"صديق",code:c,at:ts()});
  await sendInbox({code:c},{kind:"friend"},"f_"+U());
  return["ok","تمت إضافة "+(f.name||"صديق")+" ✅"]}

async function openChallenge(){
  whoami();
  if(!ok()){
    page('<h2>⚔️ تحدّي الأصحاب</h2><div class="empty">سجّل الدخول بحسابك عشان يبقى ليك كود وأصحاب. تقدر تجرّب التحدّي السريع دلوقتي.</div><button class="fr-b pri big" id="frQ">🚪 ابدأ تحدّي سريع</button>',backFn());
    document.getElementById("frQ").onclick=()=>openGame({});return}
  page('<h2>⚔️ تحدّي الأصحاب</h2><div class="empty">جاري التحميل…</div>',backFn());
  try{MY=await ensureCode();LS("agri_fcode",U()+":"+MY);const notes=await inbox();await loadFriends();draw(notes)}
  catch(e){
    const perm=e&&e.code==="permission-denied";
    page('<h2>⚔️ تحدّي الأصحاب</h2><div class="empty">'+(perm?PERM:"تعذّر تحميل بيانات الأصحاب. تأكد من الإنترنت وجرّب تاني.")+'</div><button class="fr-b pri big" id="frQ">🚪 ابدأ تحدّي سريع</button>',backFn());
    document.getElementById("frQ").onclick=()=>openGame({})}}
function draw(notes){
  const note=n=>n.kind==="challenge"
    ?`<div class="fr-n"><span>⚔️ ${E(n.name)} تحدّاك في «${E(n.subject)}» (${+n.count||""} أسئلة)</span><button class="fr-b pri" data-acc="${E(n.id)}">قبول</button><button class="fr-b x" data-ig="${E(n.id)}" aria-label="تجاهل">✕</button></div>`
    :`<div class="fr-n"><span>🏁 ${E(n.name)} خلّص تحدّيك في «${E(n.subject)}»: جاوب ${+n.right||0} من ${+n.total||0} وصحته ${+n.hp||0}%</span><button class="fr-b" data-ig="${E(n.id)}">حسنًا</button></div>`;
  page(`<h2>⚔️ تحدّي الأصحاب</h2>
  <div class="fr-card"><small>كودك الشخصي — ابعته لأصحابك عشان يضيفوك</small><div class="fr-code">${fmt(MY)}</div>
   <div class="fr-row"><button class="fr-b" id="frCp">📋 نسخ الكود</button><button class="fr-b wa" id="frWa">💬 واتساب</button></div></div>
  ${notes.length?`<div class="fr-card"><b>🔔 إشعارات</b>${notes.map(note).join("")}</div>`:""}
  <div class="fr-card"><b>➕ أضف صديق بكوده</b><div class="fr-row"><input class="fr-in" id="frIn" maxlength="9" placeholder="XXX-XXXX" autocapitalize="characters" autocomplete="off" spellcheck="false"><button class="fr-b pri" id="frAdd" style="flex:0 0 96px">إضافة</button></div><div class="fr-m" id="frM"></div></div>
  <div class="fr-card"><b>👥 أصحابي (${FR.length})</b>${FR.length?FR.map(f=>`<div class="fr-f"><span>${E(f.name)}</span><button class="fr-b pri" data-ch="${E(f.uid)}">⚔️ تحدّى</button><button class="fr-b x" data-rm="${E(f.uid)}" aria-label="حذف">🗑</button></div>`).join(""):'<div class="empty">لسه ماضفتش أصحاب. اكتب كود صاحبك أو ابعت له كودك.</div>'}</div>
  <button class="fr-b pri big" id="frQ">🚪 ابدأ تحدّي جديد / ادخل بكود</button>`,backFn());
  const $=id=>document.getElementById(id),msg=(t,c)=>{const m=$("frM");m.textContent=t;m.style.color=c==="ok"?"var(--pri)":"var(--bad)"};
  $("frCp").onclick=async()=>{try{await navigator.clipboard.writeText(fmt(MY));say("تم نسخ كودك")}catch(e){say("كودك: "+fmt(MY))}};
  $("frWa").onclick=()=>window.open("https://wa.me/?text="+encodeURIComponent("أضفني على منصة نحن المتميزون 🌱\nكودي: "+fmt(MY)+"\nادخل من هنا 👇\n"+base()+"?f="+MY),"_blank");
  $("frIn").oninput=e=>{const c=clean(e.target.value).slice(0,7);e.target.value=c.length>3?c.slice(0,3)+"-"+c.slice(3):c};
  $("frAdd").onclick=async()=>{msg("جاري البحث…","ok");try{const r=await addFriend($("frIn").value);msg(r[1],r[0]);if(r[0]==="ok"&&/تمت/.test(r[1])){say(r[1]);await loadFriends();draw(notes)}}catch(e){msg(e&&e.code==="permission-denied"?PERM:"حصلت مشكلة، جرّب تاني.","bad")}};
  $("frQ").onclick=()=>openGame({});
  app.querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>openGame({friend:FR.find(f=>f.uid===b.dataset.ch)}));
  app.querySelectorAll("[data-rm]").forEach(b=>b.onclick=async()=>{const f=FR.find(x=>x.uid===b.dataset.rm);if(!f||!confirm("حذف "+f.name+" من أصحابك؟"))return;try{await D().doc("users/"+U()+"/friends/"+f.uid).delete();await loadFriends();draw(notes)}catch(e){say("تعذّر الحذف")}});
  app.querySelectorAll("[data-ig]").forEach(b=>b.onclick=async()=>{const n=notes.find(x=>x.id===b.dataset.ig);try{n&&await n.ref.delete()}catch(e){}draw(notes.filter(x=>x!==n))});
  app.querySelectorAll("[data-acc]").forEach(b=>b.onclick=async()=>{const n=notes.find(x=>x.id===b.dataset.acc);if(!n)return;try{await n.ref.delete()}catch(e){}
    openGame({code:n.ch,friend:{uid:n.fromUid,name:n.name,code:n.code}})})}

function buildBanks(){
  const out={};
  try{const Q=typeof QUIZZES!=="undefined"?QUIZZES:{},M=typeof MCQ!=="undefined"?MCQ:[];
    for(const s of Object.keys(Q)){const seen=new Set(),rows=[];
      for(const e of Q[s]||[]){const b=e[2]||M;
        for(const i of e[1]||[]){const r=b[i];
          if(!Array.isArray(r)||r.length<3||r.length>5||r.some(x=>typeof x!=="string"||!x)||r[0].indexOf("[[img:")===0||seen.has(r[0]))continue;
          seen.add(r[0]);rows.push(r)}}
      if(rows.length)out[s]=rows}}catch(e){}
  return out}
const subj=()=>typeof SUBJECTS!=="undefined"?SUBJECTS.slice(0,7).map(s=>({n:s[0],e:s[1]})):[];
function openGame(o){
  closeGame(true);CTX=o||{};
  const init={name:NAME(),subjects:subj(),banks:buildBanks(),friend:CTX.friend?{name:CTX.friend.name}:null,code:CTX.code||"",base:base()};
  const ov=document.createElement("div");ov.className="fr-ov";
  ov.innerHTML='<button class="fr-x" aria-label="إغلاق">✕</button><iframe class="fr-fr" title="تحدّي المتميزون" allow="clipboard-write"></iframe>';
  document.body.appendChild(ov);document.body.style.overflow="hidden";GW=ov;
  ov.querySelector(".fr-x").onclick=()=>closeGame();
  ov.querySelector("iframe").srcdoc=GAME.replace("</head>","<script>window.CH_INIT="+JSON.stringify(init).replace(/</g,"\\u003c")+"</scr"+"ipt></head>")}

function closeGame(){
  if(activeRoomUnsub){activeRoomUnsub();activeRoomUnsub=null;}
  if(GW){GW.remove();GW=null;document.body.style.overflow=""}
  CTX=null;
}

// مراقبة الغرفة ولحظية البدء من خلال Firestore
function listenToRoomOnline(code){
  if(!ok() || !code) return;
  const roomRef = D().doc("codes/"+code);
  activeRoomUnsub = roomRef.onSnapshot(doc => {
    if(doc.exists){
      const data = doc.data();
      if(data && data.status === "started" && GW){
        const iframeWin = GW.querySelector("iframe").contentWindow;
        if(iframeWin){
          iframeWin.postMessage({ch: "start_game_signal"}, "*");
        }
      }
    }
  });
}

addEventListener("message", async e => {
  const d=e.data;if(!d||!d.ch||!GW||e.source!==GW.querySelector("iframe").contentWindow)return;
  if(d.ch==="close")closeGame();
  else if(d.ch==="created"&&CTX&&CTX.friend&&ok()){const f=CTX.friend;
    sendInbox(f,{kind:"challenge",ch:d.code,subject:d.subject,count:d.count,seconds:d.seconds},"c_"+U()+"_"+Date.now()).then(()=>say("تم إرسال التحدّي إلى "+f.name+" 🔔"));
    // حفظ بيانات الغرفة الأولية
    try{await D().doc("codes/"+d.code).set({hostUid: U(), status: "waiting", seed: d.seed, at: ts()}, {merge:true})}catch(err){}
  }
  else if(d.ch==="joined" && ok() && d.code){
    listenToRoomOnline(d.code);
  }
  else if(d.ch==="listen_room" && ok() && d.code){
    listenToRoomOnline(d.code);
  }
  else if(d.ch==="start_battle" && ok() && d.code){
    // تحديث حالة الغرفة في Firebase لتنبيه الطرف الثاني فورا
    try{
      await D().doc("codes/"+d.code).set({status: "started", startedAt: ts()}, {merge:true});
    }catch(err){}
    listenToRoomOnline(d.code);
  }
  else if(d.ch==="done"&&CTX&&CTX.friend&&ok()&&d.res)
    sendInbox(CTX.friend,{kind:"result",ch:d.res.code,subject:d.res.subject,right:d.res.right,total:d.res.total,hp:d.res.hp,opHp:d.res.opHp},"r_"+U()+"_"+d.res.code)});

const P=new URLSearchParams(location.search);let DL={f:clean(P.get("f")),c:clean(P.get("c"))};
function deepLink(){
  if(!DL.f&&!DL.c)return;const d=DL;DL={f:"",c:""};
  try{history.replaceState(null,"",location.pathname)}catch(e){}
  if(d.c)setTimeout(()=>openGame({code:d.c}),400);
  else setTimeout(async()=>{await openChallenge();const i=document.getElementById("frIn"),a=document.getElementById("frAdd");if(i&&a){i.value=fmt(d.f);a.click()}},400)}

async function chPing(){
  deepLink();whoami();
  try{const b=document.getElementById("ch");if(!b||!ok())return;
    const now=Date.now();if(now-lastPing<90000)return;lastPing=now;
    if(!MY){const v=LS("agri_fcode")||"";if(v.indexOf(U()+":">0))MY=v.slice(String(U()).length+1)}
    if(!MY){const d=(await D().doc("users/"+U()).get()).data()||{};MY=d.friendCode||"";if(MY)LS("agri_fcode",U()+":"+MY)}
    if(!MY)return;
    const n=(await inbox()).length,s=b.querySelector(".fr-badge");if(s)s.textContent=n?"🔔 "+n:""}catch(e){}}

window.openChallenge=openChallenge;window.chPing=chPing;
})();

