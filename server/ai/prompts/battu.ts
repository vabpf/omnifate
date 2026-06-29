export function buildBattuPrompt(
  name: string, dob: string, time: string, place: string, gender: string,
  battuData: {
    pillars: { year: string; month: string; day: string; hour: string };
    dayMaster: string;
    elementsPercentage: Record<string, number>;
    hiddenStems: { year: string[]; month: string[]; day: string[]; hour: string[] };
    nayin: { year: string; month: string; day: string; hour: string };
    mingGong: string;
    shenGong: string;
  }
): string {
  const pillarLines = [
    `- Trụ năm: ${battuData.pillars.year} — Nạp âm: ${battuData.nayin.year} — Tàng can: ${battuData.hiddenStems.year.join(', ') || 'không'}`,
    `- Trụ tháng: ${battuData.pillars.month} — Nạp âm: ${battuData.nayin.month} — Tàng can: ${battuData.hiddenStems.month.join(', ') || 'không'}`,
    `- Trụ ngày: ${battuData.pillars.day} — Nạp âm: ${battuData.nayin.day} — Tàng can: ${battuData.hiddenStems.day.join(', ') || 'không'} (Nhật chủ: ${battuData.dayMaster})`,
    `- Trụ giờ: ${battuData.pillars.hour} — Nạp âm: ${battuData.nayin.hour} — Tàng can: ${battuData.hiddenStems.hour.join(', ') || 'không'}`,
  ];

  return `Bạn là một Đại sư Tứ Trụ Bát Tự tinh hoa. Hãy luận giải lá số Bát Tự cho thân chủ sau:

- Họ tên: ${name}
- Ngày sinh Dương lịch: ${dob}
- Giờ sinh: ${time}
- Nơi sinh: ${place}
- Giới tính: ${gender}

Dữ liệu Tứ Trụ đã lập (theo Tiết Khí):
${pillarLines.join('\n')}
- Tỉ lệ Ngũ hành: ${JSON.stringify(battuData.elementsPercentage)}
- Mệnh cung: ${battuData.mingGong}
- Thân cung: ${battuData.shenGong}

Yêu cầu: Luận giải chi tiết bằng Markdown với 4 mục:
1. 🌿 **Phân Tích Ngũ Hành**: Phân tích thừa thiếu ngũ hành dựa trên 4 trụ và tàng can, tương sinh tương khắc trong tứ trụ.
2. 🔥 **Dụng Thần / Hỷ Thần**: Xác định dụng thần, hỷ thần cốt lõi giúp cân bằng mệnh cục dựa trên Nhật chủ ${battuData.dayMaster}, tỷ lệ ngũ hành, và mùa sinh.
3. 💧 **Kỵ Thần**: Các hành khắc kỵ cần tránh, thời điểm xấu.
4. 🧘 **Phương Pháp Cải Vận**: Hướng dẫn bổ sung ngũ hành thiếu hụt qua màu sắc, nghề nghiệp, hướng nhà, vật phẩm.

Chỉ trả về nội dung luận giải Markdown. Không thêm lời mở đầu hay kết thúc ngoài lề.`;
}

export const battuSystemInstruction =
  "Bạn là một Đại sư Tứ Trụ Bát Tự và Ngũ Hành Đông phương. Tinh thông luận giải can chi, xác định dụng thần kỵ thần, và đưa ra phương pháp cải vận dựa trên ngũ hành. Văn phong trí tuệ, gần gũi.";
