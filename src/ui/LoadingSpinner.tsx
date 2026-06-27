import { Sparkles } from 'lucide-react';

export type AccentColor = 'purple' | 'indigo' | 'amber' | 'pink' | 'teal' | 'rose' | 'emerald' | 'slate';

interface LoadingSpinnerProps {
  text: string;
  accentColor?: AccentColor;
  isFullScreen?: boolean;
  subtext?: string;
  title?: string;
}

const colorMap: Record<AccentColor, { ping: string; spin: string; text: string; gradient: string }> = {
  purple:  { ping: 'border-purple-500/10',  spin: 'border-t-purple-400',  text: 'text-purple-300',  gradient: 'from-purple-600 to-indigo-600' },
  indigo:  { ping: 'border-indigo-500/10',  spin: 'border-t-indigo-400',  text: 'text-indigo-300',  gradient: 'from-indigo-600 to-purple-600' },
  amber:   { ping: 'border-amber-500/10',   spin: 'border-t-amber-400',   text: 'text-amber-300',   gradient: 'from-amber-600 to-yellow-600' },
  pink:    { ping: 'border-pink-500/10',    spin: 'border-t-pink-400',    text: 'text-pink-300',    gradient: 'from-pink-600 to-rose-600' },
  teal:    { ping: 'border-teal-500/10',    spin: 'border-t-teal-400',    text: 'text-teal-300',    gradient: 'from-teal-600 to-emerald-600' },
  rose:    { ping: 'border-rose-500/10',    spin: 'border-t-rose-400',    text: 'text-rose-300',    gradient: 'from-rose-600 to-pink-600' },
  emerald: { ping: 'border-emerald-500/10', spin: 'border-t-emerald-400', text: 'text-emerald-300', gradient: 'from-emerald-600 to-teal-600' },
  slate:   { ping: 'border-slate-500/10',   spin: 'border-t-slate-400',   text: 'text-slate-300',   gradient: 'from-slate-600 to-slate-800' },
};

export default function LoadingSpinner({
  text, accentColor = 'purple', isFullScreen = false, subtext, title,
}: LoadingSpinnerProps) {
  const colors = colorMap[accentColor] || colorMap.purple;

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 bg-[#0a0b1e]/85 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-6 select-none animate-fade-in border border-white/5">
        <div className="relative w-24 h-24 mb-8">
          <div className={`absolute inset-0 rounded-full border-4 animate-ping ${colors.ping.replace('/10', '/20')}`} />
          <div className={`absolute inset-0 rounded-full border-t-4 border-r-4 border-r-transparent animate-spin ${colors.spin}`} />
          <div className={`absolute inset-3 rounded-full bg-gradient-to-tr flex items-center justify-center shadow-lg shadow-indigo-500/30 ${colors.gradient}`}>
            <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
          </div>
        </div>
        <div className="max-w-md text-center space-y-3">
          {title && <h3 className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400">{title}</h3>}
          <p className="text-sm text-slate-300 min-h-[40px] font-medium leading-relaxed italic animate-pulse-slow">"{text}"</p>
          {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
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
      <p className={`text-[11px] font-mono tracking-widest uppercase animate-pulse text-center ${colors.text}`}>{text}</p>
    </div>
  );
}
