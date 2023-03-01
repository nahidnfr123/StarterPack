import type {
  NotificationListItemAppearance,
  NotificationListItemType,
} from '@/components/notification/notification.enum'

interface NotificationDismiss {
  automatically: boolean;
  manually: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationListItemType;
  showIcon: boolean;
  dismiss: NotificationDismiss;
  duration: number;
  showDurationProgress: boolean;
  appearance: NotificationListItemAppearance;
}
