import { useState } from 'react';
import { NumerologyData } from '../types';
import { HelpCircle, Star, Sparkles, BookOpen, Compass, Award, Activity } from 'lucide-react';
import Markdown from 'react-markdown';

interface NumerologyViewerProps {
  data: NumerologyData;
  aiInterpretation?: {
    lifePathInterpretation: string;
    destinyInterpretation: string;
    soulInterpretation: string;
    birthChartInterpretation: string;
    partA_Overview?: string;
    partB_LifePath?: string;
    partC_Destiny?: string;
    partD_Ability?: string;
  };
}

const CELL_INFO: { [key: number]: { title: string; element: string; meaning: string } } = {
  1: { title: 'Tôi & Bản Thể (1)', element: 'Hỏa / Trí não', meaning: 'Cái Tôi, kỹ năng tự biểu đạt và tính chủ động tiên phong.' },
  2: { title: 'Giác Quan & Trực Giác (2)', element: 'Mộc / Trực giác', meaning: 'Trực giác nhạy bén, tính nhạy cảm và lòng thấu cảm sâu.' },
  3: { title: 'Trí Nhớ & Phân Tích (3)', element: 'Mộc / Trí não', meaning: 'Năng lực học hỏi, sự tiếp thu tinh khôi và óc sáng tạo.' },
  4: { title: 'Trải Nghiệm & Kỷ Kỷ (4)', element: 'Mộc / Thực tế', meaning: 'Tính thực tiễn, óc quy củ quản trị và định hướng chi tiết.' },
  5: { title: 'Tâm Hồn & Tự Do (5)', element: 'Hỏa / Trực giác', meaning: 'Sự tự do biểu hiện tình thương, tính linh hoạt và hào hiệp.' },
  6: { title: 'Sáng Tạo & Gia Đình (6)', element: 'Hỏa / Trí não', meaning: 'Nghĩa vụ, tình gia đình ấm và đầu óc thẩm mỹ cao.' },
  7: { title: 'Bài Học & Trải Nghiệm (7)', element: 'Mộc / Thực tế', meaning: 'Nghị lực phấn đấu vượt nghịch cảnh và trải nghiệm đời thực.' },
  8: { title: 'Độc Lập & Trí Tuệ (8)', element: 'Mộc / Trực giác', meaning: 'Sự kiên định, tự lập tài chính và tự do trong tinh thần.' },
  9: { title: 'Hoài Bão & Lý Tưởng (9)', element: 'Đất / Trí não', meaning: 'Ước mơ, mục tiêu lớn của cuộc đời và lòng trắc ẩn tôn trọng nhân loại.' },
};

const ARROWS = [
  { name: 'Mũi tên Quyết Tâm (1-5-9)', cells: [1, 5, 9], desc: 'Sự kiên trì vượt bậc, khả năng đeo đuổi mục tiêu đến cùng và vượt qua trở ngại.' },
  { name: 'Mũi tên Nhạy Bén (3-5-7)', cells: [3, 5, 7], desc: 'Trực giác tâm linh nhạy bén, khả năng nhìn thấu tâm lý người khác và thấu cảm sâu sắc.' },
  { name: 'Mũi tên Kế Hoạch (1-2-3)', cells: [1, 2, 3], desc: 'Khả năng tổ chức, lên lộ trình chi tiết và lập kế hoạch cuộc sống bài bản.' },
  { name: 'Mũi tên Ý Chí (4-5-6)', cells: [4, 5, 6], desc: 'Ý chí kiên dũng vượt trội, động lực nội tại mạnh mẽ gặt hái hoài bão.' },
  { name: 'Mũi tên Hoạt Động (7-8-9)', cells: [7, 8, 9], desc: 'Tinh thần dấn thân, tình yêu dịch chuyển, thích trải nghiệm thực địa trực tiếp.' },
  { name: 'Mũi tên Thực Tế (1-4-7)', cells: [1, 4, 7], desc: 'Thực tế, vững chãi, giỏi các công việc chân tay thế giới vật chất và quản trị tài chính.' },
  { name: 'Mũi tên Cảm Xúc (2-5-8)', cells: [2, 5, 8], desc: 'Tâm hồn phong phú, sự nhạy cảm đầy tính bác ái, thấu hiểu chiều sâu xúc cảm bẩm sinh.' },
  { name: 'Mũi tên Trí Tuệ (3-6-9)', cells: [3, 6, 9], desc: 'Óc sáng tạo dồi dào, tư duy logic, tiếp thu kiến thức khoa học học thuật xuất sắc.' },
];

