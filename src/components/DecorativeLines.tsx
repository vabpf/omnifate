interface DecorativeLinesProps {
  className?: string;
  color?: string;
}

export default function DecorativeLines({ className = '', color = 'rgba(255,255,255,0.12)' }: DecorativeLinesProps) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute pointer-events-none ${className}`}
    >
      <path
        d="M-50 350 C100 300, 200 100, 400 200 S600 350, 850 150"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.6"
        className="animate-flow-line"
        strokeDasharray="8 12"
      />
      <path
        d="M-30 320 C120 270, 250 80, 430 180 S620 320, 870 130"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.4"
        className="animate-flow-line"
        strokeDasharray="6 14"
        style={{ animationDelay: '2s' }}
      />
      <path
        d="M-70 380 C80 330, 180 120, 380 220 S580 380, 830 170"
        stroke={color}
        strokeWidth="0.6"
        strokeOpacity="0.3"
        className="animate-flow-line"
        strokeDasharray="4 16"
        style={{ animationDelay: '4s' }}
      />
      <path
        d="M-10 290 C140 240, 280 60, 460 160 S640 290, 890 110"
        stroke={color}
        strokeWidth="0.5"
        strokeOpacity="0.25"
        className="animate-flow-line"
        strokeDasharray="10 18"
        style={{ animationDelay: '6s' }}
      />
    </svg>
  );
}
