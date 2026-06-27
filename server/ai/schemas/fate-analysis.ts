import { Type } from '@google/genai';

export const fateAnalysisSchema = {
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
};
