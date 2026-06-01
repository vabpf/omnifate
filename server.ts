import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY variable is missing. Vui lòng thiết lập API Key trong Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST API for fate analysis
app.post('/api/fate-analysis', async (req, res) => {
  try {
    const { name, dob, time, place, gender } = req.body;

    if (!name || !dob || !time || !place || !gender) {
      return res.status(400).json({ error: 'Thiếu thông tin đầu vào hợp lệ. Vui lòng kiểm tra lại.' });
    }

    const ai = getGeminiClient();

    // High quality astrological and spiritual synthesis prompt
    const systemInstruction = 
      "Bạn là một Đại sư Huyền học Toàn diện cao cấp, thông thạo Thần số học Tây phương, Chiêm tinh học, Bản đồ sao, Lá số Tử vi Đông phương, Tứ Trụ Bát Tự và Thiết kế Nhân dạng (Human Design). Lời phán của bạn sâu sắc, mang tính xây dựng, tâm lý học sâu, văn phong uyên bác, bay bổng nhưng thực tế.";

    const prompt = `Hãy thực hiện một bức thư và báo cáo luận giải vận mệnh chi tiết tích hợp cả Đông và Tây cho thân chủ với thông tin sau:
- Họ và tên: ${name}
- Ngày sinh Dương lịch: ${dob} (định dạng YYYY-MM-DD, bạn hãy tự chuyển sang Âm lịch chuẩn xác)
- Giờ sinh: ${time}
- Nơi sinh: ${place}
- Giới tính: ${gender}

Đặc biệt, phần thần số học (numerology) trong JSON cần chứa luận giải chi tiết tuyệt đối theo đúng ĐỀ CƯƠNG dưới đây dưới định dạng Markdown chất lượng cao cho các trường partA_Overview, partB_LifePath, partC_Destiny, partD_Ability:

📊 ĐỀ CƯƠNG PHÂN TÍCH THẦN SỐ HỌC CHI TIẾT:
PHẦN A. PHÂN TÍCH TỔNG QUAN (gán vào trường "partA_Overview" bằng Markdown):
1. Chu kỳ vận số:
  1.1 Chu kỳ 9 năm (tổng quan vận trình)
  1.2 Phân tích từng năm gần nhất:
    1.2.1 Năm cá nhân hiện tại (ví dụ: 2026): Luận chi tiết: Tình yêu, Sự nghiệp, Tài chính, Giao tiếp xã hội, Học tập, Hôn nhân
    1.2.2 Năm tiếp theo (2027)
    1.2.3 Năm tiếp theo (2028)
2. Nhóm tính cách bản ngã (Phân tích xem thân chủ thuộc nhóm nào hoặc phối hợp thế nào trong 9 nhóm hành vi: Nhóm 1 mạnh mẽ – độc lập, Nhóm 2 nhạy cảm – lắng nghe, Nhóm 3 sáng tạo – lạc quan, Nhóm 4 cẩn thẩn – thực tế, Nhóm 5 linh hoạt – tò mò, Nhóm 6 yêu thương – kiểm soát, Nhóm 7 tri thức – khám phá, Nhóm 8 công bằng – lý tưởng, Nhóm 9 trách nhiệm – cho đi)
3. Nhóm ngành phù hợp:
  3.1 Phương pháp xác định: Chỉ số đường đời, Chỉ số sứ mệnh, Chỉ số linh hồn
  3.2 Phân loại nhóm ngành (theo Holland): Kỹ thuật, Nghiên cứu, Nghiệp vụ, Nghệ thuật, Xã hội, Quản lý
  3.3 Tỉ lệ phù hợp theo nhóm ngành (%)
  3.4 Top ngành phù hợp nhất
  3.5 Danh sách nghề cụ thể

PHẦN B. PHÂN TÍCH ĐƯỜNG ĐỜI (gán vào trường "partB_LifePath" bằng Markdown):
4. Chỉ số đường đời (core): Định nghĩa, Điểm mạnh, Điểm yếu, Người nổi tiếng tương ứng, Tương thích mối quan hệ (Hợp, Không hợp), Tình duyên, Bài học cuộc đời, Định hướng nghề nghiệp.
5. Chu kỳ đường đời: Chu kỳ 1 (Gieo hạt), Chu kỳ 2 (Chín), Chu kỳ 3 (Thu hoạch).
6. Kim tự tháp thần số học: Khái niệm & cấu trúc 4 đỉnh cao cuộc đời, chi tiết 4 giai đoạn đỉnh cao của cá nhân (Giai đoạn 1 gồm Số đỉnh cao & Số thử thách, Giai đoạn 2, 3, 4).
7. Chỉ số năm: Danh sách năm gần nhất & ý nghĩa.
8. Chỉ số tháng: Danh sách tháng gần nhất & ý nghĩa.

PHẦN C. PHÂN TÍCH SỐ MỆNH (gán vào trường "partC_Destiny" bằng Markdown):
9. Chỉ số sứ mệnh: Định nghĩa & vai trò cuộc đời.
10. Tương quan đường đời – sứ mệnh: Sự tương hợp, mâu thuẫn và cách thiết lập cân bằng.
11. Thử thách sứ mệnh: Định nghĩa & bài học.
12. Chỉ số trưởng thành: Khái niệm, thời điểm kích hoạt và hướng cải thiện lâu dài.
13. Năng lực trưởng thành: Vai trò & cách kích hoạt hiệu quả.
14. Chỉ số linh hồn: Khao khát bên trong & điều khiến bạn thực sự hạnh phúc.
15. Tương quan đường đời – linh hồn: Tương thích, xung đột nội tâm.
16. Thử thách linh hồn: Bản chất & hướng vượt qua.
17. Chỉ số nhân cách: Hình ảnh phản chiếu bên ngoài, cách người khác nhìn nhận.
18. Thử thách nhân cách: Phản ứng với môi trường & điểm điều chỉnh.
19. Điểm yếu: Các số thiếu trên biểu đồ tên và ngày sinh & ý nghĩa.
20. Nợ nghiệp (nếu có hoặc bài học nghiệp quả): Khái niệm & bài học cần vượt qua.

PHẦN D. PHÂN TÍCH NĂNG LỰC (gán vào trường "partD_Ability" bằng Markdown):
21. Biểu đồ sức mạnh (ngày sinh): Cấu trúc 3x3 ngày sinh, các trục năng lực, điểm mạnh và điểm thiếu hụt năng lượng.
22. Biểu đồ tên & tổng hợp: Cách cấu thành sơ đồ tên, biểu đồ tổng hợp và tác động của tên gọi tới vận hành.
23. Chỉ số thái độ: Cách tiếp cận cuộc sống & ấn lượng ban đầu với người đối diện.
24. Năng lực tự nhiên: Tài năng thiên bẩm và ứng dụng thực tiễn.
25. Chỉ số vượt khó: Cách phản ứng khi gặp áp lực (stress) và chiến lược xử lý nghịch cảnh.
26. Năng lực tư duy: Kiểu tư duy chủ đạo, cán cân logical vs cảm xúc.
27. Động lực tiếp cận: Động lực thúc đẩy hành động, xu hướng thử thách cái mới.
28. Năng lực tiếp cận: Mức độ thực thi hành động & tốc độ thích nghi.
29. Thái độ tiếp cận: Phản ứng ban đầu với sự thay đổi, ấn tượng đầu tiên của người khác.

Yêu cầu xuất ra định dạng JSON hoàn hảo theo schema được cung cấp. Tất cả nội dung văn bản luận giải phải viết bằng tiếng Việt chuẩn mực, tôn trọng, thấu cảm, giàu tri thức và truyền cảm hứng.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
              type: Type.STRING,
              description: "Nhận định chung tổng hợp giao thoa giữa hệ thống huyền học phương Đông (Tử vi, Bát tự) và phương Tây (Thần số học, Chiêm tinh, Human Design), nói về sứ mệnh cuộc đời lớn.",
            },
            numerology: {
              type: Type.OBJECT,
              properties: {
                lifePathInterpretation: { type: Type.STRING, description: "Luận giải chi tiết con số đường đời" },
                destinyInterpretation: { type: Type.STRING, description: "Luận giải chi tiết con số Sứ mệnh tính từ họ tên" },
                soulInterpretation: { type: Type.STRING, description: "Luận giải chỉ số Linh hồn" },
                birthChartInterpretation: { type: Type.STRING, description: "Phán đoán thế mạnh, thế yếu dựa trên biểu đồ ngày sinh" },
                partA_Overview: { type: Type.STRING, description: "Markdown cho PHẦN A. PHÂN TÍCH TỔNG QUAN theo đúng đề cương 1-3" },
                partB_LifePath: { type: Type.STRING, description: "Markdown cho PHẦN B. PHÂN TÍCH ĐƯỜNG ĐỜI theo đúng đề cương 4-8" },
                partC_Destiny: { type: Type.STRING, description: "Markdown cho PHẦN C. PHÂN TÍCH SỐ MỆNH theo đúng đề cương 9-20" },
                partD_Ability: { type: Type.STRING, description: "Markdown cho PHẦN D. PHÂN TÍCH NĂNG LỰC theo đúng đề cương 21-29" },
              },
              required: [
                'lifePathInterpretation',
                'destinyInterpretation',
                'soulInterpretation',
                'birthChartInterpretation',
                'partA_Overview',
                'partB_LifePath',
                'partC_Destiny',
                'partD_Ability'
              ],
            },
            astrology: {
              type: Type.OBJECT,
              properties: {
                sunSignInterpretation: { type: Type.STRING, description: "Luận giải Cung Mặt Trời" },
                moonSignInterpretation: { type: Type.STRING, description: "Luận giải Cung Mặt Trăng" },
                ascendantInterpretation: { type: Type.STRING, description: "Luận giải Cung Mọc" },
                natalChartSynthesis: { type: Type.STRING, description: "Tổng hợp Bản đồ sao, các góc chiếu chính và xu hướng nội tâm" },
              },
              required: ['sunSignInterpretation', 'moonSignInterpretation', 'ascendantInterpretation', 'natalChartSynthesis'],
            },
            tuvi: {
              type: Type.OBJECT,
              properties: {
                personality: { type: Type.STRING, description: "Luận giải cá tính, cung Mệnh và cốt cách con người qua lá số Tử Vi" },
                career: { type: Type.STRING, description: "Định hướng quan lộc, công danh nghề nghiệp từ lá số" },
                wealth: { type: Type.STRING, description: "Tài bạch, tiền của và dư địa tích lũy tài sản" },
                love: { type: Type.STRING, description: "Tình duyên, hôn nhân gia đạo và các cột mốc hạnh phúc" },
              },
              required: ['personality', 'career', 'wealth', 'love'],
            },
            battu: {
              type: Type.OBJECT,
              properties: {
                elementAnalysis: { type: Type.STRING, description: "Phân tích sinh động phân rã ngũ hành năm tháng ngày giờ lâm bệnh hay vượng thế" },
                favourableElements: { type: Type.STRING, description: "Dụng thần, Hỷ thần cát lợi là gì (Kim, Mộc, Thủy, Hỏa, Thổ)" },
                unfavourableElements: { type: Type.STRING, description: "Kỵ thần nên tránh" },
                advice: { type: Type.STRING, description: "Phướng pháp cải vận, bù đắp khuyết thiếu ngũ hành trong cuộc sống" },
              },
              required: ['elementAnalysis', 'favourableElements', 'unfavourableElements', 'advice'],
            },
            humanDesign: {
              type: Type.OBJECT,
              properties: {
                typeInterpretation: { type: Type.STRING, description: "Luận giải cơ chế hoạt động của Loại năng lượng" },
                authorityInterpretation: { type: Type.STRING, description: "Chi tiết Quyền thẩm quyền trong các quyết định lớn" },
                strategyInterpretation: { type: Type.STRING, description: "Chiến lược hành động tối ưu để thu hút hào quang" },
              },
              required: ['typeInterpretation', 'authorityInterpretation', 'strategyInterpretation'],
            },
            yearlyForecast: {
              type: Type.OBJECT,
              properties: {
                outlook: { type: Type.STRING, description: "Tổng quan vận hạn và cát hung trong năm hiện tại (2026/2027)" },
                opportunities: { type: Type.STRING, description: "Cơ hội thăng tiến lớn nên đón nhận" },
                challenges: { type: Type.STRING, description: "Vận hạn xui xẻo cần lưu tâm phòng tránh tai ương" },
              },
              required: ['outlook', 'opportunities', 'challenges'],
            },
            remediation: {
              type: Type.OBJECT,
              properties: {
                colors: { type: Type.STRING, description: "Các gam màu sắc trợ mệnh cát hanh nên chọn" },
                numbers: { type: Type.STRING, description: "Con số may mắn mang tần số tích cực" },
                mindsetShift: { type: Type.STRING, description: "Điều tâm niệm triết lý cốt tủy giúp thân tâm an lạc, gặt hái thịnh vượng" },
              },
              required: ['colors', 'numbers', 'mindsetShift'],
            }
          },
          required: ['overview', 'numerology', 'astrology', 'tuvi', 'battu', 'humanDesign', 'yearlyForecast', 'remediation'],
        },
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

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is booted and listening on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
