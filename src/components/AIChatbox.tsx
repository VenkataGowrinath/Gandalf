import { useState, useRef, useEffect } from 'react';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
} from '@heroui/react';
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
  return `Here's the contextual status for ${name} (${intent}). Anything else you'd like to know?`;
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
  const [selectedMemberKey, setSelectedMemberKey] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const members = group.members;
  const selectedMember =
    members.find((m) => m.id === selectedMemberKey) ?? members[0] ?? null;

  useEffect(() => {
    if (isOpen) {
      const key = initialMemberId ?? members[0]?.id ?? null;
      setSelectedMemberKey(key);
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
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      {/* Bottom sheet - AI Chat */}
      <div
        className="safe-bottom fixed inset-x-0 bottom-0 z-50 flex max-h-[70vh] flex-col rounded-t-3xl border-t border-default-200 bg-white shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
        role="dialog"
        aria-label="AI assistant chat"
      >
        <div className="flex items-center justify-between border-b border-default-100 px-4 py-3">
          <p className="text-sm font-semibold text-default-700">Ask about a friend</p>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={onClose}
            aria-label="Close"
            className="text-default-500"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-default-500">
            Tell me about the current
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {INTENT_OPTIONS.map((intent) => (
              <Chip
                key={intent}
                variant={selectedIntent === intent ? 'solid' : 'bordered'}
                color={selectedIntent === intent ? 'secondary' : 'default'}
                className="cursor-pointer"
                onClick={() => setSelectedIntent(intent)}
              >
                {intent}
              </Chip>
            ))}
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-default-500">
            of
          </p>
          <Select
            label="Select friend"
            placeholder="Select User"
            selectedKeys={selectedMemberKey ? [selectedMemberKey] : []}
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0];
              setSelectedMemberKey(key != null ? String(key) : null);
            }}
            items={members}
            renderValue={(_items) => {
              const m = selectedMember;
              if (!m) return null;
              return (
                <div className="flex items-center gap-2">
                  <img
                    src={m.avatar}
                    alt=""
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  {m.name}
                </div>
              );
            }}
            className="mb-4"
          >
            {(m) => (
              <SelectItem key={m.id} textValue={m.name}>
                <div className="flex items-center gap-2">
                  <img
                    src={m.avatar}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  {m.name}
                </div>
              </SelectItem>
            )}
          </Select>

          {messages.length > 0 && (
            <div className="space-y-3 border-t border-default-100 pt-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-default-100 text-default-800'
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

        <div className="safe-bottom flex items-center gap-2 border-t border-default-100 bg-default-50/50 px-4 py-3">
          <Input
            ref={inputRef}
            classNames={{ input: 'text-sm' }}
            placeholder="I want to know more about..."
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button color="secondary" isIconOnly onPress={handleSend} aria-label="Send">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2z" />
              <path d="M19 14L19.8 16.2L22 17L19.8 17.8L19 20L18.2 17.8L16 17L18.2 16.2L19 14z" />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
}
