export default function WaterFlowAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-24 h-24">
        {/* Water drops animation */}
        <svg className="absolute inset-0 animate-pulse" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#1E88E5" strokeWidth="2">
            {/* Wave effect */}
            <path d="M 10 50 Q 15 40 20 50 T 40 50" className="animate-pulse" opacity="0.8" />
            <path d="M 50 50 Q 55 40 60 50 T 80 50" className="animate-pulse" opacity="0.6" />
            <path d="M 10 60 Q 15 50 20 60 T 40 60" className="animate-pulse" opacity="0.4" />
          </g>
        </svg>

        {/* Animated water droplets */}
        <style>{`
          @keyframes drop-fall {
            0% {
              transform: translateY(-20px);
              opacity: 1;
            }
            100% {
              transform: translateY(40px);
              opacity: 0;
            }
          }
          .drop-1 { animation: drop-fall 2s infinite ease-in; }
          .drop-2 { animation: drop-fall 2s infinite ease-in 0.4s; }
          .drop-3 { animation: drop-fall 2s infinite ease-in 0.8s; }
        `}</style>

        <div className="drop-1 absolute top-0 left-1/4 text-2xl">💧</div>
        <div className="drop-2 absolute top-0 left-1/2 text-2xl">💧</div>
        <div className="drop-3 absolute top-0 right-1/4 text-2xl">💧</div>
      </div>

      <p className="mt-6 text-blue-600 font-semibold text-center">NEREUS is analyzing your data...</p>
    </div>
  )
}
