/* ===== api/grade.js: تصحيح المقالي بالذكاء الاصطناعي (Vercel Serverless Function) =====
   المفتاح بيتقري من متغيّر البيئة GEMINI_API_KEY على Vercel، ومش بيتكتب في الكود أبدًا. */

const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const MAX_BYTES = 4 * 1024 * 1024; // 4 ميجا كحد أقصى للصورة

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: "المفتاح مش متضبط على السيرفر" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { image, mime, question, modelAnswer, maxScore } = body || {};

  if (!image || !question) return res.status(400).json({ error: "ناقص صورة أو سؤال" });
  if (!/^image\/(jpeg|png|webp|heic)$/.test(mime || "")) return res.status(400).json({ error: "نوع الصورة مش مدعوم" });
  if (Buffer.byteLength(image, "base64") > MAX_BYTES) return res.status(413).json({ error: "الصورة كبيرة، صوّرها بجودة أقل" });

  const max = Number(maxScore) || 10;
  const prompt = `أنت مصحح امتحانات جامعي. الصورة فيها إجابة طالب مكتوبة بخط اليد على ورقة.
السؤال: ${question}
نموذج الإجابة (للمرجعية): ${modelAnswer || "غير متاح، صحّح بناءً على المعرفة العلمية"}
الدرجة القصوى: ${max}

المطلوب: اقرأ الإجابة من الصورة، وقيّمها بالدرجة من ${max}. أعطِ ردك بصيغة JSON فقط بدون أي نص إضافي بالشكل:
{"score": رقم, "max": ${max}, "strengths": ["نقطة قوة"], "missing": ["نقطة ناقصة أو خطأ"], "feedback": "ملاحظة مختصرة بالعربي"}
لو الخط غير واضح أو الصورة مش إجابة، اكتب ذلك في feedback وقلّل الدرجة.`;

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [
            { text: prompt },
            { inline_data: { mime_type: mime, data: image } }
          ]}],
          generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
        })
      }
    );
    const data = await r.json();
    if (!r.ok) return res.status(502).json({ error: "خطأ من خدمة التصحيح", detail: data && data.error && data.error.message });

    const text = (data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text) || "";
    let result;
    try { result = JSON.parse(text); } catch (e) { return res.status(502).json({ error: "رد غير مفهوم من التصحيح" }); }
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: "تعذّر الاتصال بخدمة التصحيح" });
  }
}
