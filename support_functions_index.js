/* ===== Firebase Cloud Function: بتبعت لك إيميل كل ما طالب يبعت رسالة دعم ===== */
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const GMAIL_USER = "ibrahim13ail6@gmail.com";
const GMAIL_PASS = defineSecret("GMAIL_APP_PASSWORD");

exports.notifySupport = onDocumentCreated(
  {document: "support/{uid}/messages/{msgId}", secrets: [GMAIL_PASS], region: "us-central1"},
  async (event) => {
    const m = event.data && event.data.data();
    // بنبعت إيميل بس لرسائل الطلاب، مش ردود الأدمن
    if (!m || m.from !== "student") return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {user: GMAIL_USER, pass: GMAIL_PASS.value()},
    });

    await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: `رسالة دعم فني من ${m.name || "طالب"}`,
      text:
        `الاسم: ${m.name || "-"}\n` +
        `الصفحة: ${m.page || "-"}\n` +
        `المستخدم: ${event.params.uid}\n\n` +
        `${m.text || ""}\n\n` +
        `للرد: ادخل لوحة الدعم في المنصة.`,
    });
  }
);
