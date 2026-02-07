import { Button } from '@heroui/react';

interface BottomCTAsProps {
  onAIClick: () => void;
  onNavigateClick: () => void;
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2z" />
      <path d="M19 14L19.8 16.2L22 17L19.8 17.8L19 20L18.2 17.8L16 17L18.2 16.2L19 14z" />
      <path d="M5 4L5.6 5.6L7.2 6.2L5.6 6.8L5 8.4L4.4 6.8L2.8 6.2L4.4 5.6L5 4z" />
    </svg>
  );
}

export function BottomCTAs({ onAIClick, onNavigateClick }: BottomCTAsProps) {
  return (
    <div className="safe-bottom absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-4 px-4 pb-6 pt-2">
      <Button
        isIconOnly
        variant="flat"
        className="h-12 w-12 rounded-2xl bg-white/80 shadow-soft backdrop-blur-xl border border-white/50"
        onPress={onNavigateClick}
        aria-label="Navigate"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </Button>
      <Button
        isIconOnly
        className="h-14 w-14 rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-glow"
        onPress={onAIClick}
        aria-label="Open AI assistant"
      >
        <SparkleIcon className="h-7 w-7 drop-shadow-sm" />
      </Button>
    </div>
  );
}
