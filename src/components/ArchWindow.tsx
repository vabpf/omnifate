interface ArchWindowProps {
  src: string;
  alt: string;
  className?: string;
  height?: string;
}

export default function ArchWindow({ src, alt, className = '', height = 'h-64' }: ArchWindowProps) {
  return (
    <div className={`arch-image ${height} ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
