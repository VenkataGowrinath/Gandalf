import { useState, useRef, useEffect } from 'react';
import type {
  Group,
  CommunityMember,
  IntentOption,
  ChatMessage,
} from '../types';

const INTENT_OPTIONS: IntentOption[] = [
  'Safety Status',
  'Route Deviation',
  'Timing Anomaly',
  'Assistance Feasibility',
];

function getMockAIResponse(
  intent: IntentOption,
  member: CommunityMember,
  userMessage: string
): string {
  const name = member.name;
  if (intent === 'Safety Status') {
    if (member.status.type === 'moving')
      return `${name} is currently on the move. Last update: "${(member.status as { text: string }).text}". Route is well-lit with moderate footfall. No anomalies reported.`;
    return `${name} is stationary. Location is in a well-lit area with a police station within 1.2 km. Safety score: Good.`;
  }
  if (intent === 'Route Deviation') {
    return `${name}'s route is on track with no significant deviations. ETA to destination unchanged.`;
  }
  if (intent === 'Timing Anomaly') {
    return `No timing anomalies for ${name}. Movement pattern is consistent with usual commute.`;
  }
  if (intent === 'Assistance Feasibility') {
    return `You are within assistance range of ${name}. Estimated time to reach: ~8 min. You can provide quick assistance if needed.`;
  }
  if (userMessage.trim())
    return `Understood. Regarding ${name} and "${intent}": I've noted your question. In a full version, the proxy would share more context from ${name}'s trip.`;
  return `Here’s the contextual status for ${name} (${intent}). Anything else you’d like to know?`;
}

interface AIChatboxProps {
  group: Group;
  isOpen: boolean;
  onClose: () => void;
  initialMemberId?: string;
  initialIntent?: IntentOption;
  onAfterReply?: (member: CommunityMember) => void;
}

export function AIChatbox({
  group,
  isOpen,
  onClose,
  initialMemberId,
  initialIntent,
  onAfterReply,
}: AIChatboxProps) {
  const [selectedIntent, setSelectedIntent] = useState<IntentOption | null>(
    'Safety Status'
  );
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(
    null
  );
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const members = group.members;

  useEffect(() => {
    if (isOpen) {
      const member = initialMemberId
        ? members.find((m) => m.id === initialMemberId) ?? members[0]
        : members[0];
      setSelectedMember(member ?? null);
      setSelectedIntent(initialIntent ?? 'Safety Status');
      inputRef.current?.focus();
    }
  }, [isOpen, group.id, initialMemberId, initialIntent, members]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const intent = selectedIntent ?? 'Safety Status';
    const member = selectedMember ?? members[0];
    if (!member) return;

    const text =
      inputValue.trim() ||
      `Tell me about ${intent} of ${member.name}`.toLowerCase();
    setInputValue('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const reply = getMockAIResponse(intent, member, text);
    const assistantMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: reply,
      timestamp: new Date(),
    };
    setTimeout(() => {
      setMessages((prev) => [...prev, assistantMsg]);
      onAfterReply?.(member);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="safe-bottom absolute inset-x-0 bottom-0 z-30 flex max-h-[70vh] flex-col rounded-t-3xl border-t border-slate-200/80 bg-white/95 shadow-[0_-8px_32px_rgba(139,92,246,0.08)] backdrop-blur-xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        aria-label="Close"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Tell me about the current
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          {INTENT_OPTIONS.map((intent) => (
            <button
              key={intent}
              type="button"
              onClick={() => setSelectedIntent(intent)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                selectedIntent === intent
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md'
                  : 'border border-dashed border-slate-200 bg-slate-50/80 text-slate-600 hover:border-violet-200 hover:bg-violet-50/50'
              }`}
            >
              {intent}
            </button>
          ))}
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">of</p>
        <div className="relative mb-4">
          <button
            type="button"
            onClick={() => setMemberDropdownOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-violet-200 hover:bg-violet-50/30"
          >
            <span className="flex items-center gap-2">
              {selectedMember ? (
                <>
                  <img
                    src={selectedMember.avatar}
                    alt=""
                    className="h-7 w-7 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                  {selectedMember.name}
                </>
              ) : (
                'Select User'
              )}
            </span>
            <svg
              className={`h-4 w-4 text-slate-400 transition duration-200 ${memberDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {memberDropdownOpen && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-soft">
              {members.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedMember(m);
                    setMemberDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition hover:bg-violet-50/50"
                >
                  <img src={m.avatar} alt="" className="h-8 w-8 rounded-lg object-cover ring-1 ring-slate-100" />
                  {m.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <div className="space-y-3 border-t border-slate-100 pt-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div
        className="safe-bottom relative flex items-center gap-2 border-t border-slate-100 px-4 py-3"
        style={{
          background: 'linear-gradient(to top, rgba(253,242,248,0.6) 0%, rgba(255,255,255,0.95) 100%)',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="I want to know more about..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 shadow-sm focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-200"
        />
        <button
          type="button"
          onClick={handleSend}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-500 text-white shadow-md transition hover:opacity-95 active:scale-95"
          aria-label="Send"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2z" />
            <path d="M19 14L19.8 16.2L22 17L19.8 17.8L19 20L18.2 17.8L16 17L18.2 16.2L19 14z" />
            <path d="M5 4L5.6 5.6L7.2 6.2L5.6 6.8L5 8.4L4.4 6.8L2.8 6.2L4.4 5.6L5 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
