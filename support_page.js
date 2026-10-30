/* ===== support_page.js: الدعم الفني جوه المنصة (طالب + أدمن) ===== */
(function(){
  const SEEN_KEY="agri_sup_seen";
  let isAdminUser=null, supUnsub=null, badgeStarted=false;

  const mk=(tag,attrs={},parent)=>{const e=document.createElement(tag);Object.assign(e,attrs);if(parent)parent.appendChild(e);return e};
  const seenAt=()=>+(localStorage.getItem(SEEN_KEY)||0);
  const toMs=t=>t&&t.toMillis?t.toMillis():Date.now();
  const fmt=t=>{try{return new Date(toMs(t)).toLocaleString("ar-EG",{dateStyle:"short",timeStyle:"short"})}catch(e){return""}};

  async function checkAdmin(){
    if(isAdminUser!==null)return isAdminUser;
    try{const s=await D().doc("admins/"+U()).get();isAdminUser=s.exists}catch(e){isAdminUser=false}
    return isAdminUser;
  }

  /* ---------- شارة الردود الجديدة على الزرار ---------- */
  function setBadge(n){
    const b=document.getElementById("supOpen");if(!b)return;
    let s=b.querySelector(".sup-badge");
    if(!s){s=mk("small",{className:"sup-badge"},b);s.style.cssText="background:#d32f2f;color:#fff;border-radius:10px;padding:1px 7px;margin-inline-start:6px;font-size:12px"}
    s.textContent=n?("🔔 "+n):"";s.style.display=n?"":"none";
  }
  function startBadgeWatch(){
    if(badgeStarted||!ok())return;badgeStarted=true;
    D().doc("support/"+U()).onSnapshot(s=>{
      const d=s.data()||{};
      const fresh=d.lastFrom==="admin"&&toMs(d.lastAt)>seenAt();
      setBadge(fresh?1:0);
    },()=>{});
  }
  const timer=setInterval(()=>{if(ok()){startBadgeWatch();clearInterval(timer)}},1500);

  /* ---------- الواجهة ---------- */
  window.openSupport=function(){
    try{
      if(document.getElementById("supOv"))return;
      const ov=mk("div",{id:"supOv"});
      ov.style.cssText="position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:#f3f8fc;overflow-y:auto;font-family:system-ui,Tahoma,sans-serif;color:#16324f;font-size:16px";
      const bar=mk("div",{},ov);
      bar.style.cssText="position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 14px;background:#1f4e79;color:#fff";
      mk("b",{textContent:"🎧 الدعم الفني"},bar);
      const close=mk("button",{textContent:"✕ إغلاق"},bar);
      close.style.cssText="padding:6px 12px;border-radius:8px;border:0;cursor:pointer;font:inherit";
      close.onclick=()=>{if(supUnsub){supUnsub();supUnsub=null}ov.remove()};
      const body=mk("div",{},ov);
      body.style.cssText="max-width:760px;width:100%;margin:0 auto;padding:8px";
      const view=mk("div",{},body);
      view.style.cssText="display:block";
      document.body.appendChild(ov);

      if(!ok()){
        mk("p",{textContent:"سجّل الدخول الأول عشان تبعت رسالة للدعم."},view).style.cssText="text-align:center;padding:16px";
        return;
      }
      setBadge(0);localStorage.setItem(SEEN_KEY,String(Date.now()));
      mk("p",{textContent:"(نسخة الدعم 4) الصفحة اتفتحت"},view).style.cssText="font-size:12px;opacity:.6;margin:4px 0";
      studentView(view);   // الطالب يشوف الصفحة على طول

      // لو أدمن، نضيف تبويبات الأدمن فوق
      checkAdmin().then(isAdm=>{
        if(!isAdm||!document.getElementById("supOv"))return;
        const tabs=mk("div",{});
        tabs.style.cssText="display:flex;gap:6px;padding:8px";
        const tStu=mk("button",{textContent:"رسايلي"},tabs);
        const tAdm=mk("button",{textContent:"📥 لوحة الدعم (أدمن)"},tabs);
        body.insertBefore(tabs,view);
        const show=m=>{tStu.classList.toggle("on",m==="s");tAdm.classList.toggle("on",m==="a");
          if(m==="s")studentView(view);else adminView(view)};
        tStu.onclick=()=>show("s");tAdm.onclick=()=>show("a");
        show("a");
      }).catch(()=>{});
    }catch(e){
      alert("خطأ في صفحة الدعم: "+(e&&e.message?e.message:e));
    }
  };

  /* ---------- عرض الطالب ---------- */
  function studentView(root){
    root.innerHTML="";
    const list=mk("div",{},root);list.style.cssText="padding:6px 4px;min-height:120px";
    const form=mk("div",{},root);form.style.cssText="display:flex;gap:6px;padding:8px;border-top:1px solid #ccc;background:#f3f8fc";
    const txt=mk("textarea",{placeholder:"اكتب رسالتك للدعم…",rows:2},form);
    txt.style.cssText="flex:1;padding:8px;border-radius:8px;border:1px solid #ccc;font:inherit;resize:none;background:#fff;color:#16324f";
    const send=mk("button",{textContent:"إرسال"},form);
    send.style.cssText="padding:8px 14px;border-radius:8px;border:0;background:#1f4e79;color:#fff;cursor:pointer;font:inherit";
    send.onclick=async()=>{
      const text=txt.value.trim();if(!text)return;
      send.disabled=true;
      try{
        const batch=D().batch();
        batch.set(D().collection("support/"+U()+"/messages").doc(),{from:"student",name:NAME()||"طالب",text:text.slice(0,2000),createdAt:ts()});
        batch.set(D().doc("support/"+U()),{uid:U(),name:NAME()||"طالب",lastText:text.slice(0,120),lastAt:ts(),lastFrom:"student"},{merge:true});
        await batch.commit();txt.value="";
      }catch(e){say("تعذّر إرسال الرسالة، جرّب تاني")}
      send.disabled=false;
    };
    if(supUnsub){supUnsub();supUnsub=null}
    supUnsub=D().collection("support/"+U()+"/messages").orderBy("createdAt").onSnapshot(snap=>{
      list.innerHTML="";
      if(snap.empty){mk("p",{textContent:"ما فيش رسايل بعد. اكتب مشكلتك واضغط إرسال."},list);return}
      snap.forEach(d=>{const m=d.data();bubble(list,m.text,m.from==="student",fmt(m.createdAt))});
      list.scrollTop=list.scrollHeight;
      localStorage.setItem(SEEN_KEY,String(Date.now()));setBadge(0);
    },()=>{});
  }

  function bubble(parent,text,mine,time){
    const b=mk("div",{},parent);
    b.style.cssText=`display:block;max-width:85%;margin:6px 0;${mine?"margin-right:auto":"margin-left:auto"};background:${mine?"#e3f2fd":"#e8f5e9"};padding:8px 10px;border-radius:10px;white-space:pre-wrap;line-height:1.6;color:#16324f`;
    mk("div",{textContent:text||""},b);
    mk("small",{textContent:(mine?"أنت":"الدعم")+" · "+time},b).style.opacity=".65";
  }

  /* ---------- لوحة الأدمن ---------- */
  function adminView(root){
    root.innerHTML="";
    const list=mk("div",{},root);list.style.cssText="padding:6px 4px;min-height:120px";
    if(supUnsub){supUnsub();supUnsub=null}
    supUnsub=D().collection("support").orderBy("lastAt","desc").limit(100).onSnapshot(snap=>{
      list.innerHTML="";
      if(snap.empty){mk("p",{textContent:"ما فيش رسايل دعم حالياً."},list);return}
      snap.forEach(d=>{
        const s=d.data();
        const row=mk("div",{},list);
        row.style.cssText="padding:10px;border:1px solid #ccc;border-radius:10px;cursor:pointer";
        mk("b",{textContent:s.name||"طالب"},row);
        mk("div",{textContent:s.lastText||""},row).style.cssText="opacity:.8;margin-top:4px";
        mk("small",{textContent:fmt(s.lastAt)+(s.lastFrom==="student"?" · 🔔 رسالة جديدة":"")},row).style.opacity=".65";
        row.onclick=()=>conversation(root,d.id,s.name||"طالب");
      });
    },()=>{});
  }

  function conversation(root,uid,name){
    if(supUnsub){supUnsub();supUnsub=null}
    root.innerHTML="";
    const top=mk("div",{},root);top.style.cssText="display:flex;gap:6px;align-items:center;padding:8px";
    const back=mk("button",{textContent:"→ رجوع"},top);back.onclick=()=>adminView(root);
    mk("b",{textContent:name},top);
    const list=mk("div",{},root);list.style.cssText="padding:6px 4px;min-height:120px";
    const form=mk("div",{},root);form.style.cssText="display:flex;gap:6px;padding:8px;border-top:1px solid #ccc;background:#f3f8fc";
    const txt=mk("textarea",{placeholder:"اكتب الرد…",rows:2},form);
    txt.style.cssText="flex:1;padding:8px;border-radius:8px;border:1px solid #ccc;font:inherit;resize:none;background:#fff;color:#16324f";
    const send=mk("button",{textContent:"رد"},form);
    send.style.cssText="padding:8px 14px;border-radius:8px;border:0;background:#1f4e79;color:#fff;cursor:pointer;font:inherit";
    send.onclick=async()=>{
      const text=txt.value.trim();if(!text)return;
      send.disabled=true;
      try{
        const batch=D().batch();
        batch.set(D().collection("support/"+uid+"/messages").doc(),{from:"admin",text:text.slice(0,2000),createdAt:ts()});
        batch.set(D().doc("support/"+uid),{lastText:text.slice(0,120),lastAt:ts(),lastFrom:"admin"},{merge:true});
        await batch.commit();txt.value="";
      }catch(e){say("تعذّر إرسال الرد")}
      send.disabled=false;
    };
    supUnsub=D().collection("support/"+uid+"/messages").orderBy("createdAt").onSnapshot(snap=>{
      list.innerHTML="";
      snap.forEach(d=>{const m=d.data();bubble(list,m.text,m.from==="admin",fmt(m.createdAt))});
      list.scrollTop=list.scrollHeight;
    },()=>{});
  }
})();
