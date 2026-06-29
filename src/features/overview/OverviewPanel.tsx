import { Sparkles } from 'lucide-react';
import { NumerologyData, FateAnalysisReport, AstrologyData, TuViPalace, BattuData, HumanDesignData } from '../../types';
import { getLunarYear } from '../../constants';

interface OverviewPanelProps {
  aiReport: FateAnalysisReport | null;
  numData: NumerologyData;
  astData?: AstrologyData;
  tuviData?: TuViPalace[];
  battuData?: BattuData;
  hdData?: HumanDesignData;
}

const FALLBACK_ADVICE: Record<number, { colors: string; mindset: string }> = {
  1: { colors: 'Vàng kim, Cam đất, Đỏ sẫm', mindset: 'Ta là người tiên phong — mỗi bước đi đều mở ra con đường mới.' },
  2: { colors: 'Bạc, Xanh dương nhạt, Trắng kem', mindset: 'Lắng nghe sâu, yêu thương nhiều — sức mạnh nằm ở sự kết nối.' },
  3: { colors: 'Tím hoa cà, Vàng tươi, Hồng phấn', mindset: 'Sáng tạo là hơi thở — hãy để niềm vui dẫn lối.' },
  4: { colors: 'Xanh lá đậm, Nâu đất, Cam cháy', mindset: 'Nền tảng vững chãi sinh ra thành quả bền lâu.' },
  5: { colors: 'Xanh lơ, Trắng xóa, Vàng ánh kim', mindset: 'Tự do là bản chất — thay đổi là chất xúc tác của vận mệnh.' },
  6: { colors: 'Xanh ngọc bích, Hồng cánh sen, Kem', mindset: 'Trái tim ấm áp là mái nhà của mọi tâm hồn.' },
  7: { colors: 'Tối tím, Bạc lấp lánh, Xanh rêu', mindset: 'Tri thức là ngọn đèn — tĩnh lặng để thấu suốt chân lý.' },
  8: { colors: 'Đen ánh kim, Vàng đồng, Đỏ Bordeaux', mindset: 'Quyền lực đích thực đến từ sự trao đi và kiến tạo.' },
  9: { colors: 'Hồng đất, Xanh rêu, Trắng ngà', mindset: 'Cho đi là nhận lại — vũ trụ vận hành bằng lòng nhân ái.' },
};

function getFallbackAdvice(lifePath: number) {
  return FALLBACK_ADVICE[lifePath] || { colors: 'Xanh ngọc, Tía, Lam vũ', mindset: 'Thân tĩnh khí hòa, vạn sự thịnh vượng tự sinh tự an.' };
}

