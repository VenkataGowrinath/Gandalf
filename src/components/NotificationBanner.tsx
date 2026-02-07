import type { IncomingNotification } from '../types';

interface NotificationBannerProps {
  notification: IncomingNotification;
  onRespond: () => void;
  onDismiss: () => void;
}

export function NotificationBanner({
  notification,
  onRespond,
  onDismiss,
}: NotificationBannerProps) {
  const { fromMember, message } = notification;

  return (
    <div
      className="glass glass-border flex w-full items-center gap-3 rounded-2xl px-4 py-3 shadow-soft"
      style={{
        background: 'linear-gradient(135deg, rgba(253,242,248,0.9) 0%, rgba(255,255,255,0.85) 50%, rgba(245,243,255,0.9) 100%)',
      }}
      role="alert"
    >
      <img
        src={fromMember.avatar}
        alt=""
        className="h-11 w-11 shrink-0 rounded-xl object-cover ring-2 ring-white/80 shadow-md"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-slate-800">{message}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onRespond}
          className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 active:scale-[0.98]"
        >
          Respond
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-xl border border-slate-200 bg-white/90 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
