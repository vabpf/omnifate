export function buildFateAnalysisPrompt(name: string, dob: string, time: string, place: string, gender: string): string {
  return `Hãy thực hiện một bức thư và báo cáo luận giải vận mệnh chi tiết tích hợp cả Đông và Tây cho thân chủ với thông tin sau:
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
}

export const fateAnalysisSystemInstruction =
  "Bạn là một Đại sư Huyền học Toàn diện cao cấp, thông thạo Thần số học Tây phương, Chiêm tinh học, Bản đồ sao, Lá số Tử vi Đông phương, Tứ Trụ Bát Tự và Thiết kế Nhân dạng (Human Design). Lời phán của bạn sâu sắc, mang tính xây dựng, tâm lý học sâu, văn phong uyên bác, bay bổng nhưng thực tế.";