export default function OverviewPanel({ aiReport, numData, astData, tuviData, battuData, hdData }: OverviewPanelProps) {
  const currentYear = new Date().getFullYear();
  const lunarYear = getLunarYear(currentYear);
  const fallback = getFallbackAdvice(numData.lifePath);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 glass-card rounded-2xl p-6 relative overflow-hidden space-y-4 hover:translate-y-0">
        <div className="space-y-1">
          <span className="text-[10px] text-amber-400 font-mono tracking-widest block uppercase">BỨC THƯ TỔNG HỢP MỆNH TÀI</span>
          <h3 className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-350">
            Giao Thoa Bản Mệnh Đông - Tây
          </h3>
        </div>

        {aiReport ? (
          <div className="text-sm text-white/60 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
            {aiReport.overview}
          </div>
        ) : (
          <div className="space-y-5 text-sm leading-relaxed text-white/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {numData && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-warm-amber font-mono tracking-wider">THẦN SỐ HỌC</span>
                  <div className="mt-1 text-white/80"><strong>Đường đời {numData.lifePath}</strong> &middot; Sứ mệnh {numData.destiny}</div>
                </div>
              )}
              {astData && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-warm-amber font-mono tracking-wider">CHIÊM TINH</span>
                  <div className="mt-1 text-white/80"><strong>{astData.sunSign}</strong> &middot; Mọc {astData.ascendant}</div>
                </div>
              )}
              {battuData && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-warm-amber font-mono tracking-wider">BÁT TỰ</span>
                  <div className="mt-1 text-white/80"><strong>{battuData.dayMaster}</strong> &middot; {battuData.pillars.day}</div>
                </div>
              )}
              {hdData && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-warm-amber font-mono tracking-wider">THIẾT KẾ NHÂN DẠNG</span>
                  <div className="mt-1 text-white/80"><strong>{hdData.type}</strong> &middot; {hdData.strategy}</div>
                </div>
              )}
              {tuviData && tuviData.length > 0 && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 sm:col-span-2">
                  <span className="text-[10px] text-warm-amber font-mono tracking-wider">TỬ VI</span>
                  <div className="mt-1 text-white/80">
                    <strong>{tuviData[0]?.name}</strong> &middot; {tuviData[0]?.branch} &middot; Mệnh {tuviData[0]?.element}
                  </div>
                </div>
              )}
            </div>
            <p>Bạn chưa khởi chạy <strong>Bản luận giải chuyên sâu bằng AI</strong>. Ở chế độ xem nhanh này, bản mệnh của bạn được phác thảo qua từng bộ môn trong các tab tương ứng.</p>
            <p>Để có thể bóc tách sâu sự giao thoa bản mệnh giữa phương Đông và phương Tây, nhấp vào nút <strong>"Luận Giải Bản Mệnh (Tích Hợp AI)"</strong> trong biểu mẫu gửi dữ liệu.</p>
          </div>
        )}
      </div>

      <div className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:translate-y-0">
        <div>
          <h4 className="font-display text-base font-bold text-amber-400 mb-4 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />Tổng Bản Cải Vận Trợ Mệnh
          </h4>

          {aiReport?.remediation ? (
            <div className="space-y-4 text-xs leading-relaxed">
              <div>
                <span className="text-white/40 font-mono uppercase block text-[9px]">Sắc màu trợ mệnh:</span>
                <p className="text-warm-amber mt-1 font-bold p-2 bg-black/40 border border-white/5 rounded-lg">{aiReport.remediation.colors}</p>
              </div>
              <div>
                <span className="text-white/40 font-mono uppercase block text-[9px]">Tần số con số cát tinh:</span>
                <p className="text-warm-amber mt-1 font-bold p-2 bg-black/40 border border-white/5 rounded-lg">{aiReport.remediation.numbers}</p>
              </div>
              <div>
                <span className="text-white/40 font-mono uppercase block text-[9px]">Triết lý cốt tủy tu thân:</span>
                <p className="text-white/60 mt-1 p-2 bg-black/40 border border-white/5 rounded-lg italic">"{aiReport.remediation.mindsetShift}"</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs leading-relaxed text-white/60">
              <p>Hệ thống cần phân tích bản mệnh bằng AI để thiết lập bảng cải vận riêng biệt. Dưới đây là khuyến nghị cơ bản tham khảo:</p>
              <div className="p-3 bg-black/25 border border-white/5 rounded-xl space-y-2">
                <div>☘️ <strong>Màu sắc cát hanh:</strong> {fallback.colors}</div>
                <div>🔢 <strong>Hộ mệnh tinh tế:</strong> Số {numData.lifePath}, Số {numData.destiny}.</div>
                <div>🧘 <strong>Tâm niệm:</strong> "{fallback.mindset}"</div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          {aiReport?.yearlyForecast ? (
            <div className="space-y-3">
              <span className="text-[9px] text-white/40 font-mono uppercase block">Dự báo năm {currentYear} {lunarYear}:</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-sans">{aiReport.yearlyForecast.outlook}</p>
              <div className="grid grid-cols-2 gap-2 text-[10px] mt-1">
                <div className="p-1.5 bg-emerald-950/20 text-emerald-300 border border-emerald-900/30 rounded leading-relaxed line-clamp-3">📈 Cơ hội: {aiReport.yearlyForecast.opportunities}</div>
                <div className="p-1.5 bg-rose-950/20 text-rose-300 border border-rose-900/30 rounded leading-relaxed line-clamp-3">⚠️ Thách thức: {aiReport.yearlyForecast.challenges}</div>
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-white/40 italic bg-black/20 p-2.5 rounded text-center border border-white/5 font-sans">
              Đang ở Chế độ xem biểu đồ bản mệnh nhanh. Hãy kích hoạt xem AI luận giải để mở phân hệ Dự báo cát hung tinh tế năm {currentYear}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


