export function buildNumerologyPartPrompt(
  name: string, dob: string, gender: string | undefined,
  numData: { lifePath: number; destiny: number; soul: number; birthGrid: Record<string, number> },
  part: string
): string {
  const partOutline = getPartOutline(part);

  return `Hãy thực hiện một báo cáo luận giải Thần số học chuyên sâu tuyệt đối dạt dào tâm huyết theo ĐỀ CƯƠNG dưới đây dưới định dạng Markdown chất lượng cao cho thân chủ với thông tin sau:
- Họ và tên: ${name}
- Ngày sinh Dương lịch: ${dob}
- Giới tính: ${gender || 'Nam'}
- Chỉ số Đường đời đã tính toán: ${numData.lifePath}
- Chỉ số Sứ mệnh đã tính toán: ${numData.destiny}
- Chỉ số Linh hồn đã tính toán: ${numData.soul}
- Các con số trong biểu đồ ngày sinh (birthGrid): ${JSON.stringify(numData.birthGrid)}

${partOutline}

Yêu cầu định dạng đầu ra:
- Phải trả về nội dung Markdown cực kỳ chi tiết, nhiều đề mục rõ ràng, bài bản, sử dụng các ký hiệu biểu tượng huyền học (✦, 🔮, 🌟, ☉, ☽, 🎯) để phân tách rõ từng mục trong đề cương.
- Viết văn phong uyên bác, giàu chất văn thơ, thấu hiểu tâm lý sâu sắc, đem đến động lực vượt bậc và sự chữa lành cho thân chủ.
- Chỉ trả về duy nhất nội dung luận giải dưới dạng văn bản Markdown hoàn hảo. Không thêm lời mở đầu hay kết thúc ngoài lề không thuộc về báo cáo.`;
}

export const numerologyPartSystemInstruction =
  "Bạn là một Đại sư Thần số học Tây phương chuyên nghiệp và thông thái dạt dào tri thức. Lời phán của bạn sâu sắc, mang tính xây dựng, tâm lý học sâu sắc, văn phong uyên bác, bay bổng nhưng thực tế.";

