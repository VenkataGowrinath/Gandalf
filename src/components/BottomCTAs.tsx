interface BottomCTAsProps {
  onAIClick: () => void;
  onNavigateClick: () => void;
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2z" />
      <path d="M19 14L19.8 16.2L22 17L19.8 17.8L19 20L18.2 17.8L16 17L18.2 16.2L19 14z" />
      <path d="M5 4L5.6 5.6L7.2 6.2L5.6 6.8L5 8.4L4.4 6.8L2.8 6.2L4.4 5.6L5 4z" />
    </svg>
  );
}

export function BottomCTAs({ onAIClick, onNavigateClick }: BottomCTAsProps) {
  return (
    <div className="safe-bottom absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-4 px-4 pb-6 pt-2">
      <button
        type="button"
        onClick={onNavigateClick}
        className="glass glass-border flex h-12 w-12 items-center justify-center rounded-2xl text-slate-600 shadow-soft transition hover:bg-white/90 active:scale-95"
        aria-label="Navigate"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onAIClick}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 text-white shadow-glow transition hover:shadow-[0_0_28px_-4px_rgba(236,72,153,0.45)] active:scale-95"
        aria-label="Open AI assistant"
      >
        <SparkleIcon className="h-7 w-7 drop-shadow-sm" />
      </button>
    </div>
  );
}
