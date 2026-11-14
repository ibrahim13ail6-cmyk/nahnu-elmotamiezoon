/* ===== essay_grader.js: امتحان مقالي + رفع صورة الإجابة + تصحيح بالذكاء الاصطناعي ===== */
(function () {
  const ENDPOINT = "/api/grade";      // الدالة اللي على Vercel
  const EXAM_MINUTES = 15;            // مدة الامتحان لكل سؤال
  let overlay = null, timer = null;

  const mk = (tag, attrs, parent) => { const e = document.createElement(tag); Object.assign(e, attrs || {}); if (parent) parent.appendChild(e); return e; };
  const BTN = "display:block;width:100%;padding:12px;margin:8px 0;border-radius:10px;border:1px solid #cfe0ee;background:#fff;color:#16324f;font:inherit;cursor:pointer;text-align:right;box-sizing:border-box";
  const BTN_MAIN = "display:block;width:100%;padding:12px;margin:8px 0;border-radius:10px;border:0;background:#1f4e79;color:#fff;font:inherit;font-weight:700;cursor:pointer;box-sizing:border-box";

  const EMBEDDED_ESSAYS = [{"n": 1, "q": "عّر ف التركيب الذري ،ثم وّض ح مكونات الذرة وشحنة كل جسيم ومكان وجوده.", "m": "تتكون الذرة من نواة موجبة تضم بروتونات موجبة ونيوترونات متعادلة ،وتحيط بها إلكترونات سالبة .تتركز معظم كتلة الذرة في النواة."}, {"n": 2, "q": "قارن بين العدد الذري والعدد الكتلي ،وبّي ن العلاقة المستخدمة لحساب عدد النيوترونات. . 3اشرح لماذا لا يكفي ترتيب العناصر حسب أوزانها الذرية للحصول على التدرج الدوري المنتظم ،واذكر نص القانون الدوري الحديث.", "m": "العدد الذري Zهو عدد البروتونات ،ويساوي عدد الإلكترونات في الذرة المتعادلة .العدد الكتلي Aهو مجموع البروتونات والنيوترونات؛ وعدد النيوترونات=.A−Z"}, {"n": 3, "q": "اشرح لماذا لا يكفي ترتيب العناصر حسب أوزانها الذرية للحصول على التدرج الدوري المنتظم، واذكر نص القانون الدوري الحديث.", "m": "نص القانون الدوري الحديث :عند ترتيب العناصر تصاعديًا حسب العدد الذري تتكرر دوريًا خواصها الكيميائية والفيزيائية."}, {"n": 4, "q": "اشرح تقسيم الجدول الدوري إلى مجموعات ودورات ،واذكر أسماء المجموعات IAو IIAو VIIAو.VIIIA", "m": "المجموعات أعمدة رأسية ،والدورات صفوف أفقية IA .فلزات قلوية IIA ،فلزات أرضية قلوية VIIA ،هالوجينات VIIIA ،غازات نبيلة/خاملة."}, {"n": 5, "q": "قارن بين العناصر الممثلة والعناصر الانتقالية والعناصر الانتقالية الداخلية كما وردت في المقرر.", "m": "العناصر الممثلة تشمل مجموعات ،Aوالانتقالية مجموعات ،Bوالانتقالية الداخلية سلسلتا اللانثانيدات والأكتينيدات أسفل الجدول. n"}, {"n": 6, "q": "اشرح المقصود بالعدد الكمي الرئيسي ،واذكر الأغلفة التي تقابل n=1و 2و 3و.4", "m": "يحدد مستوى الطاقة الرئيسي؛ n=1الغلاف .K، n=2 L، n=3 M، n=4 N l"}, {"n": 7, "q": "ما المقصود بالعدد الكمي الثانوي؟ اذكر قيمه الممكنة عند n=1و 2و 3و ،4واربطها بالرموز sو pو dو.f", "m": "يحدد المستوى الفرعي وشكله ،وقيمه من 0إلى .n−1الرموز.s، 1=p، 2=d، 3=f=0 : m"}, {"n": 8, "q": "اشرح وظيفة كل من العدد الكمي المغناطيسي والعدد الكمي المغزلي.", "m": "يحدد اتجاه الأوربيتال في الفراغ وقيمه من l−إلى .l+العدد المغزلي sيصف اتجاه اللف المغزلي وله قيمتان ½+و.½− :s"}, {"n": 9, "q": "اذكر عدد الأوربيتالات وأقصى عدد إلكترونات في كل من المستويات الفرعية sو pو dو.f", "m": "أوربيتال واحد وإلكترونان؛ p: 3أوربيتالات و 6إلكترونات؛ d: 5و10؛ f: 7و"}, {"n": 10, "q": "اشرح مبدأ استبعاد باولي ،ووضح أثره في عدد الإلكترونات التي يستوعبها الأوربيتال الواحد.", "m": "لا يمكن لإلكترونين في الذرة الواحدة أن يمتلكا القيم نفسها للأعداد الكمية الأربعة؛ لذا لا يستوعب الأوربيتال أكثر من إلكترونين متعاكسي اللف."}, {"n": 11, "q": "اشرح قاعدة هوند مع توضيح سبب توزيع الإلكترونات فرادى في الأوربيتالات المتساوية في الطاقة قبل ازدواجها.", "m": "تتوزع الإلكترونات في الأوربيتالات المتساوية الطاقة فرادى أولًا وباتجاه لف متواٍز ،ثم يبدأ الازدواج. H:1s1"}, {"n": 12, "q": "اكتب الترتيب الإلكتروني لكل من Hو Heو Liو Beو Bو Cو Nو Oو Fو.Ne", "m": "؛ He:1s2؛ Li:1s2 2s1؛ Be:1s2 2s2؛ B:1s2 2s2 2p1؛ C:1s2 2s2 2p2؛ N:1s2 2s2 2p3؛ O:1s2 2s2 2p4؛ F:1s2 2s2 2p5؛ .Ne:1s2 2s2 2p6 Na:[Ne]3s1"}, {"n": 13, "q": "اكتب الترتيب الإلكتروني لكل من Naو Mgو Kو ،Caووضح سبب امتلاء 4sقبل .3d", "m": "؛ Mg:[Ne]3s2؛ K:[Ar]4s1؛ .Ca:[Ar]4s2لأن طاقة 4sأقل من 3dفي بداية الامتلاء. ل المستويات حسب تصاعد ،n+lوعند تساوي ُ n+lي ملأ المستوى ذو nالأصغر أولًا. ُ"}, {"n": 14, "q": "اشرح قاعدة كلتشكوفسكي الأولى والثانية لتحديد ترتيب ملء المستويات الفرعية.", "m": "ت م أ ،Cr:[Ar]3d5 4s1"}, {"n": 15, "q": "لماذا يعد كل من الكروم والنحاس من الحالات الشاذة؟ اكتب الترتيب الإلكتروني الفعلي لكل منهما.", "m": "وCu:[Ar]3d10 4s1؛ لأن المستوى dنصف الممتلئ أو الممتلئ كليًا أكثر ثباتًا ."}, {"n": 16, "q": "ما المقصود بإلكترونات اللب وإلكترونات التكافؤ؟ ولماذا تعد إلكترونات التكافؤ أكثر أهمية في التفاعلات الكيميائية؟", "m": "إلكترونات اللب في الأغلفة الداخلية ،وإلكترونات التكافؤ في الغلاف الخارجي؛ وهي التي تتفاعل وتحدد غالبًا خواص العنصر الكيميائية."}, {"n": 17, "q": "عّر ف الرابطة الكيميائية ،ووضح دور إلكترونات الغلاف الخارجي في تكوينها.", "m": "الرابطة الكيميائية قوة تربط الذرات لتكوين الجزيئات/المركبات ،وتشارك إلكترونات الغلاف الخارجي في تكوينها."}, {"n": 18, "q": "قارن بين الرابطة الأيونية والرابطة التساهمية من حيث كيفية التكوين وطبيعة الإلكترونات المشاركة.", "m": "الأيونية :انتقال إلكترونات من ذرة لأخرى ثم تجاذب كاتيون وأنيون .التساهمية :مشاركة الذرات في أزواج إلكترونية."}, {"n": 19, "q": "اشرح خطوات تكوين الرابطة الأيونية ،موضحًا الفرق بين الكاتيون والأنيون مع مثال الليثيوم والفلور. . 20اشرح قاعدة الثمانية ،ووضح علاقتها بتكوين الأيونات والروابط الكيميائية ،مع الإشارة إلى حالة الهيدروجين الثنائية.", "m": "تفقد ذرة إلكترونًا أو أكثر فتكون كاتيونًا موجبًا ،وتكتسب ذرة أخرى إلكترونات فتكون أنيونًا سالبًا ،وينشأ التجاذب بينهما .مثال Li و.F"}, {"n": 20, "q": "اشرح قاعدة الثمانية، ووضح علاقتها بتكوين الأيونات والروابط الكيميائية، مع الإشارة إلى حالة الهيدروجين الثنائية.", "m": "تميل الذرات للوصول إلى تركيب مستقر يشبه الغاز النبيل بثمانية إلكترونات تكافؤ؛ والهيدروجين يكتفي غالبًا بإلكترونين."}, {"n": 21, "q": "ما المقصود برموز لويس؟ وكيف نمثل إلكترونات التكافؤ حول رمز العنصر؟", "m": "رموز لويس تمثل إلكترونات التكافؤ بنقاط حول رمز العنصر ،وتوزع النقاط حول الجهات الأربع قبل ازدواجها بحسب عدد الإلكترونات."}, {"n": 22, "q": "اشرح خطوات رسم تركيب لويس لمركب تساهمي بدءًا من حساب إلكترونات التكافؤ حتى مراجعة اكتمال الثمانية.", "m": "نحسب مجموع إلكترونات التكافؤ ،نحدد الذرة المركزية ،نرسم الروابط الأحادية ،نكمل ثمانية الذرات الطرفية ،نضع المتبقي على المركزية ،ثم ننشئ روابط متعددة إذا لزم ونراجع العدد الكلي."}, {"n": 23, "q": "قارن بين الرابطة الأحادية والثنائية والثلاثية من حيث عدد أزواج الإلكترونات المشتركة.", "m": "الأحادية = زوج واحد مشترك ،الثنائية = زوجان ،الثلاثية = ثلاثة أزواج."}, {"n": 24, "q": "اشرح كيفية إظهار الشحنة في تركيب لويس للأيون متعدد الذرات ،ولماذا يوضع التركيب بين قوسين؟", "m": "يوضع تركيب الأيون بين قوسين مربعين أو قوسين ،وتكتب الشحنة خارج القوس لتحديد شحنة الأيون كله."}, {"n": 25, "q": "وضح متى نلجأ إلى تكوين روابط متعددة في تركيب لويس ،وما الهدف من ذلك بالنسبة للذرة المركزية. إعداد أحمد جاسر عبد الرحمن", "m": "نكّو ن روابط متعددة إذا بقيت الذرة المركزية أقل من ثمانية إلكترونات بعد إكمال الذرات الطرفية ،بهدف إكمال غلاف التكافؤ وفق طريقة لويس. إعداد أحمد جاسر عبد الرحمن"}];
  function questions() { return Array.isArray(window.ESSAYS) && window.ESSAYS.length ? window.ESSAYS : EMBEDDED_ESSAYS; }

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

  const SUBJECTS = [
    { n: "الاقتصاد", e: "💰", essays: false },
    { n: "حيوان زراعي", e: "🐄", essays: false },
    { n: "نبات", e: "🌿", essays: false },
    { n: "الكيمياء غير العضوية", e: "⚗️", essays: true },
    { n: "محاصيل", e: "🌾", essays: false },
    { n: "رياضة عامة", e: "📐", essays: false },
    { n: "الحاسب الآلي", e: "💻", essays: false }
  ];
  const EXAM_SIZE = 5;   // كل امتحان = 5 أسئلة

  function head(text) {
    const b = overlay.body; b.innerHTML = "";
    const top = mk("div", {}, b); top.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:8px";
    return { b, top, title: text };
  }
  function backBtn(parent, label, fn) {
    const bk = mk("button", { textContent: label }, parent);
    bk.style.cssText = "padding:8px 12px;border-radius:8px;border:1px solid #cfe0ee;background:#fff;cursor:pointer;font:inherit";
    bk.onclick = fn;
    return bk;
  }

  // الصفحة الأولى: المواد السبع
  function pick() {
    clearInterval(timer);
    const h = head("المواد");
    const b = h.b;
    mk("h3", { textContent: "اختار المادة" }, b).style.color = "#1f4e79";
    SUBJECTS.forEach(sj => {
      const t = mk("button", { textContent: sj.e + " " + sj.n + (sj.essays ? "" : " (قريباً)") }, b);
      t.style.cssText = BTN;
      t.onclick = () => sj.essays ? exams() : (alert("أسئلة " + sj.n + " المقالية هتتضاف قريباً."));
    });
  }

  // امتحانات الكيمياء
  function exams() {
    const h = head("الامتحانات");
    const b = h.b;
    backBtn(h.top, "← المواد", pick);
    mk("h3", { textContent: "الكيمياء غير العضوية: الامتحانات" }, b).style.color = "#1f4e79";
    const list = questions();
    if (!list.length) { mk("p", { textContent: "الأسئلة المقالية مش متاحة دلوقتي." }, b); return; }
    const count = Math.ceil(list.length / EXAM_SIZE);
    for (let k = 0; k < count; k++) {
      const part = list.slice(k * EXAM_SIZE, (k + 1) * EXAM_SIZE);
      const t = mk("button", { textContent: "📝 الامتحان " + (k + 1) + " (" + part.length + " أسئلة)" }, b);
      t.style.cssText = BTN;
      t.onclick = () => examQuestions(k + 1, part);
    }
  }

  // أسئلة الامتحان: كل سؤال بوقت وتصحيح ودرجة
  function examQuestions(num, part) {
    const h = head("الامتحان " + num);
    const b = h.b;
    backBtn(h.top, "← الامتحانات", exams);
    mk("h3", { textContent: "الامتحان " + num + ": اختار السؤال" }, b).style.color = "#1f4e79";
    const scoreLine = mk("p", { textContent: "مجموع النقاط: " + examScore(num) + " / " + (part.length * 10) }, b);
    part.forEach(q => {
      const done = examResults[num] && examResults[num][q.n];
      const t = mk("button", { textContent: (done ? "✅ " : "") + "س" + q.n + ": " + q.q.slice(0, 80) + (q.q.length > 80 ? "…" : "") + (done ? " (" + done.score + "/" + done.max + ")" : "") }, b);
      t.style.cssText = BTN;
      t.onclick = () => start(q, num, part);
    });
  }

  // نتايج الامتحانات في الذاكرة (تتصفّر لما تقفل الصفحة)
  const examResults = {};
  function examScore(num) {
    const r = examResults[num] || {};
    return Object.values(r).reduce((a, x) => a + (+x.score || 0), 0);
  }
  function saveResult(num, q, d) {
    examResults[num] = examResults[num] || {};
    examResults[num][q.n] = { score: d.score, max: d.max };
  }

  function start(q, num, part) {
    const b = overlay.body; b.innerHTML = "";
    const top = mk("div", {}, b); top.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:8px";
    const back = mk("button", { textContent: "← الأسئلة" }, top); back.style.cssText = "padding:8px 12px;border-radius:8px;border:1px solid #cfe0ee;background:#fff;cursor:pointer;font:inherit";
    back.onclick = () => { clearInterval(timer); examQuestions(num, part); };
    const clock = mk("b", { textContent: "⏱ " + EXAM_MINUTES + ":00" }, top); clock.style.color = "#b71c1c";
    mk("div", { textContent: "س" + q.n + ": " + q.q }, b).style.cssText = "font-weight:700;line-height:1.8;background:#fff;padding:12px;border-radius:10px;border:1px solid #cfe0ee";
    mk("p", { textContent: "اكتب الإجابة على ورقة خارجية، وبعدين صوّرها وارفعها هنا." }, b);

    let left = EXAM_MINUTES * 60;
    timer = setInterval(() => {
      left--;
      const m = Math.floor(left / 60), s = String(left % 60).padStart(2, "0");
      clock.textContent = "⏱ " + m + ":" + s;
      if (left <= 0) { clearInterval(timer); clock.textContent = "انتهى الوقت"; upload(q, true, null, num); }
    }, 1000);

    const file = mk("input", { type: "file", accept: "image/*", capture: "environment" }, b);
    file.style.cssText = "display:block;margin:12px 0;width:100%";
    const go = mk("button", { textContent: "📤 ارفع الإجابة وصحّحها" }, b);
    go.style.cssText = BTN_MAIN;
    go.onclick = () => upload(q, false, file, num);
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

  async function upload(q, timeUp, fileInput, num) {
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
      if (num) saveResult(num, q, data);
      show(out, data);
      if (num) mk("p", { textContent: "مجموع نقاط الامتحان " + num + ": " + examScore(num) }, out).style.fontWeight = "700";
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

  // مربع "تصحيح مقالي" جنب المواد في الشاشة الرئيسية (زي مربع بنك الميد ترم)
  function injectTile() {
    const grids = [...document.querySelectorAll(".grid")];
    const g = grids.find(x => x.querySelector("button.sub") && x.textContent.indexOf("حيوان") >= 0);
    if (!g || g.querySelector(".essay-tile")) return;
    const t = document.createElement("button");
    t.className = "sub essay-tile";
    t.innerHTML = "<span>🤖</span>تصحيح مقالي";
    t.onclick = open;
    g.appendChild(t);
  }
  function tryInject() { try { injectTile(); } catch (e) {} }
  if (typeof MutationObserver !== "undefined" && document.body) {
    new MutationObserver(tryInject).observe(document.body, { childList: true, subtree: true });
  }
  tryInject();
  window.openEssayGrader = open;
})();
