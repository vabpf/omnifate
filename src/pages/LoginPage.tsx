import { Sparkles, Layers, Compass, Award, Activity, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { AuthForm } from '../features/auth';

const pillars = [
  { title: 'Thần Số Học', icon: <Layers className="w-5 h-5 text-purple-400" />, desc: 'Giải toán 29 chỉ số cốt tủy: Đường đời, sứ mệnh, khát khao linh hồn, nợ nghiệp và bài học lớn.', bg: 'from-purple-950/40 to-indigo-950/10 border-purple-500/10' },
  { title: 'Chiêm Tinh Học', icon: <Compass className="w-5 h-5 text-indigo-400" />, desc: 'Bản Đồ Sao hoàng đạo Tây Phương xác lập vị trí cung mọc, mặt trăng, mặt trời chiếu mệnh.', bg: 'from-indigo-950/40 to-blue-950/10 border-indigo-500/10' },
  { title: 'Lá Số Tử Vi', icon: <Award className="w-5 h-5 text-amber-400" />, desc: 'Đông phương lý số an bài 14 chính tinh và thần sát linh diệu trên sơ đồ 12 cung bản mệnh.', bg: 'from-amber-950/30 to-slate-950/10 border-amber-500/10' },
  { title: 'Bát Tự Ngũ Hành', icon: <Activity className="w-5 h-5 text-teal-400" />, desc: 'Tính toán biểu đồ ngũ hành Kim - Thủy - Mộc - Hỏa - Thổ tìm khuyết âm và hỷ dụng thần.', bg: 'from-teal-950/30 to-emerald-950/10 border-teal-500/10' },
  { title: 'Thiết Kế Nhân Dạng', icon: <FileText className="w-5 h-5 text-rose-400" />, desc: 'Phác thảo bản đồ Bodygraph định tính loại hình, thẩm quyền nội tại và chiến lược tương tác.', bg: 'from-rose-950/30 to-red-950/10 border-rose-500/10' },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen text-slate-100 flex flex-col relative overflow-hidden bg-[#050614]">
      <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[70%] h-[70%] bg-indigo-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[45%] h-[45%] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

      <header className="border-b border-white/5 bg-white/2 backdrop-blur-md sticky top-0 z-40 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="font-display text-lg font-bold text-slate-100">Ω</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-slate-100 tracking-wide">OmniFate</h1>
              <p className="text-[10px] text-indigo-300 font-mono tracking-widest uppercase">Cổng Huyền Học Toàn Diện</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 rounded-full px-3 py-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Hệ thống trực tuyến
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-500/20 rounded-full text-xs font-mono text-purple-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /><span>Hợp Nhất Tri Thức Mệnh Lý Đông - Tây</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
              Thấu Suốt Thiên Mệnh<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-400 to-indigo-400">Kiến Tạo Hành Trình</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">Trải nghiệm ứng dụng tối thượng tích hợp 5 hệ thống huyền học cổ truyền và hiện đại. Nhận bản báo cáo Thần số học 29 mục chuyên sâu cùng sự đồng hành của Trí tuệ nhân tạo Gemini.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0 text-left">
            {pillars.map((pillar, i) => (
              <motion.div key={pillar.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`p-4 rounded-xl border bg-gradient-to-b ${pillar.bg} transition-all duration-300 hover:border-white/10 hover:scale-[1.01]`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded bg-white/5 border border-white/5">{pillar.icon}</div>
                  <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-display">{pillar.title}</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl border border-purple-500/20 p-6 md:p-8 relative overflow-hidden shadow-2xl bg-[#0c0d24]/90 backdrop-blur-xl"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-sm" />
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-bold font-display uppercase tracking-wider text-white">Cổng Đồng Bộ Thiên Mệnh</h2>
                <p className="text-[11px] text-slate-400 font-mono uppercase tracking-widest">Lưu trữ hồ sơ cá nhân bảo mật</p>
              </div>
              <AuthForm />
              <div className="text-center text-[11px] text-slate-400">Bằng việc tham gia, bạn đồng ý với việc lưu trữ hồ sơ cá nhân bảo mật.</div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-6 bg-black/20 text-center select-none text-[10px] font-mono text-slate-500 tracking-wider">
        © {new Date().getFullYear()} OMNIFATE INC. TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.
      </footer>
    </div>
  );
}
