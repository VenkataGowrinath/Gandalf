import { useState, useCallback } from 'react';
import { MapView } from './components/MapView';
import { GroupHeader } from './components/GroupHeader';
import { BottomCTAs } from './components/BottomCTAs';
import { AIChatbox } from './components/AIChatbox';
import { NotificationBanner } from './components/NotificationBanner';
import { mockGroups } from './data/mockGroups';
import type { IncomingNotification } from './types';
import './index.css';

// Demo: after user sends a message and AI replies, we simulate "friend interacted with your proxy" after 2.5s.
const NOTIFICATION_DELAY_MS = 2500;

function App() {
  const [currentGroupId, setCurrentGroupId] = useState(mockGroups[0].id);
  const [chatOpen, setChatOpen] = useState(false);
  const [notifications, setNotifications] = useState<IncomingNotification[]>([]);
  const [replyContext, setReplyContext] = useState<{
    memberId: string;
    intent: import('./types').IntentOption;
  } | null>(null);

  const currentGroup =
    mockGroups.find((g) => g.id === currentGroupId) ?? mockGroups[0];

  const addNotification = useCallback((n: IncomingNotification) => {
    setNotifications((prev) => [...prev, n]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleRespondToNotification = useCallback(
    (notification: IncomingNotification) => {
      setReplyContext({
        memberId: notification.fromMember.id,
        intent: notification.intent ?? 'Safety Status',
      });
      dismissNotification(notification.id);
      setChatOpen(true);
    },
    [dismissNotification]
  );

  const handleAfterReply = useCallback(
    (member: import('./types').CommunityMember) => {
      window.setTimeout(() => {
        addNotification({
          id: `notif-${Date.now()}`,
          fromMember: member,
          message: `${member.name} responded to your proxy and wants to know if you're free for help.`,
          timestamp: new Date(),
          intent: 'Assistance Feasibility',
        });
      }, NOTIFICATION_DELAY_MS);
    },
    [addNotification]
  );

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-gradient-to-b from-gandalf-surface via-white to-gandalf-cream">
      {/* iPhone-style status bar (cosmetic) */}
      <div className="safe-top absolute left-0 right-0 z-[5] flex items-center justify-between px-6 py-2 text-sm font-semibold text-slate-700">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-slate-600">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414z" clipRule="evenodd" />
          </svg>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M3.5 17a.5.5 0 01.5-.5h12a.5.5 0 010 1H4a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h12a.5.5 0 010 1H4a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h12a.5.5 0 010 1H4a.5.5 0 01-.5-.5z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Map card with trendy shadow and rounded corners */}
      <div className="absolute left-3 right-3 top-24 bottom-24 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/[0.04]">
        <MapView group={currentGroup} />
      </div>

      {/* Group selector header */}
      <GroupHeader
        groups={mockGroups}
        currentGroup={currentGroup}
        onSelectGroup={setCurrentGroupId}
      />

      {/* Incoming proxy interaction notification (Flow 3) */}
      {notifications.length > 0 && (
        <div className="safe-top absolute left-0 right-0 top-20 z-[15] px-3">
          <NotificationBanner
            notification={notifications[notifications.length - 1]}
            onRespond={() =>
              handleRespondToNotification(notifications[notifications.length - 1])
            }
            onDismiss={() =>
              dismissNotification(notifications[notifications.length - 1].id)
            }
          />
        </div>
      )}

      {/* Bottom CTAs */}
      <BottomCTAs
        onAIClick={() => {
          setReplyContext(null);
          setChatOpen(true);
        }}
        onNavigateClick={() => {
          // MVP: placeholder — could open directions or bottom sheet
          console.log('Navigate tapped');
        }}
      />

      {/* AI chatbox overlay */}
      <AIChatbox
        group={currentGroup}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        initialMemberId={replyContext?.memberId}
        initialIntent={replyContext?.intent}
        onAfterReply={handleAfterReply}
      />
    </div>
  );
}

export default App;
