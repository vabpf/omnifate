import { LucideIcon, Sparkles, RefreshCw } from 'lucide-react';
import { MarkdownRenderer } from '../../ui';
import { LoadingSpinner } from '../../ui';
import { ErrorBlock } from '../../ui';

interface PartTabPanelProps {
  partId: 'A' | 'B' | 'C' | 'D';
  title: string;
  description: string;
  loadingText: string;
  icon: LucideIcon;
  isLoading: boolean;
  error: string | null;
  content: string | null;
  onGenerate: () => void;
}

export default function PartTabPanel({
  partId, title, description, loadingText, icon: Icon,
  isLoading, error, content, onGenerate,
}: PartTabPanelProps) {
  if (isLoading) {
    return <LoadingSpinner text={loadingText} accentColor="amber" />;
  }

  if (error) {
    return <ErrorBlock message={error} onRetry={onGenerate} retryText={`Thử Lại Luận Giải Phần ${partId}`} />;
  }

  if (content) {
    return (
      <div className="space-y-4">
        <MarkdownRenderer content={content} theme="amber" />
        <div className="flex justify-end pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={onGenerate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-white/60 cursor-pointer border border-white/10 transition-all"
          >
            <RefreshCw className="w-3 h-3 text-warm-amber" />
            <span>Khởi Chạy Luận Giải Lại Phần {partId}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-warm-amber/5 border border-warm-amber/20 flex items-center justify-center text-warm-amber">
        <Icon className="w-6 h-6" />
      </div>
      <div className="max-w-md space-y-1">
        <h5 className="text-xs font-bold text-white/80">{title}</h5>
        <p className="text-[11px] text-white/40 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        onClick={onGenerate}
        className="inline-flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-warm-amber to-warm-teal hover:from-warm-amber hover:to-warm-teal text-white text-xs font-bold font-display rounded-xl tracking-wide shadow-lg shadow-warm-amber/30 transition-all active:scale-95 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>KÍCH HOẠT LUẬN GIẢI PHẦN {partId} (AI)</span>
      </button>
    </div>
  );
}
