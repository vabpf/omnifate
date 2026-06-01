import { useState, useEffect, useRef } from 'react';
import FormInput from './components/FormInput';
import NumerologyViewer from './components/NumerologyViewer';
import AstrologyViewer from './components/AstrologyViewer';
import TuViViewer from './components/TuViViewer';
import BattuViewer from './components/BattuViewer';
import HumanDesignViewer from './components/HumanDesignViewer';
import {
  UserProfile,
  FateAnalysisReport,
  NumerologyData,
  AstrologyData,
  TuViPalace,
  BattuData,
  HumanDesignData
} from './types';
import {
  computeNumerology,
  computeAstrology,
  computeTuVi,
  computeBattu,
  computeHumanDesign
} from './utils/computation';
import {
  Sparkles,
  Award,
  BookOpen,
  Compass,
  Layers,
  Activity,
  FileText,
  Printer,
  ChevronRight,
  RefreshCw,
  Moon,
  Info
} from 'lucide-react';

const LOADING_MESSAGES = [
  'Đang hội tụ linh khí phương vị và khởi chạy vòng quy đổi tú tinh...',
  'Quy chiếu dương lịch vạn niên sang can chi âm lịch cổ truyền...',
  'Sắp đặt vị trí các ngôi sao Hoàng đạo Tây phương trên vòng bản đồ sao...',
  'An bài 14 chính tinh và thần sát linh địa lá số Tử Vi 12 cung...',
  'Phép tính Bát Tự định vị hỷ kỵ thần ngũ hành năng lượng...',
  'Đang kết hoạt luân xa và lập định bodygraph Thiết Kế Nhân Dạng...',
  'Đại sư trí tuệ nhân tạo Gemini đang gầy dựng và khâu kết lời phán...'
];

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'numerology' | 'astrology' | 'tuvi' | 'battu' | 'hd'>('overview');
  
  // Computations States
  const [numData, setNumData] = useState<NumerologyData | null>(null);
  const [astData, setAstData] = useState<AstrologyData | null>(null);
  const [tuviData, setTuviData] = useState<TuViPalace[] | null>(null);
  const [battuData, setBattuData] = useState<BattuData | null>(null);
  const [hdData, setHdData] = useState<HumanDesignData | null>(null);

  // AI service States
  const [aiReport, setAiReport] = useState<FateAnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Load sample profile on startup so they see a beautiful preloaded dashboard instantly
  useEffect(() => {
    const initialProfile: UserProfile = {
      name: 'Khánh An',
      dob: '1995-11-05',
      time: '14:30',
      place: 'Hà Nội',
      gender: 'Nam'
    };
    handleRecalculate(initialProfile);
  }, []);

  // Set up cyclic updates for loading screen phrases
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleRecalculate = (p: UserProfile) => {
    // Standard deterministic calculations
    const n = computeNumerology(p.name, p.dob);
    const a = computeAstrology(p.dob, p.time);
    const t = computeTuVi(p.dob, p.time, p.gender);
    const b = computeBattu(p.dob, p.time);
    const h = computeHumanDesign(p.dob, p.time);

    setProfile(p);
    setNumData(n);
    setAstData(a);
    setTuviData(t);
    setBattuData(b);
    setHdData(h);
  };

  const handleStartAnalysis = async (userProfile: UserProfile, runAi: boolean) => {
    setErrorText(null);
    handleRecalculate(userProfile);

    if (!runAi) {
      setAiReport(null);
      setActiveTab('numerology'); // Switch from welcome directly to numeric data
      return;
    }

    setIsLoading(true);
    setLoadingMsgIdx(0);

    try {
      const response = await fetch('/api/fate-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Server error computing fate report.');
      }

      const data = await response.json();
      setAiReport(data);
      setActiveTab('overview');
    } catch (e: any) {
      console.error(e);
      setErrorText(e.message || 'Không thể liên lạc với Đại sư vũ trụ lúc này. Vui lòng kiểm tra API Key và thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Background celestial cosmic glowing blobs */}
      <div className="absolute top-[-5%] left-[-10%] w-[55%] h-[55%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[55%] h-[55%] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[25%] right-[5%] w-[35%] h-[35%] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />

      {/* HEADER BAR */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-40 navbar-container select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="font-display text-lg font-bold text-slate-100 font-bold">Ω</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-slate-100 tracking-wide">OmniFate</h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Cổng Huyền Học Toàn Diện</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {profile && (
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs glass-pill rounded-full px-3 py-1 text-slate-350">
                👤 Đang tra cứu: <strong className="text-slate-100">{profile.name}</strong>
              </span>
            )}
            <button
              id="btn-print-dossier"
              onClick={handlePrint}
              disabled={!profile}
              className="px-3 py-1.5 text-xs glass-btn rounded-lg text-slate-300 font-medium flex items-center gap-1.5 transition disabled:opacity-40"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">In Báo Cáo (PDF)</span>
            </button>
          </div>
        </div>
      </header>

      {/* LOADING OVERLAY SCREEN */}
      {isLoading && (
        <div className="fixed inset-0 bg-[#0a0b1e]/85 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-6 select-none animate-fade-in border border-white/5">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping" />
            <div className="absolute inset-0 rounded-full border-t-4 border-indigo-400 border-r-4 border-r-transparent animate-spin" />
            <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
            </div>
          </div>
          
          <div className="max-w-md text-center space-y-3">
            <h3 className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400">
              Khởi Tạo Bản Đồ Thiên Mệnh
            </h3>
            
            {/* Cyclic Rotating comforting messages */}
            <p className="text-sm text-slate-300 min-h-[40px] font-medium leading-relaxed italic animate-pulse-slow">
              "{LOADING_MESSAGES[loadingMsgIdx]}"
            </p>
            
            <p className="text-xs text-slate-400">
              Tiến trình tính toán tích hợp sẽ hoàn tất trong giây lát...
            </p>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative">
        
        {/* Error notification prompt */}
        {errorText && (
          <div className="bg-rose-950/20 backdrop-blur-md border border-rose-800/50 rounded-2xl p-4 flex items-start gap-3 text-sm text-rose-300 shadow-lg">
            <div className="p-1 rounded-lg bg-rose-900/40 border border-rose-800/30">
              <Info className="w-5 h-5 text-rose-400" />
            </div>
            <div className="flex-1">
              <h5 className="font-bold">Gặp Trở Ngại Khi Liên Kết Đại Sư</h5>
              <p className="text-xs text-rose-350 mt-1">{errorText}</p>
            </div>
            <button onClick={() => setErrorText(null)} className="text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer">Đóng</button>
          </div>
        )}

        {/* INPUT AND PROFILE MANAGER MODULE */}
        <section className="print:hidden">
          <FormInput onSubmit={handleStartAnalysis} isLoading={isLoading} />
        </section>

        {/* OUTPUTS TAB PANELS */}
        {profile && numData && astData && tuviData && battuData && hdData && (
          <section className="space-y-6 print:hidden">
            {/* Tab navigation list with active visual lines */}
            <div className="flex border-b border-white/5 overflow-x-auto scroller-hidden gap-1.5 pb-1">
              <button
                id="tab-overview"
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 text-xs font-display font-medium tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer rounded-t-xl ${
                  activeTab === 'overview'
                    ? 'border-indigo-400 text-indigo-300 bg-white/5 font-bold shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-105 hover:bg-white/2'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Báo Cáo Đại Sư</span>
                {aiReport && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
              </button>

              <button
                id="tab-numerology"
                onClick={() => setActiveTab('numerology')}
                className={`py-3 px-4 text-xs font-display font-medium tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer rounded-t-xl ${
                  activeTab === 'numerology'
                    ? 'border-indigo-400 text-indigo-300 bg-white/5 font-bold shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-105 hover:bg-white/2'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thần Số Học</span>
              </button>

              <button
                id="tab-astrology"
                onClick={() => setActiveTab('astrology')}
                className={`py-3 px-4 text-xs font-display font-medium tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer rounded-t-xl ${
                  activeTab === 'astrology'
                    ? 'border-indigo-400 text-indigo-300 bg-white/5 font-bold shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-105 hover:bg-white/2'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Chiêm Tinh (Bản Đồ Sao)</span>
              </button>

              <button
                id="tab-tuvi"
                onClick={() => setActiveTab('tuvi')}
                className={`py-3 px-4 text-xs font-display font-medium tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer rounded-t-xl ${
                  activeTab === 'tuvi'
                    ? 'border-indigo-400 text-indigo-300 bg-white/5 font-bold shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-105 hover:bg-white/2'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Lá Số Tử Vi</span>
              </button>

              <button
                id="tab-battu"
                onClick={() => setActiveTab('battu')}
                className={`py-3 px-4 text-xs font-display font-medium tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer rounded-t-xl ${
                  activeTab === 'battu'
                    ? 'border-indigo-400 text-indigo-300 bg-white/5 font-bold shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-105 hover:bg-white/2'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Bát Tự Ngũ Hành</span>
              </button>

              <button
                id="tab-hd"
                onClick={() => setActiveTab('hd')}
                className={`py-3 px-4 text-xs font-display font-medium tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer rounded-t-xl ${
                  activeTab === 'hd'
                    ? 'border-indigo-400 text-indigo-300 bg-white/5 font-bold shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-105 hover:bg-white/2'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Thiết Kế Nhân Dạng</span>
              </button>
            </div>

            {/* TAB CONTAINER SCREEN */}
            <div className="glass-container p-6 rounded-2xl min-h-[420px]">
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fade-in">
                  {/* Master Intro welcome / overview sheet */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* General spiritual overview card */}
                    <div className="lg:col-span-2 glass-card rounded-2xl p-6 relative overflow-hidden space-y-4 hover:translate-y-0">
                      <div className="space-y-1">
                        <span className="text-[10px] text-amber-400 font-mono tracking-widest block uppercase">BỨC THƯ TỔNG HỢP MỆNH TÀI</span>
                        <h3 className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-350">
                          Giao Thoa Bản Mệnh Đông - Tây
                        </h3>
                      </div>

                      {aiReport ? (
                        <div className="text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
                          {aiReport.overview}
                        </div>
                      ) : (
                        <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                          <p>
                            Bạn chưa kích hoạt phân hệ <strong>Huyền học Đại sư luận soạn</strong>. Ở chế độ xem nhanh này, dĩ vãng sẽ được phác thảo qua việc phân tách riêng lẻ từng bộ môn trong các tab tương ứng (Thần số học, Bản đồ sao, Tử Vi, Bát tự, v.v.).
                          </p>
                          <p>
                            Để có thể bóc tách sâu sự đối ẩm bản mệnh giao thoa giữa phương Đông (Tứ trụ, Ngũ hành, sao Tử Vi) và phương Tây (Luân xa Human design, Cung Hoàng đạo, Thần số tích cực), hãy nhấp vào nút <strong>"Khởi chạy vạn năng Đại sư"</strong> trong biểu mẫu gửi dữ liệu.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Remediation factors panel */}
                    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:translate-y-0">
                      <div>
                        <h4 className="font-display text-base font-bold text-amber-400 mb-4 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          Tổng Bản Cải Vận Trợ Mệnh
                        </h4>

                        {aiReport && aiReport.remediation ? (
                          <div className="space-y-4 text-xs leading-relaxed">
                            <div>
                              <span className="text-slate-400 font-mono uppercase block text-[9px]">Sắc màu trợ mệnh:</span>
                              <p className="text-slate-205 mt-1 font-bold p-2 bg-black/40 border border-white/5 rounded-lg">{aiReport.remediation.colors}</p>
                            </div>
                            <div>
                              <span className="text-slate-400 font-mono uppercase block text-[9px]">Tần số con số cát tinh:</span>
                              <p className="text-slate-205 mt-1 font-bold p-2 bg-black/40 border border-white/5 rounded-lg">{aiReport.remediation.numbers}</p>
                            </div>
                            <div>
                              <span className="text-slate-400 font-mono uppercase block text-[9px]">Triết lý cốt tủy tu thân:</span>
                              <p className="text-slate-300 mt-1 p-2 bg-black/40 border border-white/5 rounded-lg italic">"{aiReport.remediation.mindsetShift}"</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                            <p>
                              Đại sư cần liên kết thần thức để gầy dựng bảng cải vận riêng biệt. Dưới đây là khuyến nghị chung theo can ngày và cung mộc:
                            </p>
                            <div className="p-3 bg-black/25 border border-white/5 rounded-xl space-y-2">
                              <div>☘️ <strong>Màu sắc cát hanh:</strong> Xanh ngọc, Tía, Lam vũ.</div>
                              <div>🔢 <strong>Hộ mệnh tinh tế:</strong> Số {numData.lifePath}, Số {numData.destiny}.</div>
                              <div>🧘 <strong>Tâm niệm:</strong> "Thân tĩnh khí hòa, vạn sự thịnh vượng tự sinh tự an."</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Forecast elements below */}
                      <div className="mt-6 pt-4 border-t border-white/10">
                        {aiReport && aiReport.yearlyForecast ? (
                          <div className="space-y-3">
                            <span className="text-[9px] text-slate-400 font-mono uppercase block">Dự báo năm 2026 Bính Ngọ:</span>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                              {aiReport.yearlyForecast.outlook}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-[10px] mt-1">
                              <div className="p-1.5 bg-emerald-950/20 text-emerald-305 border border-emerald-900/30 rounded">
                                📈 Cơ hội: {aiReport.yearlyForecast.opportunities.substring(0, 40)}...
                              </div>
                              <div className="p-1.5 bg-rose-950/20 text-rose-300 border border-rose-900/30 rounded">
                                ⚠️ Thách thức: {aiReport.yearlyForecast.challenges.substring(0, 40)}...
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 italic bg-black/20 p-2.5 rounded text-center border border-white/5 font-sans">
                            Đang ở Chế độ xem biểu đồ bản mệnh nhanh. Hãy kích hoạt xem AI luận giải để mở phân hệ Dự báo cát hung tinh tế năm 2026.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'numerology' && (
                <NumerologyViewer data={numData} aiInterpretation={aiReport?.numerology} />
              )}

              {activeTab === 'astrology' && (
                <AstrologyViewer data={astData} aiInterpretation={aiReport?.astrology} />
              )}

              {activeTab === 'tuvi' && (
                <TuViViewer
                  palaces={tuviData}
                  userName={profile.name}
                  gender={profile.gender}
                  dob={profile.dob}
                  time={profile.time}
                  bornPlace={profile.place}
                  aiInterpretation={aiReport?.tuvi}
                />
              )}

              {activeTab === 'battu' && (
                <BattuViewer data={battuData} aiInterpretation={aiReport?.battu} />
              )}

              {activeTab === 'hd' && (
                <HumanDesignViewer data={hdData} aiInterpretation={aiReport?.humanDesign} />
              )}
            </div>
          </section>
        )}

        {/* PRINT LAYOUT DOSSIER SUMMARY CONTAINER (ONLY ACTIVATES WHEN PRINTING PROCESS OCCURS) */}
        {profile && numData && astData && tuviData && battuData && hdData && (
          <div className="hidden print:block space-y-12 text-slate-950 font-sans p-6 text-xs max-w-4xl mx-auto printable-dossier select-none">
            
            {/* Front covers parchment header */}
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

            {/* OVERVIEW SEGMENT */}
            <div className="space-y-3 break-inside-avoid">
              <h2 className="text-lg font-display font-bold border-b border-slate-900 pb-1">1. LỜI GIAO THOA BẢN MỆNH ĐẠI SƯ</h2>
              <p className="leading-relaxed whitespace-pre-wrap">
                {aiReport ? aiReport.overview : 'Thế mây bay tỏ, vầng dương chiếu rọi. Thân chủ sở hữu tinh tú sinh vận vẹn toàn, cần điều hòa năng lượng thông linh.'}
              </p>
            </div>

            {/* NUMEROLOGY SEGMENT */}
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

            {/* WESTERN ASTROLOGY */}
            <div className="space-y-4 break-inside-avoid shadow-sm">
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

            {/* THE TỬ VI BOARD DETAILS */}
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

            {/* THE BÁT TỰ */}
            <div className="space-y-4 break-inside-avoid">
              <h2 className="text-lg font-display font-bold border-b border-slate-900 pb-1">5. TỨ TRỤ BÁT TỰ & NGŨ HÀNH</h2>
              <div className="grid grid-cols-4 gap-2 bg-slate-100 p-3 rounded border text-center font-mono">
                <div>NĂM: {battuData.pillars.year}</div>
                <div>THÁNG: {battuData.pillars.month}</div>
                <div>NGÀY: {battuData.pillars.day}</div>
                <div>GIỜ: {battuData.pillars.hour}</div>
              </div>
              <p className="font-sans">
                <strong>Chủ Nhật Nguyên:</strong> {battuData.dayMaster} Element.
              </p>
              {aiReport?.battu && (
                <div className="space-y-2 leading-relaxed">
                  <p><strong>Dụng Thần / Hỷ thần bổ khuyết Ngũ hành khí:</strong> {aiReport.battu.favourableElements}</p>
                  <p><strong>Lời khuyện mấu chốt cải cải hành tinh cát tường:</strong> {aiReport.battu.advice}</p>
                </div>
              )}
            </div>

            {/* HUMAN DESIGN BODYGRAPH SUMMARY */}
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

            {/* TAOIST / REMEDIATION ELEMENTS */}
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
        )}

      </main>

      {/* FOOTER BAR */}
      <footer className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-md mt-auto py-6 relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-1.5 font-mono">
          <p>© 2026-2027 OmniFate Portal. Tất cả công cụ được tối ưu cho sự thấu hiểu tâm lý và định hướng tích cực.</p>
          <p className="text-[10px] text-slate-600 uppercase">Hài Hòa Đông Tây • Thấu Suốt Thiên Cơ • Khởi Tạo Hào Quang</p>
        </div>
      </footer>
    </div>
  );
}
