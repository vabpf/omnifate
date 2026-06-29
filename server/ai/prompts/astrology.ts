export function buildAstrologyPrompt(
  name: string, dob: string, time: string, place: string, gender: string,
  astroData: {
    sunSign: string; moonSign: string; ascendant: string;
    planets: Array<{ name: string; sign: string; degree: number; house: number; retrograde?: boolean }>;
    aspects: Array<{ planet1: string; planet2: string; type: string; angle: number }>;
  }
): string {
  const planetLines = astroData.planets.map(p => {
    let line = `${p.name} ở ${p.sign} (${p.degree}°, nhà ${p.house})`;
    if (p.retrograde) line += ' — Nghịch hành';
    return line;
  });

  return `Bạn là một Đại sư Chiêm tinh học phương Tây uyên thâm. Hãy luận giải bản đồ sao (natal chart) đầy đủ, sâu sắc cho thân chủ sau:

- Họ tên: ${name}
- Ngày sinh: ${dob}
- Giờ sinh: ${time}
- Nơi sinh: ${place}
- Giới tính: ${gender}

Dữ liệu chiêm tinh đã tính (hệ nhà Placidus):
- Cung Mặt Trời: ${astroData.sunSign}
- Cung Mặt Trăng: ${astroData.moonSign}
- Cung Mọc: ${astroData.ascendant}
- Các hành tinh: ${planetLines.join('; ')}
- Các góc chiếu chính: ${astroData.aspects.map(a => `${a.planet1} - ${a.planet2}: ${a.type} (${a.angle}°)`).join('; ')}

Yêu cầu: Luận giải chi tiết bằng Markdown với các mục sau:
1. ☀️ **Cung Mặt Trời (${astroData.sunSign})**: Phân tích bản ngã, ý thức, mục đích sống.
2. 🌙 **Cung Mặt Trăng (${astroData.moonSign})**: Phân tích cảm xúc tiềm thức, nhu cầu tình cảm.
3. ⬆️ **Cung Mọc (${astroData.ascendant})**: Phân tích mặt nạ xã hội, ấn tượng đầu.
4. 🌍 **Tổng hợp Bản đồ Sao**: Phân tích tương tác giữa các hành tinh, các góc chiếu chính, ý nghĩa các hành tinh nghịch hành (nếu có) và ý nghĩa tổng thể đối với cuộc đời.

Chỉ trả về nội dung luận giải Markdown. Không thêm lời mở đầu hay kết thúc ngoài lề.`;
}

export const astrologySystemInstruction =
  "Bạn là một nhà Chiêm tinh học phương Tây chuyên nghiệp, thông thạo giải mã bản đồ sao, cung hoàng đạo, góc chiếu hành tinh và nhà chiêm tinh. Văn phong sâu sắc, huyền bí, thấu hiểu tâm lý.";
