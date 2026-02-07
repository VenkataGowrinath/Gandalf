import type { Group } from '../types';

interface GroupDropdownProps {
  groups: Group[];
  currentGroupId: string;
  onSelectGroup: (groupId: string) => void;
  onClose: () => void;
}

export function GroupDropdown({
  groups,
  currentGroupId,
  onSelectGroup,
  onClose,
}: GroupDropdownProps) {
  return (
    <div className="safe-top absolute left-0 right-0 z-20 px-4 pt-16">
      <div className="glass glass-border overflow-hidden rounded-2xl shadow-soft">
        <div className="py-1.5">
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                onSelectGroup(g.id);
                onClose();
              }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-violet-50/80 active:bg-violet-100/80 ${g.id === currentGroupId ? 'bg-gradient-to-r from-violet-50 to-pink-50 font-semibold text-slate-800' : 'text-slate-600'}`}
            >
              <span className="text-base">{g.name}</span>
              {g.id === currentGroupId && (
                <svg
                  className="ml-auto h-5 w-5 text-violet-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 -z-10 bg-slate-900/25 backdrop-blur-[2px]"
        aria-label="Close"
      />
    </div>
  );
}
