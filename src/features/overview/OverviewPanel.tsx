import { Sparkles } from 'lucide-react';
import { NumerologyData, FateAnalysisReport } from '../../types';

interface OverviewPanelProps {
  aiReport: FateAnalysisReport | null;
  numData: NumerologyData;
}

export default function OverviewPanel({ aiReport, numData }: OverviewPanelProps) {
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
          <div className="space-y-4 text-sm leading-relaxed text-white/60">
            <p>Bạn chưa khởi chạy <strong>Bản luận giải chuyên sâu bằng AI</strong>. Ở chế độ xem nhanh này, bản mệnh của bạn sẽ được phác thảo qua việc phân tách riêng lẻ từng bộ môn trong các tab tương ứng (Thần số học, Bản đồ sao, Tử Vi, Bát tự, v.v.).</p>
            <p>Để có thể bóc tách sâu sự giao thoa bản mệnh giữa phương Đông (Tứ trụ, Ngũ hành, sao Tử Vi) và phương Tây (Luân xa Human design, Cung Hoàng đạo, Thần số học), hãy nhấp vào nút <strong>"Luận Giải Bản Mệnh (Tích Hợp AI)"</strong> trong biểu mẫu gửi dữ liệu.</p>
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
                <div>☘️ <strong>Màu sắc cát hanh:</strong> Xanh ngọc, Tía, Lam vũ.</div>
                <div>🔢 <strong>Hộ mệnh tinh tế:</strong> Số {numData.lifePath}, Số {numData.destiny}.</div>
                <div>🧘 <strong>Tâm niệm:</strong> "Thân tĩnh khí hòa, vạn sự thịnh vượng tự sinh tự an."</div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          {aiReport?.yearlyForecast ? (
            <div className="space-y-3">
              <span className="text-[9px] text-white/40 font-mono uppercase block">Dự báo năm 2026 Bính Ngọ:</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-sans">{aiReport.yearlyForecast.outlook}</p>
              <div className="grid grid-cols-2 gap-2 text-[10px] mt-1">
                <div className="p-1.5 bg-emerald-950/20 text-emerald-305 border border-emerald-900/30 rounded">📈 Cơ hội: {aiReport.yearlyForecast.opportunities.substring(0, 40)}...</div>
                <div className="p-1.5 bg-rose-950/20 text-rose-300 border border-rose-900/30 rounded">⚠️ Thách thức: {aiReport.yearlyForecast.challenges.substring(0, 40)}...</div>
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-white/40 italic bg-black/20 p-2.5 rounded text-center border border-white/5 font-sans">
              Đang ở Chế độ xem biểu đồ bản mệnh nhanh. Hãy kích hoạt xem AI luận giải để mở phân hệ Dự báo cát hung tinh tế năm 2026.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
