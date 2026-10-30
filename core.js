
const SUBJECTS=[["اقتصاد","💰"],["حاسب آلي","💻"],["حيوان زراعي","🐄"],["رياضة عامة","📐"],["نبات","🌿"],["الكيمياء","⚗️"],["محاصيل","🌾"]];
const KINDS={sec:["السكاشن","🧑‍🏫","السكشن"],lec:["المحاضرات","📚","المحاضرة"],img:["الصور","🖼️"],act:["المحتوى التفاعلي","🎮"],quiz:["الاختبارات","📝"]};
const CATS={pdf:["PDF","📄"],vid:["فيديوهات","🎬"],src:["مصادر","🔗"]};
const FILES={"نبات|lec|pdf|1":[{"id":"nb-l1-s","name":"شرائح المحاضرة 1 – مقدمة ودورة الحياة والإنبات","parts":[{"u":"4b54dd877d78.jpg","W":760,"H":8562,"pg":[[0,570],[578,570],[1156,570],[1734,570],[2312,570],[2890,570],[3468,570],[4046,570],[4624,570],[5202,570],[5780,570]]}]},{"id":"nb-l1-m","name":"ملخص المحاضرة 1 (مكتوب)","parts":[{"u":"4b54dd877d78.jpg","W":760,"H":8562,"pg":[[6404,1075],[7487,1075]]}]}],"نبات|lec|pdf|2":[{"id":"nb-l2-s","name":"شرائح المحاضرة 2 – الجذر","parts":[{"u":"748b9e54c248.jpg","W":760,"H":15498,"pg":[[0,570],[578,570],[1156,570],[1734,570],[2312,570],[2890,570],[3468,570],[4046,570],[4624,570],[5202,570],[5780,570],[6358,570],[6936,570],[7514,570],[8092,570],[8670,570],[9248,570],[9826,570],[10404,570],[10982,570],[11560,570],[12138,570],[12716,570]]}]},{"id":"nb-l2-m","name":"ملخص المحاضرة 2 (مكتوب)","parts":[{"u":"748b9e54c248.jpg","W":760,"H":15498,"pg":[[13340,1075],[14423,1075]]}]}],"نبات|lec|pdf|3":[{"id":"nb-l3-s","name":"شرائح المحاضرة 3 – الساق","parts":[{"u":"af93f7e33d66.jpg","W":760,"H":16435,"pg":[[0,570],[578,570],[1156,570],[1734,570],[2312,570],[2890,570],[3468,570],[4046,570],[4624,570],[5202,570],[5780,570],[6358,570],[6936,570],[7514,570],[8092,570],[8670,570],[9248,570],[9826,570],[10404,570]]}]},{"id":"nb-l3-m","name":"ملخص المحاضرة 3 (مكتوب)","parts":[{"u":"af93f7e33d66.jpg","W":760,"H":16435,"pg":[[11028,1075],[12111,1075],[13194,1075],[14277,1075],[15360,1075]]}]}],"نبات|lec|pdf|4":[{"id":"nb-l4-s","name":"شرائح المحاضرة 4 – الورقة","parts":[{"u":"34823071fe56.jpg","W":760,"H":10974,"pg":[[0,570],[578,570],[1156,570],[1734,570],[2312,570],[2890,570],[3468,570],[4046,570],[4624,570],[5202,570],[5780,570],[6358,570],[6936,570],[7514,570],[8092,570],[8670,570],[9248,570],[9826,570],[10404,570]]},{"u":"257e41ab461a.jpg","W":760,"H":10396,"pg":[[0,570],[578,570],[1156,570],[1734,570],[2312,570],[2890,570],[3468,570],[4046,570],[4624,570],[5202,570],[5780,570],[6358,570],[6936,570],[7514,570],[8092,570],[8670,570],[9248,570],[9826,570]]}]}],"نبات|lec|pdf|5":[{"id":"nb-l5-s","name":"شرائح المحاضرة 5 – تركيب الخلية النباتية","parts":[{"u":"6463acf2475c.jpg","W":760,"H":12708,"pg":[[0,570],[578,570],[1156,570],[1734,570],[2312,570],[2890,570],[3468,570],[4046,570],[4624,570],[5202,570],[5780,570],[6358,570],[6936,570],[7514,570],[8092,570],[8670,570],[9248,570],[9826,570],[10404,570],[10982,570],[11560,570],[12138,570]]}]}],"نبات|sec|pdf|1":[{"id":"nb-s1","name":"ملاحظات السكشن 1 – إنبات البذور (بخط اليد)","parts":[{"u":"8f2ded75303a.jpg","W":720,"H":4088,"pg":[[0,1016],[1024,1016],[2048,1016],[3072,1016]]}]}],"نبات|sec|pdf|2":[{"id":"nb-s2","name":"ملاحظات السكشن 2 – الجذور (بخط اليد)","parts":[{"u":"1d2137799edc.jpg","W":720,"H":4088,"pg":[[0,1016],[1024,1016],[2048,1016],[3072,1016]]}]}],"نبات|sec|pdf|3":[{"id":"nb-s3","name":"ملاحظات السكشن 3 – الساق (بخط اليد)","parts":[{"u":"465a05691981.jpg","W":720,"H":2040,"pg":[[0,1016],[1024,1016]]}]}],"حيوان زراعي|lec|pdf|1":[{"id":"z-l1","name":"المحاضرة 1 – الخلية والانقسام الخلوي","parts":[{"u":"fdcd84789153.jpg","W":1267,"H":5039,"pg":[[0,713],[721,713],[1442,713],[2163,713],[2884,713],[3605,713],[4326,713]]},{"u":"307c0e818e3f.jpg","W":1267,"H":5039,"pg":[[0,713],[721,713],[1442,713],[2163,713],[2884,713],[3605,713],[4326,713]]},{"u":"bbf8a250150e.jpg","W":1267,"H":5039,"pg":[[0,713],[721,713],[1442,713],[2163,713],[2884,713],[3605,713],[4326,713]]},{"u":"25062e0da6cb.jpg","W":1267,"H":5039,"pg":[[0,713],[721,713],[1442,713],[2163,713],[2884,713],[3605,713],[4326,713]]}]}]};
const BOOKS={};
const MCQ=[["وحدة البناء الأساسية لجميع الكائنات الحية هي:", "الخلية", "النسيج", "العضو", "الجهاز"], ["تتميز الخلايا حقيقية النواة بأن نواتها:", "محاطة بغلاف نووي", "غير محاطة بغلاف", "غير موجودة", "توجد في الغشاء فقط"], ["من أمثلة الخلايا بدائية النواة:", "البكتيريا", "خلايا الحيوان", "خلايا النبات", "خلايا الإنسان"], ["الانقسام الذي ينتج أربعة أمشاج هو:", "الميوزي", "الميتوزي", "الانقسام البيني", "الانقسام الجسدي"], ["عدد الكروموسومات في مشيج الإنسان:", "23", "46", "92", "12"], ["عدد الكروموسومات في زيجوت الإنسان:", "46", "23", "92", "48"], ["أهمية الانقسام الميتوزي:", "النمو وتعويض التالف", "تكوين الأمشاج", "التنوع الوراثي", "العبور الوراثي"], ["العبور الوراثي يحدث في:", "الانقسام الميوزي", "الانقسام الميتوزي", "المرحلة البينية", "الإخصاب فقط"], ["الطبقة الجرثومية التي تنشأ منها الأنسجة الضامة:", "الميزودرم", "الإكتودرم", "الإندودرم", "جميع الطبقات"], ["الأنسجة العصبية تنشأ من طبقة:", "الإكتودرم", "الميزودرم", "الإندودرم", "الأديم المتوسط فقط"], ["النسيج الطلائي الذي يبطّن الحويصلات الهوائية في الرئتين:", "الحرشفي البسيط", "المكعبي البسيط", "العمودي البسيط", "الانتقالي"], ["النسيج الطلائي الذي يبطّن المثانة البولية:", "الانتقالي", "الحرشفي البسيط", "المكعبي البسيط", "العمودي المهدب"], ["طبقة ملبيجي هي الطبقة:", "السفلى في الحرشفي الطبقي", "القرنية السطحية", "الإسفنجية", "الوسطى في العظم"], ["النسيج الضام الموجود تحت الجلد:", "الفجوي", "الدهني", "الشبكي", "المخاطي"], ["المادة الخلالية للغضروف تسمى:", "الكوندرين", "الأوسين", "البلازما", "الكولاجين"], ["المادة الخلالية للعظم تسمى:", "الأوسين", "الكوندرين", "البلازما", "الميالين"], ["الغضروف الموجود في صوان الأذن:", "المرن", "الزجاجي", "الليفي", "العظمي"], ["الغضروف الموجود بين فقرات العمود الفقري:", "الليفي", "الزجاجي", "المرن", "الشبكي"], ["المادة الخلالية للدم تسمى:", "البلازما", "الكوندرين", "الأوسين", "الميالين"], ["الخلايا المسؤولة عن نقل الأكسجين في الدم:", "كرات الدم الحمراء", "كرات الدم البيضاء", "الصفائح الدموية", "البلازما"], ["العضلات الموجودة في القناة الهضمية والأوعية الدموية:", "غير المخططة (الملساء)", "المخططة", "القلبية", "الهيكلية"], ["العضلات التي تحتوي على أقراص بينية:", "القلبية", "الملساء", "الهيكلية", "غير المخططة"], ["صاحب نظام التسمية الثنائية:", "لينيوس", "أرسطو", "جون راي", "مندل"], ["أول من صنّف الحيوانات حسب وجود الدم الأحمر:", "أرسطو", "لينيوس", "جون راي", "داروين"], ["الاسم العلمي المكتوب بطريقة صحيحة:", "Bufo regularis", "bufo Regularis", "Bufo Regularis", "BUFO REGULARIS"], ["أكبر مرتبة تصنيفية:", "المملكة Kingdom", "النوع Species", "الجنس Genus", "الصف Class"], ["النسيج الضام الموجود في الحبل السري:", "المخاطي", "الشبكي", "الدهني", "الليفي"], ["النسيج الضام الموجود في الطحال ونخاع العظام:", "الشبكي", "المخاطي", "المرن", "الفجوي"], ["عدد الانقسامات المتتالية في الانقسام الميوزي:", "انقسامان", "انقسام واحد", "ثلاثة انقسامات", "أربعة انقسامات"], ["النسيج الطلائي الذي يبطّن القنوات الكلوية:", "المكعبي البسيط", "الحرشفي البسيط", "الانتقالي", "العمودي الطبقي"]];
const NQ=[["تبدأ دورة حياة النبات الزهري وتنتهي بـ:", "البذرة", "الزهرة", "الثمرة", "الجذر"], ["البذرة عبارة عن:", "جنين نباتي ساكن", "نبات كامل النمو", "ثمرة ناضجة", "جذر متحور"], ["الإنبات هو:", "مسايرة الجنين الساكن للنمو وظهور أجزائه خارج القصرة", "تكوين الأزهار على الساق", "انتقال حبوب اللقاح للمتاع", "تكوين الثمار بعد الإخصاب"], ["الزهرة هي ساق متحورة مسؤولة عن:", "إنتاج البذور", "امتصاص الماء", "تخزين الغذاء", "التثبيت في التربة"], ["العضو الذي ينتج حبوب اللقاح في الزهرة:", "الطلع", "المتاع", "الكأس", "التويج"], ["العضو الذي ينتج البويضة في الزهرة:", "المتاع", "الطلع", "الكأس", "السويقة"], ["في الإنبات الأرضي:", "تبقى الفلقات تحت سطح التربة", "تظهر الفلقات فوق سطح التربة", "لا توجد فلقات", "تتحول الفلقات إلى أوراق خضراء"], ["من أمثلة الإنبات الأرضي نبات:", "الفول", "الفاصوليا", "الخروع", "القطن"], ["من أمثلة الإنبات الهوائي نبات:", "الفاصوليا", "الفول", "الحمص", "العدس"], ["في الإنبات الهوائي تظهر الفلقات فوق سطح التربة بسبب سرعة استطالة:", "السويقة الجنينية السفلى", "السويقة الجنينية العليا", "الريشة", "الجذير فقط"], ["أول ورقة على البادرة في الإنبات الأرضي تسمى:", "الورقة الأولية", "الورقة الفلقية", "الورقة القنابية", "الورقة الحرشفية"], ["من نباتات الفلقة الواحدة:", "الذرة", "الفول", "الفاصوليا", "الخروع"], ["من وظائف الجذر ما عدا:", "حمل الأزهار والثمار", "الامتصاص", "التثبيت", "التخزين"], ["الجذر لا يوجد به:", "عقد وسلاميات", "قلنسوة", "شعيرات جذرية", "منطقة استطالة"], ["انتحاء الجذر الأرضي والضوئي:", "موجب أرضيًا وسالب ضوئيًا", "سالب أرضيًا وموجب ضوئيًا", "موجبان", "سالبان"], ["المنطقة التي تحمي قمة الجذر عند اختراق التربة:", "القلنسوة", "المرستيم القمي", "منطقة الاستطالة", "المنطقة الدائمة"], ["المنطقة المسؤولة عن الانقسام الخلوي في الجذر:", "المرستيم القمي", "منطقة الاستطالة", "الشعيرات الجذرية", "القلنسوة"], ["منطقة الامتصاص في الجذر هي منطقة:", "الشعيرات الجذرية", "القلنسوة", "المرستيم القمي", "الاستطالة"], ["الجذور الابتدائية هي التي تنشأ من:", "الجذير", "الساق", "الورقة", "الجنين فقط"], ["الجذور الجنينية توجد في:", "بعض حبوب النجيليات", "جميع ذوات الفلقتين", "الأوراق", "الأزهار"], ["الجذور العرضية لا تنشأ من:", "الجذير", "الساق", "الأوراق", "أي جزء من النبات عدا الجذير"], ["من أمثلة الجذور الماصة (الطفيلية):", "الهالوك والحامول", "الذرة", "القمح", "الفول"], ["جذر ابتدائي مخزن مغزلي الشكل مثل:", "الفجل", "البصل", "القمح", "الأرز"], ["جذور ثانوية مخزنة للغذاء توجد في:", "الأسبرجس", "الفجل", "الذرة", "الشعير"], ["الساق هو محور النبات الذي يحمل:", "الأوراق والبراعم والأزهار", "الأوراق فقط", "الجذور فقط", "البذور فقط"], ["ينتج الساق من نمو:", "المرستيم القمي للقمة النامية", "القلنسوة", "الشعيرات الجذرية", "الجذير"], ["القمة النامية للساق محاطة بـ:", "أوراق حرشفية", "قلنسوة", "شعيرات جذرية", "غلاف جنيني"], ["من وظائف الساق:", "نقل الماء والعصارة النيئة من الجذر", "امتصاص الأملاح من التربة", "تثبيت النبات في التربة", "تكوين القلنسوة"], ["ساق مصمتة (غير مجوفة) في:", "الذرة وقصب السكر", "القمح", "البرسيم", "الأرز"], ["الساق الجوفاء (بلا نخاع) توجد في:", "القمح والبرسيم", "الذرة", "قصب السكر", "الفول"], ["السوق الزاحفة مثل:", "البطيخ والخيار", "الفراولة", "العنب", "الذرة"], ["السوق الجارية (المدادة) مثل:", "الفراولة", "الخيار", "القمح", "الذرة"], ["الساق المتسلقة بالمحاليق مثل:", "العنب", "الذرة", "البطاطس", "البصل"], ["الريزومات مثالها:", "النجيل والغاب", "البطاطس", "القلقاس", "البصل"], ["الدرنات مثالها:", "البطاطس", "النجيل", "القلقاس", "البصل"], ["الكورمات مثالها نبات:", "القلقاس", "البطاطس", "النجيل", "البصل"], ["الأبصال مثالها:", "البصل", "القلقاس", "البطاطس", "الغاب"], ["السوق التمثيلية مثل:", "التين الشوكي والسفندر", "العاقول", "العنب", "الصبار"], ["الساق الشوكية مثل نبات:", "العاقول", "العنب", "التين الشوكي", "القلقاس"], ["الساق المخزنة للماء مثل:", "الصبار", "العاقول", "العنب", "النجيل"], ["الزهرة تعتبر ساقًا:", "قصيرة متقاربة العقد والسلاميات", "طويلة", "أرضية", "شوكية"], ["الورقة عضو نباتي:", "محدود النمو مسطح رقيق", "غير محدود النمو", "أسطواني سميك", "مخزن للغذاء دائمًا"], ["تخرج الورقة من الساق عند:", "العقد", "السلاميات", "القمة فقط", "الجذر"], ["البرعم الموجود في الزاوية بين الورقة والساق:", "البرعم الإبطي", "البرعم الطرفي", "البرعم العرضي", "القلنسوة"], ["تتكون الورقة من ثلاثة أجزاء هي:", "القاعدة والعنق والنصل", "القاعدة والنخاع والنصل", "العنق والجذير والنصل", "القاعدة والقلنسوة والعنق"], ["الترتيب المتقابل للأوراق بالإنجليزية:", "Opposite", "Alternate", "Whorled", "Simple"], ["الترتيب السواري للأوراق:", "Whorled", "Opposite", "Alternate", "Pinnate"], ["شكل النصل Cordate هو:", "قلبي", "رمحي", "بيضي", "كلوي"], ["شكل النصل Lanceolate هو:", "رمحي", "قلبي", "كلوي", "درعي"], ["حافة النصل Entire تعني:", "كاملة", "منشارية", "مسننة", "متموجة"], ["التعريق المفتوح:", "لا تتشابك فيه العروق", "تتشابك فيه العروق", "يتكون من شبكة منتظمة", "لا يوجد عرق وسطي"], ["التعريق المتوازي والشبكي من أنواع التعريق:", "المغلق", "المفتوح", "المفرد", "ثنائي الشعبة"], ["التعريق ثنائي الشعبة فيه يتفرع العرق الرئيسي إلى:", "فرعين غير متساويين", "ثلاثة فروع", "شبكة عروق", "عرق واحد فقط"], ["الورقة المركبة هي التي يتكون نصلها من:", "عدة أجزاء تسمى وريقات", "جزء واحد", "جذر وساق", "قاعدة فقط"], ["توجد براعم إبطية عند قاعدة:", "الورقة البسيطة", "الوريقات", "الجذور", "القلنسوة"], ["الورقة المركبة في الترمس:", "راحية", "ريشية", "ريشية متضاعفة", "بسيطة"], ["الأوراق التي تلتقط الحشرات تسمى:", "الأوراق آكلة الحشرات", "المحالقية", "الشوكية", "العوامة"], ["الجدار الخلوي يتكون من:", "الصفيحة الوسطى والجدار الابتدائي والجدار الثانوي", "الغشاء والنواة والسيتوبلازم", "البلاستيدات والفجوة والنقر", "الصفيحة الوسطى والنقر فقط"], ["النقر عبارة عن:", "فتحات في الجدار الثانوي بدون ترسيب", "بلاستيدات خضراء", "حبيبات نشا", "فجوات عصارية"], ["النقرة Bordered pit تسمى:", "المضفوفة", "البسيطة", "العمياء", "نصف المضفوفة"], ["من أنواع النقر:", "البسيطة والمضفوفة ونصف المضفوفة والعمياء", "الخضراء والملونة", "الحية وغير الحية", "الإبطية والطرفية"], ["من وظائف الجدار الخلوي:", "تحديد شكل الخلية وحماية مكوناتها", "تكوين البذور", "تخزين الدهون فقط", "إنتاج الأمشاج"], ["من المحتويات غير الحية بالخلية:", "حبيبات النشا", "الميتوكوندريا", "الريبوسومات", "البلاستيدات"], ["من المحتويات الحية بالخلية:", "البلاستيدات", "حبيبات النشا", "البللورات", "الدباغ"], ["تقسم البلاستيدات حسب لونها إلى:", "خضراء وملونة وعديمة اللون", "حمراء وزرقاء", "حية وميتة", "بسيطة ومركبة"], ["الفجوة العصارية بالإنجليزية:", "Vacuole", "Latex", "Tannins", "Crystals"], ["اللبن النباتي بالإنجليزية:", "Latex", "Oils", "Alkaloids", "Aleurone"], ["أجسام جولجي تسمى أيضًا:", "الديكتيوسومات", "الريبوسومات", "الميتوكوندريا", "الكلوروبلاست"]];
const NQ2=[["الأوراق الحرشفية وظيفتها:", "حماية البراعم", "البناء الضوئي", "تخزين الماء", "التسلق"], ["Foliage leaves تعني:", "أوراق خضرية", "أوراق قنابية", "أوراق حرشفية", "أوراق فلقية"], ["Bracts تعني:", "أوراق قنابية", "أوراق حرشفية", "أوراق أولية", "أوراق خضرية"], ["Cotyledonary leaves تعني:", "أوراق فلقية", "أوراق خضرية", "أوراق قنابية", "أوراق حرشفية"], ["من وظائف الورقة:", "البناء الضوئي والنتح", "امتصاص الماء من التربة", "التثبيت في التربة", "حمل الجذور"], ["الفتحة الصغيرة في قصرة البذرة تسمى:", "النقير", "المشيمة", "الحبل السري", "القلنسوة"], ["المشيمة هي:", "مكان خروج البويضة من جدار المبيض", "جزء من الساق", "غلاف البذرة", "عضو التلقيح"], ["الكيس الجنيني يغلف:", "البويضة عدا ثقب النقير", "حبة اللقاح", "الجذير", "الطلع"], ["نبات من ذوات الفلقة الواحدة:", "النخيل", "الفول", "الفاصوليا", "الخروع"], ["الجذور الثانوية تنشأ:", "كفروع جانبية داخلية المنشأ", "من الجذير مباشرة", "من الأوراق", "من الجنين"], ["المنطقة الدائمة في الجذر تنشأ منها:", "الجذور الجانبية", "القلنسوة", "الشعيرات الجذرية", "الأوراق"], ["من أمثلة الجذور العرضية المتسلقة:", "حبل المساكين", "الفجل", "الذرة", "البصل"], ["من أمثلة الجذور العرضية الدعامية:", "الذرة", "الفجل", "الأسبرجس", "الفول"], ["الجذور العرضية الليفية توجد في:", "البصل والقمح والأرز", "الفجل", "الأسبرجس", "الجزر"], ["الجذور التي تساعد في التنفس تسمى:", "الجذور التنفسية", "الجذور الدعامية", "الجذور الشادة", "الجذور الماصة"], ["الكورمات تنمو:", "عموديًا", "أفقيًا", "زاحفة على التربة", "متسلقة"], ["الريزومات تنمو:", "أفقيًا تحت سطح التربة", "عموديًا", "فوق التربة", "في الهواء"], ["الساق التي تكون جذورًا عرضية عند عقدها:", "الجارية (المدادة)", "الزاحفة", "القائمة", "الشوكية"], ["الساق الزهرية هي:", "الزهرة العادية", "الريزوم", "الكورمة", "الدرنة"], ["الساق القزمية الأرضية مثل:", "البصل والثوم", "البطيخ", "الذرة", "العنب"], ["الساق الزاحفة لا تكوّن:", "جذورًا عرضية", "أوراقًا", "براعم", "عقدًا"], ["اللفت والجزر والبنجر من أمثلة:", "الساق القزمية", "الساق المتسلقة", "الساق الشوكية", "الساق المدادة"]];
const ZT=[["صح أم خطأ: الخلية بدائية النواة لها نواة محاطة بغلاف نووي.", "خاطئة", "صحيحة"], ["صح أم خطأ: الانقسام الميتوزي ينتج خليتين متطابقتين وراثيًا.", "صحيحة", "خاطئة"], ["صح أم خطأ: الانقسام الميوزي يحدث في جميع الخلايا الجسدية.", "خاطئة", "صحيحة"], ["صح أم خطأ: المادة البينية في الأنسجة الطلائية وفيرة.", "خاطئة", "صحيحة"], ["صح أم خطأ: ترتكز خلايا الأنسجة الضامة على غشاء قاعدي.", "خاطئة", "صحيحة"], ["صح أم خطأ: الأنسجة الوعائية هي أنسجة ضامة سائلة.", "صحيحة", "خاطئة"], ["صح أم خطأ: الغضروف الزجاجي يوجد في القصبة الهوائية.", "صحيحة", "خاطئة"], ["صح أم خطأ: النسيج الطلائي الانتقالي يبطّن الأمعاء.", "خاطئة", "صحيحة"], ["صح أم خطأ: يبدأ اسم النوع في التسمية الثنائية بحرف كبير.", "خاطئة", "صحيحة"], ["صح أم خطأ: الأنسجة العصبية تنشأ من الإندودرم.", "خاطئة", "صحيحة"], ["صح أم خطأ: الزيجوت خلية ثنائية المجموعة الكروموسومية (2n).", "صحيحة", "خاطئة"], ["صح أم خطأ: جدار الأوعية الدموية يتكون من ثلاث طبقات.", "صحيحة", "خاطئة"], ["صح أم خطأ: المادة الخلالية للعظم جيلاتينية.", "خاطئة", "صحيحة"], ["صح أم خطأ: الطبقة القرنية في الحرشفي الطبقي تتكون من خلايا ميتة.", "صحيحة", "خاطئة"], ["صح أم خطأ: جون راي هو أول من عرّف النوع واعتبره وحدة التصنيف الأساسية.", "صحيحة", "خاطئة"]];
const QUIZZES={"نبات":[
 ["اختبار المحاضرة 1: مقدمة ودورة الحياة والإنبات",[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],NQ],
 ["اختبار المحاضرة 2: الجذر",[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],NQ],
 ["اختبار المحاضرة 3: الساق",[24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],NQ],
 ["اختبار المحاضرة 4: الورقة",[41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56],NQ],
 ["اختبار المحاضرة 5: تركيب الخلية النباتية",[57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67],NQ],
 ["اختبار شامل – أسئلة جديدة مختلفة عن اختبارات المحاضرات",[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],NQ2,20]],
"حيوان زراعي":[
 ["اختبار المحاضرة 1: الخلية والانقسام الخلوي",[0,1,2,3,4,5,6,7,28]],
 ["اختبار المحاضرة 2: الأنسجة الطلائية والضامة",[8,9,10,11,12,13,26,27,29]],
 ["اختبار المحاضرة 3: الأنسجة الأخرى والتصنيف",[14,15,16,17,18,19,20,21,22,23,24,25]],
 ["اختبار شامل (صح وخطأ – أسئلة مختلفة)",ZT.map((_,i)=>i),ZT]]};
