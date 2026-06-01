import { useState } from 'react';
import { AstrologyData, PlanetPosition } from '../types';
import { HelpCircle, Star, Compass } from 'lucide-react';

interface AstrologyViewerProps {
  data: AstrologyData;
  aiInterpretation?: {
    sunSignInterpretation: string;
    moonSignInterpretation: string;
    ascendantInterpretation: string;
    natalChartSynthesis: string;
  };
}

const ZODIAC_LIST = [
  { name: 'Bạch Dương', symbol: '♈', color: '#EF4444' }, // Fire
  { name: 'Kim Ngưu', symbol: '♉', color: '#10B981' },   // Earth
  { name: 'Song Tử', symbol: '♊', color: '#3B82F6' },   // Air
  { name: 'Cự Giải', symbol: '♋', color: '#EC4899' },   // Water
  { name: 'Sư Tử', symbol: '♌', color: '#F59E0B' }, // Fire
  { name: 'Xử Nữ', symbol: '♍', color: '#10B981' },   // Earth
  { name: 'Thiên Bình', symbol: '♎', color: '#3B82F6' },   // Air
  { name: 'Thiên Yết', symbol: '♏', color: '#EC4899' },   // Water
  { name: 'Nhân Mã', symbol: '♐', color: '#F59E0B' }, // Fire
  { name: 'Ma Kết', symbol: '♑', color: '#10B981' },   // Earth
  { name: 'Bảo Bình', symbol: '♒', color: '#3B82F6' },   // Air
  { name: 'Song Ngư', symbol: '♓', color: '#EC4899' },   // Water
];

