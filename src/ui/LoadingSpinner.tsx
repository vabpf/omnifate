import { Sparkles } from 'lucide-react';

export type AccentColor = 'amber' | 'teal' | 'pink' | 'rose' | 'emerald' | 'slate';

interface LoadingSpinnerProps {
  text: string;
  accentColor?: AccentColor;
  isFullScreen?: boolean;
  subtext?: string;
  title?: string;
}

const colorMap: Record<AccentColor, { ping: string; spin: string; text: string; gradient: string; sparkle: string }> = {
  amber:   { ping: 'border-warm-amber/20', spin: 'border-t-warm-amber', text: 'text-warm-amber', gradient: 'from-warm-amber to-warm-teal', sparkle: 'text-warm-amber' },
  teal:    { ping: 'border-warm-teal/20',  spin: 'border-t-warm-teal',  text: 'text-warm-teal',  gradient: 'from-warm-teal to-warm-amber', sparkle: 'text-warm-teal' },
  pink:    { ping: 'border-pink-500/10',   spin: 'border-t-pink-400',   text: 'text-pink-300',   gradient: 'from-pink-600 to-rose-600', sparkle: 'text-pink-300' },
  rose:    { ping: 'border-rose-500/10',   spin: 'border-t-rose-400',   text: 'text-rose-300',   gradient: 'from-rose-600 to-pink-600', sparkle: 'text-rose-300' },
  emerald: { ping: 'border-emerald-500/10', spin: 'border-t-emerald-400', text: 'text-emerald-300', gradient: 'from-emerald-600 to-teal-600', sparkle: 'text-emerald-300' },
  slate:   { ping: 'border-white/10',      spin: 'border-t-white/40',   text: 'text-white/50',   gradient: 'from-white/10 to-white/5', sparkle: 'text-white/50' },
};

export default function LoadingSpinner({
  text, accentColor = 'amber', isFullScreen = false, subtext, title,
}: LoadingSpinnerProps) {
  const colors = colorMap[accentColor] || colorMap.amber;

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a]/90 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-6 select-none animate-fade-in border border-white/5">
        <div className="relative w-24 h-24 mb-8">
          <div className={`absolute inset-0 rounded-full border-4 animate-ping ${colors.ping.replace('/20', '/10')}`} />
          <div className={`absolute inset-0 rounded-full border-t-4 border-r-4 border-r-transparent animate-spin ${colors.spin}`} />
          <div className={`absolute inset-3 rounded-full bg-gradient-to-tr flex items-center justify-center shadow-lg shadow-warm-amber/30 ${colors.gradient}`}>
            <Sparkles className={`w-8 h-8 animate-pulse ${colors.sparkle}`} />
          </div>
        </div>
        <div className="max-w-md text-center space-y-3">
          {title && <h3 className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-warm-amber to-warm-teal">{title}</h3>}
          <p className="text-sm text-white/60 min-h-[40px] font-medium leading-relaxed italic">"{text}"</p>
          {subtext && <p className="text-xs text-white/40">{subtext}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="relative w-12 h-12">
        <div className={`absolute inset-0 rounded-full border-2 animate-ping ${colors.ping}`} />
        <div className={`absolute inset-0 rounded-full border-t-2 border-r-2 border-r-transparent animate-spin ${colors.spin}`} />
      </div>
      <p className={`text-[11px] font-sans tracking-widest uppercase animate-pulse text-center ${colors.text}`}>{text}</p>
    </div>
  );
}
