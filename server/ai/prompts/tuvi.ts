export function buildTuViPrompt(
  name: string, dob: string, time: string, place: string, gender: string,
  tuviData: { palaces: any[]; majorStars: string[] }
): string {
  return `Bạn là một Đại sư Tử Vi Đông phương tinh thông. Hãy luận giải lá số Tử Vi đầy đủ cho thân chủ sau:

- Họ tên: ${name}
- Ngày sinh Dương lịch: ${dob}
- Giờ sinh: ${time}
- Nơi sinh: ${place}
- Giới tính: ${gender}

Dữ liệu lá số đã an sao:
${JSON.stringify(tuviData.palaces.map(p => ({
  name: p.name, branch: p.branch, element: p.element,
  chinhTinh: p.majorStars, phuTinh: p.minorStars
})))}

Yêu cầu: Luận giải chi tiết bằng Markdown với 4 mục:
1. 🧬 **Bản Tính & Cốt Cách**: Phân tích cung Mệnh, tổ hợp sao chủ quản, tính cách cốt lõi.
2. 💼 **Con Đường Sự Nghiệp**: Phân tích cung Quan Lộc, phương hướng nghề nghiệp, thời vận thăng tiến.
3. 💰 **Tài Bạch & Dư Địa Tiền Tụ**: Phân tích cung Tài Bạch, khả năng tích lũy, các cột mốc tài chính.
4. 💖 **Tình Duyên & Gia Đạo**: Phân tích cung Phu Thê, đường tình duyên, hôn nhân, gia đạo.

Chỉ trả về nội dung luận giải Markdown. Không thêm lời mở đầu hay kết thúc ngoài lề.`;
}

export const tuviSystemInstruction =
  "Bạn là một Đại sư Tử Vi Đông phương lão luyện, thông thạo cách an sao và luận giải 12 cung, đại vận, tiểu hạn. Văn phong uyên bác, thấu tình đạt lý.";