export default function AstrologyViewer({ data, aiInterpretation }: AstrologyViewerProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);

  // SVG parameters
  const size = 320;
  const center = size / 2;
  const outerRadius = size / 2 - 12;
  const innerRadius = outerRadius - 32;
  const coreRadius = innerRadius - 28;

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Pre-calculate positions of zodiac division lines
  const divisionLines = Array.from({ length: 12 }).map((_, idx) => {
    const angle = idx * 30;
    const start = polarToCartesian(center, center, innerRadius, angle);
    const end = polarToCartesian(center, center, outerRadius, angle);
    const textPos = polarToCartesian(center, center, (outerRadius + innerRadius) / 2, angle + 15);
    const value = ZODIAC_LIST[idx];

    return { start, end, textPos, value };
  });

  // Calculate planetary dots & positions
  const planetPoints = data.planets.map((p) => {
    const zodiacIdx = ZODIAC_LIST.findIndex((z) => z.name === p.sign);
    // 30 degrees per zodiac, plus the offset degree of the planet
    const absoluteDegree = (zodiacIdx * 30) + p.degree;
    const pos = polarToCartesian(center, center, coreRadius - 10, absoluteDegree);
    
    return { ...p, pos, absoluteDegree };
  });

  // Aspect Lines drawing helper
  const aspectLinesRendered = data.aspects.map((aspect, lineIdx) => {
    const p1 = planetPoints.find((p) => p.name === aspect.planet1);
    const p2 = planetPoints.find((p) => p.name === aspect.planet2);
    if (!p1 || !p2) return null;

    return (
      <line
        key={lineIdx}
        x1={p1.pos.x}
        y1={p1.pos.y}
        x2={p2.pos.x}
        y2={p2.pos.y}
        stroke={aspect.color}
        strokeWidth="1.5"
        strokeOpacity="0.45"
        strokeDasharray={aspect.type === 'Sextile' ? '4 2' : undefined}
      />
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* CƠ CẤU KHÁI QUÁT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SUN SIGN */}
        <div className="glass-card rounded-xl p-5 flex items-center justify-between hover:border-amber-400/30">
          <div>
            <span className="text-[10px] text-amber-400 font-mono tracking-widest block uppercase">CUNG MẶT TRỜI (SUN)</span>
            <h4 className="text-xl font-display font-bold text-slate-100 mt-1">{data.sunSign}</h4>
            <p className="text-xs text-slate-400 mt-1 pb-1">Bản ngã chủ đạo, ý thức, ý chí vươn lên khát vọng danh tiếng.</p>
          </div>
          <span className="text-4xl text-amber-400 font-bold p-2 select-none">{data.sunSymbol}</span>
        </div>

        {/* MOON SIGN */}
        <div className="glass-card rounded-xl p-5 flex items-center justify-between hover:border-indigo-400/30">
          <div>
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest block uppercase">CUNG MẶT TRĂNG (MOON)</span>
            <h4 className="text-xl font-display font-bold text-slate-100 mt-1">{data.moonSign}</h4>
            <p className="text-xs text-slate-400 mt-1 pb-1">Tiềm thức sâu xa, thói quen cảm xúc, thế giới nội tâm.</p>
          </div>
          <span className="text-4xl text-indigo-400 font-bold p-2 select-none">{data.moonSymbol}</span>
        </div>

        {/* ASCENDANT */}
        <div className="glass-card rounded-xl p-5 flex items-center justify-between hover:border-pink-400/30">
          <div>
            <span className="text-[10px] text-pink-400 font-mono tracking-widest block uppercase">CUNG MỌC (ASCENDANT)</span>
            <h4 className="text-xl font-display font-bold text-slate-100 mt-1">{data.ascendant}</h4>
            <p className="text-xs text-slate-400 mt-1 pb-1">Lăng kính mặt nạ xã hội, dáng điệu, ấn tượng đầu tiên.</p>
          </div>
          <span className="text-4xl text-pink-400 font-bold p-2 select-none">{data.ascendantSymbol}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. INTERACTIVE ASTRO WHEEL GRAPHIC */}
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center hover:translate-y-0">
          <div className="w-full flex items-center justify-between mb-4">
            <div>
              <h4 className="font-display text-base font-bold text-slate-200 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400" />
                Vòng Tròn Bản Đồ Sao (Natal Chart Wheel)
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Xác vị trí các hành tinh trong hoàng đạo lúc sinh.</p>
            </div>
            <span id="tooltip-astro-wheel" title="Nhấp vào bất kỳ hành tinh màu vàng nào trong bản đồ để giải mã cát hung." className="tooltip cursor-pointer">
              <HelpCircle className="w-4 h-4 text-slate-500" />
            </span>
          </div>

          <div className="relative w-[320px] aspect-square rounded-full border border-white/5 bg-black/40 p-1 mb-6 flex items-center justify-center">
            {/* SVG Natal Astrology Drawing */}
            <svg width={size} height={size} className="overflow-visible select-none">
              <defs>
                <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Outer Glow Ring */}
              <circle cx={center} cy={center} r={outerRadius} fill="url(#ringGlow)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

              {/* Outer boundary lines */}
              <circle cx={center} cy={center} r={outerRadius} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
              <circle cx={center} cy={center} r={innerRadius} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
              <circle cx={center} cy={center} r={coreRadius} stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
              <circle cx={center} cy={center} r="25" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" fill="none" />

              {/* Zodiac Division segments */}
              {divisionLines.map((line, idx) => (
                <g key={idx}>
                  <line
                    x1={line.start.x}
                    y1={line.start.y}
                    x2={line.end.x}
                    y2={line.end.y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.2"
                  />
                  <text
                    x={line.textPos.x}
                    y={line.textPos.y}
                    fill={line.value.color}
                    fontSize="11"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="font-bold opacity-90"
                  >
                    {line.value.symbol}
                  </text>
                </g>
              ))}

              {/* Core Aspect lines */}
              {aspectLinesRendered}

              {/* Planet coordinate nodes */}
              {planetPoints.map((p, idx) => (
                <g
                  key={idx}
                  id={`planet-node-${p.name}`}
                  onClick={() => setSelectedPlanet(p)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={p.pos.x}
                    cy={p.pos.y}
                    r={selectedPlanet?.name === p.name ? '9' : '7'}
                    fill={selectedPlanet?.name === p.name ? '#6366F1' : '#11132e'}
                    stroke={selectedPlanet?.name === p.name ? '#E0E7FF' : '#6366f1'}
                    strokeWidth="1.5"
                    className="transition-all duration-300 group-hover:r-[9px]"
                  />
                  <text
                    x={p.pos.x}
                    y={p.pos.y}
                    fill="#F1F5F9"
                    fontSize="7"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="font-mono font-bold"
                  >
                    {p.symbol}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Interactive display panel for selected planet */}
          <div className="w-full bg-black/40 rounded-xl border border-white/5 p-4 shrink-0 transition-all">
            {selectedPlanet ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h5 className="text-xs font-bold font-display text-amber-400 uppercase flex items-center gap-1.5">
                    <span>✦</span> {selectedPlanet.name} ({selectedPlanet.symbol})
                  </h5>
                  <span className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    Cung {selectedPlanet.house} (Góc {selectedPlanet.degree}°)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-indigo-350 mt-0.5 block">Đang tại: Cung {selectedPlanet.sign} {selectedPlanet.signSymbol}</span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Thể hiện nguồn lực lớn về phương diện {selectedPlanet.name.toLowerCase()} giúp điều hướng phong vĩ, biểu đạt cá tính hoàn mỹ trong tinh vân sự nghiệp.
                </p>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-500 italic">
                Nhấp vào bất kỳ điểm chấm hành tinh nào trong Bản đồ sao ở trên để giải mã tọa độ.
              </div>
            )}
          </div>
        </div>

        {/* 2. ASPECTS & DETAILED PLANETARY VALUES */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 hover:translate-y-0">
            <h4 className="font-display text-base font-bold text-slate-200 mb-3">Tọa Độ Chi Tiết Thượng Giới</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-slate-300">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[9px] font-mono">
                    <th className="py-2 text-left">Hành tinh</th>
                    <th className="py-2 text-left">Cung Hoàng đạo</th>
                    <th className="py-2 text-center">Tọa độ</th>
                    <th className="py-2 text-center">Cung Địa bàn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.planets.map((p, pIdx) => (
                    <tr
                      key={pIdx}
                      id={`row-planet-${p.name}`}
                      onClick={() => setSelectedPlanet(p)}
                      className="hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <td className="py-2 flex items-center gap-2 font-medium">
                        <span className="text-amber-400 font-bold">{p.symbol}</span>
                        <span>{p.name}</span>
                      </td>
                      <td className="py-2 text-slate-400">{p.sign}</td>
                      <td className="py-2 text-center font-mono text-slate-400">{p.degree}°</td>
                      <td className="py-2 text-center font-mono text-indigo-400">{p.house}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI INTERPRETATION CARD (IF EXISTS) */}
          {aiInterpretation && (
            <div className="glass-card rounded-2xl p-6 space-y-4 hover:translate-y-0">
              <h4 className="font-display text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-1.5">
                <Star className="w-5 h-5 text-indigo-400 fill-indigo-400/10" />
                Đại Sư Luận Giải Bản Đồ Sao
              </h4>
              
              <div className="space-y-4 text-xs leading-relaxed text-slate-300 overflow-y-auto max-h-[300px] pr-1">
                <div>
                  <h5 className="font-bold text-slate-200 mb-1">Cung Mặt Trời ({data.sunSign}) - Tôi Luôn Cố Gắng:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.sunSignInterpretation}</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-1">Cung Mặt Trăng ({data.moonSign}) - Cảm Xúc Sâu Kín:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.moonSignInterpretation}</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-1">Cung Mọc ({data.ascendant}) - Lớp Vỏ Xã Hội:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.ascendantInterpretation}</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-1">Hợp Nhất Toàn Diện Bản Đồ Sao:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.natalChartSynthesis}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
