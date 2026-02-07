import { Card, CardBody, Avatar, Button } from '@heroui/react';
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
    <Card
      className="w-full border border-default-200/50 bg-gradient-to-r from-primary-50/90 to-default-50/90 backdrop-blur-xl"
      shadow="sm"
      role="alert"
    >
      <CardBody className="flex-row items-center gap-3 px-4 py-3">
        <Avatar
          src={fromMember.avatar}
          name={fromMember.name}
          className="h-11 w-11 shrink-0"
          showFallback
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-default-800">{message}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button color="primary" size="sm" onPress={onRespond}>
            Respond
          </Button>
          <Button variant="bordered" size="sm" onPress={onDismiss}>
            Dismiss
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
