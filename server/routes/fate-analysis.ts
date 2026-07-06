import { Router } from 'express';
import { getGeminiClient } from '../ai/client';
import { buildFateAnalysisPrompt, fateAnalysisSystemInstruction } from '../ai/prompts/fate-analysis';
import { fateAnalysisSchema } from '../ai/schemas/fate-analysis';
import { requireFields } from './validate';

const router = Router();

router.post('/api/fate-analysis', async (req, res) => {
  try {
    if (!requireFields(req, res, ['name', 'dob', 'time', 'place', 'gender'])) return;
    const { name, dob, time, place, gender, numData, astroData, tuviData, battuData, hdData } = req.body;

    const computed = {
      numerology: numData ? { lifePath: numData.lifePath, destiny: numData.destiny, soul: numData.soul, personality: numData.personality, personalYear: numData.personalYear } : undefined,
      astrology: astroData ? { sunSign: astroData.sunSign, moonSign: astroData.moonSign, ascendant: astroData.ascendant } : undefined,
      tuvi: tuviData && tuviData[0] ? { cuc: tuviData[0].cuc, mingGong: tuviData[0].mingGong, yearStem: tuviData[0].yearStem, yearBranch: tuviData[0].yearBranch } : undefined,
      battu: battuData ? { dayMaster: battuData.dayMaster, elementsPercentage: battuData.elementsPercentage, pillars: battuData.pillars } : undefined,
      humanDesign: hdData ? { type: hdData.type, profile: hdData.profile, authority: hdData.authority } : undefined,
    };
    const ai = getGeminiClient();
    const prompt = buildFateAnalysisPrompt(name, dob, time, place, gender, computed);

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
    res.status(500).json({ error: 'Lỗi hệ thống trong quá trình phân tích vận mệnh. Vui lòng thử lại sau.' });
  }
});

export default router;
