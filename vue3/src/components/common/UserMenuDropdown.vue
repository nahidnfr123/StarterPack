<template>
  <div>
    <Menu as="div" class="relative inline-block text-left">
      <div v-if="authStore.user">
        <MenuButton
            class="inline-flex w-full justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {{ authStore.user.name }}
          <Icon icon="fa6-solid:angle-down" class="ml-2 h-5 w-4"></Icon>
        </MenuButton>
      </div>

      <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-for="link in links" v-slot="{ active }">
              <RouterLink
                  :to="link.to"
                  :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <Icon v-if="link.icon" :icon="link.icon" size="26" class="mr-2"/>
                {{ link.label }}
              </RouterLink>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                  :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                  @click="logout()"
              >
                <Icon icon="mdi-light:logout" size="26" class="mr-2"/>
                Logout
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue'
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";
import {Icon} from "@iconify/vue";

const authStore = useAuthStore()

const links = [
  {to: '/profile', label: 'Profile', icon: 'mdi-light:account'},
]


const router = useRouter()

async function logout() {
  await authStore.logout()
  await router.push('/')
}
</script>
