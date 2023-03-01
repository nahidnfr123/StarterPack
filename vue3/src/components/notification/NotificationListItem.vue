<template>
  <li
      :class="classList"
      class="notification-list-item"
      @click="dismissManually"
  >
    <div
        ref="tagRef"
        :style="animationDurationStyle"
        class="notification-list-item__tag"
    />
    <div class="notification-list-item__message">
      <h3 v-html="notification.title"/>
      <span v-html="notification.message"/>
    </div>
    <div class="notification-list-item__icon">
      <span
          v-if="notification.showIcon"
          v-html="icons[notification.type]"
      />
    </div>
  </li>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, ref,} from 'vue'
import type {Notification} from '@/components/notification/notification.interface'
import {
  NotificationListItemAppearance,
  NotificationListItemLayout,
  NotificationListItemType,
} from '@/components/notification/notification.enum'
import {useNotificationStore} from '@/components/notification/notification.store'
import {ICONS} from '@/components/notification/notification.constant'

export default defineComponent({
  name: 'NotificationListItem',
  props: {
    notification: {
      type: Object as PropType<Notification>,
      required: true,
    },
    layout: {
      type: String as PropType<NotificationListItemLayout>,
      default: NotificationListItemLayout.Left,
    },
  },
  setup(props) {
    const tagRef = ref<HTMLElement>()

    const {unsetNotification} = useNotificationStore()

    const notificationListItemType = computed(
        () => Object.values(NotificationListItemType).includes(props.notification.type)
            ? props.notification.type
            : NotificationListItemType.Info,
    )

    const notificationListItemLayout = computed(
        () => Object.values(NotificationListItemLayout).includes(props.layout)
            ? props.layout
            : NotificationListItemLayout.Left,
    )

    const notificationListItemAppearance = computed(
        () => Object.values(NotificationListItemAppearance).includes(props.notification.appearance)
            ? props.notification.appearance
            : NotificationListItemAppearance.Light,
    )

    const classList = computed(() => ({
      'notification-list-item--dismissible-manual': props.notification.dismiss.manually,
      'notification-list-item--dismissible-automatic': props.notification.dismiss.automatically && props.notification.showDurationProgress,
      [`notification-list-item--${notificationListItemType.value}`]: true,
      [`notification-list-item--${notificationListItemLayout.value}`]: true,
      [`notification-list-item--${notificationListItemAppearance.value}`]: true,
    }))

    const animationDurationStyle = ref({
      // duration - appear time - start delay - end delay
      animationDuration: `${props.notification.duration - 500 - 100}ms`,
    })

    const dismissManually = () => {
      if (!props.notification.dismiss.manually) return

      unsetNotification(props.notification.id)
    }

    const dismissAutomatically = () => {
      if (!props.notification.dismiss.automatically) return

      setTimeout(() => {
        unsetNotification(props.notification.id)
      }, props.notification.duration)
    }

    onMounted(() => {
      dismissAutomatically()
    })

    return {
      tagRef,
      classList,
      animationDurationStyle,
      icons: ICONS,
      dismissManually,
    }
  },
})
</script>

<style scoped>
.notification-list-item {
  position: relative;
  display: flex;
  margin: 8px;
  min-height: 74px;
  width: 100vw;
  max-width: 400px;
  border-radius: 4px;
  overflow: hidden;
}

.notification-list-item--light {
  background-color: #fcfcfc;
  border: 1px solid #eee;
  color: #333;
}

.notification-list-item--dark {
  background-color: #333;
  border: 1px solid #222;
  color: #eee;
}

.notification-list-item--glass {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.125);
  border-top-color: rgba(255, 255, 255, 0.25);
  border-left-color: rgba(255, 255, 255, 0.25);
  color: #eee;
}

.notification-list-item--dismissible-manual {
  cursor: pointer;
}

.notification-list-item__tag {
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 6px;
}

.notification-list-item--dismissible-automatic .notification-list-item__tag {
  animation-name: progress;
  animation-timing-function: linear;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
}

.notification-list-item__message {
  z-index: 1;
  flex: 1;
  padding: 12px 12px 12px 18px;
}

.notification-list-item__message h3 {
  font-size: 20px;
}

.notification-list-item__icon {
  position: absolute;
  bottom: -24px;
  opacity: 0.25;
  width: 80px;
}

.notification-list-item--glass .notification-list-item__icon {
  opacity: 0.5;
}

.notification-list-item--left {
  text-align: right;
}

.notification-list-item--left .notification-list-item__tag {
  right: 0;
}

.notification-list-item--left .notification-list-item__icon {
  left: -24px;
  transform: rotate(12deg);
}

.notification-list-item--right {
  text-align: left;
}

.notification-list-item--right .notification-list-item__icon {
  right: -24px;
  transform: rotate(-12deg);
}

.notification-list-item--success .notification-list-item__tag {
  background-color: #009800;
}

.notification-list-item--success .notification-list-item__icon {
  color: #009800;
}

.notification-list-item--alert .notification-list-item__tag {
  background-color: #ff3600;
}

.notification-list-item--alert .notification-list-item__icon {
  color: #ff3600;
}

.notification-list-item--warning .notification-list-item__tag {
  background-color: #ffa600;
}

.notification-list-item--warning .notification-list-item__icon {
  color: #ffa600;
}

.notification-list-item--info .notification-list-item__tag {
  background-color: #0088ff;
}

.notification-list-item--info .notification-list-item__icon {
  color: #0088ff;
}

@keyframes progress {
  0% {
    height: 100%;
    opacity: 1;
  }
  100% {
    height: 0;
    opacity: .5;
  }
}
</style>
