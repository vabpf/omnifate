import { Router } from 'express';
import { getGeminiClient } from '../ai/client';
import { buildTuViPrompt, tuviSystemInstruction } from '../ai/prompts/tuvi';
import { requireFields } from './validate';

const router = Router();

router.post('/api/ai/tuvi', async (req, res) => {
  try {
    if (!requireFields(req, res, ['name', 'dob', 'tuviData'])) return;
    const { name, dob, time, place, gender, tuviData } = req.body;

    const ai = getGeminiClient();
    const prompt = buildTuViPrompt(name, dob, time, place, gender, tuviData);
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: { systemInstruction: tuviSystemInstruction },
    });

    const text = response.text;
    if (!text) throw new Error('Không nhận được kết quả từ AI.');
    res.json({ content: text.trim() });
  } catch (error: any) {
    console.error('TuVi AI error:', error);
    res.status(500).json({ error: 'Lỗi luận giải Tử Vi. Vui lòng thử lại sau.' });
  }
});

export default router;
