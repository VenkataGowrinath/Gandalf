import type { Group } from '../types';

interface GroupHeaderProps {
  group: Group;
  isGroupDropdownOpen: boolean;
  onToggleGroupDropdown: () => void;
}

export function GroupHeader({
  group,
  isGroupDropdownOpen,
  onToggleGroupDropdown,
}: GroupHeaderProps) {
  return (
    <div className="safe-top absolute left-0 right-0 z-10 px-4 pt-2 pb-2">
      <div className="glass glass-border flex items-center justify-between rounded-2xl px-4 py-3 shadow-soft">
        <button
          type="button"
          onClick={onToggleGroupDropdown}
          className="flex flex-1 items-center gap-3 text-left transition-opacity active:opacity-80"
          aria-expanded={isGroupDropdownOpen}
          aria-haspopup="listbox"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-pink-100 text-violet-600">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Group</p>
            <p className="truncate text-base font-bold text-slate-800">
              {group.name}
            </p>
          </div>
          <svg
            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${isGroupDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <img
          src={group.currentUser.avatar}
          alt=""
          className="ml-2 h-10 w-10 shrink-0 rounded-xl object-cover ring-2 ring-emerald-400/80 shadow-md"
        />
      </div>
    </div>
  );
}
