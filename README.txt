تحديث: صفحة «إحصائياتي وتقريري» + تحسين وضوح اللوجو

الملفات: core.js (يحمّل التحديثات تلقائيًا) + stats.js (جديد) + menu.js (محدّث) + plan7.js + chem.js
ارفعها في مجلد المنصة (استبدل core.js) ثم امسح الكاش.

لو عندك core.js أحدث: لا تستبدله، وأضف في آخره:
(function(){["chem.js","plan7.js","stats.js","menu.js"].forEach(function(f){var s=document.createElement("script");s.src=f;s.async=false;(document.head||document.documentElement).appendChild(s)})})();

الصفحة تظهر في القائمة الجانبية باسم «إحصائياتي وتقريري».
- نتائج الاختبارات السابقة تُقرأ من حساب الطالب (Firebase) إن وُجد.
- تفاصيل الأسئلة الخاطئة (نقاط الضعف) تُسجَّل على جهاز الطالب بدءًا من هذا التحديث.
