تحديث: «تحدّي الأصحاب» (كود لكل طالب + أصحاب + معركة الأبواب)

الملفات: core.js (محدّث) + friends.js (جديد) + menu.js (محدّث) + firestore-rules-add.txt
1) ارفع core.js و friends.js و menu.js في مجلد المنصة (استبدل القديم) ثم امسح الكاش.
2) الصق قواعد firestore-rules-add.txt في Firebase ← Firestore ← Rules ثم Publish (مهم عشان الأكواد تشتغل).

لو عندك core.js أحدث: لا تستبدله، وأجرِ هذه التعديلات الثلاثة فيه:
 أ) في آخر الملف أضف "friends.js" إلى قائمة التحميل التلقائي قبل "menu.js".
 ب) في دالة subjects(): أضف قبل <div class="grid"> الزر:
    <button class="bk2" id="ch" style="margin-top:12px"><span>⚔️</span>تحدّي الأصحاب<small class="fr-badge"></small></button>
 ج) في آخر subjects() بعد document.getElementById("tm").onclick=timer; أضف:
    {const ch=document.getElementById("ch");if(ch)ch.onclick=()=>typeof openChallenge==="function"?openChallenge():toast("جاري تحميل التحدّي… جرّب بعد ثانية")}
    if(typeof chPing==="function")chPing();

الجديد في الواجهة:
- زر «⚔️ تحدّي الأصحاب» في الصفحة الرئيسية وفي القائمة الجانبية.
- لكل طالب كود شخصي (مثال ABC-1234) يظهر في الصفحة، ويقدر يرسله على الواتساب.
- إضافة صديق بكوده، وقائمة أصحاب، وزر «⚔️ تحدّى» ويصل التحدّي كإشعار لصاحبك.
- التحدّي بيستخدم أسئلة المنصة الحقيقية (من QUIZZES) لنفس المادة.
