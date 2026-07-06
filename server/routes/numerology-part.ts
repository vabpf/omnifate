import { Router } from 'express';
import { getGeminiClient } from '../ai/client';
import { buildNumerologyPartPrompt, numerologyPartSystemInstruction } from '../ai/prompts/numerology-part';
import { requireFields } from './validate';

const router = Router();

router.post('/api/numerology-part', async (req, res) => {
  try {
    if (!requireFields(req, res, ['name', 'dob', 'part', 'numData'])) return;
    const { name, dob, gender, numData, part } = req.body;

    const ai = getGeminiClient();
    const prompt = buildNumerologyPartPrompt(name, dob, gender, numData, part);

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: numerologyPartSystemInstruction,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini không trả về kết quả luận giải phù hợp cho phần này.');
    }

    res.json({ content: text.trim() });
  } catch (error: any) {
    console.error(`Error during fate part ${req.body?.part || ''} analysis:`, error);
    res.status(500).json({ error: 'Lỗi hệ thống trong quá trình phân tích. Vui lòng thử lại sau.' });
  }
});

export default router;
