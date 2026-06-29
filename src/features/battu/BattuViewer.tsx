import { useState } from 'react';
import { BattuData, UserProfile } from '../../types';
import { HelpCircle, Star, Sparkles, Loader2 } from 'lucide-react';
import { MarkdownRenderer } from '../../ui';
import { fetchAiBattu } from '../../api/ai-battu';

interface BattuViewerProps {
  data: BattuData;
  profile: UserProfile;
  aiInterpretation?: {
    elementAnalysis: string;
    favourableElements: string;
    unfavourableElements: string;
    advice: string;
  };
}

const ELEMENT_LABELS: { [key: string]: { name: string; color: string; bg: string; text: string; desc: string } } = {
  Kim: { name: 'Mạnh Kim (Metal)', color: 'bg-amber-400', bg: 'bg-amber-950/20', text: 'text-amber-300', desc: 'Đại diện cho sự kiên trì, cương trực, óc phân lý tuyệt vời và sắc sảo.' },
  Mộc: { name: 'Vượng Mộc (Wood)', color: 'bg-emerald-500', bg: 'bg-emerald-950/20', text: 'text-emerald-300', desc: 'Đại diện cho tính nhân từ, tinh thần sinh sôi nảy nở vững bền.' },
  Thủy: { name: 'Nhuận Thủy (Water)', color: 'bg-cyan-500', bg: 'bg-cyan-950/20', text: 'text-cyan-300', desc: 'Đại diện cho trí tuệ cao, sự linh hoạt uốn lượn và khả năng giao thiệp.' },
  Hỏa: { name: 'Hừng Hỏa (Fire)', color: 'bg-rose-500', bg: 'bg-rose-950/20', text: 'text-rose-300', desc: 'Đại diện cho niềm đam mê rực cháy, tính bộc phát dũng cảm và hiếu khách.' },
  Thổ: { name: 'Chân Thổ (Earth)', color: 'bg-orange-500', bg: 'bg-orange-950/20', text: 'text-orange-400', desc: 'Đại diện cho lòng bao dung tín cẩn, sự điềm tĩnh kiên trì dẻo dai.' },
};