const app=document.getElementById("app");
let user="";try{user=localStorage.getItem("agri_name")||""}catch(e){}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const LET=["أ","ب","ج","د"];
function page(inner,back){app.innerHTML=`<div class="card">${back?`<button class="back" id="bk">→ رجوع</button>`:""}${inner}</div>`;if(back)document.getElementById("bk").onclick=back}
function btns(items,cls,fn){app.querySelectorAll("."+cls).forEach((b,i)=>b.onclick=()=>fn(items[i]))}

function home(){
 page(`<h2>كلية الزراعة – نحن المتميزون</h2><p class="welcome">أهلًا بكم في الفرقة الأولى</p>
 <label for="nm">اكتب اسمك للدخول</label><input type="text" id="nm" placeholder="الاسم" value="${esc(user)}" autocomplete="name">
 <button class="btn" id="go">دخول</button>`);
 const nm=document.getElementById("nm");
 const go=()=>{const v=nm.value.trim();if(!v){nm.style.borderColor="#dc2626";nm.focus();return}user=v;try{localStorage.setItem("agri_name",v)}catch(e){}cloudName(v);subjects()};
 document.getElementById("go").onclick=go;nm.onkeydown=e=>{if(e.key==="Enter")go()};
}
function subjects(){
 page(`<h2>أهلًا ${esc(user)} 👋</h2><p class="welcome" style="margin:0">أهلًا بكم في الفرقة الأولى</p><p style="color:var(--mut);margin:4px 0 0">اختر المادة:</p>
 <button class="bk2" id="ch" style="margin-top:12px"><span>⚔️</span>تحدّي الأصحاب<small class="fr-badge"></small></button><button class="bk2" id="guideOpen" style="margin-top:8px"><span>📘</span>دليل الاستخدام</button>
 <div class="grid">${SUBJECTS.map(s=>`<button class="sub"><span>${s[1]}</span>${s[0]}</button>`).join("")}</div>
 <button class="bk2" id="tp"><span>⏰</span>تنظيم الوقت</button><button class="bk2" id="tm"><span>🎯</span>مؤقت المذاكرة والإنجازات</button><button class="back" id="out" style="margin-top:14px">تغيير الاسم</button>${UID?`<button class="back" id="lo" style="margin-top:14px;margin-right:8px">🚪 تسجيل الخروج</button>`:""}`);
 btns(SUBJECTS,"sub",s=>subject(s[0]));document.getElementById("out").onclick=home;if(UID)document.getElementById("lo").onclick=()=>auth.signOut();document.getElementById("tp").onclick=planner;document.getElementById("tm").onclick=timer;
 {const go=document.getElementById("guideOpen");if(go)go.onclick=()=>typeof openGuide==="function"&&openGuide()}{const ch=document.getElementById("ch");if(ch)ch.onclick=()=>typeof openChallenge==="function"?openChallenge():toast("جاري تحميل التحدّي… جرّب بعد ثانية")}
 if(typeof chPing==="function")chPing();
}
function subject(s){
 const ks=Object.keys(KINDS);
 page(`<h2>${esc(s)}</h2><div class="list">${ks.map(k=>`<button class="opt"><span>${KINDS[k][1]}</span>${KINDS[k][0]}</button>`).join("")}</div>`,subjects);
 btns(ks,"opt",k=>k==="quiz"?quizList(s):k==="img"?imgNums(s):k==="act"?actNums(s):cats(s,k));
}
function cats(s,k){
 const cs=Object.keys(CATS);
 page(`<h2>${KINDS[k][1]} ${KINDS[k][0]} – ${esc(s)}</h2><div class="list">${cs.map(c=>`<button class="opt"><span>${CATS[c][1]}</span>${CATS[c][0]}</button>`).join("")}</div>`,()=>subject(s));
 btns(cs,"opt",c=>numbers(s,k,c));
}
function numbers(s,k,c){
 const ns=[...Array(12).keys()].map(i=>i+1),bk=c==="pdf"&&k==="lec"&&BOOKS[s];
 page(`<h2>${CATS[c][1]} ${CATS[c][0]} – ${KINDS[k][0]}</h2>${bk?`<button class="bk2"><span>📖</span>كتب الكلية<small style="margin-right:auto;font-weight:normal;color:var(--mut)">${BOOKS[s].length} كتاب</small></button>`:""}<div class="list">${ns.map(n=>`<button class="opt">${KINDS[k][2]} ${n}${(FILES[[s,k,c,n].join("|")]||(c==="src"&&SRC[s]&&SRC[s][n]))?"<small>متاح ✓</small>":""}</button>`).join("")}</div>`,()=>cats(s,k));
 if(bk)app.querySelector(".bk2").onclick=()=>books(s,k,c);
 btns(ns,"opt",n=>item(s,k,c,n));
}
function books(s,k,c){
 const bs=BOOKS[s];
 page(`<h2>📖 كتب الكلية – ${esc(s)}</h2><div class="list">${bs.map(b=>`<button class="opt"><span>📘</span>${esc(b.name)}</button>`).join("")}</div>`,()=>numbers(s,k,c));
 btns(bs,"opt",b=>book(b,()=>books(s,k,c)));
}
function book(b,back){
 page(`<h2>${esc(b.name)}</h2><button class="btn" id="dl">⬇️ تحميل الكتاب كاملًا (PDF)</button><div class="msg" id="ms"></div>
 <a class="opt" href="${b.u}" target="_blank" rel="noopener" style="margin-top:10px">🔗 فتح الكتاب في المتصفح<small>بديل للتحميل</small></a><p style="margin:12px 0 0;font-weight:bold">المحاضرات (فصول مفصولة للمحاضرات 1–5، والباقي يفتح من الكتاب الكامل):</p><div class="list">${b.toc.map(x=>x[2]?`<div class="it" style="padding:6px 10px"><a href="${x[2]}" target="_blank" rel="noopener" style="flex:1;color:var(--ink);text-decoration:none;font-weight:bold">📄 ${esc(x[0])}</a><button class="tb" data-u="${x[2]}" data-n="${esc(x[0])}">⬇️ تحميل</button></div>`:`<a class="opt" href="${b.u}#page=${x[1]}" target="_blank" rel="noopener">${esc(x[0])}<small>ص ${x[1]}</small></a>`).join("")}</div>`,back);
 app.querySelectorAll(".it .tb").forEach(bt=>bt.onclick=async()=>{const ms=document.getElementById("ms");ms.textContent="جاري التجهيز…";try{const r=await fetch(bt.dataset.u);if(!r.ok)throw 0;const bl=await r.blob();if(new TextDecoder().decode(await bl.slice(0,5).arrayBuffer())!=="%PDF-"){ms.textContent="تعذر تحميل الفصل من الخادم.";return}ms.textContent=await save(bt.dataset.n.replace(/\s/g,"_")+".pdf",bl)}catch(e){ms.textContent="تعذر التحميل."}});
 document.getElementById("dl").onclick=async()=>{const ms=document.getElementById("ms");ms.textContent="جاري التجهيز…";
  try{const r=await fetch(b.u);if(!r.ok)throw 0;const bl=await r.blob(),h=new TextDecoder().decode(await bl.slice(0,5).arrayBuffer());if(h!=="%PDF-"){ms.textContent="تعذر تحميل الكتاب من الخادم (الملف غير صالح). جرّب فتحه بالرابط أدناه.";return}ms.textContent=await save(b.name.replace(/\s/g,"_")+".pdf",bl)}catch(e){ms.textContent="تعذر التحميل. جرّب فتح الكتاب بالرابط أدناه."}};
}
function item(s,k,c,n){
 const fl=FILES[[s,k,c,n].join("|")],back=()=>numbers(s,k,c),lab=KINDS[k][2]+" "+n;
 if(c==="src"){srcPage(s,k,n,back);return}
 if(!fl){page(`<h2>${lab} – ${CATS[c][0]}</h2><div class="empty">لم يتم رفع محتوى هنا بعد.</div>`,back);return}
 if(fl.length===1){viewer(fl[0],back);return}
 page(`<h2>${lab} – ${CATS[c][0]}</h2><div class="list">${fl.map(f=>`<button class="opt"><span>📄</span>${esc(f.name)}</button>`).join("")}</div>`,back);
 btns(fl,"opt",f=>viewer(f,()=>item(s,k,c,n)));
}
/* كاتب PDF بسيط من صور JPEG */
function pdfFrom(pgs){
 const enc=new TextEncoder(),ch=[],off=[];let len=0;
 const add=x=>{const u=typeof x==="string"?enc.encode(x):x;ch.push(u);len+=u.length};
 const obj=(n,body)=>{off[n]=len;add(n+" 0 obj\n"+body+"\nendobj\n")};
 add("%PDF-1.4\n%âãÏÓ\n");const N=pgs.length;
 obj(1,"<</Type/Catalog/Pages 2 0 R>>");
 obj(2,"<</Type/Pages/Count "+N+"/Kids ["+pgs.map((_,i)=>(5+i*3)+" 0 R").join(" ")+"]>>");
 pgs.forEach((p,i)=>{const pw=(p.w*.75).toFixed(1),ph=(p.h*.75).toFixed(1),c="q "+pw+" 0 0 "+ph+" 0 0 cm /Im0 Do Q";
  off[3+i*3]=len;add((3+i*3)+" 0 obj\n<</Type/XObject/Subtype/Image/Width "+p.w+"/Height "+p.h+"/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length "+p.b.length+">>\nstream\n");add(p.b);add("\nendstream\nendobj\n");
  obj(4+i*3,"<</Length "+c.length+">>\nstream\n"+c+"\nendstream");
  obj(5+i*3,"<</Type/Page/Parent 2 0 R/MediaBox [0 0 "+pw+" "+ph+"]/Resources<</XObject<</Im0 "+(3+i*3)+" 0 R>>>>/Contents "+(4+i*3)+" 0 R>>")});
 const M=2+3*N,xr=len;let x="xref\n0 "+(M+1)+"\n0000000000 65535 f \n";
 for(let i=1;i<=M;i++)x+=String(off[i]).padStart(10,"0")+" 00000 n \n";
 add(x+"trailer\n<</Size "+(M+1)+"/Root 1 0 R>>\nstartxref\n"+xr+"\n%%EOF");
 return new Blob(ch,{type:"application/pdf"});
}
const toJpg=async cv=>{const bl=await new Promise(r=>cv.toBlob(r,"image/jpeg",.85));return{b:new Uint8Array(await bl.arrayBuffer()),w:cv.width,h:cv.height}};
const PENC=["#dc2626","#2563eb","#facc15"];
function loadPen(k){try{return JSON.parse(localStorage.getItem(k)||"[]")}catch(e){return[]}}
function savePen(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}cloudPut(k,v)}
function strokeTo(cx,S,W,H,oy){cx.lineCap="round";cx.lineJoin="round";
 S.forEach(s=>{cx.strokeStyle=s[0];cx.globalAlpha=s[0]===PENC[2]?.35:1;cx.lineWidth=s[1]*(W/760);cx.beginPath();
  s[2].forEach((q,i)=>{const X=q[0]*W,Y=q[1]*H-oy;i?cx.lineTo(X,Y):cx.moveTo(X,Y)});cx.stroke()});cx.globalAlpha=1}
