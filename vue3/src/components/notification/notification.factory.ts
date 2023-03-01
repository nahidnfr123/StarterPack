import type {Notification} from '@/components/notification/notification.interface'
import {
  NotificationListItemAppearance,
  NotificationListItemType,
} from '@/components/notification/notification.enum'
import {DEFAULT_NOTIFICATION_DURATION} from '@/components/notification/notification.constant'

export const defaultNotification = (): Notification => ({
  id: `${Date.now()}`,
  title: '' || NotificationListItemType.Info,
  message: '',
  type: NotificationListItemType.Info,
  showIcon: true,
  dismiss: {
    automatically: true,
    manually: true,
  },
  duration: DEFAULT_NOTIFICATION_DURATION,
  showDurationProgress: true,
  appearance: NotificationListItemAppearance.Light,
})