export default function NumerologyViewer({ data, aiInterpretation }: NumerologyViewerProps) {
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [activePartTab, setActivePartTab] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [showDetailed, setShowDetailed] = useState<boolean>(false);
  const [showNoAiPrompt, setShowNoAiPrompt] = useState<boolean>(false);

  const chartLayout = [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7],
  ];

  const activeArrows = ARROWS.filter(arr => arr.cells.every(c => data.birthGrid[c] > 0));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Interactive Core Indicies Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LIFE PATH CARD */}
        <div className="glass-card p-5 relative overflow-hidden group hover:shadow-purple-500/10 border-purple-500/10 hover:border-purple-500/30">
          <div className="absolute top-0 right-0 p-3 text-7xl font-mono text-purple-500/10 select-none group-hover:scale-110 transition-transform">
            {data.lifePath}
          </div>
          <span className="text-xs text-purple-400 font-mono tracking-wider block uppercase">Chỉ Số Đường Đời (Life Path)</span>
          <h4 className="text-3xl font-display font-bold text-slate-100 mt-1">{data.lifePath}</h4>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Mô tả hành trình nguyên bản lớn nhất, thế mạnh sẵn có và bài học tiến hóa tâm linh của bạn trong kiếp sống này.
          </p>
        </div>

        {/* DESTINY CARD */}
        <div className="glass-card p-5 relative overflow-hidden group hover:shadow-indigo-500/10 border-indigo-500/10 hover:border-indigo-500/30">
          <div className="absolute top-0 right-0 p-3 text-7xl font-mono text-indigo-500/10 select-none group-hover:scale-110 transition-transform">
            {data.destiny}
          </div>
          <span className="text-xs text-indigo-400 font-mono tracking-wider block uppercase">Chủ Chỉ Sứ Mệnh (Destiny)</span>
          <h4 className="text-3xl font-display font-bold text-slate-100 mt-1">{data.destiny}</h4>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Được cấu thành từ làn sóng rung động họ tên khai sinh. Biệt đãi cho năng lượng phụng sự, tài năng nghề nghiệp lớn.
          </p>
        </div>

        {/* SOUL URGE CARD */}
        <div className="glass-card p-5 relative overflow-hidden group hover:shadow-amber-500/10 border-amber-500/10 hover:border-amber-500/30">
          <div className="absolute top-0 right-0 p-3 text-7xl font-mono text-amber-500/10 select-none group-hover:scale-110 transition-transform">
            {data.soul}
          </div>
          <span className="text-xs text-amber-400 font-mono tracking-wider block uppercase">Nội tâm Linh hồn (Soul Urge)</span>
          <h4 className="text-3xl font-display font-bold text-slate-100 mt-1">{data.soul}</h4>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Phản chiếu sâu kín khát vọng tinh tủy, món quà tinh thần tiềm thức mà linh hồn của bạn thực sự khao khát đạt đến.
          </p>
        </div>
      </div>

      {/* Grid Layout & Explanation details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. INTERACTIVE 3x3 BIRTH CHART GRID */}
        <div className="glass-card rounded-2xl p-6 hover:translate-y-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-display text-lg font-bold text-slate-200">Biểu Đồ Ngày Sinh (Birth Grid Matrix)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Phỏng dựng phân bổ tinh vận bản thể của ngày sinh.</p>
            </div>
            <span id="tooltip-help" title="Nhấp vào từng ô để tra cứu các chỉ số xuất hiện." className="tooltip">
              <HelpCircle className="w-4 h-4 text-slate-500" />
            </span>
          </div>

          <div className="grid grid-rows-3 gap-2 w-full max-w-[340px] mx-auto aspect-square mb-6">
            {chartLayout.map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-3 gap-2">
                {row.map((cellNum) => {
                  const occurrences = data.birthGrid[cellNum] || 0;
                  const isSelected = selectedCell === cellNum;
                  return (
                    <button
                      key={cellNum}
                      id={`numerology-cell-${cellNum}`}
                      type="button"
                      onClick={() => setSelectedCell(cellNum)}
                      className={`relative flex flex-col justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        occurrences > 0
                          ? isSelected
                            ? 'bg-purple-950/40 border-purple-400 shadow-md shadow-purple-500/20 text-slate-100'
                            : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-250 hover:bg-white/10'
                          : isSelected
                            ? 'bg-black/40 border-white/15 text-slate-500'
                            : 'bg-black/10 border-white/5 text-slate-700 hover:border-white/10 hover:bg-black/20'
                      }`}
                    >
                      <span className="text-[10px] font-mono block text-slate-500">{cellNum}</span>
                      <div className="flex-1 flex items-center justify-center">
                        {occurrences > 0 ? (
                          <div className="flex flex-wrap gap-0.5 justify-center">
                            {Array.from({ length: occurrences }).map((_, oIdx) => (
                              <span key={oIdx} className="text-sm font-bold text-amber-400 font-display">★</span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-700/60 leading-none">trống</span>
                        )}
                      </div>
                      <span className="text-[10px] text-right font-mono text-slate-500">
                        {occurrences > 0 ? `${occurrences} số` : '0'}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Core Interactive description panel for the selected cell */}
          <div className="bg-black/40 rounded-xl border border-white/5 p-4 shrink-0 transition-opacity">
            {selectedCell !== null ? (
              <div>
                <h5 className="text-xs font-bold font-display text-amber-500 flex items-center gap-1.5 uppercase">
                  <span>✦</span> {CELL_INFO[selectedCell].title}
                </h5>
                <span className="text-[10px] text-purple-400 font-mono mt-1 block">Toạ độ ý thức: {CELL_INFO[selectedCell].element}</span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {CELL_INFO[selectedCell].meaning}
                </p>
                <div className="mt-3 text-[11px] bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-slate-400">
                  Thân chủ sở hữu: <span className="text-slate-200 font-bold font-mono">{data.birthGrid[selectedCell] || 0}</span> con số trong ngày sinh.
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-500 italic">
                Nhấp vào bất kỳ ô số nào trong 3x3 ngày sinh ở trên để hiển thị diễn giải chi tiết.
              </div>
            )}
          </div>
        </div>

        {/* 2. ARROWS OF STRENGTH & WEAKNESS */}
        <div className="space-y-6">
          <div className="glass-card hover:translate-y-0 rounded-2xl p-6">
            <h4 className="font-display text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Các Trục Mũi Tên Tính Cách
            </h4>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Mũi tên thế mạnh (khi có đủ 3 số thẳng hàng) và mũi tên khoảng trống (khi khuyết mất 3 số kề cận) bộc lộ hành vi phản ứng tự nhiên.
            </p>

            <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
              {activeArrows.map((arr, index) => (
                <div key={index} className="p-3 bg-purple-950/20 border border-purple-900/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 font-display">{arr.name}</span>
                    <span className="text-[10px] font-mono text-purple-405 uppercase bg-purple-950/60 border border-purple-900/40 px-1.5 py-0.5 rounded-md">Vẹn Toàn</span>
                  </div>
                  <p className="text-[11px] text-slate-405 mt-1 leading-relaxed">{arr.desc}</p>
                </div>
              ))}
              {activeArrows.length === 0 && (
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                  <p className="text-xs text-slate-550 italic">Không có trục tinh tú hay mũi tên bứt phá bẩm sinh. Bản tính thiên về hài hòa đa chiều hoặc khuyết thiếu linh động.</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <button
                type="button"
                id="btn-toggle-detailed-numerology-arrows"
                onClick={() => {
                  if (!aiInterpretation) {
                    setShowNoAiPrompt(!showNoAiPrompt);
                    return;
                  }
                  setShowDetailed(!showDetailed);
                  if (!showDetailed) {
                    setTimeout(() => {
                      document.getElementById('numerology-detailed-analysis')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:via-indigo-505 hover:to-indigo-600 text-white text-xs font-bold font-display rounded-xl tracking-wide shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer animate-pulse-slow"
              >
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>
                  {aiInterpretation 
                    ? (showDetailed ? 'ẨN BẢO CÁO CHI TIẾT' : 'LUẬN GIẢI CHI TIẾT 29 MỤC Thần Số Học')
                    : 'XEM LUẬN GIẢI CHI TIẾT 29 MỤC Thần Số Học'
                  }
                </span>
              </button>
            </div>

            {showNoAiPrompt && !aiInterpretation && (
              <div className="mt-3 p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-xl space-y-2.5 animate-fade-in text-center">
                <p className="text-[11px] text-indigo-300 leading-relaxed">
                  🔮 <strong>Cần Kích Hoạt Luận Giải AI</strong>: Bản báo cáo 29 mục Thần Số Học chuyên sâu được biên soạn đồng điệu duy nhất bởi Trí tuệ nhân tạo Gemini.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const formElement = document.getElementById('input-name') || document.querySelector('form');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth' });
                      const aiBtn = document.getElementById('btn-ai-calc');
                      if (aiBtn) {
                        aiBtn.classList.add('animate-bounce');
                        setTimeout(() => {
                          aiBtn.classList.remove('animate-bounce');
                        }, 3000);
                      }
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold font-display cursor-pointer transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Cuộn Lên Đầu Trang & Kích Hoạt Chạy AI</span>
                </button>
              </div>
            )}
          </div>

          {/* AI INTERPRETATION CARD (IF POPULATED) */}
          {aiInterpretation && (
            <div className="glass-card hover:translate-y-0 rounded-2xl p-6 space-y-4">
              <h4 className="font-display text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                Cốt Tủy Định Mệnh (Tóm Lược)
              </h4>
              
              <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                <div>
                  <h5 className="font-bold text-slate-200 mb-1 text-[11px]">Đường đời ({data.lifePath}):</h5>
                  <p className="p-2.5 bg-black/20 rounded-xl border border-white/5 text-[11px] text-slate-350">{aiInterpretation.lifePathInterpretation}</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-1 text-[11px]">Sứ mệnh ({data.destiny}):</h5>
                  <p className="p-2.5 bg-black/20 rounded-xl border border-white/5 text-[11px] text-slate-350">{aiInterpretation.destinyInterpretation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* DETAILED 29-POINT NUMEROLOGY ANALYSIS */}
      {aiInterpretation && showDetailed && (
        <div id="numerology-detailed-analysis" className="glass-card rounded-2xl p-6 md:p-8 space-y-6 hover:translate-y-0 relative overflow-hidden transition-all border-purple-900/10 animate-fade-in">
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-purple-500/5 to-transparent pointer-events-none rounded-full blur-3xl" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-5 gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple-400 text-xs font-mono uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                Duy Nhất & Độc Bản
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-100 flex items-center gap-2">
                Đại Sư Luận Giải Thần Số Học Chi Tiết
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Trọn bộ 29 phần giải đoán sâu sắc theo đề cương hoàng gia, tích hợp năng lượng âm dương.
              </p>
            </div>
          </div>

          {/* TABS SELECTOR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { id: 'A', name: 'A. TỔNG QUAN VẬN SỐ', icon: Compass, color: 'text-amber-400 border-amber-500/20 active:bg-amber-950/20' },
              { id: 'B', name: 'B. PHÂN TÍCH ĐƯỜNG ĐỜI', icon: BookOpen, color: 'text-purple-400 border-purple-500/20 active:bg-purple-950/20' },
              { id: 'C', name: 'C. PHÂN TÍCH SỐ MỆNH', icon: Award, color: 'text-indigo-400 border-indigo-500/20 active:bg-indigo-950/20' },
              { id: 'D', name: 'D. PHÂN TÍCH NĂNG LỰC', icon: Activity, color: 'text-teal-400 border-teal-500/20 active:bg-teal-950/20' }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activePartTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`btn-numerology-tab-${tab.id}`}
                  type="button"
                  onClick={() => setActivePartTab(tab.id as 'A' | 'B' | 'C' | 'D')}
                  className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl border font-display text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/5 border-white/20 text-slate-100 shadow-md shadow-white/5 text-purple-400'
                      : 'bg-black/20 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <TabIcon className={`w-4 h-4 ${isActive ? 'text-purple-400 scale-110' : 'text-slate-500'} transition-transform`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* TAB WINDOW CONTENT */}
          <div className="bg-black/40 rounded-2xl border border-white/5 p-6 min-h-[300px] relative">
            {activePartTab === 'A' && (
              <div className="space-y-4 animate-fade-in">
                {aiInterpretation.partA_Overview ? (
                  <div className="markdown-body">
                    <Markdown
                      components={{
                        h1: ({ children }) => <h1 className="text-lg font-bold text-amber-400 mt-4 mb-2 font-display uppercase tracking-wide border-b border-white/10 pb-1">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-semibold text-purple-300 mt-4 mb-2 font-display">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold text-indigo-300 mt-3 mb-1 font-display">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-xs font-bold text-teal-300 mt-2 mb-1">{children}</h4>,
                        p: ({ children }) => <p className="text-xs text-slate-300 leading-relaxed mb-3">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-2 text-xs text-slate-350">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-2 text-xs text-slate-350">{children}</ol>,
                        li: ({ children }) => <li className="text-xs text-slate-300">{children}</li>,
                        blockquote: ({ children }) => <blockquote className="border-l-3 border-purple-500 pl-3 italic text-xs my-3 text-slate-400 bg-purple-950/20 py-1.5 rounded-r-md">{children}</blockquote>,
                        strong: ({ children }) => <strong className="font-bold text-amber-200">{children}</strong>,
                      }}
                    >
                      {aiInterpretation.partA_Overview}
                    </Markdown>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs italic">
                    Chưa có luận giải Phần A. Hãy chỉnh sửa thông tin hoặc bấm nút Luận Giải với AI ở đầu trang.
                  </div>
                )}
              </div>
            )}

            {activePartTab === 'B' && (
              <div className="space-y-4 animate-fade-in">
                {aiInterpretation.partB_LifePath ? (
                  <div className="markdown-body">
                    <Markdown
                      components={{
                        h1: ({ children }) => <h1 className="text-lg font-bold text-amber-400 mt-4 mb-2 font-display uppercase tracking-wide border-b border-white/10 pb-1">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-semibold text-purple-300 mt-4 mb-2 font-display">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold text-indigo-300 mt-3 mb-1 font-display">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-xs font-bold text-teal-300 mt-2 mb-1">{children}</h4>,
                        p: ({ children }) => <p className="text-xs text-slate-300 leading-relaxed mb-3">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-2 text-xs text-slate-350">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-2 text-xs text-slate-350">{children}</ol>,
                        li: ({ children }) => <li className="text-xs text-slate-300">{children}</li>,
                        blockquote: ({ children }) => <blockquote className="border-l-3 border-purple-500 pl-3 italic text-xs my-3 text-slate-400 bg-purple-950/20 py-1.5 rounded-r-md">{children}</blockquote>,
                        strong: ({ children }) => <strong className="font-bold text-amber-200">{children}</strong>,
                      }}
                    >
                      {aiInterpretation.partB_LifePath}
                    </Markdown>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs italic">
                    Chưa có luận giải Phần B. Hãy chỉnh sửa thông tin hoặc bấm nút Luận Giải với AI ở đầu trang.
                  </div>
                )}
              </div>
            )}

            {activePartTab === 'C' && (
              <div className="space-y-4 animate-fade-in">
                {aiInterpretation.partC_Destiny ? (
                  <div className="markdown-body">
                    <Markdown
                      components={{
                        h1: ({ children }) => <h1 className="text-lg font-bold text-amber-400 mt-4 mb-2 font-display uppercase tracking-wide border-b border-white/10 pb-1">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-semibold text-purple-300 mt-4 mb-2 font-display">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold text-indigo-300 mt-3 mb-1 font-display">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-xs font-bold text-teal-300 mt-2 mb-1">{children}</h4>,
                        p: ({ children }) => <p className="text-xs text-slate-300 leading-relaxed mb-3">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-2 text-xs text-slate-350">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-2 text-xs text-slate-350">{children}</ol>,
                        li: ({ children }) => <li className="text-xs text-slate-300">{children}</li>,
                        blockquote: ({ children }) => <blockquote className="border-l-3 border-purple-500 pl-3 italic text-xs my-3 text-slate-400 bg-purple-950/20 py-1.5 rounded-r-md">{children}</blockquote>,
                        strong: ({ children }) => <strong className="font-bold text-amber-200">{children}</strong>,
                      }}
                    >
                      {aiInterpretation.partC_Destiny}
                    </Markdown>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs italic">
                    Chưa có luận giải Phần C. Hãy chỉnh sửa thông tin hoặc bấm nút Luận Giải với AI ở đầu trang.
                  </div>
                )}
              </div>
            )}

            {activePartTab === 'D' && (
              <div className="space-y-4 animate-fade-in">
                {aiInterpretation.partD_Ability ? (
                  <div className="markdown-body">
                    <Markdown
                      components={{
                        h1: ({ children }) => <h1 className="text-lg font-bold text-amber-400 mt-4 mb-2 font-display uppercase tracking-wide border-b border-white/10 pb-1">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-semibold text-purple-300 mt-4 mb-2 font-display">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold text-indigo-300 mt-3 mb-1 font-display">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-xs font-bold text-teal-300 mt-2 mb-1">{children}</h4>,
                        p: ({ children }) => <p className="text-xs text-slate-300 leading-relaxed mb-3">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-2 text-xs text-slate-350">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-2 text-xs text-slate-350">{children}</ol>,
                        li: ({ children }) => <li className="text-xs text-slate-300">{children}</li>,
                        blockquote: ({ children }) => <blockquote className="border-l-3 border-purple-500 pl-3 italic text-xs my-3 text-slate-400 bg-purple-950/20 py-1.5 rounded-r-md">{children}</blockquote>,
                        strong: ({ children }) => <strong className="font-bold text-amber-200">{children}</strong>,
                      }}
                    >
                      {aiInterpretation.partD_Ability}
                    </Markdown>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs italic">
                    Chưa có luận giải Phần D. Hãy chỉnh sửa thông tin hoặc bấm nút Luận Giải với AI ở đầu trang.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
