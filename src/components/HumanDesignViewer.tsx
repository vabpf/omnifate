import { useState } from 'react';
import { HumanDesignData, HumanDesignCenter } from '../types';
import { HelpCircle, Star } from 'lucide-react';

interface HumanDesignViewerProps {
  data: HumanDesignData;
  aiInterpretation?: {
    typeInterpretation: string;
    authorityInterpretation: string;
    strategyInterpretation: string;
  };
}

export default function HumanDesignViewer({ data, aiInterpretation }: HumanDesignViewerProps) {
  const [selectedCenter, setSelectedCenter] = useState<HumanDesignCenter | null>(null);

  const centerExplants: { [key: string]: string } = {
    head: 'Đây là trung tâm của nguồn cảm hứng bốc phát, những câu hỏi lớn và áp lực tinh thần muốn thấu hiểu cốt tủy vạn vật.',
    ajna: 'Nơi xử lý kiến thức, lý thuyết, phân tích hệ quả thông tin và kiến tạo tư duy giải quyết khủng hoảng.',
    throat: 'Cổng truyền ngôn, bộc lộ sáng tạo toàn bích, biến suy nghĩ thành lời thuyết phục hoặc hành vi trực tiếp.',
    g_center: 'Định vị Bản ngã, tình yêu vũ trụ tuyệt vời, sứ mệnh định hướng bước chân bạn trong thế giới vật chất.',
    heart: 'Ý chí bền bỉ, cái tôi thực tế, động lực chinh phạt làm giàu và khả năng đàm phán hợp đồng cốt lõi.',
    sacral: 'Động cơ sinh học lớn, năng lực lao động dẻo dai vô song, xúc tác sáng tạo sinh sôi nảy nở của Generator.',
    root: 'Áp lực hành động, bản năng sinh tồn dũng cảm, cột đỡ năng lượng giúp đối kháng tốt với stress gia tăng.',
    spleen: 'Trí thông minh bản năng tức thời, sức đề kháng sinh học, tiếng nói linh tính bảo vệ an toàn sinh mạng.',
    solar_plexus: 'Hệ thống cảm xúc đa sắc sảo, chiều sâu thăng trầm của tâm trạng, trực giác tâm linh tiến bộ.',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* HEADER SPECS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* TYPE */}
        <div className="glass-card rounded-xl p-4">
          <span className="text-[9px] text-slate-400 font-mono tracking-wider block uppercase">LOẠI NĂNG LƯỢNG (TYPE)</span>
          <h4 className="text-sm font-bold text-slate-150 mt-1 truncate">{data.type}</h4>
          <span className="text-[10px] text-indigo-400 font-mono block mt-1">Hào quang dồi dào</span>
        </div>

        {/* PROFILE */}
        <div className="glass-card rounded-xl p-4">
          <span className="text-[9px] text-slate-400 font-mono tracking-wider block uppercase">HỒ SƠ (PROFILE)</span>
          <h4 className="text-sm font-bold text-slate-150 mt-1 truncate">{data.profile.split(' ')[0]}</h4>
          <span className="text-[10px] text-purple-400 font-mono block mt-1 truncate">{data.profile.split(' ')[1] || 'Vai diễn cuộc đời'}</span>
        </div>

        {/* STRATEGY */}
        <div className="glass-card rounded-xl p-4">
          <span className="text-[9px] text-slate-400 font-mono tracking-wider block uppercase">CHIẾN LƯỢC (STRATEGY)</span>
          <h4 className="text-sm font-bold text-slate-150 mt-1 truncate">{data.strategy}</h4>
          <span className="text-[10px] text-amber-400 font-mono block mt-1">Cách thu hút cơ hội</span>
        </div>

        {/* AUTHORITY */}
        <div className="glass-card rounded-xl p-4">
          <span className="text-[9px] text-slate-400 font-mono tracking-wider block uppercase">SỰ QUYẾT ĐỊNH (AUTHORITY)</span>
          <h4 className="text-sm font-bold text-slate-150 mt-1 truncate">{data.authority.split(' ')[0]}</h4>
          <span className="text-[10px] text-cyan-400 font-mono block mt-1 truncate">{data.authority.split(' ').slice(1).join(' ') || 'Thẩm quyền nội tại'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. MEDITATING BODYGRAPH SVG */}
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center hover:translate-y-0">
          <div className="w-full flex items-center justify-between mb-4">
            <div>
              <h4 className="font-display text-base font-bold text-slate-200">Đồ Hình Bodygraph (9 Năng Lượng Luân Xa)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Vùng năng lượng xác định (Có màu) và chưa xác định (Trắng trống).</p>
            </div>
            <span id="tooltip-hd-centers" title="Nhấp vào từng vùng hình lăng trụ trong đồ hình để hiển thị ý nghĩa luân xa." className="tooltip cursor-pointer">
              <HelpCircle className="w-4 h-4 text-slate-500" />
            </span>
          </div>

          <div className="relative w-[320px] h-[340px] bg-black/40 rounded-xl border border-white/5 flex items-center justify-center p-2 mb-6 select-none">
            {/* Meditating Figure SVG */}
            <svg viewBox="0 0 320 340" width="100%" height="100%" className="overflow-visible">
              {/* Backglow Silhouette */}
              <path
                d="M 160 20 L 190 60 A 30 30 0 0 1 200 90 L 195 130 L 225 180 L 210 240 L 220 300 L 160 320 L 100 300 L 110 240 L 95 180 L 125 130 L 120 90 A 30 30 0 0 1 130 60 Z"
                fill="rgba(255,255,255,0.02)"
                fillOpacity="0.25"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.2"
                strokeDasharray="5 5"
              />

              {/* Connecting Channel Paths lines */}
              <line x1="160" y1="40" x2="160" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              <line x1="160" y1="80" x2="160" y2="120" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              <line x1="160" y1="120" x2="160" y2="170" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              <line x1="160" y1="170" x2="160" y2="230" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              <line x1="160" y1="230" x2="160" y2="280" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              <line x1="160" y1="170" x2="195" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
              <line x1="160" y1="230" x2="110" y2="220" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
              <line x1="160" y1="230" x2="210" y2="220" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />

              {/* 1. Head (Crown) - Triangle at (160, 40) */}
              {(() => {
                const center = data.centers.find(c => c.id === 'head')!;
                const isSel = selectedCenter?.id === 'head';
                return (
                  <polygon
                    id="node-hd-head"
                    points="160,25 148,45 172,45"
                    fill={center.defined ? center.color : '#0F172A'}
                    fillOpacity={center.defined ? 0.9 : 0.6}
                    stroke={isSel ? '#FFFFFF' : '#475569'}
                    strokeWidth={isSel ? 2 : 1}
                    className="cursor-pointer transition hover:scale-105"
                    onClick={() => setSelectedCenter(center)}
                  />
                );
              })()}

              {/* 2. Ajna - Triangle at (160, 80) */}
              {(() => {
                const center = data.centers.find(c => c.id === 'ajna')!;
                const isSel = selectedCenter?.id === 'ajna';
                return (
                  <polygon
                    id="node-hd-ajna"
                    points="160,95 146,70 174,70"
                    fill={center.defined ? center.color : '#0F172A'}
                    fillOpacity={center.defined ? 0.9 : 0.6}
                    stroke={isSel ? '#FFFFFF' : '#475569'}
                    strokeWidth={isSel ? 2 : 1}
                    className="cursor-pointer transition hover:scale-105"
                    onClick={() => setSelectedCenter(center)}
                  />
                );
              })()}

              {/* 3. Throat - Square at (160, 120) */}
              {(() => {
                const center = data.centers.find(c => c.id === 'throat')!;
                const isSel = selectedCenter?.id === 'throat';
                return (
                  <rect
                    id="node-hd-throat"
                    x="146" y="108" width="28" height="24" rx="3"
                    fill={center.defined ? center.color : '#0F172A'}
                    fillOpacity={center.defined ? 0.9 : 0.6}
                    stroke={isSel ? '#FFFFFF' : '#475569'}
                    strokeWidth={isSel ? 2 : 1}
                    className="cursor-pointer transition hover:scale-105"
                    onClick={() => setSelectedCenter(center)}
                  />
                );
              })()}

              {/* 4. G-Center - Diamond/square in center */}
              {(() => {
                const center = data.centers.find(c => c.id === 'g_center')!;
                const isSel = selectedCenter?.id === 'g_center';
                return (
                  <rect
                    id="node-hd-g_center"
                    x="148" y="157" width="24" height="24" rx="4"
                    transform="rotate(45, 160, 169)"
                    fill={center.defined ? center.color : '#0F172A'}
                    fillOpacity={center.defined ? 0.9 : 0.6}
                    stroke={isSel ? '#FFFFFF' : '#475569'}
                    strokeWidth={isSel ? 2 : 1}
                    className="cursor-pointer transition hover:scale-105"
                    onClick={() => setSelectedCenter(center)}
                  />
                );
              })()}

              {/* 5. Heart (Ego) - Small Triangle */}
              {(() => {
                const center = data.centers.find(c => c.id === 'heart')!;
                const isSel = selectedCenter?.id === 'heart';
                return (
                  <polygon
                    id="node-hd-heart"
                    points="195,182 186,198 204,198"
                    fill={center.defined ? center.color : '#0F172A'}
                    fillOpacity={center.defined ? 0.9 : 0.6}
                    stroke={isSel ? '#FFFFFF' : '#475569'}
                    strokeWidth={isSel ? 2 : 1}
                    className="cursor-pointer transition hover:scale-105"
                    onClick={() => setSelectedCenter(center)}
                  />
                );
              })()}

              {/* 6. Sacral - Square */}
              {(() => {
                const center = data.centers.find(c => c.id === 'sacral')!;
                const isSel = selectedCenter?.id === 'sacral';
                return (
                  <rect
                    id="node-hd-sacral"
                    x="145" y="215" width="30" height="30" rx="3"
                    fill={center.defined ? center.color : '#0F172A'}
                    fillOpacity={center.defined ? 0.9 : 0.6}
                    stroke={isSel ? '#FFFFFF' : '#475569'}
                    strokeWidth={isSel ? 2 : 1}
                    className="cursor-pointer transition hover:scale-105"
                    onClick={() => setSelectedCenter(center)}
                  />
                );
              })()}

              {/* 7. Root - Square at bottom */}
              {(() => {
                const center = data.centers.find(c => c.id === 'root')!;
                const isSel = selectedCenter?.id === 'root';
                return (
                  <rect
                    id="node-hd-root"
                    x="144" y="265" width="32" height="30" rx="3"
                    fill={center.defined ? center.color : '#0F172A'}
                    fillOpacity={center.defined ? 0.9 : 0.6}
                    stroke={isSel ? '#FFFFFF' : '#475569'}
                    strokeWidth={isSel ? 2 : 1}
                    className="cursor-pointer transition hover:scale-105"
                    onClick={() => setSelectedCenter(center)}
                  />
                );
              })()}

              {/* 8. Spleen - Triangle Left */}
              {(() => {
                const center = data.centers.find(c => c.id === 'spleen')!;
                const isSel = selectedCenter?.id === 'spleen';
                return (
                  <polygon
                    id="node-hd-spleen"
                    points="110,205 92,235 116,235"
                    fill={center.defined ? center.color : '#0F172A'}
                    fillOpacity={center.defined ? 0.9 : 0.6}
                    stroke={isSel ? '#FFFFFF' : '#475569'}
                    strokeWidth={isSel ? 2 : 1}
                    className="cursor-pointer transition hover:scale-105"
                    onClick={() => setSelectedCenter(center)}
                  />
                );
              })()}

              {/* 9. Solar Plexus - Triangle Right */}
              {(() => {
                const center = data.centers.find(c => c.id === 'solar_plexus')!;
                const isSel = selectedCenter?.id === 'solar_plexus';
                return (
                  <polygon
                    id="node-hd-solar_plexus"
                    points="210,205 202,235 226,235"
                    fill={center.defined ? center.color : '#0F172A'}
                    fillOpacity={center.defined ? 0.9 : 0.6}
                    stroke={isSel ? '#FFFFFF' : '#475569'}
                    strokeWidth={isSel ? 2 : 1}
                    className="cursor-pointer transition hover:scale-105"
                    onClick={() => setSelectedCenter(center)}
                  />
                );
              })()}
            </svg>
          </div>

          {/* Core Interactive display panel for selected center */}
          <div className="w-full bg-black/40 rounded-xl border border-white/5 p-4 shrink-0 transition-all">
            {selectedCenter ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h5 className="text-xs font-bold font-display text-amber-500 uppercase flex items-center gap-1.5">
                    <span>✦</span> {selectedCenter.name}
                  </h5>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    selectedCenter.defined ? 'bg-indigo-950/40 text-indigo-300 border border-indigo-900/40' : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}>
                    {selectedCenter.defined ? 'XÁC ĐỊNH (DEFINED)' : 'CHƯA XÁC ĐỊNH (OPEN)'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {centerExplants[selectedCenter.id] || ''} {selectedCenter.defined ? 'Bạn sở hữu luân xa này hoạt động độc lập vững chãi, liên tục tỏa sóng vận khí dồi dào.' : 'Bạn tiếp nhận năng lượng biến đổi tự do từ trường xã hội qua luân xa này.'}
                </p>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-550 italic">
                Nhấp vào bất kỳ lăng kính luân xa nào trong đồ hình ở trên để giải mã ý nghĩa.
              </div>
            )}
          </div>
        </div>

        {/* 2. SPEC CATEGORY DESCRIPTION & AI DIALOG OPTIONS */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 hover:translate-y-0">
            <h4 className="font-display text-base font-bold text-slate-205 mb-3 uppercase">Danh Sách Trung Tâm Năng Lượng</h4>
            
            <div className="space-y-2 max-h-[178px] overflow-y-auto pr-1">
              {data.centers.map((c, idx) => (
                <div
                  key={idx}
                  id={`hd-center-row-${c.id}`}
                  onClick={() => setSelectedCenter(c)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-black/25 hover:border-white/15 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <span className="text-xs font-medium text-slate-200">{c.name}</span>
                  <span className={`text-[10px] font-mono font-bold ${c.defined ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {c.defined ? '✦ Xác định' : '○ Trống mở'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI INTERPRETATION CARD (IF EXISTS) */}
          {aiInterpretation && (
            <div className="glass-card rounded-2xl p-6 space-y-4 hover:translate-y-0">
              <h4 className="font-display text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-1.5">
                <Star className="w-5 h-5 text-purple-400 fill-purple-400/10" />
                Đại Sư Luận Giải Thiết Kế Nhân Dạng
              </h4>

              <div className="space-y-4 text-xs leading-relaxed text-slate-300 overflow-y-auto max-h-[300px] pr-1">
                <div>
                  <h5 className="font-bold text-slate-200 mb-1">Loại Hào Quang ({data.type}) - Bản Chất Vận Hành:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.typeInterpretation}</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-1">Thẩm Quyền Đưa Quyết Định ({data.authority.split(' ')[0]}):</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.authorityInterpretation}</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-1">Chiến Lược Hấp Dẫn Hào Quang:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.strategyInterpretation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
