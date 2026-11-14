/* ===== essay_grader.js: امتحان مقالي + رفع صورة الإجابة + تصحيح بالذكاء الاصطناعي ===== */
(function () {
  const ENDPOINT = "/api/grade";      // الدالة اللي على Vercel
  const EXAM_MINUTES = 15;            // مدة الامتحان لكل سؤال
  let overlay = null, timer = null;

  const mk = (tag, attrs, parent) => { const e = document.createElement(tag); Object.assign(e, attrs || {}); if (parent) parent.appendChild(e); return e; };
  const BTN = "display:block;width:100%;padding:12px;margin:8px 0;border-radius:10px;border:1px solid #cfe0ee;background:#fff;color:#16324f;font:inherit;cursor:pointer;text-align:right;box-sizing:border-box";
  const BTN_MAIN = "display:block;width:100%;padding:12px;margin:8px 0;border-radius:10px;border:0;background:#1f4e79;color:#fff;font:inherit;font-weight:700;cursor:pointer;box-sizing:border-box";

  function questions() { return Array.isArray(window.ESSAYS) ? window.ESSAYS : []; }

  function close() { clearInterval(timer); timer = null; if (overlay) { overlay.remove(); overlay = null; } }

  function open() {
    if (overlay) return;
    overlay = mk("div", {});
    overlay.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:#f3f8fc;overflow-y:auto;font-family:system-ui,Tahoma,sans-serif;color:#16324f;font-size:16px";
    const bar = mk("div", {}, overlay);
    bar.style.cssText = "position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#1f4e79;color:#fff;z-index:2";
    mk("b", { textContent: "🤖 تصحيح مقالي بالذكاء الاصطناعي" }, bar);
    const x = mk("button", { textContent: "✕ إغلاق" }, bar);
    x.style.cssText = "padding:6px 12px;border-radius:8px;border:0;cursor:pointer;font:inherit";
    x.onclick = close;
    overlay.body = mk("div", {}, overlay);
    overlay.body.style.cssText = "max-width:760px;margin:0 auto;padding:14px";
    document.body.appendChild(overlay);
    pick();
  }

  function pick() {
    const b = overlay.body; b.innerHTML = "";
    mk("p", { textContent: "اختار سؤال مقالي، وبعدين ابدأ الامتحان واكتب إجابتك على ورقة، وارفع صورتها للتصحيح." }, b);
    const list = questions();
    if (!list.length) { mk("p", { textContent: "الأسئلة المقالية مش متاحة دلوقتي." }, b); return; }
    list.forEach(q => {
      const t = mk("button", { textContent: "س" + q.n + ": " + q.q.slice(0, 90) + (q.q.length > 90 ? "…" : "") }, b);
      t.style.cssText = BTN;
      t.onclick = () => start(q);
    });
  }

  function start(q) {
    const b = overlay.body; b.innerHTML = "";
    const top = mk("div", {}, b); top.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:8px";
    const back = mk("button", { textContent: "← الأسئلة" }, top); back.style.cssText = "padding:8px 12px;border-radius:8px;border:1px solid #cfe0ee;background:#fff;cursor:pointer;font:inherit";
    back.onclick = () => { clearInterval(timer); pick(); };
    const clock = mk("b", { textContent: "⏱ " + EXAM_MINUTES + ":00" }, top); clock.style.color = "#b71c1c";
    mk("div", { textContent: "س" + q.n + ": " + q.q }, b).style.cssText = "font-weight:700;line-height:1.8;background:#fff;padding:12px;border-radius:10px;border:1px solid #cfe0ee";
    mk("p", { textContent: "اكتب الإجابة على ورقة خارجية، وبعدين صوّرها وارفعها هنا." }, b);

    let left = EXAM_MINUTES * 60;
    timer = setInterval(() => {
      left--;
      const m = Math.floor(left / 60), s = String(left % 60).padStart(2, "0");
      clock.textContent = "⏱ " + m + ":" + s;
      if (left <= 0) { clearInterval(timer); clock.textContent = "انتهى الوقت"; upload(q, true); }
    }, 1000);

    const file = mk("input", { type: "file", accept: "image/*", capture: "environment" }, b);
    file.style.cssText = "display:block;margin:12px 0;width:100%";
    const go = mk("button", { textContent: "📤 ارفع الإجابة وصحّحها" }, b);
    go.style.cssText = BTN_MAIN;
    go.onclick = () => upload(q, false, file);
    mk("div", {}, b).id = "gradeOut";
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(",")[1]);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  async function upload(q, timeUp, fileInput) {
    const out = document.getElementById("gradeOut");
    if (!out) return;
    const f = fileInput && fileInput.files && fileInput.files[0];
    if (!f) { out.textContent = timeUp ? "انتهى الوقت ومرفعتش صورة." : "اختار صورة الإجابة الأول."; out.style.color = "#b71c1c"; return; }
    clearInterval(timer);
    out.textContent = "⏳ جاري التصحيح…"; out.style.color = "#16324f";
    try {
      const image = await toBase64(f);
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, mime: f.type, question: q.q, modelAnswer: q.m, maxScore: 10 })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "خطأ");
      show(out, data);
    } catch (e) {
      out.textContent = "❌ " + (e.message || "حصل خطأ، جرّب تاني");
      out.style.color = "#b71c1c";
    }
  }

  function show(out, d) {
    out.innerHTML = "";
    mk("h3", { textContent: "الدرجة: " + d.score + " / " + d.max }, out).style.color = "#1f4e79";
    const addList = (title, items, color) => {
      if (!items || !items.length) return;
      mk("b", { textContent: title }, out).style.color = color;
      const ul = mk("ul", {}, out);
      items.forEach(t => mk("li", { textContent: t }, ul));
    };
    addList("✅ نقاط القوة", d.strengths, "#2e7d32");
    addList("⚠️ الناقص أو الخطأ", d.missing, "#b71c1c");
    if (d.feedback) mk("p", { textContent: d.feedback }, out).style.cssText = "background:#f3f8fc;padding:10px;border-radius:8px;line-height:1.8";
    mk("p", { textContent: "ملحوظة: التصحيح بالذكاء الاصطناعي تقريبي، والمدرس هو المرجع النهائي." }, out).style.cssText = "font-size:13px;opacity:.7";
  }

  // زرار ثابت في الشاشة الرئيسية (من غير ما نغيّر core.js)
  function addButton() {
    if (document.getElementById("essayGraderBtn")) return;
    const btn = mk("button", { id: "essayGraderBtn", textContent: "🤖 تصحيح مقالي" }, document.body);
    btn.style.cssText = "position:fixed;bottom:16px;left:16px;z-index:900;padding:10px 14px;border-radius:24px;border:0;background:#6a1b9a;color:#fff;font:inherit;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.25)";
    btn.onclick = open;
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addButton);
  else addButton();
  window.openEssayGrader = open;
})();
