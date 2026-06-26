interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export default function ErrorState({
  message,
  onRetry,
  retryText = 'Thử Lại',
  className = '',
}: ErrorStateProps) {
  return (
    <div className={`text-center py-12 space-y-3 ${className}`}>
      <p className="text-xs text-rose-400">Gặp sự cố: {message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 bg-rose-950/40 border border-rose-800/30 text-rose-300 rounded-xl text-xs hover:bg-rose-900/40 transition-all cursor-pointer"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