function viewer(f,back){
 let pen=false,ci=0;
 page(`<h2>${esc(f.name)}</h2><div class="bar"><button class="tb" id="pn">✏️ قلم</button><button class="tb" id="cl">لون</button><button class="tb" id="un">↩️ تراجع</button><button class="tb" id="rd">📖 قراءة</button><button class="tb" id="pd">⬇️ PDF</button></div><div class="msg" id="ms" style="margin:0"></div>
 ${f.parts.map((p,i)=>{const y0=p.pg[0][0],l=p.pg[p.pg.length-1],hh=l[0]+l[1]-y0;return`<div class="part" data-i="${i}" style="padding-bottom:${(hh/p.W*100).toFixed(3)}%"><img loading="lazy" alt="" src="${p.u}" style="transform:translateY(-${(y0/p.H*100).toFixed(4)}%)"><canvas></canvas></div>`}).join("")}`,()=>{document.body.classList.remove("read");back()});
 app.querySelectorAll(".part img").forEach(im=>im.onerror=()=>{document.getElementById("ms").textContent="تعذر تحميل صفحات الملف من الخادم. ملفات المحاضرات تعمل لمن يفتح الرابط بحساب Claude (أو إذا كان الرابط مشاركًا للجميع)."});
 const ms=document.getElementById("ms"),K=i=>"pen|"+f.id+"|"+i,P=f.parts.map((_,i)=>loadPen(K(i)));
 const cvs=[...app.querySelectorAll(".part")].map((w,i)=>{const cv=w.querySelector("canvas"),cx=cv.getContext("2d");
  const draw=()=>{cv.width=w.clientWidth*2;cv.height=w.clientHeight*2;cx.clearRect(0,0,cv.width,cv.height);strokeTo(cx,P[i],cv.width,cv.height,0)};
  new ResizeObserver(draw).observe(w);let cur=null;
  const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height]};
  cv.onpointerdown=e=>{if(!pen)return;cv.setPointerCapture(e.pointerId);cur=[PENC[ci],ci===2?14:3,[pt(e)]];P[i].push(cur)};
  cv.onpointermove=e=>{if(!cur)return;cur[2].push(pt(e));draw()};
  cv.onpointerup=cv.onpointercancel=()=>{if(cur){cur=null;savePen(K(i),P[i])}};
  return{cv,i,draw}});
 const setPen=()=>{document.getElementById("pn").classList.toggle("on",pen);cvs.forEach(o=>{o.cv.style.pointerEvents=pen?"auto":"none";o.cv.style.touchAction=pen?"none":"auto"})};setPen();
 document.getElementById("pn").onclick=()=>{pen=!pen;setPen()};
 document.getElementById("cl").onclick=e=>{ci=(ci+1)%3;e.target.style.background=PENC[ci];e.target.style.color=ci===2?"#000":"#fff"};
 document.getElementById("un").onclick=()=>{for(let j=cvs.length-1;j>=0;j--){if(P[j].length){P[j].pop();savePen(K(j),P[j]);cvs[j].draw();break}}};
 document.getElementById("rd").onclick=e=>{document.body.classList.toggle("read");e.target.classList.toggle("on")};
 document.getElementById("pd").onclick=async()=>{ms.textContent="جاري تجهيز ملف PDF…";
  try{const pages=[];
   for(let i=0;i<f.parts.length;i++){const p=f.parts[i],bm=await createImageBitmap(await (await fetch(p.u)).blob()),l=p.pg[p.pg.length-1],y0=p.pg[0][0],hh=l[0]+l[1]-y0;
    for(const [y,h] of p.pg){const cv=document.createElement("canvas");cv.width=p.W;cv.height=h;const cx=cv.getContext("2d");cx.drawImage(bm,0,y,p.W,h,0,0,p.W,h);
     const S=P[i].map(s=>[s[0],s[1],s[2].map(q=>[q[0],(q[1]*hh+y0-y)/hh])]);strokeTo(cx,S,p.W,hh,0);pages.push(await toJpg(cv))}}
   const blob=pdfFrom(pages);let m=await save(f.name.replace(/[\s\/]/g,"_")+".pdf",blob);
   if(m.indexOf("✓")<0&&m.indexOf("إلغاء")<0)m=await save("file.pdf",blob);ms.textContent=m+" (الكتابة بالقلم تُحفظ داخل الملف)"}catch(e){ms.textContent="تعذر إنشاء الملف على هذا الجهاز."}};
}
async function save(filename,data){
 let d=null;try{d=await claude.use("downloads")}catch(e){}
 if(!d){try{const bl=data instanceof Blob?data:new Blob([data]),u=URL.createObjectURL(bl),a=document.createElement("a");a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),60000);
  return "جرّبت التنزيل المباشر. إن لم يبدأ، فالمتصفح يمنعه هنا: افتح الرابط من تطبيق Claude أو claude.ai بعد تسجيل الدخول، أو اطبع الصفحة من المتصفح (⋮ ← طباعة ← حفظ PDF)."}catch(e){}
  return "التحميل غير متاح في هذا العرض. افتح الرابط من تطبيق Claude أو claude.ai، أو اطبع الصفحة من المتصفح (⋮ ← طباعة ← حفظ PDF)."}
 try{await d.save({filename,data});return "تم إرسال الملف للحفظ ✓"}catch(e){return e&&e.code==="declined"?"تم إلغاء التحميل.":"تعذر التحميل ("+((e&&e.code)||"خطأ")+")."}
}
function quizList(s){
 const qs=QUIZZES[s];
 if(!qs){page(`<h2>📝 الاختبارات – ${esc(s)}</h2><div class="empty">لا توجد اختبارات لهذه المادة بعد.</div>`,()=>subject(s));return}
 page(`<h2>📝 الاختبارات – ${esc(s)}</h2><div class="list">${qs.map(q=>`<button class="opt">${q[0]}<small>${q[3]||q[1].length} سؤال${q[4]?" · ⏱ "+Math.round(q[4]/60)+" د":""}</small></button>`).join("")}</div>`,()=>subject(s));
 btns(qs,"opt",q=>quiz(s,q));
}
let QTOK=null;
function quiz(s,qz){
 const bank=qz[2]||MCQ;let ids=qz[1].slice();if(qz[3]){ids.sort(()=>Math.random()-.5);ids=ids.slice(0,qz[3])}
 const items=ids.map(i=>{const m=bank[i],o=m.slice(1).map((x,j)=>[x,j===0]).sort(()=>Math.random()-.5);return{q:m[0],o}});
 const ans=items.map(()=>-1),fl=items.map(()=>false);let cur=0;
 const secs=qz[4]||0,t0=Date.now(),tok={};QTOK=tok;let left=secs,fin=false,iv=0;
 const fmtT=t=>Math.floor(t/60)+":"+String(t%60).padStart(2,"0");
 const finish=()=>{if(fin)return;fin=true;clearInterval(iv);QTOK=null;result(s,qz,items,ans,secs?left:-1)};
 const tick=()=>{if(QTOK!==tok){clearInterval(iv);return}left=Math.max(0,secs-Math.floor((Date.now()-t0)/1000));
  const e=document.getElementById("qt");if(!e&&!document.getElementById("st")){clearInterval(iv);return}
  if(e){e.textContent="⏱ "+fmtT(left);e.classList.toggle("low",left<=20)}
  if(left<=0)finish()};
 const draw=()=>{const it=items[cur],N=items.length;
  page(`<h2>${qz[0]}</h2>${secs?`<div class="tmr${left<=20?" low":""}" id="qt">⏱ ${fmtT(left)}</div>`:""}<div class="msg" id="st" style="margin:0"></div>
  <div class="q"><b>${cur+1}. ${esc(it.q)}</b>${it.o.map((o,j)=>`<label data-j="${j}">${LET[j]}) ${esc(o[0])}</label>`).join("")}</div>
  <button class="btn alt" id="fg"></button>
  <div class="row"><button class="btn alt" id="pv" ${cur?"":"disabled"}>→ السابق</button><button class="btn" id="nx" ${cur<N-1?"":"disabled"}>التالي ←</button></div>
  <button class="btn" id="sb" style="background:var(--ac)">✅ تسليم الاختبار</button>
  <div class="nv">${items.map((_,i)=>`<button class="nb" data-i="${i}">${i+1}</button>`).join("")}</div>`,()=>quizList(s));
  const upd=()=>{app.querySelectorAll(".q label").forEach((l,j)=>l.classList.toggle("sel",ans[cur]===j));
   app.querySelectorAll(".nb").forEach((b,i)=>{b.className="nb"+(i===cur?" cur":"")+(fl[i]?" fg":ans[i]>=0?" an":"")});
   document.getElementById("fg").textContent=fl[cur]?"🚩 إلغاء التعليم":"🏳️ تعليم للمراجعة لاحقًا";
   document.getElementById("st").textContent="سؤال "+(cur+1)+" من "+N+" · أجبت "+ans.filter(a=>a>=0).length+(fl.some(Boolean)?" · 🚩 "+fl.filter(Boolean).length+" للمراجعة":"")};
  app.querySelectorAll(".q label").forEach(l=>l.onclick=()=>{ans[cur]=+l.dataset.j;upd()});
  document.getElementById("fg").onclick=()=>{fl[cur]=!fl[cur];upd()};
  document.getElementById("pv").onclick=()=>{cur--;draw()};document.getElementById("nx").onclick=()=>{cur++;draw()};
  app.querySelectorAll(".nb").forEach(b=>b.onclick=()=>{cur=+b.dataset.i;draw()});
  document.getElementById("sb").onclick=()=>{const un=ans.filter(a=>a<0).length,f=fl.filter(Boolean).length;
   if((un||f)&&!confirm((un?"لم تجب عن "+un+" سؤال. ":"")+(f?"لديك "+f+" سؤال معلّم للمراجعة. ":"")+"هل تريد التسليم الآن؟"))return;
   finish()};
  upd();window.scrollTo(0,0)};
 draw();if(secs)iv=setInterval(tick,500);
}
async function prt(ms,getBlob){
 ms.textContent="جاري تجهيز الملف للطباعة…";
 try{const b=await getBlob(),u=URL.createObjectURL(b),f=document.createElement("iframe");f.style.cssText="position:fixed;width:0;height:0;border:0";f.src=u;document.body.appendChild(f);
  f.onload=()=>{try{f.contentWindow.focus();f.contentWindow.print();ms.textContent="تم فتح نافذة الطباعة. إن لم تظهر، حمّل الملف (PDF) ثم اطبعه من جهازك."}catch(e){ms.textContent="الطباعة المباشرة غير متاحة هنا. حمّل الملف (PDF) ثم اطبعه من جهازك."}};
  setTimeout(()=>{if(ms.textContent.indexOf("جاري")===0)ms.textContent="إن لم تظهر نافذة الطباعة، حمّل الملف (PDF) ثم اطبعه من جهازك."},4000)}catch(e){ms.textContent="تعذر تجهيز الملف."}
}
function result(s,qz,items,ans,left){
 const sc=items.filter((it,i)=>ans[i]>=0&&it.o[ans[i]][1]).length,secs=qz[4]||0,bn=secs&&left>0?Math.floor(sc*left/secs):0;window.__bonus=bn;cloudAttempt(s,qz[0],sc,items.length);
 page(`<h2>نتيجة: ${qz[0]}</h2><div class="msg" style="margin:0;color:var(--ink);font-weight:bold">الطالب: ${esc(user)} · ${esc(s)}</div><div class="score">${sc} / ${items.length}</div>${secs?`<div class="msg" style="margin:0 0 8px;color:var(--ink);font-weight:bold">${left===0?"⏰ انتهى الوقت وتم التسليم تلقائيًا · ":""}الوقت المتبقي ${Math.floor(left/60)}:${String(left%60).padStart(2,"0")} · ⚡ مكافأة السرعة +${bn} نقطة · مجموع نقاط المحاولة ${sc+bn}</div>`:""}
 <button class="btn" id="fl">⬇️ حفظ ملف النتيجة (PDF)</button><button class="btn alt" id="pr">🖨️ طباعة الملف</button><div class="msg" id="ms"></div>
 ${items.map((it,i)=>`<div class="q"><b>${i+1}. ${esc(it.q)}</b>${it.o.map((o,j)=>`<label class="${o[1]?"ok":(ans[i]===j?"bad":"")}">${LET[j]}) ${esc(o[0])}${o[1]?" ✓":""}${ans[i]===j&&!o[1]?" ✗ (إجابتك)":""}</label>`).join("")}</div>`).join("")}
 <button class="btn alt" id="rt">إعادة الاختبار</button>`,()=>quizList(s));
 const ms=document.getElementById("ms"),mk=()=>resultPDF(s,qz,items,ans,sc);
 document.getElementById("rt").onclick=()=>quiz(s,qz);document.getElementById("pr").onclick=()=>prt(ms,mk);
 const sv=async()=>{ms.textContent="جاري تجهيز ملف النتيجة…";try{const blob=await mk();let m=await save("نتيجة_"+user.replace(/\s/g,"_")+".pdf",blob);
  if(m.indexOf("✓")<0&&m.indexOf("إلغاء")<0)m=await save("quiz_result.pdf",blob);ms.textContent=m}catch(e){ms.textContent="اضغط زر الحفظ لتنزيل ملف النتيجة."}};
 document.getElementById("fl").onclick=sv;sv();window.scrollTo(0,0);
}
async function textPDF(L){
 const W=1240,H=1754,M=70,pgs=[];let cv,cx,y;
 const np=()=>{cv=document.createElement("canvas");cv.width=W;cv.height=H;cx=cv.getContext("2d");cx.fillStyle="#fff";cx.fillRect(0,0,W,H);cx.direction="rtl";cx.textAlign="right";y=M+10;pgs.push(cv)};
 const wr=(t,sz,b,col,ind=0)=>{const F=()=>{cx.font=(b?"bold ":"")+sz+"px Tahoma,Arial,sans-serif";cx.fillStyle=col||"#111"};F();
  const put=l=>{if(y>H-150){np();F()}cx.fillText(l,W-M-ind,y);y+=sz*1.65};let line="";
  for(const w of String(t).split(" ")){const x=line?line+" "+w:w;if(cx.measureText(x).width>W-2*M-ind&&line){put(line);line=w}else line=x}put(line)};
 np();L.forEach(l=>wr(l[0],l[1],l[2],l[3],l[4]||0));
 pgs.forEach((c,i)=>{const g=c.getContext("2d");g.direction="rtl";g.textAlign="center";g.font="24px Tahoma,Arial,sans-serif";g.fillStyle="#555";
  g.fillText("إعداد: إبراهيم علي السيد أبو يحيى  |  صفحة "+(i+1)+" / "+pgs.length,W/2,H-50)});
 return pdfFrom(await Promise.all(pgs.map(toJpg)));
}
async function resultPDF(s,qz,items,ans,sc){
 const L=[["كلية الزراعة – نحن المتميزون",40,1,"#0f5a41"],[s+" – "+qz[0],32,1],["اسم الطالب: "+user,32,1],["الدرجة: "+sc+" / "+items.length,34,1,"#c2410c"],["",16]];
 items.forEach((it,i)=>{const ok=ans[i]>=0&&it.o[ans[i]][1],mine=ans[i]>=0?it.o[ans[i]][0]:"— لم تجب —";
  L.push([(i+1)+". "+it.q,30,1],["إجابتك: "+mine+(ok?"  ✓":"  ✗"),28,0,ok?"#15803d":"#b91c1c",34]);
  if(!ok)L.push(["الإجابة الصحيحة: "+it.o.find(o=>o[1])[0],28,1,"#15803d",34]);L.push(["",12])});
 return textPDF(L);
}
const DAYS=["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"];
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||d)}catch(e){return JSON.parse(d)}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}cloudPut(k,v)};
const subOpts=()=>SUBJECTS.map(s=>`<option>${s[0]}</option>`).join("");
async function dl(ms,name,blobP){ms.textContent="جاري تجهيز الملف…";try{const b=await blobP();let m=await save(name,b);if(m.indexOf("✓")<0&&m.indexOf("إلغاء")<0)m=await save(name.endsWith(".jpg")?"image.jpg":"file.pdf",b);ms.textContent=m}catch(e){ms.textContent="تعذر إنشاء الملف."}}
function planner(){
 const P=ld("agri_plan","[]"),rows=P.map((x,i)=>({...x,i})).sort((a,b)=>a.d-b.d||a.s.localeCompare(b.s));
 page(`<h2>⏰ تنظيم الوقت</h2><p style="color:var(--mut);margin:0 0 8px">أضف مواعيد مذاكرتك ثم حمّل الجدول PDF.</p>
 <label>اليوم</label><select id="pd">${DAYS.map((d,i)=>`<option value="${i}">${d}</option>`).join("")}</select>
 <label>المادة</label><select id="pm">${subOpts()}</select>
 <div class="rw"><div><label>من</label><input type="time" id="ps" value="16:00"></div><div><label>إلى</label><input type="time" id="pe" value="18:00"></div></div>
 <button class="btn" id="pa">➕ إضافة للجدول</button><div class="msg" id="ms"></div>
 ${rows.length?DAYS.map((d,di)=>{const r=rows.filter(x=>x.d===di);return r.length?`<h3 style="margin:12px 0 0;color:var(--pri)">${d}</h3>`+r.map(x=>`<div class="it"><span>${x.s} – ${x.e} · <b>${esc(x.m)}</b></span><button data-i="${x.i}">🗑️</button></div>`).join(""):""}).join("")+`<button class="btn alt" id="pp">⬇️ تحميل الجدول (PDF)</button><button class="btn alt" id="pq">🖨️ طباعة الجدول</button>`:`<div class="empty">لا توجد مواعيد بعد.</div>`}`,subjects);
 const ms=document.getElementById("ms");
 document.getElementById("pa").onclick=()=>{const s=document.getElementById("ps").value,e=document.getElementById("pe").value;
  if(!s||!e||s>=e){ms.textContent="تأكد أن وقت البداية قبل النهاية.";return}
  P.push({d:+document.getElementById("pd").value,m:document.getElementById("pm").value,s,e});sv("agri_plan",P);planner()};
 app.querySelectorAll(".it button").forEach(b=>b.onclick=()=>{P.splice(+b.dataset.i,1);sv("agri_plan",P);planner()});
 const pp=document.getElementById("pp");
 const mk=()=>{const L=[["جدول المذاكرة الأسبوعي",42,1,"#0f5a41"],["الطالب: "+user+" – كلية الزراعة، نحن المتميزون",30,1],["",16]];
  DAYS.forEach((d,di)=>{const r=rows.filter(x=>x.d===di);if(r.length){L.push([d,34,1,"#c2410c"]);r.forEach(x=>L.push([x.s+" – "+x.e+"   |   "+x.m,30,0,"#111",30]));L.push(["",12])}});return textPDF(L)};if(pp){pp.onclick=()=>dl(ms,"جدول_المذاكرة.pdf",mk);document.getElementById("pq").onclick=()=>prt(ms,mk)}
}
function imgsOf(s,n){const fl=FILES[[s,"lec","pdf",n].join("|")];if(!fl)return[];
 const f=fl[0],o=[];f.parts.forEach(p=>p.pg.forEach(q=>o.push({u:p.u,W:p.W,H:p.H,y:q[0],h:q[1]})));return o}
