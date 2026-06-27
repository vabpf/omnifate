import { Router } from 'express';
import { getGeminiClient } from '../ai/client';
import { buildFateAnalysisPrompt, fateAnalysisSystemInstruction } from '../ai/prompts/fate-analysis';
import { fateAnalysisSchema } from '../ai/schemas/fate-analysis';

const router = Router();

router.post('/api/fate-analysis', async (req, res) => {
  try {
    const { name, dob, time, place, gender } = req.body;

    if (!name || !dob || !time || !place || !gender) {
      return res.status(400).json({ error: 'Thiếu thông tin đầu vào hợp lệ. Vui lòng kiểm tra lại.' });
    }

    const ai = getGeminiClient();
    const prompt = buildFateAnalysisPrompt(name, dob, time, place, gender);

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: fateAnalysisSystemInstruction,
        responseMimeType: 'application/json',
        responseSchema: fateAnalysisSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini không trả về kết quả luận giải phù hợp.');
    }

    const data = JSON.parse(text.trim());
    res.json(data);
  } catch (error: any) {
    console.error('Error during fate analysis:', error);
    res.status(500).json({ error: error.message || 'Lỗi hệ thống trong quá trình phân tích vận mệnh dĩ vãng.' });
  }
});

export default router;
