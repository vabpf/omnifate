import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
          <div className="glass-card max-w-md w-full p-8 text-center space-y-4">
            <div className="text-5xl">🔮</div>
            <h2 className="font-display text-xl font-bold text-warm-amber">Có Lỗi Xảy Ra</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Đã xảy ra sự cố không mong muốn. Vui lòng tải lại trang hoặc thử lại sau.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-warm-amber to-warm-teal text-white text-xs font-bold font-display rounded-xl tracking-wide shadow-lg shadow-warm-amber/30 transition-all active:scale-95 cursor-pointer hover:opacity-90"
            >
              Tải Lại Trang
            </button>
            {this.state.error && (
              <details className="text-left mt-4">
                <summary className="text-[10px] text-white/30 cursor-pointer font-mono">Chi tiết lỗi</summary>
                <pre className="mt-2 text-[10px] text-rose-400/60 font-mono whitespace-pre-wrap break-all bg-black/40 p-3 rounded-lg border border-white/5 max-h-32 overflow-y-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
