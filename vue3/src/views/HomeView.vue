<script setup lang="ts">
import Hero from "@/components/home/Hero.vue";
import {useNotificationStore} from "@/components/notification/notification.store";

const {setNotification} = useNotificationStore()

function trigger() {
  setNotification({
    "type": "info",
    "message": 'Hello',
    "showIcon": true,
    "dismiss": {
      "manually": true,
      "automatically": true
    },
    "duration": 3000,
    "showDurationProgress": true,
    "appearance": "light"
  })
}
</script>

<template>
  <main>
    <Hero/>

    <div class="text-center">
      <button class="bg-pink-400 text-white rounded-lg p-3 px-5" @click="trigger">Toast</button>
    </div>
  </main>
</template>


