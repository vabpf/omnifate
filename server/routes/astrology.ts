import { Router } from 'express';
import { getGeminiClient } from '../ai/client';
import { buildAstrologyPrompt, astrologySystemInstruction } from '../ai/prompts/astrology';

const router = Router();

router.post('/api/ai/astrology', async (req, res) => {
  try {
    const { name, dob, time, place, gender, astroData } = req.body;
    if (!name || !dob || !astroData) {
      return res.status(400).json({ error: 'Thiếu thông tin đầu vào.' });
    }

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
    res.status(500).json({ error: error.message || 'Lỗi luận giải Chiêm tinh.' });
  }
});

export default router;