export default function BattuViewer({ data, profile, aiInterpretation }: BattuViewerProps) {
  const [localAiContent, setLocalAiContent] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleFetchAi = async () => {
    setIsLoadingAi(true);
    setAiError(null);
    try {
      const content = await fetchAiBattu(profile, data);
      setLocalAiContent(content);
    } catch (e: any) {
      setAiError(e.message || 'Không thể liên lạc với AI.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 hover:translate-y-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-display text-base font-bold text-warm-amber flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />Lá Số Tứ Trụ Bát Tự (4 Pillars of Destiny)
            </h4>
            <p className="text-xs text-white/40 mt-0.5">Xác cấu trúc Thiên Can và Địa Chi bổ trợ từ thời khắc sinh.</p>
          </div>
          <span id="tooltip-battu-pill" title="Can ngày hiển thị vị chủ (Nhật Nguyên) là hạt nhân bản thể năng lượng của bạn." className="tooltip cursor-pointer">
            <HelpCircle className="w-4 h-4 text-white/30" />
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center space-y-3 hover:border-white/15 transition duration-300">
            <span className="text-[10px] text-white/40 font-mono">TRỤ NĂM (YEAR)</span>
            <div className="space-y-1">
              <h5 className="text-xl font-display font-bold text-amber-300 leading-none">{data.pillars.year.split(' ')[0]}</h5>
              <p className="text-sm font-mono text-white/60 leading-none">{data.pillars.year.split(' ')[1]}</p>
            </div>
            <span className="text-[10px] text-white/30 block">Thế hệ / Tổ tiên</span>
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center space-y-3 hover:border-white/15 transition duration-300">
            <span className="text-[10px] text-white/40 font-mono">TRỤ THÁNG (MONTH)</span>
            <div className="space-y-1">
              <h5 className="text-xl font-display font-bold text-amber-300 leading-none">{data.pillars.month.split(' ')[0]}</h5>
              <p className="text-sm font-mono text-white/60 leading-none">{data.pillars.month.split(' ')[1]}</p>
            </div>
            <span className="text-[10px] text-white/30 block">Cha mẹ / Xã hội</span>
          </div>
          <div className="bg-gradient-to-b from-warm-amber/10 to-black/30 rounded-xl p-4 border-2 border-warm-amber text-center space-y-3 relative overflow-hidden shadow-lg shadow-warm-amber/10 hover:border-warm-amber transition duration-300">
            <div className="absolute top-0 right-0 bg-warm-amber text-[8px] text-white font-bold px-1.5 py-0.5 rounded-bl">NHẬT NGUYÊN</div>
            <span className="text-[10px] text-warm-amber font-mono font-bold">TRỤ NGÀY (DAY)</span>
            <div className="space-y-1">
              <h5 className="text-xl font-display font-bold text-warm-amber leading-none">{data.pillars.day.split(' ')[0]}</h5>
              <p className="text-sm font-mono text-white/60 leading-none">{data.pillars.day.split(' ')[1]}</p>
            </div>
            <span className="text-[10px] text-warm-amber font-bold block">Chủ thể / Thân mệnh ({data.dayMaster})</span>
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center space-y-3 hover:border-white/15 transition duration-300">
            <span className="text-[10px] text-white/40 font-mono">TRỤ GIỜ (HOUR)</span>
            <div className="space-y-1">
              <h5 className="text-xl font-display font-bold text-amber-300 leading-none">{data.pillars.hour.split(' ')[0]}</h5>
              <p className="text-sm font-mono text-white/60 leading-none">{data.pillars.hour.split(' ')[1]}</p>
            </div>
            <span className="text-[10px] text-white/30 block">Con cái / Hậu bối</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6 hover:translate-y-0">
          <h4 className="font-display text-base font-bold text-warm-amber mb-5">Biểu Đồ Sinh Khí Ngũ Hành (Energy Balance)</h4>
          <div className="space-y-4">
            {Object.entries(data.elementsPercentage).map(([element, percentage]) => {
              const el = ELEMENT_LABELS[element];
              return (
                <div key={element} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${el.text}`}>{el.name}</span>
                    <span className="font-mono font-bold text-white/60">{percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/40 rounded-full border border-white/5 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${el.color}`} style={{ width: `${percentage}%` }} />
                  </div>
                  <p className="text-[10px] text-white/40">{el.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:translate-y-0">
          <div>
            <h4 className="font-display text-base font-bold text-white/80 mb-3 uppercase">Ứng xử Ngũ Hành cát hung</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Dựa vào Bát Tự, Nhật chủ mang thiên can <span className="text-warm-amber font-bold">{data.dayMaster}</span> liên kết hài hòa với các ngũ hành xung quanh. Việc thấu hiểu sự thừa thiếu trong ngũ hành bản thể cho phép thân chủ điều phối môi trường sống, sự nghiệp, thậm chí là chọn lựa lương duyên tốt lành.
            </p>
          </div>

          {aiInterpretation || localAiContent ? (
            <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
              <h5 className="font-display text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-warm-amber to-warm-teal flex items-center gap-1.5">
                <Star className="w-4 h-4 text-warm-amber" />Đại Sư Luận Giải Bát Tự
              </h5>
              <div className="space-y-4 text-xs leading-relaxed text-white/60 max-h-[170px] overflow-y-auto pr-1">
                {aiInterpretation ? (
                  <>
                    <div><h6 className="font-bold text-white/80 mb-0.5">Phân Tích Thừa Thiếu Ngũ Hành:</h6><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.elementAnalysis} theme="amber" /></div></div>
                    <div><h6 className="font-bold text-white/80 mb-0.5">Dụng Thần / Hỷ Thần trợ giúp (Vũ khí cát tinh):</h6><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.favourableElements} theme="emerald" /></div></div>
                    <div><h6 className="font-bold text-white/80 mb-0.5">Kỵ Thần tránh né (Thế lực xung sát):</h6><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.unfavourableElements} theme="rose" /></div></div>
                    <div><h6 className="font-bold text-white/80 mb-0.5">Phương Pháp Cải Vận Trực Tiếp:</h6><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.advice} theme="amber" /></div></div>
                  </>
                ) : localAiContent && (
                  <div><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={localAiContent} theme="amber" /></div></div>
                )}
              </div>
            </div>
          ) : isLoadingAi ? (
            <div className="mt-6 p-6 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-warm-amber" />
            </div>
          ) : (
            <div className="mt-6 bg-black/20 p-4 rounded-xl border border-white/5 text-center">
              <p className="text-xs text-white/40 mb-3">Chưa có luận giải AI. Kích hoạt luận giải riêng cho Bát Tự ngay bây giờ.</p>
              {aiError && <p className="text-xs text-rose-400 mb-3">{aiError}</p>}
              <button type="button" onClick={handleFetchAi}
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-warm-amber to-warm-teal hover:from-warm-teal hover:to-warm-amber text-white text-xs font-bold font-display rounded-xl tracking-wide shadow-lg shadow-warm-amber/30 transition-all active:scale-95 cursor-pointer">
                <Sparkles className="w-4 h-4" /> Luận Giải Bát Tự (AI)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
