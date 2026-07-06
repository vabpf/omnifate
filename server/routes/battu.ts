import { Router } from 'express';
import { getGeminiClient } from '../ai/client';
import { buildBattuPrompt, battuSystemInstruction } from '../ai/prompts/battu';
import { requireFields } from './validate';

const router = Router();

router.post('/api/ai/battu', async (req, res) => {
  try {
    if (!requireFields(req, res, ['name', 'dob', 'battuData'])) return;
    const { name, dob, time, place, gender, battuData } = req.body;

    const ai = getGeminiClient();
    const prompt = buildBattuPrompt(name, dob, time, place, gender, battuData);
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: { systemInstruction: battuSystemInstruction },
    });

    const text = response.text;
    if (!text) throw new Error('Không nhận được kết quả từ AI.');
    res.json({ content: text.trim() });
  } catch (error: any) {
    console.error('Battu AI error:', error);
    res.status(500).json({ error: 'Lỗi luận giải Bát Tự. Vui lòng thử lại sau.' });
  }
});

export default router;
