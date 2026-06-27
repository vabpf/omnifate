import Markdown from 'react-markdown';

export type MarkdownTheme = 'amber' | 'teal' | 'pink' | 'rose' | 'emerald' | 'slate';

interface MarkdownRendererProps {
  content: string;
  theme?: MarkdownTheme;
  className?: string;
}

const themeStyles: Record<MarkdownTheme, {
  h1: string; h2: string; h3: string; h4: string;
  strong: string; blockquote: string; link: string;
}> = {
  amber: {
    h1: 'text-warm-amber border-warm-amber/20',
    h2: 'text-warm-amber', h3: 'text-warm-sand', h4: 'text-warm-sand',
    strong: 'text-warm-amber font-bold',
    blockquote: 'border-warm-amber/40 bg-warm-amber/5 text-warm-sand/90',
    link: 'text-warm-amber hover:text-warm-sand',
  },
  teal: {
    h1: 'text-teal-400 border-teal-500/20',
    h2: 'text-teal-300', h3: 'text-teal-200', h4: 'text-teal-350',
    strong: 'text-teal-200 font-bold',
    blockquote: 'border-teal-500 bg-teal-950/10 text-teal-200/90',
    link: 'text-teal-400 hover:text-teal-350',
  },
  pink: {
    h1: 'text-pink-400 border-pink-500/20',
    h2: 'text-pink-300', h3: 'text-pink-200', h4: 'text-pink-350',
    strong: 'text-pink-200 font-bold',
    blockquote: 'border-pink-500 bg-pink-950/10 text-pink-200/90',
    link: 'text-pink-400 hover:text-pink-350',
  },
  rose: {
    h1: 'text-rose-400 border-rose-500/20',
    h2: 'text-rose-300', h3: 'text-rose-200', h4: 'text-rose-350',
    strong: 'text-rose-200 font-bold',
    blockquote: 'border-rose-500 bg-rose-950/10 text-rose-200/90',
    link: 'text-rose-400 hover:text-rose-350',
  },
  emerald: {
    h1: 'text-emerald-400 border-emerald-500/20',
    h2: 'text-emerald-300', h3: 'text-emerald-200', h4: 'text-emerald-350',
    strong: 'text-emerald-200 font-bold',
    blockquote: 'border-emerald-500 bg-emerald-950/10 text-emerald-200/90',
    link: 'text-emerald-400 hover:text-emerald-350',
  },
  slate: {
    h1: 'text-white/60 border-white/10',
    h2: 'text-white/50', h3: 'text-white/50', h4: 'text-white/50',
    strong: 'text-white font-bold',
    blockquote: 'border-white/10 bg-white/5 text-white/60',
    link: 'text-warm-amber hover:text-warm-sand',
  }
};

export default function MarkdownRenderer({ content, theme = 'amber', className = '' }: MarkdownRendererProps) {
  const style = themeStyles[theme] || themeStyles.amber;

  const components = {
    h1: ({ children }: any) => (
      <h1 className={`text-sm font-bold mt-4 mb-2 font-display uppercase tracking-wider border-b pb-1 ${style.h1}`}>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className={`text-xs font-bold mt-3.5 mb-1.5 font-display uppercase tracking-wide ${style.h2}`}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className={`text-[11px] font-bold mt-3 mb-1 font-mono uppercase ${style.h3}`}>{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className={`text-[10px] font-bold mt-2 mb-1 uppercase ${style.h4}`}>{children}</h4>
    ),
    p: ({ children }: any) => (
      <p className="text-xs text-white/60 leading-relaxed mb-2.5">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc pl-4 space-y-1 my-2 text-xs text-white/60">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal pl-4 space-y-1 my-2 text-xs text-white/60">{children}</ol>
    ),
    li: ({ children }: any) => (
      <li className="text-xs text-white/60 leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className={`border-l-2 pl-3 italic text-xs my-3 py-1.5 rounded-r-md ${style.blockquote}`}>{children}</blockquote>
    ),
    strong: ({ children }: any) => (
      <strong className={style.strong}>{children}</strong>
    ),
    a: ({ children, href }: any) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`underline cursor-pointer ${style.link}`}>{children}</a>
    ),
  };

  return (
    <div className={`markdown-body ${className}`}>
      <Markdown components={components}>{content}</Markdown>
    </div>
  );
}