function imgNums(s){
 const ns=[...Array(12).keys()].map(i=>i+1);
 page(`<h2>🖼️ الصور – ${esc(s)}</h2><p style="color:var(--mut);margin:0">صور شرائح كل محاضرة، يمكن تكبير أي صورة وتحميلها.</p><div class="list">${ns.map(n=>{const c=imgsOf(s,n).length;return`<button class="opt">المحاضرة ${n}${c?`<small>${c} صورة ✓</small>`:""}</button>`}).join("")}</div>`,()=>subject(s));
 btns(ns,"opt",n=>gallery(s,n));
}
function gallery(s,n){
 const L=imgsOf(s,n);
 if(!L.length){page(`<h2>صور المحاضرة ${n}</h2><div class="empty">لم يتم رفع صور هنا بعد.</div>`,()=>imgNums(s));return}
 page(`<h2>🖼️ صور المحاضرة ${n} – ${esc(s)}</h2><p class="msg" style="margin:0">اضغط على الصورة لتكبيرها.</p><div class="msg" id="ms"></div><div class="gal">${L.map((x,i)=>`<div class="t"><div class="part" style="padding-bottom:${(x.h/x.W*100).toFixed(3)}%"><img loading="lazy" alt="" src="${x.u}" style="transform:translateY(-${(x.y/x.H*100).toFixed(4)}%)"></div><div class="cp"><span>صورة ${i+1}</span><button data-i="${i}">⬇️ تحميل</button></div></div>`).join("")}</div>`,()=>imgNums(s));
 app.querySelectorAll(".t .part").forEach(e=>e.onclick=()=>e.parentNode.classList.toggle("big"));
 app.querySelectorAll(".t button").forEach(b=>b.onclick=()=>dl(document.getElementById("ms"),s.replace(/\s/g,"_")+"_م"+n+"_صورة"+(+b.dataset.i+1)+".jpg",async()=>{
  const x=L[+b.dataset.i],bm=await createImageBitmap(await (await fetch(x.u)).blob()),cv=document.createElement("canvas");cv.width=x.W;cv.height=x.h;
  cv.getContext("2d").drawImage(bm,0,x.y,x.W,x.h,0,0,x.W,x.h);return await new Promise(r=>cv.toBlob(r,"image/jpeg",.92))}));
}
const SRC={"نبات": {"1": [["Seed Germination – LibreTexts (epigeal / hypogeal)", "https://bio.libretexts.org/Bookshelves/Botany/The_Science_of_Plants_-_Understanding_Plants_and_How_They_Grow_(Michaels_et_al.)/02%3A_Taxonomy_and_Seed_Germination/2.02%3A_Introduction_to_Seed_Germination"], ["Introduction to Seed Germination – University of Minnesota", "https://open.lib.umn.edu/horticulture/chapter/2-2-introduction-to-seed-germination"], ["Hypogeal germination – Vedantu", "https://www.vedantu.com/biology/hypogeal-germination"]], "2": [["شرح المورفولوجيا (جذر، ساق، ورقة) – Teachoo", "https://www.teachoo.com/subjects/biology/class-11/chapter-5/"], ["ملاحظات مورفولوجيا النباتات الزهرية – Careers360", "https://school.careers360.com/ncert/ncert-class-11th-biology-chapter-5-morphology-of-flowering-plants-notes"], ["محاضرة Plant Morphology (جامعة – PDF)", "https://www.uomus.edu.iq/uploads/lectures/49/3c31b14be248445eb19aa0432728c111.pdf"]], "3": [["شرح المورفولوجيا (جذر، ساق، ورقة) – Teachoo", "https://www.teachoo.com/subjects/biology/class-11/chapter-5/"], ["ملاحظات مورفولوجيا النباتات الزهرية – Careers360", "https://school.careers360.com/ncert/ncert-class-11th-biology-chapter-5-morphology-of-flowering-plants-notes"], ["محاضرة Plant Morphology (جامعة – PDF)", "https://www.uomus.edu.iq/uploads/lectures/49/3c31b14be248445eb19aa0432728c111.pdf"], ["ملخص مورفولوجيا النباتات الزهرية – Oswal", "https://oswalpublishers.com/notes/cbse-class-11-biology-notes/morphology-of-flowering-plants/"]], "4": [["شرح المورفولوجيا (جذر، ساق، ورقة) – Teachoo", "https://www.teachoo.com/subjects/biology/class-11/chapter-5/"], ["ملاحظات مورفولوجيا النباتات الزهرية – Careers360", "https://school.careers360.com/ncert/ncert-class-11th-biology-chapter-5-morphology-of-flowering-plants-notes"], ["محاضرة Plant Morphology (جامعة – PDF)", "https://www.uomus.edu.iq/uploads/lectures/49/3c31b14be248445eb19aa0432728c111.pdf"]], "5": [["Cell wall – LibreTexts (Plant Anatomy)", "https://bio.libretexts.org/Bookshelves/Botany/Plant_Anatomy_and_Physiology_(Bellairs)/01%3A_Inside_a_Plant_Cell/1.02%3A_Cell_wall"], ["Pit (botany) – Wikipedia", "https://en.wikipedia.org/wiki/Pit_(botany)"], ["Lecture: Cell Wall – Plant Anatomy (SIU)", "https://nickrentlab.siu.edu/PlantAnatomyWeb/LecturesDLN/Lecture4_CellWall.html"]]}, "حيوان زراعي": {"1": [["Comparing Meiosis and Mitosis – Biology LibreTexts", "https://bio.libretexts.org/Bookshelves/Introductory_and_General_Biology/Principles_of_Biology/02%3A_Chapter_2/17%3A_Meiosis_-_Sexual_Reproduction/17.04%3A_Comparing_Meiosis_and_Mitosis"], ["Comparing Meiosis and Mitosis – Medicine LibreTexts", "https://med.libretexts.org/TextMaps/Anatomy_and_Physiology/Book%3A_Anatomy_and_Physiology_(Boundless)/26%3A_The_Reproductive_System/26.2%3A_Meiosis/26.2B%3A_Comparing_Meiosis_and_Mitosis"]]}},LT={"نبات": {"1": "ارسم مراحل الإنبات الأرضي والهوائي جنبًا إلى جنب وقارن موضع الفلقات والسويقتين.", "2": "اعمل جدولًا لأنواع الجذور (ابتدائي/ثانوي/عرضي/جنيني) ومثالًا لكل نوع.", "3": "اربط كل ساق أرضية بمثالها: ريزوم (نجيل)، درنة (بطاطس)، كورمة (قلقاس)، بصلة (بصل).", "4": "ارسم الورقة البسيطة والمركبة والتعريق المفتوح والمغلق ثم اكتب مثالًا تحت كل رسمة.", "5": "رتب طبقات الجدار الخلوي من الخارج للداخل، وارسم النقرة المضفوفة والبسيطة."}, "حيوان زراعي": {"1": "اكتب جدول مقارنة بين الميتوزي والميوزي (الخلايا، عدد الانقسامات، الناتج، الأهمية) وكرره من الذاكرة.", "2": "احفظ كل نسيج مع شكل خلاياه ومكانه في الجسم.", "3": "احفظ ترتيب المراتب التصنيفية بجملة، وطبّقها على الضفدعة المصرية."}},TIPS={"all": ["ذاكر بالتكرار المتباعد: راجع كل محاضرة بعد يوم، ثم بعد أسبوع.", "اختبر نفسك قبل ما تحفظ: جرّب «المحتوى التفاعلي» ثم اقرأ الإجابة.", "قسّم المذاكرة لجلسات 25 دقيقة براحة قصيرة (استخدم المؤقت في التطبيق).", "اشرح الدرس بصوتك لشخص آخر؛ لو تعثرت فهذه نقطة الضعف.", "نم جيدًا قبل الامتحان؛ النوم يثبّت المعلومات."], "نبات": ["المورفولوجي يُذاكر بالرسم: ارسم الجذر والساق والورقة بنفسك أكثر من مرة.", "استخدم ترتيبًا ثابتًا في المراجعة: الجذر ← الساق ← الورقة ← الزهرة.", "ذاكر بالتكرار المتباعد: راجع كل محاضرة بعد يوم، ثم بعد أسبوع.", "اختبر نفسك قبل ما تحفظ: جرّب «المحتوى التفاعلي» ثم اقرأ الإجابة.", "قسّم المذاكرة لجلسات 25 دقيقة براحة قصيرة (استخدم المؤقت في التطبيق).", "اشرح الدرس بصوتك لشخص آخر؛ لو تعثرت فهذه نقطة الضعف.", "نم جيدًا قبل الامتحان؛ النوم يثبّت المعلومات."], "حيوان زراعي": ["اعتمد على الجداول المقارنة (ميتوزي/ميوزي، أنواع الأنسجة).", "اربط كل نسيج بعضو يوجد فيه لتتذكره بسهولة.", "ذاكر بالتكرار المتباعد: راجع كل محاضرة بعد يوم، ثم بعد أسبوع.", "اختبر نفسك قبل ما تحفظ: جرّب «المحتوى التفاعلي» ثم اقرأ الإجابة.", "قسّم المذاكرة لجلسات 25 دقيقة براحة قصيرة (استخدم المؤقت في التطبيق).", "اشرح الدرس بصوتك لشخص آخر؛ لو تعثرت فهذه نقطة الضعف.", "نم جيدًا قبل الامتحان؛ النوم يثبّت المعلومات."]};
const ulh=a=>`<ul style="padding-right:20px;margin:0">${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
function srcPage(s,k,n,back){
 const L=(SRC[s]&&SRC[s][n])||[],tips=(LT[s]&&LT[s][n]?[LT[s][n]]:[]).concat(TIPS[s]||TIPS.all);
 page(`<h2>🔗 مصادر إضافية – ${KINDS[k][2]} ${n}</h2>${L.length?`<div class="list">${L.map(x=>`<a class="opt" href="${x[1]}" target="_blank" rel="noopener">🌐 ${esc(x[0])}</a>`).join("")}</div><p class="msg">الروابط خارجية (أغلبها بالإنجليزية وبعضها بمستوى مدرسي)، استخدمها كمراجعة مساعدة بجانب كتاب الكلية.</p>`:`<div class="empty">لا توجد مصادر لهذه المحاضرة بعد.</div>`}<h3 style="margin:14px 0 4px">💡 نصائح للمذاكرة</h3>${ulh(tips)}`,back);
}
function lecQs(s,n){const E=QUIZZES[s]&&QUIZZES[s][n-1];if(!E||E[0].indexOf("شامل")>=0)return[];const B=E[2]||MCQ;return E[1].map(i=>B[i])}
function actNums(s){
 const ns=[...Array(12).keys()].map(i=>i+1);
 page(`<h2>🎮 المحتوى التفاعلي – ${esc(s)}</h2><p style="color:var(--mut);margin:0">بطاقات حفظ وتدريب فوري لكل محاضرة.</p><div class="list">${ns.map(n=>{const c=lecQs(s,n).length;return`<button class="opt">المحاضرة ${n}${c?`<small>${c} سؤال ✓</small>`:""}</button>`}).join("")}</div>`,()=>subject(s));
 btns(ns,"opt",n=>actHome(s,n));
}
function actHome(s,n){
 const Q=lecQs(s,n);
 if(!Q.length){page(`<h2>المحاضرة ${n}</h2><div class="empty">لم يتم تجهيز محتوى تفاعلي لهذه المحاضرة بعد.</div>`,()=>actNums(s));return}
 page(`<h2>🎮 المحاضرة ${n} – ${esc(s)}</h2><div class="list"><button class="opt"><span>🃏</span>بطاقات الحفظ<small>${Q.length} بطاقة</small></button><button class="opt"><span>⚡</span>تدريب فوري مع تصحيح<small>${Q.length} سؤال</small></button></div>`,()=>actNums(s));
 const bs=app.querySelectorAll(".opt");bs[0].onclick=()=>cards(s,n,Q);bs[1].onclick=()=>drill(s,n,Q);
}
function cards(s,n,Q){
 const D=Q.slice().sort(()=>Math.random()-.5);let i=0,fl=false,known=0;
 const draw=()=>{
  if(i>=D.length){page(`<h2>🃏 انتهت البطاقات</h2><div class="score">${known} / ${D.length}</div><p class="msg">عرفت ${known} بطاقة. أعد البطاقات الصعبة مرة أخرى.</p><button class="btn" id="ag">إعادة</button>`,()=>actHome(s,n));document.getElementById("ag").onclick=()=>cards(s,n,Q);return}
  page(`<h2>🃏 بطاقة ${i+1} / ${D.length}</h2><div class="fc ${fl?"back":""}" id="cd">${esc(fl?D[i][1]:D[i][0])}</div><p class="msg" style="margin:0">${fl?"الإجابة":"اضغط على البطاقة لإظهار الإجابة"}</p>${fl?`<div class="row"><button class="btn alt" id="no">↻ راجعها</button><button class="btn" id="ok">عرفتها ✓</button></div>`:""}`,()=>actHome(s,n));
  document.getElementById("cd").onclick=()=>{fl=!fl;draw()};
  if(fl){document.getElementById("no").onclick=()=>{fl=false;i++;draw()};document.getElementById("ok").onclick=()=>{known++;fl=false;i++;draw()}}};
 draw();
}
function drill(s,n,Q){
 const D=Q.slice().sort(()=>Math.random()-.5);let i=0,sc=0,st=0,best=0;
 const draw=()=>{
  if(i>=D.length){page(`<h2>⚡ النتيجة</h2><div class="score">${sc} / ${D.length}</div><p class="msg">أفضل سلسلة إجابات صحيحة متتالية: ${best}. ${sc>=D.length*.8?"ممتاز! 🌟":"كرّر التدريب لتحسّن نتيجتك 💪"}</p><button class="btn" id="ag">إعادة التدريب</button>`,()=>actHome(s,n));document.getElementById("ag").onclick=()=>drill(s,n,Q);return}
  const m=D[i],o=m.slice(1).map((x,j)=>[x,j===0]).sort(()=>Math.random()-.5);
  page(`<h2>⚡ سؤال ${i+1} / ${D.length}</h2><div class="msg" style="margin:0">الدرجة: ${sc} · السلسلة: ${st}🔥</div><div class="q"><b>${esc(m[0])}</b>${o.map((x,j)=>`<label data-j="${j}">${LET[j]}) ${esc(x[0])}</label>`).join("")}</div><div class="msg" id="fb"></div><button class="btn" id="nx" style="display:none">التالي ←</button>`,()=>actHome(s,n));
  let done=false;
  app.querySelectorAll(".q label").forEach(l=>l.onclick=()=>{if(done)return;done=true;const j=+l.dataset.j,ok=o[j][1];
   app.querySelectorAll(".q label").forEach((e,k)=>{if(o[k][1])e.classList.add("ok")});if(!ok)l.classList.add("bad");
   if(ok){sc++;st++;best=Math.max(best,st)}else st=0;
   document.getElementById("fb").textContent=ok?"✓ إجابة صحيحة!":"✗ الإجابة الصحيحة موضّحة بالأخضر";
   const nx=document.getElementById("nx");nx.style.display="block";nx.onclick=()=>{i++;draw()}});
 };
 draw();
}
const ENC=["ممتاز! استمر، النجاح قريب 💪","كل دقيقة مذاكرة تقرّبك من هدفك 🌟","أنت أقوى مما تظن، كمّل! 🔥","خطوة صغيرة كل يوم تصنع فرقًا كبيرًا 🚀","فخور بمجهودك، لا تتوقف الآن 👏","التركيز الآن راحة بعد الامتحان 🎯"];
let TID=null;
function timer(msg){
 const S=ld("agri_sess","[]"),pts=S.reduce((a,x)=>a+x.p,0),mins=S.reduce((a,x)=>a+x.m,0),lv=pts>=600?"🥇 ذهبي":pts>=300?"🥈 فضي":pts>=100?"🥉 برونزي":"🌱 مبتدئ";
 page(`<h2>🎯 مؤقت المذاكرة</h2><div class="score" style="font-size:20px">${pts} نقطة · ${mins} دقيقة · ${lv}</div>
 ${msg?`<div class="empty" style="border-style:solid;border-color:var(--pri);color:var(--pri);font-weight:bold;margin:0 0 10px">${msg}</div>`:""}
 <label>المادة</label><select id="ts">${subOpts()}</select><label>المدة (دقائق)</label><input type="number" id="tn" value="25" min="1" max="180">
 <div class="score" id="ck" style="font-size:46px">25:00</div><div class="msg" id="en">كل دقيقة مذاكرة = نقطة، وإكمال الجلسة = 10 نقاط إضافية.</div>
 <button class="btn" id="st">▶️ ابدأ المذاكرة</button><button class="btn alt" id="fn" style="display:none">⏹ إنهاء وحفظ</button>
 <button class="btn alt" id="rp">⬇️ تقرير الإنجازات (PDF)</button><button class="btn alt" id="rq">🖨️ طباعة التقرير</button><div class="msg" id="ms"></div>
 ${S.length?`<h3 style="margin:12px 0 0">آخر الجلسات</h3>`+S.slice(-5).reverse().map(x=>`<div class="it"><span>${esc(x.m1)} · ${x.m} دقيقة</span><span>+${x.p} نقطة</span></div>`).join(""):""}`,()=>{clearInterval(TID);subjects()});
 const ck=document.getElementById("ck"),en=document.getElementById("en"),st=document.getElementById("st"),fn=document.getElementById("fn"),tn=document.getElementById("tn");
 const f2=n=>String(n).padStart(2,"0"),show=m=>ck.textContent=f2(Math.floor(m/60))+":"+f2(m%60);
 tn.oninput=()=>{if(!TID)show(Math.max(1,+tn.value||1)*60)};show((+tn.value||25)*60);
 st.onclick=()=>{const plan=Math.max(1,Math.min(180,+tn.value||25)),t0=Date.now(),end=t0+plan*60000;st.style.display="none";fn.style.display="block";tn.disabled=true;
  const done=full=>{clearInterval(TID);TID=null;const m=full?plan:Math.floor((Date.now()-t0)/60000);
   if(m<1){timer("الجلسة أقل من دقيقة، لم تُسجّل نقاط.");return}
   const p=m+(full?10:0);S.push({d:new Date().toLocaleDateString("ar-EG"),m1:document.getElementById("ts").value,m,p});sv("agri_sess",S);timer(`أحسنت! سجّلت ${m} دقيقة و${p} نقطة. ${ENC[Math.floor(Math.random()*ENC.length)]}`)};
  let n=0;TID=setInterval(()=>{const r=Math.max(0,Math.round((end-Date.now())/1000));show(r);if(++n%300===0)en.textContent=ENC[Math.floor(Math.random()*ENC.length)];if(r<=0){try{navigator.vibrate&&navigator.vibrate([300,150,300])}catch(e){}done(true)}},1000);
  fn.onclick=()=>done(false)};
 const mkR=()=>{
  const by={};S.forEach(x=>by[x.m1]=(by[x.m1]||0)+x.m);
  const L=[["تقرير إنجازات المذاكرة",42,1,"#0f5a41"],["الطالب: "+user+" – كلية الزراعة، نحن المتميزون",30,1],["",10],["إجمالي النقاط: "+pts+"   |   إجمالي الوقت: "+mins+" دقيقة   |   المستوى: "+lv.replace(/[^؀-ۿ ]/g,""),30,1,"#c2410c"],["",10],["الوقت لكل مادة:",32,1]];
  Object.keys(by).forEach(k=>L.push(["• "+k+": "+by[k]+" دقيقة",30,0,"#111",30]));
  L.push(["",10],["الجلسات:",32,1]);S.slice().reverse().slice(0,30).forEach(x=>L.push([x.d+" – "+x.m1+" – "+x.m+" دقيقة (+"+x.p+" نقطة)",28,0,"#111",30]));
  L.push(["",14],[S.length?"أحسنت! جهدك المستمر هو سر النجاح، واصل التقدم.":"ابدأ أول جلسة مذاكرة لتظهر إنجازاتك هنا.",32,1,"#15803d"]);return textPDF(L)};document.getElementById("rp").onclick=()=>dl(document.getElementById("ms"),"تقرير_الإنجازات.pdf",mkR);document.getElementById("rq").onclick=()=>prt(document.getElementById("ms"),mkR);
}
/* ===== Firebase: تسجيل الدخول + Firestore + الاستمرارية ===== */
const FBC={apiKey:"AIzaSyDCliy7ZWB0tN7ozSjo2mTeCerPqDsEwKE",authDomain:"ibrahim-38a8f.firebaseapp.com",projectId:"ibrahim-38a8f",storageBucket:"ibrahim-38a8f.firebasestorage.app",messagingSenderId:"952002782051",appId:"1:952002782051:web:77cf39cc589eee94912956",measurementId:"G-NCVF1NTZHQ"};
let auth=null,db=null,UID=null,PEND={},PTM=null,PNAME=null;
if(typeof firebase!=="undefined"){try{firebase.initializeApp(FBC);auth=firebase.auth();db=firebase.firestore();
 auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(()=>{});
 db.enablePersistence({synchronizeTabs:true}).catch(()=>{})}catch(e){auth=null;db=null}}
const SVT=()=>firebase.firestore.FieldValue.serverTimestamp();
function toast(m){const e=document.createElement("div");e.className="toast";e.textContent=m;document.body.appendChild(e);setTimeout(()=>e.remove(),5000)}
function clearLocal(){try{Object.keys(localStorage).filter(k=>k.indexOf("agri_")===0||k.indexOf("pen|")===0).forEach(k=>localStorage.removeItem(k))}catch(e){}}
function cloudPut(k,v){if(!db||!UID)return;PEND[k]=v;clearTimeout(PTM);PTM=setTimeout(flush,700)}
async function flush(){const P=PEND,uid=UID;PEND={};if(!uid)return;
 try{const b=db.batch(),root={};
  for(const k in P){if(k==="agri_plan")root.plan=P[k];else if(k==="agri_sess")root.sess=P[k];
   else if(k.indexOf("pen|")===0)b.set(db.doc("users/"+uid+"/pens/"+k.replace(/[^A-Za-z0-9_-]/g,"_")),{k:k,data:JSON.stringify(P[k]),at:SVT()})}
  if(Object.keys(root).length){root.updatedAt=SVT();b.set(db.doc("users/"+uid),root,{merge:true})}
  await b.commit()}catch(e){toast("تعذر الحفظ السحابي ("+(e.code||"خطأ")+")")}}
function cloudName(v){if(db&&UID)db.doc("users/"+UID).set({name:v,updatedAt:SVT()},{merge:true}).catch(e=>toast("تعذر حفظ الاسم ("+(e.code||"خطأ")+")"))}
function cloudAttempt(s,q,sc,n){if(db&&UID)db.collection("users/"+UID+"/attempts").add({subject:s,quiz:q,score:sc,total:n,bonus:+window.__bonus||0,at:SVT()}).catch(()=>{})}
async function loadCloud(u,nm){
 let prev=null;try{prev=localStorage.getItem("agri_uid")}catch(e){}
 if(prev&&prev!==u.uid)clearLocal();
 try{localStorage.setItem("agri_uid",u.uid)}catch(e){}
 const fallback=nm||u.displayName||(u.email||"").split("@")[0]||"طالب";
 try{const ref=db.doc("users/"+u.uid);let snap=await ref.get();
  if(!snap.exists){await ref.set({name:fallback,email:u.email||"",plan:[],sess:[],createdAt:SVT()},{merge:true});snap=await ref.get()}
  const d=snap.data()||{};
  if(d.plan)localStorage.setItem("agri_plan",JSON.stringify(d.plan));
  if(d.sess)localStorage.setItem("agri_sess",JSON.stringify(d.sess));if(d.best)localStorage.setItem("agri_best",JSON.stringify(d.best));
  const ps=await db.collection("users/"+u.uid+"/pens").get();ps.forEach(x=>{const o=x.data();if(o&&o.k)localStorage.setItem(o.k,o.data)});
  const n=d.name||fallback;localStorage.setItem("agri_name",n);return n}
 catch(e){toast("تعذر تحميل بياناتك السحابية ("+(e.code||"خطأ")+"). سيتم استخدام البيانات المحفوظة على الجهاز.");return localStorage.getItem("agri_name")||fallback}
}
const AERR={"auth/invalid-credential":"البريد أو كلمة السر غير صحيحة.","auth/wrong-password":"كلمة السر غير صحيحة.","auth/user-not-found":"لا يوجد حساب بهذا البريد.","auth/email-already-in-use":"هذا البريد مسجّل بالفعل، سجّل الدخول.","auth/weak-password":"كلمة السر ضعيفة (6 أحرف على الأقل).","auth/invalid-email":"صيغة البريد الإلكتروني غير صحيحة.","auth/network-request-failed":"لا يوجد اتصال بالإنترنت.","auth/too-many-requests":"محاولات كثيرة، انتظر قليلًا ثم أعد المحاولة.","auth/operation-not-allowed":"تسجيل الدخول بالبريد غير مفعّل في Firebase (Authentication ← Sign-in method).","auth/unauthorized-domain":"هذا الموقع غير مضاف في Authorized domains داخل Firebase.","auth/missing-password":"اكتب كلمة السر."};
function authScreen(mode){
 const up=mode==="up";
 page(`<h2>${up?"إنشاء حساب جديد":"تسجيل الدخول"}</h2><p class="welcome">أهلًا بكم في الفرقة الأولى</p>
 ${up?`<label for="an">الاسم</label><input type="text" id="an" placeholder="الاسم الكامل" autocomplete="name">`:""}
 <label for="ae">البريد الإلكتروني</label><input type="email" id="ae" dir="ltr" autocomplete="email" placeholder="name@example.com">
 <label for="ap">كلمة السر</label><input type="password" id="ap" dir="ltr" autocomplete="${up?"new-password":"current-password"}" placeholder="6 أحرف على الأقل">
 <button class="btn" id="ag">${up?"إنشاء الحساب":"دخول"}</button><div class="msg" id="am"></div>
 <button class="btn alt" id="as">${up?"عندي حساب – تسجيل الدخول":"إنشاء حساب جديد"}</button>
 ${up?"":`<button class="back" id="af" style="margin-top:8px">نسيت كلمة السر؟</button>`}`);
 const am=document.getElementById("am"),E=()=>document.getElementById("ae").value.trim(),P=()=>document.getElementById("ap").value;
 const err=e=>{am.textContent=AERR[e&&e.code]||("حدث خطأ ("+((e&&e.code)||"غير معروف")+")");am.style.color="var(--bad)"};
 document.getElementById("as").onclick=()=>authScreen(up?"in":"up");
 const go=async()=>{const n=up?document.getElementById("an").value.trim():"";
  if(up&&!n){am.textContent="اكتب اسمك.";am.style.color="var(--bad)";return}
  if(!E()||!P()){am.textContent="اكتب البريد وكلمة السر.";am.style.color="var(--bad)";return}
  am.style.color="var(--mut)";am.textContent="جاري المعالجة…";
  try{if(up){PNAME=n;const c=await auth.createUserWithEmailAndPassword(E(),P());try{await c.user.updateProfile({displayName:n})}catch(e){}}
   else await auth.signInWithEmailAndPassword(E(),P())}catch(e){PNAME=null;err(e)}};
 document.getElementById("ag").onclick=go;document.getElementById("ap").onkeydown=e=>{if(e.key==="Enter")go()};
 const af=document.getElementById("af");
 if(af)af.onclick=async()=>{if(!E()){am.textContent="اكتب بريدك أولًا ثم اضغط «نسيت كلمة السر».";am.style.color="var(--bad)";return}
  try{await auth.sendPasswordResetEmail(E());am.style.color="var(--ok)";am.textContent="تم إرسال رابط إعادة تعيين كلمة السر إلى بريدك."}catch(e){err(e)}};
}
function boot(){
 if(!auth){home();return}
 page('<div class="empty">جاري التحقق من حسابك…</div>');
 auth.onAuthStateChanged(async u=>{
  if(!u){UID=null;PEND={};clearLocal();user="";authScreen("in");return}
  UID=u.uid;page('<div class="empty">جاري تحميل بياناتك…</div>');
  user=await loadCloud(u,PNAME);PNAME=null;subjects()});
}

/* ===== تحميل تلقائي لتحديثات الكيمياء وخطة الأيام السبعة (لا يحتاج تعديل ملفات HTML) ===== */
(function(){["chem.js","plan7.js","stats.js","friends.js","guide_page.js","menu.js"].forEach(function(f){var s=document.createElement("script");s.src=f;s.async=false;(document.head||document.documentElement).appendChild(s)})})();
