import { useState } from 'react';
import { AstrologyData, PlanetPosition, UserProfile } from '../../types';
import { HelpCircle, Star, Compass, Sparkles, Loader2 } from 'lucide-react';
import { MarkdownRenderer } from '../../ui';
import { fetchAiAstrology } from '../../api/ai-astrology';
import { ZODIAC_SIGNS } from '../../constants';

interface AstrologyViewerProps {
  data: AstrologyData;
  profile: UserProfile;
  aiInterpretation?: {
    sunSignInterpretation: string;
    moonSignInterpretation: string;
    ascendantInterpretation: string;
    natalChartSynthesis: string;
  };
}

export default function AstrologyViewer({ data, profile, aiInterpretation }: AstrologyViewerProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);
  const [localAiContent, setLocalAiContent] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleFetchAi = async () => {
    setIsLoadingAi(true);
    setAiError(null);
    try {
      const content = await fetchAiAstrology(profile, data);
      setLocalAiContent(content);
    } catch (e: any) {
      setAiError(e.message || 'Không thể liên lạc với AI.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const size = 320;
  const center = size / 2;
  const outerRadius = size / 2 - 12;
  const innerRadius = outerRadius - 32;
  const coreRadius = innerRadius - 28;

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return { x: centerX + radius * Math.cos(angleInRadians), y: centerY + radius * Math.sin(angleInRadians) };
  };

  const divisionLines = Array.from({ length: 12 }).map((_, idx) => {
    const angle = idx * 30;
    const start = polarToCartesian(center, center, innerRadius, angle);
    const end = polarToCartesian(center, center, outerRadius, angle);
    const textPos = polarToCartesian(center, center, (outerRadius + innerRadius) / 2, angle + 15);
    const value = ZODIAC_SIGNS[idx];
    return { start, end, textPos, value };
  });

  const planetPoints = data.planets.map((p) => {
    const zodiacIdx = ZODIAC_SIGNS.findIndex((z) => z.name === p.sign);
    const absoluteDegree = (zodiacIdx * 30) + p.degree;
    const pos = polarToCartesian(center, center, coreRadius - 10, absoluteDegree);
    return { ...p, pos, absoluteDegree };
  });

  const aspectLinesRendered = data.aspects.map((aspect, lineIdx) => {
    const p1 = planetPoints.find((p) => p.name === aspect.planet1);
    const p2 = planetPoints.find((p) => p.name === aspect.planet2);
    if (!p1 || !p2) return null;
    return (
      <line
        key={lineIdx}
        x1={p1.pos.x} y1={p1.pos.y}
        x2={p2.pos.x} y2={p2.pos.y}
        stroke={aspect.color} strokeWidth="1.5" strokeOpacity="0.45"
        strokeDasharray={aspect.type === 'Sextile' ? '4 2' : undefined}
      />
    );
  });

  const activeAi = aiInterpretation || (localAiContent ? {
    sunSignInterpretation: localAiContent,
    moonSignInterpretation: '',
    ascendantInterpretation: '',
    natalChartSynthesis: '',
  } : null);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 flex items-center justify-between hover:border-amber-400/30">
          <div>
            <span className="text-[10px] text-amber-400 font-mono tracking-widest block uppercase">CUNG MẶT TRỜI (SUN)</span>
            <h4 className="text-xl font-display font-bold text-white mt-1">{data.sunSign}</h4>
            <p className="text-xs text-white/40 mt-1 pb-1">Bản ngã chủ đạo, ý thức, ý chí vươn lên khát vọng danh tiếng.</p>
          </div>
          <span className="text-4xl text-amber-400 font-bold p-2 select-none">{data.sunSymbol}</span>
        </div>
        <div className="glass-card rounded-xl p-5 flex items-center justify-between hover:border-warm-amber/30">
          <div>
            <span className="text-[10px] text-warm-amber font-mono tracking-widest block uppercase">CUNG MẶT TRĂNG (MOON)</span>
            <h4 className="text-xl font-display font-bold text-white mt-1">{data.moonSign}</h4>
            <p className="text-xs text-white/40 mt-1 pb-1">Tiềm thức sâu xa, thói quen cảm xúc, thế giới nội tâm.</p>
          </div>
          <span className="text-4xl text-warm-amber font-bold p-2 select-none">{data.moonSymbol}</span>
        </div>
        <div className="glass-card rounded-xl p-5 flex items-center justify-between hover:border-pink-400/30">
          <div>
            <span className="text-[10px] text-pink-400 font-mono tracking-widest block uppercase">CUNG MỌC (ASCENDANT)</span>
            <h4 className="text-xl font-display font-bold text-white mt-1">{data.ascendant}</h4>
            <p className="text-xs text-white/40 mt-1 pb-1">Lăng kính mặt nạ xã hội, dáng điệu, ấn tượng đầu tiên.</p>
          </div>
          <span className="text-4xl text-pink-400 font-bold p-2 select-none">{data.ascendantSymbol}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center hover:translate-y-0">
          <div className="w-full flex items-center justify-between mb-4">
            <div>
              <h4 className="font-display text-base font-bold text-white/80 flex items-center gap-2">
                <Compass className="w-5 h-5 text-warm-amber" />Vòng Tròn Bản Đồ Sao (Natal Chart Wheel)
              </h4>
              <p className="text-[11px] text-white/40 mt-0.5">Xác vị trí các hành tinh trong hoàng đạo lúc sinh.</p>
            </div>
            <span id="tooltip-astro-wheel" title="Nhấp vào bất kỳ hành tinh màu vàng nào trong bản đồ để giải mã cát hung." className="tooltip cursor-pointer">
              <HelpCircle className="w-4 h-4 text-white/30" />
            </span>
          </div>

          <div className="relative w-[320px] aspect-square rounded-full border border-white/5 bg-black/40 p-1 mb-6 flex items-center justify-center">
            <svg width={size} height={size} className="overflow-visible select-none">
              <defs>
                <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={center} cy={center} r={outerRadius} fill="url(#ringGlow)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <circle cx={center} cy={center} r={outerRadius} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
              <circle cx={center} cy={center} r={innerRadius} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
              <circle cx={center} cy={center} r={coreRadius} stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
              <circle cx={center} cy={center} r="25" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              {divisionLines.map((line, idx) => (
                <g key={idx}>
                  <line x1={line.start.x} y1={line.start.y} x2={line.end.x} y2={line.end.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
                  <text x={line.textPos.x} y={line.textPos.y} fill={line.value.color} fontSize="11" fontFamily="sans-serif" textAnchor="middle" alignmentBaseline="middle" className="font-bold opacity-90">{line.value.symbol}</text>
                </g>
              ))}
              {aspectLinesRendered}
              {planetPoints.map((p, idx) => (
                <g key={idx} id={`planet-node-${p.name}`} onClick={() => setSelectedPlanet(p)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPlanet(p); } }} tabIndex={0} role="button" aria-label={`Hành tinh ${p.name} tại cung ${p.sign}`} className="cursor-pointer group outline-none focus:opacity-80">
                  <circle cx={p.pos.x} cy={p.pos.y} r={selectedPlanet?.name === p.name ? '9' : '7'} fill={selectedPlanet?.name === p.name ? '#6366F1' : '#11132e'} stroke={selectedPlanet?.name === p.name ? '#E0E7FF' : '#6366f1'} strokeWidth="1.5" className="transition-all duration-300" />
                  <text x={p.pos.x} y={p.pos.y} fill="#F1F5F9" fontSize="7" textAnchor="middle" alignmentBaseline="middle" className="font-mono font-bold">{p.symbol}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="w-full bg-black/40 rounded-xl border border-white/5 p-4 shrink-0 transition-all">
            {selectedPlanet ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h5 className="text-xs font-bold font-display text-amber-400 uppercase flex items-center gap-1.5"><span>✦</span> {selectedPlanet.name} ({selectedPlanet.symbol})</h5>
                  <span className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">Cung {selectedPlanet.house} (Góc {selectedPlanet.degree}°)</span>
                </div>
                <span className="text-[11px] font-mono text-warm-sand mt-0.5 block">Đang tại: Cung {selectedPlanet.sign} {selectedPlanet.signSymbol}</span>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">Thể hiện nguồn lực lớn về phương diện {selectedPlanet.name.toLowerCase()} giúp điều hướng phong vĩ, biểu đạt cá tính hoàn mỹ trong tinh vân sự nghiệp.</p>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-white/30 italic">Nhấp vào bất kỳ điểm chấm hành tinh nào trong Bản đồ sao ở trên để giải mã tọa độ.</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 hover:translate-y-0">
            <h4 className="font-display text-base font-bold text-white/80 mb-3">Tọa Độ Chi Tiết Thượng Giới</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-white/60">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 uppercase text-[9px] font-mono">
                    <th className="py-2 text-left">Hành tinh</th>
                    <th className="py-2 text-left">Cung Hoàng đạo</th>
                    <th className="py-2 text-center">Tọa độ</th>
                    <th className="py-2 text-center">Cung Địa bàn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.planets.map((p, pIdx) => (
                    <tr key={pIdx} id={`row-planet-${p.name}`} onClick={() => setSelectedPlanet(p)} className="hover:bg-white/5 cursor-pointer transition-colors">
                      <td className="py-2 flex items-center gap-2 font-medium"><span className="text-amber-400 font-bold">{p.symbol}</span><span>{p.name}</span></td>
                      <td className="py-2 text-white/40">{p.sign}</td>
                      <td className="py-2 text-center font-mono text-white/40">{p.degree}°</td>
                      <td className="py-2 text-center font-mono text-warm-amber">{p.house}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {activeAi ? (
            <div className="glass-card rounded-2xl p-6 space-y-4 hover:translate-y-0">
              <h4 className="font-display text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-warm-amber to-warm-teal flex items-center gap-1.5">
                <Star className="w-5 h-5 text-warm-amber fill-warm-amber/20" />Đại Sư Luận Giải Bản Đồ Sao
              </h4>
              <div className="space-y-4 text-xs leading-relaxed text-white/60 overflow-y-auto max-h-[300px] pr-1">
                {aiInterpretation ? (
                  <>
                    <div><h5 className="font-bold text-white/80 mb-1">Cung Mặt Trời ({data.sunSign}) - Tôi Luôn Cố Gắng:</h5><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.sunSignInterpretation} theme="amber" /></div></div>
                    <div><h5 className="font-bold text-white/80 mb-1">Cung Mặt Trăng ({data.moonSign}) - Cảm Xúc Sâu Kín:</h5><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.moonSignInterpretation} theme="amber" /></div></div>
                    <div><h5 className="font-bold text-white/80 mb-1">Cung Mọc ({data.ascendant}) - Lớp Vỏ Xã Hội:</h5><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.ascendantInterpretation} theme="amber" /></div></div>
                    <div><h5 className="font-bold text-white/80 mb-1">Hợp Nhất Toàn Diện Bản Đồ Sao:</h5><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.natalChartSynthesis} theme="amber" /></div></div>
                  </>
                ) : localAiContent && (
                  <div><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={localAiContent} theme="amber" /></div></div>
                )}
              </div>
            </div>
          ) : isLoadingAi ? (
            <div className="glass-card rounded-2xl p-8 flex items-center justify-center hover:translate-y-0">
              <Loader2 className="w-6 h-6 animate-spin text-warm-amber" />
            </div>
          ) : !aiInterpretation ? (
            <div className="glass-card rounded-2xl p-6 text-center hover:translate-y-0">
              <p className="text-xs text-white/40 mb-4">Chưa có luận giải AI. Bạn có thể kích hoạt luận giải riêng cho Chiêm Tinh ngay bây giờ.</p>
              {aiError && <p className="text-xs text-rose-400 mb-3">{aiError}</p>}
              <button type="button" onClick={handleFetchAi}
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-warm-amber to-warm-teal hover:from-warm-teal hover:to-warm-amber text-white text-xs font-bold font-display rounded-xl tracking-wide shadow-lg shadow-warm-amber/30 transition-all active:scale-95 cursor-pointer">
                <Sparkles className="w-4 h-4" /> Luận Giải Chiêm Tinh (AI)
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
