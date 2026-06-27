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
    return <LoadingSpinner text={loadingText} accentColor="purple" />;
  }

  if (error) {
    return <ErrorBlock message={error} onRetry={onGenerate} retryText={`Thử Lại Luận Giải Phần ${partId}`} />;
  }

  if (content) {
    return (
      <div className="space-y-4">
        <MarkdownRenderer content={content} theme="purple" />
        <div className="flex justify-end pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={onGenerate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300 cursor-pointer border border-white/10 transition-all"
          >
            <RefreshCw className="w-3 h-3 text-purple-400" />
            <span>Khởi Chạy Luận Giải Lại Phần {partId}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-purple-500/5 border border-purple-500/20 flex items-center justify-center text-purple-400">
        <Icon className="w-6 h-6" />
      </div>
      <div className="max-w-md space-y-1">
        <h5 className="text-xs font-bold text-slate-200">{title}</h5>
        <p className="text-[11px] text-slate-400 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        onClick={onGenerate}
        className="inline-flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white text-xs font-bold font-display rounded-xl tracking-wide shadow-lg shadow-purple-900/30 transition-all active:scale-95 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>KÍCH HOẠT LUẬN GIẢI PHẦN {partId} (AI)</span>
      </button>
    </div>
  );
}