function getPartOutline(part: string): string {
  if (part === 'A') {
    return `
📊 ĐỀ CƯƠNG PHÂN TÍCH TỔNG QUAN VẬN SỐ (PHẦN A):
1. Chu kỳ vận số:
   1.1 Chu kỳ 9 năm (tổng quan vận trình và nhịp sinh học năng lượng hiện tại)
   1.2 Phân tích từng năm cá nhân gần nhất:
       - Năm cá nhân hiện tại (2026): Luận chi tiết về Tình yêu, Sự nghiệp, Tài chính, Giao tiếp xã hội, Học tập, Hôn nhân.
       - Năm tiếp theo (2027): Định hướng hành khí bổ trợ.
       - Năm tiếp theo (2028): Sự bứt phá tương lai.
2. Nhóm tính cách bản ngã (Xác định xem thân chủ thuộc nhóm hành vi nào dựa trên các chỉ số cốt lõi: độc lập, nhạy cảm, sáng tạo, thực tế, linh hoạt, yêu thương, tri thức, quyền lực hay nhân ái).
3. Nhóm ngành phù hợp:
   3.1 Phương pháp xác định qua các chỉ số cốt lõi.
   3.2 Phân loại nhóm ngành theo mật mã hướng nghiệp Holland (Kỹ thuật, Nghiên cứu, Nghiệp vụ, Nghệ thuật, Xã hội, Quản lý).
   3.3 Tỉ lệ phù hợp theo nhóm ngành (%) và Top ngành nghề cụ thể phù hợp nhất.
      `;
  } else if (part === 'B') {
    return `
📊 ĐỀ CƯƠNG PHÂN TÍCH ĐƯỜNG ĐỜI (PHẦN B):
4. Chỉ số đường đời (Life Path): Định nghĩa con số, điểm mạnh độc nhất, góc khuất/điểm yếu cần khắc phục, danh sách những người nổi tiếng mang con số này, độ tương thích trong các mối quan hệ (Hợp & Không hợp), xu hướng tình duyên, bài học cuộc đời cốt tủy và định hướng sự nghiệp tối ưu.
5. Chu kỳ đường đời: Phân tích 3 chu kỳ lớn (Chu kỳ 1: Gieo hạt, Chu kỳ 2: Chín muồi, Chu kỳ 3: Thu hoạch).
6. Kim tự tháp thần số học: Cấu trúc 4 đỉnh cao cuộc đời của cá nhân. Chi tiết số đỉnh cao, số thử thách và năm kích hoạt của từng đỉnh cao (Đỉnh cao 1, 2, 3, 4).
7. Chỉ số năm vận trình: Ý nghĩa.
8. Chỉ số tháng vận trình: Hướng dẫn nhịp điệu hành động.
      `;
  } else if (part === 'C') {
    return `
📊 ĐỀ CƯƠNG PHÂN TÍCH SỐ MỆNH & LINH HỒN (PHẦN C):
9. Chỉ số sứ mệnh (Destiny): Định nghĩa vai trò cuộc sống lớn lao.
10. Tương quan Đường đời - Sứ mệnh: Mức độ đồng điệu, các xung đột nội tâm tiềm ẩn và giải pháp thiết lập cân bằng.
11. Thử thách sứ mệnh: Những chướng ngại cản lối và bài học thăng hoa.
12. Chỉ số trưởng thành: Khái niệm, thời điểm kích hoạt và hướng rèn luyện.
13. Năng lực trưởng thành: Vai trò & cách đánh thức.
14. Chỉ số linh hồn (Soul Urge): Tiếng vọng khát khao thầm kín bên trong, điều khiến tâm hồn thực sự hạnh phúc.
15. Tương quan Đường đời - Linh hồn: Sự hài hòa hay mâu thuẫn giữa lý trí hành động và khao khát nội tâm.
16. Thử thách linh hồn: Bài học cho đứa trẻ bên trong.
17. Chỉ số nhân cách: Mặt nạ xã hội, hình ảnh phản chiếu trong mắt người xung quanh.
18. Thử thách nhân cách: Phản ứng trước áp lực xã hội.
19. Điểm yếu: Các số thiếu (mất cân bằng) trên biểu đồ tên và ngày sinh.
20. Nợ nghiệp (nếu có): Các con số nợ nghiệp lớn (13/4, 14/5, 16/7, 19/1) hoặc bài học nghiệp quả tích lũy cần hóa giải.
      `;
  } else if (part === 'D') {
    return `
📊 ĐỀ CƯƠNG PHÂN TÍCH NĂNG LỰC & THÁI ĐỘ (PHẦN D):
21. Biểu đồ sức mạnh (Ngày sinh): Cấu trúc 3x3 ngày sinh, phân tích chi tiết các mũi tên cá tính (Trục quyết tâm, Trục ý chí, Trục tâm linh, v.v.), điểm mạnh và các vị trí thiếu hụt năng lượng.
22. Biểu đồ tên & tổng hợp: Cấu thành sơ đồ tên, tác động rung động âm thanh của tên gọi tới cuộc đời.
23. Chỉ số thái độ: Cách thức tiếp cận, phản ứng đầu tiên trước các biến cố cuộc sống.
24. Năng lực tự nhiên: Tài năng thiên bẩm và ứng dụng thực tiễn vượt trội.
25. Chỉ số vượt khó (AQ): Cách vượt qua căng thẳng, nghịch cảnh.
26. Năng lực tư duy: Cân bằng lý trí lô-gích và cảm xúc trực giác.
27. Động lực tiếp cận, Năng lực tiếp cận, Thái độ tiếp cận: Tốc độ thích nghi và cơ chế thực thi khi đón nhận thử thách mới.
      `;
  }
  return '';
}
