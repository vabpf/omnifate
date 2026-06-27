import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, X, Layers, Compass, Award, Activity, FileText,
  Sparkles, Star, Quote,
} from 'lucide-react';
import { AuthForm } from '../features/auth';
import DecorativeLines from '../components/DecorativeLines';
import ArchWindow from '../components/ArchWindow';

const features = [
  {
    title: 'Thần Số Học',
    icon: <Layers className="w-5 h-5" />,
    desc: 'Giải toán 29 chỉ số cốt tủy: Đường đời, sứ mệnh, khát khao linh hồn, nợ nghiệp và bài học lớn. Khám phá ý nghĩa từng con số trong biểu đồ ngày sinh.',
    bg: 'from-amber-950/40 to-warm-teal/10',
    border: 'border-amber-500/10',
    iconColor: 'text-amber-400',
  },
  {
    title: 'Chiêm Tinh Học',
    icon: <Compass className="w-5 h-5" />,
    desc: 'Bản đồ sao hoàng đạo Tây Phương xác lập vị trí cung Mọc, Mặt Trăng, Mặt Trời chiếu mệnh và các góc chiếu chính trong lá số cá nhân.',
    bg: 'from-indigo-950/40 to-warm-teal/10',
    border: 'border-indigo-500/10',
    iconColor: 'text-indigo-400',
  },
  {
    title: 'Tử Vi Đông Phương',
    icon: <Award className="w-5 h-5" />,
    desc: 'An bài 14 chính tinh và các thần sát linh diệu trên sơ đồ 12 cung bản mệnh. Luận giải chi tiết về cá tính, sự nghiệp, tài lộc và tình duyên.',
    bg: 'from-amber-950/30 to-black/20',
    border: 'border-amber-500/10',
    iconColor: 'text-amber-400',
  },
  {
    title: 'Bát Tự Ngũ Hành',
    icon: <Activity className="w-5 h-5" />,
    desc: 'Tính toán biểu đồ ngũ hành Kim - Thủy - Mộc - Hỏa - Thổ từ giờ sinh. Xác định Dụng thần, Hỷ thần và Kỵ thần để cải vận hiệu quả.',
    bg: 'from-teal-950/30 to-black/20',
    border: 'border-teal-500/10',
    iconColor: 'text-teal-400',
  },
  {
    title: 'Human Design',
    icon: <FileText className="w-5 h-5" />,
    desc: 'Phác thảo bản đồ BodyGraph xác định Loại năng lượng, Thẩm quyền nội tại và Chiến lược tương tác tối ưu với cuộc đời.',
    bg: 'from-rose-950/30 to-black/20',
    border: 'border-rose-500/10',
    iconColor: 'text-rose-400',
  },
  {
    title: 'AI Tổng Hợp',
    icon: <Sparkles className="w-5 h-5" />,
    desc: 'Gemini AI tổng hợp và đan xen tất cả hệ thống, đưa ra nhận định toàn diện, sâu sắc và mang tính xây dựng cho từng cá nhân.',
    bg: 'from-warm-amber/20 to-warm-teal/20',
    border: 'border-warm-amber/20',
    iconColor: 'text-warm-amber',
  },
];

const feedbacks = [
  {
    name: 'Minh Anh',
    role: 'Designer, 28 tuổi',
    text: 'Chưa từng nghĩ Thần số học và Tử vi có thể kết hợp sâu đến vậy. Bản luận giải chi tiết từng phần khiến mình nhìn lại cuộc đời rõ ràng hơn.',
    avatar: 'MA',
    gradient: 'from-amber-500 to-warm-teal',
  },
  {
    name: 'Quốc Bảo',
    role: 'Kỹ sư phần mềm, 32 tuổi',
    text: 'Cách AI tổng hợp 5 hệ thống lại với nhau cho ra một bức tranh toàn cảnh thật sự ấn tượng. Phần Human Design và Bát Tự khớp đến bất ngờ.',
    avatar: 'QB',
    gradient: 'from-warm-teal to-warm-amber',
  },
  {
    name: 'Hương Ly',
    role: 'Giáo viên, 30 tuổi',
    text: 'Những lời khuyên về hướng nghiệp và cải vận từ báo cáo rất thực tế. Mình đã tìm được định hướng mới cho bản thân nhờ ứng dụng này.',
    avatar: 'HL',
    gradient: 'from-indigo-500 to-amber-500',
  },
];

