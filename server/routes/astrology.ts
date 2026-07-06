import { Router } from 'express';
import { getGeminiClient } from '../ai/client';
import { buildAstrologyPrompt, astrologySystemInstruction } from '../ai/prompts/astrology';
import { requireFields } from './validate';

const router = Router();

router.post('/api/ai/astrology', async (req, res) => {
  try {
    if (!requireFields(req, res, ['name', 'dob', 'astroData'])) return;
    const { name, dob, time, place, gender, astroData } = req.body;

    const ai = getGeminiClient();
    const prompt = buildAstrologyPrompt(name, dob, time, place, gender, astroData);
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: { systemInstruction: astrologySystemInstruction },
    });

    const text = response.text;
    if (!text) throw new Error('Không nhận được kết quả từ AI.');
    res.json({ content: text.trim() });
  } catch (error: any) {
    console.error('Astrology AI error:', error);
    res.status(500).json({ error: 'Lỗi luận giải Chiêm tinh. Vui lòng thử lại sau.' });
  }
});

export default router;
