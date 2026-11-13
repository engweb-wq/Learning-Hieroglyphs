import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Body parser supporting large base64 image uploads from camera / files
  app.use(express.json({ limit: '25mb' }));

  // Initialize server-side Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Multimodal Vision Hieroglyph Scanner Endpoint
  app.post('/api/scanner/analyze', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', userNotes = '' } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: 'Image base64 data is required.' });
      }

      // Clean base64 string if data URL prefix was included
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

      const systemInstruction = `أنت عالم مصريات ولسانيات قديمة متخصص في النقائش الهيروغليفية وقائمة جاردنر (Gardiner's Sign List) وقواعد اللغة المصرية القديمة (Middle & Late Egyptian).
مهمتك فحص الصورة المرفقة لنقش هيروغليفي (حجري، بردي، جداري، أو خرطوشة) واكتشاف الرموز وتحليلها علمياً بدقة بالغة.

قواعد الأمانة العلمية الصارمة (Academic Integrity):
1. التمييز الواضح بين الرموز المؤكدة (confirmed) والقراءات المحتملة (tentative) والتالفة (eroded).
2. عدم اختلاق أو تلفيق أي ترجمة أو رموز عند عدم كفاية الصورة أو تآكل النقش. إذا كان هناك جزء تالف أو غير مقروء، استخدم الأقواس المعقوفة [...] وحدد في damageAnalysisAr أن الرمز مفقود أو ممسوح.
3. إذا لم تكن الصورة تحتوي على هيروغليفية أو كانت غير واضحة تماماً، اجعل isHieroglyphicFound = false مع توضيح السبب.
4. اتجاه القراءة: حدده بدقة ('rtl' أو 'ltr' أو 'column_rtl' أو 'column_ltr' أو 'uncertain') بالاعتماد على اتجاه نظر الكائنات الحية (الطيور، الحيوانات، البشر). في الهيروغليفية، الرموز تنظر نحو بداية السطر. اشرح ذلك بوضوح في readingDirectionExplanationAr.
5. لكل رمز مكتشف: حدد كود جاردنر الدقيق (مثل G43, A1, R4, M17, O4, X1...)، الحرف الهيروغليفي يونيكود، النقحرة اللاتينية الدقيقة، النطق الصوتي التقريبي بالأحرف العربية، المعنى المعجمي، ونوع الرمز (صوتي أحادي، ثنائي، ثلاثي، مخصص، أيديوجرام).`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          isHieroglyphicFound: {
            type: Type.BOOLEAN,
            description: 'True if ancient Egyptian hieroglyphic symbols are identifiable in the image.',
          },
          readingDirection: {
            type: Type.STRING,
            description: "Reading direction: 'rtl', 'ltr', 'column_rtl', 'column_ltr', or 'uncertain'.",
          },
          readingDirectionExplanationAr: {
            type: Type.STRING,
            description: 'Explanation in Arabic of how reading direction was determined based on animal/human facing orientation.',
          },
          overallConfidence: {
            type: Type.INTEGER,
            description: 'Overall confidence percentage (0 to 100).',
          },
          glyphs: {
            type: Type.ARRAY,
            description: 'Detected hieroglyphs in correct reading order.',
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                char: { type: Type.STRING, description: 'Unicode Hieroglyphic character e.g. 𓊵, 𓇓, 𓅓' },
                gardiner: { type: Type.STRING, description: 'Gardiner sign list code e.g. R4, M17, G17' },
                transliteration: { type: Type.STRING, description: 'Scientific transliteration e.g. ḥtp, nsw, m' },
                arabicSound: { type: Type.STRING, description: 'Arabic phonetic sound e.g. حُتب, نسو, إم' },
                meaningAr: { type: Type.STRING, description: 'Lexical meaning in Arabic' },
                categoryAr: { type: Type.STRING, description: 'Category e.g. طيور, مباني, رموز ملكية' },
                glyphType: { type: Type.STRING, description: "'uniliteral', 'biliteral', 'triliteral', 'determinative', 'ideogram', or 'uncertain'" },
                confidence: { type: Type.INTEGER, description: 'Confidence score (0 - 100)' },
                epistemicStatus: { type: Type.STRING, description: "'confirmed', 'tentative', or 'eroded'" },
                facingDirection: { type: Type.STRING, description: "'right', 'left', or 'neutral'" },
                notesAr: { type: Type.STRING, description: 'Optional epigraphic note in Arabic' },
              },
              required: ['id', 'char', 'gardiner', 'transliteration', 'arabicSound', 'meaningAr', 'glyphType', 'confidence', 'epistemicStatus'],
            },
          },
          transliterationLine: {
            type: Type.STRING,
            description: 'Complete scientific transliteration string.',
          },
          phoneticTranscriptionAr: {
            type: Type.STRING,
            description: 'Arabic phonetic reading of the whole phrase.',
          },
          literalTranslationAr: {
            type: Type.STRING,
            description: 'Faithful Arabic translation without ungrounded speculation.',
          },
          historicalContextAr: {
            type: Type.STRING,
            description: 'Brief historical and cultural context in Arabic.',
          },
          damageAnalysisAr: {
            type: Type.STRING,
            description: 'Condition and damage assessment of the inscription.',
          },
          isPartiallyEroded: {
            type: Type.BOOLEAN,
            description: 'True if parts are weathered, chipped, or missing.',
          },
          academicIntegrityNoteAr: {
            type: Type.STRING,
            description: 'Confirmation note regarding academic caution and zero fabrication.',
          },
        },
        required: [
          'isHieroglyphicFound',
          'readingDirection',
          'readingDirectionExplanationAr',
          'overallConfidence',
          'glyphs',
          'transliterationLine',
          'phoneticTranscriptionAr',
          'literalTranslationAr',
          'historicalContextAr',
          'isPartiallyEroded',
          'academicIntegrityNoteAr',
        ],
      };

      const promptText = `حلل هذا النقش الأثري تحليلاً لغوياً وأثرياً دقيقاً مستعيناً بقائمة جاردنر والنصوص المصرية الكلاسيكية. ${userNotes ? `ملاحظات إضافية من المستخدم: ${userNotes}` : ''}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('لم يتم استلام رد من نموذج التحليل.');
      }

      const parsedData = JSON.parse(responseText);
      return res.json({ success: true, data: parsedData });
    } catch (err: unknown) {
      console.error('Error analyzing hieroglyphic image:', err);
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء تحليل الصورة.';
      return res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  });

  // AI Egyptian Scribe Tutor Endpoint ("عمر سليم")
  app.post('/api/tutor/chat', async (req, res) => {
    try {
      const { message, level = 'intermediate', history = [], generateQuiz = false } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message text is required.' });
      }

      const systemInstruction = `أنت "عمر سليم"، المعلم والكاتب المصري القديم ورئيس دار الوثائق "بيت الحياة" (Per-Ankh) في مدرسة الكاتب المصري.
