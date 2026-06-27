import { Router } from 'express';
import { getGeminiClient } from '../ai/client';
import { buildNumerologyPartPrompt, numerologyPartSystemInstruction } from '../ai/prompts/numerology-part';

const router = Router();

router.post('/api/numerology-part', async (req, res) => {
  try {
    const { name, dob, gender, numData, part } = req.body;

    if (!name || !dob || !part || !numData) {
      return res.status(400).json({ error: 'Thiếu thông tin đầu vào. Vui lòng kiểm tra lại.' });
    }

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
    res.status(500).json({ error: error.message || 'Lỗi hệ thống trong quá trình phân tích.' });
  }
});

export default router;
