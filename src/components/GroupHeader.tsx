import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Avatar,
} from '@heroui/react';
import type { Group } from '../types';

interface GroupHeaderProps {
  groups: Group[];
  currentGroup: Group;
  onSelectGroup: (groupId: string) => void;
}

export function GroupHeader({
  groups,
  currentGroup,
  onSelectGroup,
}: GroupHeaderProps) {
  return (
    <div className="safe-top absolute left-0 right-0 z-10 px-4 pt-2 pb-2">
      <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/80 px-4 py-3 shadow-soft backdrop-blur-xl border border-white/50">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="light"
              className="flex flex-1 items-center gap-3 data-[hover]:bg-white/60"
              startContent={
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary">
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
              }
              endContent={
                <svg
                  className="h-5 w-5 text-default-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              }
            >
              <div className="min-w-0 flex-1 text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-default-500">Current Group</p>
                <p className="truncate text-base font-bold text-default-800">{currentGroup.name}</p>
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Select group"
            selectedKeys={[currentGroup.id]}
            selectionMode="single"
            onSelectionChange={(keys) => {
              const key = Array.from(keys as Set<string>)[0];
              if (key != null) onSelectGroup(key);
            }}
          >
            <DropdownSection>
              {groups.map((g) => (
                <DropdownItem key={g.id} textValue={g.name}>
                  {g.name}
                </DropdownItem>
              ))}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        <Avatar
          src={currentGroup.currentUser.avatar}
          name={currentGroup.currentUser.name}
          className="h-10 w-10 shrink-0 ring-2 ring-success-400/80"
          showFallback
        />
      </div>
    </div>
  );
}