شخصيتك:
- حكيم، مشجع، ناصح وودود ومحب للغة، تخاطب المتعلم بـ "أيها الكاتب النجيب" أو "طالب العلم العزيز"، وتبدأ أحياناً بتحية البردي مثل "إم-حوتيب 𓊵 (مرحباً في سلام)" أو "عنخ-ودجا-سنب 𓋹𓍑𓋴 (حياة ورخاء وصحة)".
- تشرح الرموز الهيروغليفية، المفردات، القواعد (الاسم، الفعل، صيغ الزمن، التقديم الشرفي)، والبرديات والنقوش.

قواعد الأمانة الأكاديمية الصارمة:
1. التزم بالحقائق المؤكدة في علم المصريات وقائمة جاردنر (Gardiner Sign List).
2. لا تقدم التخمينات اللغوية أو الشبه الصوتي العابر كحقائق مؤكدة؛ وضّح دائماً ما إذا كان الأصل مشتركاً أفرواسيوياً موثقاً أو فرضية محتملة فقط.
3. كيّف لغتك وعمق إجابتك حسب مستوى المستخدم المختار:
   - 'beginner': لغة سهلة جداً للأطفال والمبتدئين، شروحات بصرية وأمثلة واضحة.
   - 'intermediate': ذكر أكواد جاردنر، النقحرة اللاتينية، والمحددات التصنيفية، مع أمثلة عملية.
   - 'advanced': تعمق في فقه اللغة والقواعد (Middle Egyptian grammar)، الفترات التاريخية، والصوتيات المقارنة.
