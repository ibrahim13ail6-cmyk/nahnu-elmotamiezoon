تحديث الواجهة: شريط علوي + قائمة جانبية + خدماتنا + وضع ليلي/نهاري + لوجو شفاف

الملفات: core.js (يحمّل التحديثات تلقائيًا) + menu.js (الجديد) + plan7.js + chem.js
1) ارفع الأربعة في مجلد المنصة (استبدل core.js). 2) امسح الكاش.

لو عندك core.js أحدث: لا تستبدله، وأضف في آخره:
(function(){["chem.js","plan7.js","menu.js"].forEach(function(f){var s=document.createElement("script");s.src=f;s.async=false;(document.head||document.documentElement).appendChild(s)})})();

التخصيص داخل menu.js: مصفوفة SERVICES (نصوص خدماتنا) و HIDE_OLD_BUTTONS (إخفاء الأزرار القديمة من شاشة المواد).
اللوجو: تُزال خلفيته البيضاء تلقائيًا من logo.jpg؛ وللحصول على أفضل جودة ارفع logo.png شفاف وغيّر المسار في الـHTML.
