/* ===== wa.js — رابط جروب الواتساب (تحديثات المنصة) في الواجهة الأساسية =====
   ضع رابط الجروب هنا بين علامتي التنصيص (يبدأ بـ https://chat.whatsapp.com/) */
window.WA_LINK = "https://chat.whatsapp.com/JxPUNa6LCul8q6Y3RD6ru1";

(function(){
"use strict";
var OK = /^https:\/\/(chat\.whatsapp\.com|wa\.me|whatsapp\.com)\//i;
function link(){ var l = String(window.WA_LINK || "").trim(); return OK.test(l) ? l : ""; }

/* فتح الرابط من القائمة الجانبية */
window.openWA = function(){
  var l = link();
  if(!l){ alert("لم يتم ضبط رابط جروب الواتساب بعد. افتح ملف wa.js وضع الرابط في WA_LINK."); return; }
  window.open(l, "_blank", "noopener,noreferrer");
};

function css(){
  if(document.getElementById("wacss")) return;
  var st = document.createElement("style"); st.id = "wacss";
  st.textContent =
  ".wacard{display:flex;align-items:center;gap:12px;margin:12px 0;padding:12px 14px;border-radius:16px;text-decoration:none;color:#fff;" +
  "background:linear-gradient(135deg,#25D366,#128C7E);box-shadow:0 6px 16px rgba(18,140,126,.35);min-height:64px;" +
  "-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .15s}" +
  ".wacard:active{transform:scale(.97)}" +
  ".wacard:focus-visible{outline:3px solid #fff;outline-offset:3px}" +
  ".wacard svg{width:38px;height:38px;flex:none;background:#fff;border-radius:50%;padding:6px}" +
  ".wacard b{display:block;font-size:16px;line-height:1.35}" +
  ".wacard span{display:block;font-size:13px;opacity:.95;line-height:1.45;margin-top:2px}" +
  ".wacard i{margin-inline-start:auto;font-style:normal;font-weight:800;background:rgba(255,255,255,.22);border-radius:99px;padding:6px 12px;font-size:14px;white-space:nowrap}";
  document.head.appendChild(st);
}

function inject(){
  var host = (typeof app !== "undefined" && app) || document.getElementById("app");
  if(!host) return;
  var l = link(); if(!l) return;
  var grid = host.querySelector(".grid"); if(!grid || !host.querySelector("#tp")) return;   /* شاشة المواد فقط */
  if(host.querySelector("#waCard")) return;
  css();
  var a = document.createElement("a");
  a.id = "waCard"; a.className = "wacard"; a.href = l; a.target = "_blank"; a.rel = "noopener noreferrer";
  a.innerHTML =
   '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#128C7E" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>' +
   '<div><b>انضم لجروب الواتساب 📲</b><span>كل تحديثات المنصة والإضافات الجديدة بتنزل هناك</span></div><i>انضمام</i>';
  var anchor = grid.previousElementSibling || grid;       /* قبل جملة «اختر المادة» */
  anchor.parentNode.insertBefore(a, anchor);
}

function start(){
  var host = (typeof app !== "undefined" && app) || document.getElementById("app");
  if(!host){ document.addEventListener("DOMContentLoaded", start); return; }
  new MutationObserver(inject).observe(host, {childList:true});
  inject();
}
start();
})();
