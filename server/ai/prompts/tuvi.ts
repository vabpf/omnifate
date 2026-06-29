export function buildTuViPrompt(
  name: string, dob: string, time: string, place: string, gender: string,
  tuviData: { palaces: any[]; majorStars: string[] }
): string {
  const firstPalace = tuviData.palaces[0] || {};
  const cuc = firstPalace.cuc || '?';
  const yearStem = firstPalace.yearStem || '';
  const yearBranch = firstPalace.yearBranch || '';
  const mingGong = firstPalace.mingGong || '';
  const hoaStars = firstPalace.hoaStars || [];
  const bodyBranchIdx = firstPalace.bodyBranchIdx ?? -1;
  const bodyBranchName = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'][bodyBranchIdx] || '?';
  const bodyPalace = tuviData.palaces.find((p: any) => {
    const branchChar = p.branch?.split(' ')[1] || p.branch || '';
    const bIdx = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'].indexOf(branchChar);
    return bIdx === bodyBranchIdx;
  });

  const palaceLines = tuviData.palaces.map((p: any) => {
    const dv = p.daiVan;
    const dvStr = dv ? `(ĐV ${dv.age} tuổi, ${dv.yearStart}-${dv.yearEnd})` : '';
    let line = `${p.branch} - ${p.name} ${dvStr}: Chính tinh [${(p.majorStars || []).join(', ')}]`;
    if (p.minorStars?.length) line += `, Phụ tinh [${p.minorStars.join(', ')}]`;
    return line;
  });

  return `Bạn là một Đại sư Tử Vi Đông phương tinh thông. Hãy luận giải lá số Tử Vi đầy đủ cho thân chủ sau:

- Họ tên: ${name}
- Ngày sinh Dương lịch: ${dob}
- Giờ sinh: ${time}
- Nơi sinh: ${place}
- Giới tính: ${gender}

Dữ liệu lá số đã an sao:
- Ngũ Hành Cục: ${cuc}
- Năm sinh Can Chi: ${yearStem} ${yearBranch}
- Mệnh cung: ${mingGong}
- Thân cư: ${bodyPalace?.name || bodyBranchName} (${bodyBranchName})
- Tứ Hóa: ${hoaStars.length ? hoaStars.join(', ') : 'Không có'}
- Đại Vận hướng: ${firstPalace.daiVan && tuviData.palaces[1]?.daiVan ? (firstPalace.daiVan.age < tuviData.palaces[1].daiVan.age ? 'Thuận' : 'Nghịch') : '?'}
- Các cung:
${palaceLines.map(l => '  • ' + l).join('\n')}

Yêu cầu: Luận giải chi tiết bằng Markdown với 5 mục:
1. 🧬 **Bản Tính & Cốt Cách**: Phân tích cung Mệnh & Thân cư, tổ hợp sao chủ quản (chú ý Tứ Hóa), tính cách cốt lõi.
2. 💼 **Con Đường Sự Nghiệp**: Phân tích cung Quan Lộc, phương hướng nghề nghiệp, thời vận thăng tiến theo Đại Vận.
3. 💰 **Tài Bạch & Dư Địa Tiền Tụ**: Phân tích cung Tài Bạch, khả năng tích lũy, các cột mốc tài chính.
4. 💖 **Tình Duyên & Gia Đạo**: Phân tích cung Phu Thê, đường tình duyên, hôn nhân, gia đạo.
5. 🌊 **Đại Vận & Thời Vận**: Phân tích chu kỳ 10 năm của các cung, giai đoạn thăng trầm và cơ hội.

Chỉ trả về nội dung luận giải Markdown. Không thêm lời mở đầu hay kết thúc ngoài lề.`;
}

export const tuviSystemInstruction =
  "Bạn là một Đại sư Tử Vi Đông phương lão luyện, thông thạo cách an sao và luận giải 12 cung, đại vận, tiểu hạn. Văn phong uyên bác, thấu tình đạt lý.";
