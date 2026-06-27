import { Info } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="bg-rose-950/20 backdrop-blur-md border border-rose-800/50 rounded-2xl p-4 flex items-start gap-3 text-sm text-rose-300 shadow-lg">
      <div className="p-1 rounded-lg bg-rose-900/40 border border-rose-800/30">
        <Info className="w-5 h-5 text-rose-400" />
      </div>
      <div className="flex-1">
        <h5 className="font-bold">Gặp Trở Ngại Khi Liên Kết Đại Sư</h5>
        <p className="text-xs text-rose-350 mt-1">{message}</p>
      </div>
      <button onClick={onDismiss} className="text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer">Đóng</button>
    </div>
  );
}