const archImages = [
  { src: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop', alt: 'Cosmic starscape' },
  { src: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&h=600&fit=crop', alt: 'Moonlit clouds' },
  { src: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=600&fit=crop', alt: 'Sunset silhouette' },
];

export default function LoginPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 select-none transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/60 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-warm-amber to-warm-teal flex items-center justify-center">
              <span className="font-display text-base font-bold text-white">Ω</span>
            </div>
            <span className="font-display text-lg font-bold text-white tracking-wide">OmniFate</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans text-white/60">
            <a href="#about" className="hover:text-white transition-colors">Về OmniFate</a>
            <a href="#features" className="hover:text-white transition-colors">Tính Năng</a>
            <a href="#feedback" className="hover:text-white transition-colors">Phản Hồi</a>
          </nav>
        </div>
      </header>

      {/* HERO SPLIT LAYOUT */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 min-h-screen">

        {/* LEFT PANEL — Warm Gradient */}
        <div className="lg:col-span-8 relative warm-gradient-panel noise-overlay flex flex-col justify-center px-8 lg:px-16 py-24 lg:py-0">
          <DecorativeLines className="inset-0 w-full h-full opacity-60" color="rgba(255,255,255,0.15)" />

          <div className="relative z-10 max-w-xl">
            {/* Sparkle accents */}
            <div className="absolute -top-16 left-12 text-white/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="absolute -top-8 left-40 text-white/20">
              <Sparkles className="w-3 h-3" />
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              Thấu Suốt
              <br />
              <span className="italic">Thiên Mệnh</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
              Hợp nhất 5 hệ thống huyền học cổ truyền và hiện đại. Nhận bản báo cáo vận mệnh chuyên sâu với sự đồng hành của Trí tuệ nhân tạo.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => setShowAuth(true)}
              className="mt-8 inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/30 text-white text-sm font-sans font-medium hover:bg-white/10 hover:border-white/50 transition-all cursor-pointer group"
            >
              Bắt Đầu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Stats */}
            <div className="mt-12 flex items-center gap-8 text-white/50">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-warm-amber" />
                <span className="text-xs font-sans"><strong className="text-white/80">5</strong> hệ thống</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-warm-teal" />
                <span className="text-xs font-sans"><strong className="text-white/80">29</strong> chỉ số</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-warm-sand" />
                <span className="text-xs font-sans"><strong className="text-white/80">AI</strong> phân tích</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Dark with Arch Windows */}
        <div className="lg:col-span-4 relative bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 py-16 lg:py-0 px-6 lg:px-8">
          <DecorativeLines className="absolute inset-0 w-full h-full opacity-40" color="rgba(200,149,107,0.2)" />

          <div className="relative z-10 flex flex-row lg:flex-col items-center gap-4 w-full max-w-xs lg:max-w-none">
            <ArchWindow src={archImages[0].src} alt={archImages[0].alt} height="h-40 lg:h-48" className="w-28 lg:w-full flex-1 lg:flex-none" />
            <ArchWindow src={archImages[1].src} alt={archImages[1].alt} height="h-52 lg:h-64" className="w-28 lg:w-full flex-1 lg:flex-none" />
            <ArchWindow src={archImages[2].src} alt={archImages[2].alt} height="h-36 lg:h-44" className="w-28 lg:w-full flex-1 lg:flex-none" />
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="w-full py-28 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-amber/20 bg-warm-amber/5 text-xs font-sans text-warm-amber uppercase tracking-wider">
              <Star className="w-3.5 h-3.5" />
              Giới Thiệu
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Nơi Hội Tụ{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-amber to-warm-teal">
                Tinh Hoa Huyền Học
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl mx-auto">
              OmniFate là ứng dụng tiên phong hợp nhất 5 hệ thống mệnh lý Đông - Tây trên cùng một nền tảng,
              được nâng tầm bởi AI để mang đến cho bạn những luận giải sâu sắc, mang tính xây dựng và khai sáng.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              {[
                { number: '5', label: 'Hệ thống huyền học', icon: <Layers className="w-5 h-5" /> },
                { number: '29', label: 'Chỉ số thần số', icon: <Star className="w-5 h-5" /> },
                { number: 'AI', label: 'Phân tích thông minh', icon: <Sparkles className="w-5 h-5" /> },
              ].map((stat) => (
                <div key={stat.number} className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-warm-amber/20 to-warm-teal/20 border border-white/10 flex items-center justify-center text-warm-amber mb-3">
                    {stat.icon}
                  </div>
                  <div className="font-display text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="w-full py-28 px-6 lg:px-10 bg-white/[0.015] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-teal/20 bg-warm-teal/5 text-xs font-sans text-warm-teal uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Tính Năng
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Khám Phá{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-teal to-warm-amber">
                5 Hệ Thống Huyền Học
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`rounded-2xl p-6 bg-gradient-to-b ${feat.bg} border ${feat.border} hover:border-white/20 transition-all group`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${feat.iconColor} mb-4 group-hover:scale-110 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setShowAuth(true)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-sans font-medium hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-warm-amber" />
              Trải Nghiệm Ngay
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section id="feedback" className="w-full py-28 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-xs font-sans text-amber-400 uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5" />
              Phản Hồi
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Người Dùng{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-warm-teal">
                Nói Gì
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedbacks.map((fb, i) => (
              <motion.div
                key={fb.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 relative"
              >
                <Quote className="w-6 h-6 text-white/10 absolute top-4 right-4" />
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${fb.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                    {fb.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{fb.name}</div>
                    <div className="text-[11px] text-white/40">{fb.role}</div>
                  </div>
                </div>
                <p className="text-xs text-white/60 leading-relaxed italic">"{fb.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-6 text-center select-none text-[10px] font-sans text-white/20 tracking-wider">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-warm-amber to-warm-teal flex items-center justify-center">
              <span className="font-display text-xs font-bold text-white">Ω</span>
            </div>
            <span className="font-display text-sm font-bold text-white/30">OmniFate</span>
          </div>
          <p>© {new Date().getFullYear()} OMNIFATE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      {/* AUTH OVERLAY */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAuth(false)} />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md glass-card rounded-3xl p-8 md:p-10 bg-[#141210]/90 border-warm-amber/10"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-warm-amber/50 to-transparent blur-[1px]" />
              <button
                type="button"
                onClick={() => setShowAuth(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="text-center mb-6 space-y-1">
                <h2 className="font-display text-2xl font-bold text-white">Cổng Đồng Bộ Thiên Mệnh</h2>
                <p className="text-[11px] text-warm-muted font-sans uppercase tracking-widest">Lưu trữ hồ sơ cá nhân bảo mật</p>
              </div>
              <AuthForm onSuccess={() => setShowAuth(false)} />
              <div className="text-center text-[11px] text-white/30 mt-4">
                Bằng việc tham gia, bạn đồng ý với việc lưu trữ hồ sơ cá nhân bảo mật.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
