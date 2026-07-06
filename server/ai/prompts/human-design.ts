export function buildHumanDesignPrompt(
  name: string, dob: string, time: string, place: string, gender: string,
  hdData: { type: string; authority: string; strategy: string; profile: string; centers: any[]; activeGates?: number[]; definedChannels?: string[]; incarnationCross?: any }
): string {
  const NOT_SELF: Record<string, string> = {
    Generator: 'Thất vọng (Frustration)', 'Manifesting Generator': 'Thất vọng (Frustration)',
    Manifestor: 'Phẫn nộ (Anger)', Projector: 'Cay đắng (Bitterness)', Reflector: 'Thất vọng (Disappointment)',
  };
  const SIGNATURE: Record<string, string> = {
    Generator: 'Hài lòng (Satisfaction)', 'Manifesting Generator': 'Hài lòng (Satisfaction)',
    Manifestor: 'Bình an (Peace)', Projector: 'Thành công (Success)', Reflector: 'Ngạc nhiên (Surprise)',
  };
  const centerLines = (hdData.centers || []).map((c: any) =>
    `  - ${c.name}: ${c.defined ? '✅ Xác định' : '⬜ Chưa xác định'}`
  ).join('\n');
  const gateStr = (hdData.activeGates || []).length
    ? `Các cổng hoạt động (Gates): [${(hdData.activeGates || []).join(', ')}]` : '';
  const channelStr = (hdData.definedChannels || []).length
    ? `Các kênh xác định (Channels): [${(hdData.definedChannels || []).join(', ')}]` : '';

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
- Chủ đề Not-Self: ${NOT_SELF[hdData.type] || '?'}
- Chữ ký (Signature): ${SIGNATURE[hdData.type] || '?'}
${gateStr}
${channelStr}
${hdData.incarnationCross ? `- Thập tự Giáng sinh (Incarnation Cross): ${hdData.incarnationCross.type} — Mặt Trời Nhân cách cổng ${hdData.incarnationCross.personalitySun.gate}.${hdData.incarnationCross.personalitySun.line}, Trái Đất Nhân cách cổng ${hdData.incarnationCross.personalityEarth.gate}.${hdData.incarnationCross.personalityEarth.line}` : ''}
- Các trung tâm năng lượng:
${centerLines}

Yêu cầu: Luận giải chi tiết bằng Markdown với 5 mục:
1. 🔆 **Loại Năng Lượng (${hdData.type})**: Cách vận hành hào quang, Not-Self theme (${NOT_SELF[hdData.type] || '?'}), Signature (${SIGNATURE[hdData.type] || '?'}), cách tương tác với thế giới.
2. ⚡ **Thẩm Quyền & Chiến Lược**: Hướng dẫn chi tiết ${hdData.authority} và ${hdData.strategy}, cách áp dụng vào đời sống thực tế.
3. 🧬 **Hồ Sơ Năng Lượng (Profile ${hdData.profile})**: Phân tích vai trò sống, cách người khác nhìn nhận, con đường phát triển bản thân.
4. 🔗 **Cổng & Kênh Nổi Bật**: Ý nghĩa các cổng và kênh xác định quan trọng trong Bodygraph.
5. 🎯 **Tổng Hợp Bodygraph**: Các trung tâm xác định chủ đạo, vùng năng lượng mở (open centers) cần bảo vệ, và lời khuyên tổng thể cho cuộc đời.

Chỉ trả về nội dung luận giải Markdown. Không thêm lời mở đầu hay kết thúc ngoài lề.`;
}

export const humanDesignSystemInstruction =
  "Bạn là chuyên gia Thiết Kế Nhân Dạng (Human Design) toàn cầu. Thông thạo 5 loại năng lượng, 9 trung tâm, 36 cổng và 64 kênh. Văn phong phân tích sâu sắc, thực tế và truyền cảm hứng.";
