export function buildHumanDesignPrompt(
  name: string, dob: string, time: string, place: string, gender: string,
  hdData: { type: string; authority: string; strategy: string; profile: string; centers: any[] }
): string {
  return `Bạn là một chuyên gia Human Design (Thiết Kế Nhân Dạng) cao cấp. Hãy luận giải bản đồ Bodygraph cho thân chủ sau:

- Họ tên: ${name}
- Ngày sinh: ${dob}
- Giờ sinh: ${time}
- Nơi sinh: ${place}
- Giới tính: ${gender}

Dữ liệu Human Design đã tính:
- Loại năng lượng (Type): ${hdData.type}
- Chiến lược (Strategy): ${hdData.strategy}
- Thẩm quyền (Authority): ${hdData.authority}
- Hồ sơ (Profile): ${hdData.profile}
- Các trung tâm năng lượng: ${JSON.stringify(hdData.centers.map(c => `${c.name}: ${c.defined ? 'Xác định' : 'Chưa xác định'}`))}

Yêu cầu: Luận giải chi tiết bằng Markdown với 3 mục:
1. 🔆 **Loại Năng Lượng (${hdData.type})**: Cách vận hành hào quang, cách tương tác với thế giới.
2. ⚡ **Thẩm Quyền & Chiến Lược**: Hướng dẫn chi tiết ${hdData.authority} và ${hdData.strategy}, cách áp dụng vào đời sống.
3. 🎯 **Tổng Hợp Bodygraph**: Các trung tâm xác định chủ đạo, cổng kênh quan trọng và ý nghĩa đối với cuộc đời.

Chỉ trả về nội dung luận giải Markdown. Không thêm lời mở đầu hay kết thúc ngoài lề.`;
}

export const humanDesignSystemInstruction =
  "Bạn là chuyên gia Thiết Kế Nhân Dạng (Human Design) toàn cầu. Thông thạo 5 loại năng lượng, 9 trung tâm, 36 cổng và 64 kênh. Văn phong phân tích sâu sắc, thực tế và truyền cảm hứng.";
