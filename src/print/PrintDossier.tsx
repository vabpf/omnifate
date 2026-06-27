import { UserProfile, NumerologyData, AstrologyData, TuViPalace, BattuData, HumanDesignData, FateAnalysisReport } from '../types';

interface PrintDossierProps {
  profile: UserProfile;
  numData: NumerologyData;
  astData: AstrologyData;
  tuviData: TuViPalace[];
  battuData: BattuData;
  hdData: HumanDesignData;
  aiReport: FateAnalysisReport | null;
}

export default function PrintDossier({ profile, numData, astData, tuviData, battuData, hdData, aiReport }: PrintDossierProps) {
  return (
    <div className="space-y-12 text-slate-950 font-sans p-6 text-xs max-w-4xl mx-auto printable-dossier select-none">
      <div className="text-center space-y-3 pb-8 border-b-2 border-slate-900">
        <h1 className="text-3xl font-display font-medium tracking-tight">OMNIFATE DOSSIER</h1>
        <p className="text-sm font-mono tracking-widest uppercase">Báo cáo Mệnh tài Giao Thoa Việt - Hạnh Toàn Diện</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-100 border border-slate-300 p-4 rounded-xl text-left font-mono mt-4">
          <div>👤 <strong>Họ tên:</strong> {profile.name}</div>
          <div>📅 <strong>Ngày sinh (Dương):</strong> {profile.dob.split('-').reverse().join('/')}</div>
          <div>🕒 <strong>Giờ & Nơi sinh:</strong> {profile.time} tại {profile.place}</div>
          <div>🧬 <strong>Giới tính:</strong> {profile.gender}</div>
        </div>
      </div>

      <div className="space-y-3 break-inside-avoid">
        <h2 className="text-lg font-display font-bold border-b border-slate-900 pb-1">1. LỜI GIAO THOA BẢN MỆNH ĐẠI SƯ</h2>
        <p className="leading-relaxed whitespace-pre-wrap">
          {aiReport ? aiReport.overview : 'Thế mây bay tỏ, vầng dương chiếu rọi. Thân chủ sở hữu tinh tú sinh vận vẹn toàn, cần điều hòa năng lượng thông linh.'}
        </p>
      </div>

      <div className="space-y-4 break-inside-avoid">
        <h2 className="text-lg font-display font-bold border-b border-slate-900 pb-1">2. PHÂN TÍCH THẦN SỐ HỌC</h2>
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-3 rounded border">
          <div>🔢 <strong>Đường đời:</strong> {numData.lifePath}</div>
          <div>🎯 <strong>Sứ mệnh:</strong> {numData.destiny}</div>
          <div>💖 <strong>Linh hồn:</strong> {numData.soul}</div>
        </div>
        {aiReport?.numerology && (
          <div className="space-y-2 mt-2 leading-relaxed">
            <p><strong>Tính chất đường đời:</strong> {aiReport.numerology.lifePathInterpretation}</p>
            <p><strong>Nội thao Linh hồn:</strong> {aiReport.numerology.soulInterpretation}</p>
            <p><strong>Sức bật ngày sinh:</strong> {aiReport.numerology.birthChartInterpretation}</p>
          </div>
        )}
      </div>

      <div className="space-y-4 break-inside-avoid">
        <h2 className="text-lg font-display font-bold border-b border-slate-900 pb-1">3. CHIÊM TINH HỌC & HOÀNG ĐẠO</h2>
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-3 rounded border">
          <div>☉ <strong>Cung Mặt Trời:</strong> {astData.sunSign} {astData.sunSymbol}</div>
          <div>☽ <strong>Cung Mặt Trăng:</strong> {astData.moonSign} {astData.moonSymbol}</div>
          <div>上升 <strong>Cung Mọc:</strong> {astData.ascendant} {astData.ascendantSymbol}</div>
        </div>
        {aiReport?.astrology && (
          <div className="space-y-2 mt-2 leading-relaxed">
            <p><strong>Đánh giá bản đồ hoàng đạo tổng hợp:</strong> {aiReport.astrology.natalChartSynthesis}</p>
          </div>
        )}
      </div>

      <div className="space-y-4 break-inside-avoid">
        <h2 className="text-lg font-display font-bold border-b border-slate-900 pb-1">4. LÁ SỐ TỬ VI CHÍNH TÔNG</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
          {tuviData.slice(0, 4).map((p, idx) => (
            <div key={idx} className="border border-slate-400 p-2 bg-slate-100 rounded">
              <strong>{p.name.split(' ')[0]} ({p.branch}):</strong> {p.majorStars.join(', ')}
            </div>
          ))}
        </div>
        {aiReport?.tuvi ? (
          <div className="space-y-2 leading-relaxed mt-2">
            <p><strong>Cốt cách và Tâm tính:</strong> {aiReport.tuvi.personality}</p>
            <p><strong>Quan Lộc và Danh gia:</strong> {aiReport.tuvi.career}</p>
            <p><strong>Dư địa Tiền tài:</strong> {aiReport.tuvi.wealth}</p>
          </div>
        ) : (
          <p>Cập nhật lá số tinh bàn Tử Vi an tinh 12 cung truyền bản dĩ vãng hanh thông.</p>
        )}
      </div>

      <div className="space-y-4 break-inside-avoid">
        <h2 className="text-lg font-display font-bold border-b border-slate-900 pb-1">5. TỨ TRỤ BÁT TỰ & NGŨ HÀNH</h2>
        <div className="grid grid-cols-4 gap-2 bg-slate-100 p-3 rounded border text-center font-mono">
          <div>NĂM: {battuData.pillars.year}</div>
          <div>THÁNG: {battuData.pillars.month}</div>
          <div>NGÀY: {battuData.pillars.day}</div>
          <div>GIỜ: {battuData.pillars.hour}</div>
        </div>
        <p className="font-sans"><strong>Chủ Nhật Nguyên:</strong> {battuData.dayMaster} Element.</p>
        {aiReport?.battu && (
          <div className="space-y-2 leading-relaxed">
            <p><strong>Dụng Thần / Hỷ thần bổ khuyết Ngũ hành khí:</strong> {aiReport.battu.favourableElements}</p>
            <p><strong>Lời khuyện mấu chốt cải cải hành tinh cát tường:</strong> {aiReport.battu.advice}</p>
          </div>
        )}
      </div>

      <div className="space-y-4 break-inside-avoid">
        <h2 className="text-lg font-display font-bold border-b border-slate-900 pb-1">6. THIẾT KẾ NHÂN DẠNG (HUMAN DESIGN)</h2>
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-3 rounded border">
          <div>🌟 <strong>Type:</strong> {hdData.type}</div>
          <div>💠 <strong>Authority:</strong> {hdData.authority}</div>
          <div>🕯️ <strong>Strategy:</strong> {hdData.strategy}</div>
        </div>
        {aiReport?.humanDesign && (
          <div className="space-y-2 mt-2 leading-relaxed">
            <p><strong>Phong khí vận hành hào quang:</strong> {aiReport.humanDesign.typeInterpretation}</p>
            <p><strong>Nguyên pháp Quyết định:</strong> {aiReport.humanDesign.authorityInterpretation}</p>
          </div>
        )}
      </div>

      <div className="space-y-4 break-inside-avoid pt-6 border-t border-slate-900">
        <h2 className="text-lg font-display font-bold">7. PHƯƠNG PHÁP CẢI MỆNH & TRIẾT HỌC HÀNH KHÍ</h2>
        {aiReport ? (
          <div className="bg-slate-100 p-4 border rounded-xl space-y-2">
            <p>🎯 <strong>Pháp sắc trợ mệnh:</strong> {aiReport.remediation.colors}</p>
            <p>🔮 <strong>Tần số con số cát khí:</strong> {aiReport.remediation.numbers}</p>
            <p>🧘 <strong>Tâm niệm di dưỡng:</strong> "{aiReport.remediation.mindsetShift}"</p>
          </div>
        ) : (
          <p className="italic">Di dưỡng tinh tú trợ vận hanh thông cát cát cát lợi.</p>
        )}
      </div>
    </div>
  );
}