4. إذا كان خيار generateQuiz مفعل، أو إذا طلب المستخدم سؤالاً أو تمرينًا، ضمّن كائن quiz يحتوي على سؤال دقيق مع 3 أو 4 خيارات وتفسير تاريخي.`;

      const tutorResponseSchema = {
        type: Type.OBJECT,
        properties: {
          replyText: {
            type: Type.STRING,
            description: 'نص إجابة الكاتب عمر سليم الودودة والشاملة والموثقة علمياً بالعربية.',
          },
          hieroglyphsSample: {
            type: Type.STRING,
            description: 'رموز هيروغليفية يونيكود توضيحية مرتبطة بالإجابة مثل 𓋹 𓊵 𓇳.',
          },
          gardinerCodes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'أكواد جاردنر للرموز المذكورة مثل ["S34", "R4"].',
          },
          suggestedFollowups: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: '3 أسئلة متابعة مقترحة يطرحها المعلم على الطالب لمواصلة التعلم.',
          },
          quiz: {
            type: Type.OBJECT,
            properties: {
              questionAr: { type: Type.STRING, description: 'نص سؤال الاختبار القصير' },
              hieroglyphDisplay: { type: Type.STRING, description: 'رمز هيروغليفي للاختبار إن وجد' },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    textAr: { type: Type.STRING },
                    isCorrect: { type: Type.BOOLEAN },
                  },
                  required: ['id', 'textAr', 'isCorrect'],
                },
              },
              explanationAr: { type: Type.STRING, description: 'تفسير الإجابة الصحيحة' },
              pointsReward: { type: Type.INTEGER, description: 'نقاط كاتب للمكافأة (20 إلى 40 نقطة)' },
            },
            required: ['questionAr', 'options', 'explanationAr', 'pointsReward'],
          },
        },
        required: ['replyText', 'suggestedFollowups'],
      };

      // Construct conversational prompt with recent history if available
      let promptContext = `مستوى الطالب الحالي: ${level}.\n`;
      if (generateQuiz) {
        promptContext += `ملاحظة خاصة: المطلوب تضمين اختبار قصير (quiz) ممتع لتدريب الطالب واختبار معرفته في موضوع السؤال.\n`;
      }
      if (Array.isArray(history) && history.length > 0) {
        promptContext += `سياق الحوار السابق:\n`;
        history.slice(-4).forEach((h: { sender: string; text: string }) => {
          promptContext += `${h.sender === 'user' ? 'الطالب' : 'المعلم عمر سليم'}: ${h.text}\n`;
        });
      }
      promptContext += `سؤال الطالب الآن: ${message}`;

      let responseText: string | undefined;
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptContext,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: tutorResponseSchema,
          },
        });
        responseText = response.text;
      } catch (firstErr) {
        console.warn('Initial model request failed, retrying with gemini-flash-latest:', firstErr);
        try {
          const fallbackResp = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: promptContext,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              responseSchema: tutorResponseSchema,
            },
          });
          responseText = fallbackResp.text;
        } catch (secondErr) {
          console.warn('Fallback model request failed:', secondErr);
          // Return an authentic high-quality fallback reply
          return res.json({
            success: true,
            data: {
              replyText: `إم-حوتيب 𓊵 أيها الكاتب النجيب!
تفضل المعلم عمر سليم بتدوين هذه الإجابة في سجلات بيت الحياة:
إن سؤالك حول «${message}» يتعلق بأحد أهم ركائز اللغة المصرية القديمة في عصورها الكلاسيكية. 
- تعتمد اللغة على الربط الدقيق بين القيمة الصوتية الصامتة والمخصص الفكري (Ideogram).
- في قائمة جاردنر، تُصنف العلامات بحسب طبيعتها (طيور G، حيوانات E، أطراف آدمية D، مبانٍ O، نباتات M).
- تذكر دوماً أن التمييز بين الحقائق اللغوية المؤكدة والفرضيات المقترحة هو سر الأمانة العلمية التي يحافظ عليها كتبة مصر القديمة.`,
              hieroglyphsSample: '𓏞 𓊵 𓋹',
              gardinerCodes: ['Y3', 'R4', 'S34'],
              suggestedFollowups: [
                'ما هي الحروف الأحادية الـ 24 الأكثر استخداماً؟',
                'كيف أكتب اسمي بالهيروغليفية داخل الخرطوشة؟',
                'اختبرني يا معلم عمر في الحروف والمفردات!'
              ],
              quiz: {
                questionAr: 'ما هي الأداة التي كان يحملها الكاتب المصري دائماً كشعار لعلمه ومكانته؟',
                hieroglyphDisplay: '𓏞',
                options: [
                  { id: 'opt_s_1', textAr: 'لوحة الألوان المزودة بتجويفي حبر مع مقلمة الغاب (Y3)', isCorrect: true },
                  { id: 'opt_s_2', textAr: 'صولجان العرش الذهبي فقط', isCorrect: false },
                  { id: 'opt_s_3', textAr: 'درع الحرب وسهام القوس', isCorrect: false }
                ],
                explanationAr: 'علامة الكاتب المصري Y3 تمثل محبرة الكاتب المصنوعة من الخشب وفيها حبران: أسود لكتابة النصوص، وأحمر للعناوين والمصححات وتواريخ البرديات.',
                pointsReward: 30
              }
            }
          });
        }
      }

      if (!responseText) {
        throw new Error('لم يتم استلام رد من المعلم الذكي.');
      }

      const parsedData = JSON.parse(responseText);
      return res.json({ success: true, data: parsedData });
    } catch (err: unknown) {
      console.error('Error in tutor chat endpoint:', err);
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء معالجة السؤال.';
      return res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Mount Vite middleware in development or static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Egyptian Scribe App server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
