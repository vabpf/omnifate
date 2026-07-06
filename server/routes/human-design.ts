import { Router } from 'express';
import { getGeminiClient } from '../ai/client';
import { buildHumanDesignPrompt, humanDesignSystemInstruction } from '../ai/prompts/human-design';
import { requireFields } from './validate';

const router = Router();

router.post('/api/ai/human-design', async (req, res) => {
  try {
    if (!requireFields(req, res, ['name', 'dob', 'hdData'])) return;
    const { name, dob, time, place, gender, hdData } = req.body;

    const ai = getGeminiClient();
    const prompt = buildHumanDesignPrompt(name, dob, time, place, gender, hdData);
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: { systemInstruction: humanDesignSystemInstruction },
    });

    const text = response.text;
    if (!text) throw new Error('Không nhận được kết quả từ AI.');
    res.json({ content: text.trim() });
  } catch (error: any) {
    console.error('HumanDesign AI error:', error);
    res.status(500).json({ error: 'Lỗi luận giải Thiết Kế Nhân Dạng. Vui lòng thử lại sau.' });
  }
});

export default router;
