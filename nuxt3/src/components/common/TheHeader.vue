<template>
  <Popover class="relative bg-white bg-opacity-80 z-50">
    <!-- Web View Navigation Bar -->
    <div class="shadow-[0_5px_10px_#6500AC15] px-6">
      <Container>
        <div class="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <NuxtLink to="/">
              <Logo class-name="h-8 w-auto sm:h-10"/>
              <span class="sr-only">Nuxt</span>
            </NuxtLink>
          </div>
          <div class="-my-2 -mr-2 md:hidden">
            <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-primary-color bg-gray-100 hover:bg-gray-200 focus:outline-none">
              <span class="sr-only">Open menu</span>
              <Icon name="radix-icons:dashboard" class="h-8 w-8"></Icon>
            </PopoverButton>
          </div>

          <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
            <template v-for="(nv, n) in navigationLinks" :key="n">
              <NuxtLink :to="nv.link" exact-active-class="text-indigo-600" class="text-base text-lg font-medium text-black hover:text-gray-900 duration-300">{{ nv.title }}</NuxtLink>
            </template>
          </PopoverGroup>

          <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <div v-if="authStore.isLoggedIn">
              <CommonUserMenuDropdown/>
            </div>
            <div v-else>
              <NuxtLink v-if="!hideLoginButton" to="/auth/login" class="text-sm font-semibold leading-6 text-gray-900 px-4 py-3 rounded-xl hover:bg-gray-100 duration-500">
                Login <span aria-hidden="true">→</span>
                <!--                <PrimaryButton text="Login" class-name="rounded-full"/>-->
              </NuxtLink>
            </div>
          </div>
        </div>
      </Container>
    </div>

    <!-- Mobile View Navigation Bar -->
    <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <PopoverPanel focus class="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
        <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="px-5 pt-5 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <Logo class-name="h-8 w-auto"/>
              </div>
              <div class="-mr-2">
                <!-- Navigation Close menu -->
                <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-red-600 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                  <span class="sr-only">Close menu</span>
                  <Icon name="ion:close-round" class="h-6 w-6"/>
                </PopoverButton>
              </div>
            </div>
            <div class="mt-16">
              <!-- Mobile Navigation links -->
              <nav class="grid gap-y-8">
                <NuxtLink v-for="(nv, v) in navigationLinks" :key="v" :to="nv.link" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                  <Icon v-if="nv.icon" :name="nv.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600"></Icon>
                  <!--                  <component v-if="nv.icon" :is="nv.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true"/>-->
                  <span class="ml-3 text-base font-medium text-black">{{ nv.title }}</span>
                </NuxtLink>
              </nav>
            </div>
          </div>
          <div class="space-y-6 py-6 px-5">
            <div v-if="authStore.isLoggedIn">
              <CommonUserMenuDropdown/>
            </div>
            <div v-else>
              <NuxtLink v-if="!hideLoginButton" to="/auth/login">
                <PrimaryButton text="Login" class-name="w-full rounded-lg"/>
              </NuxtLink>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import {Popover, PopoverButton, PopoverGroup, PopoverPanel} from '@headlessui/vue'
import Logo from "~/components/common/Logo.vue";
import Container from "~/components/common/Container.vue";
import PrimaryButton from "~/components/common/Buttons/PrimaryButton.vue";
import {useAuthStore} from "~/stores/auth";

defineProps({
  hideLoginButton: {type: Boolean, default: false}
})

const authStore = useAuthStore()
const navigationLinks = [
  {title: 'Home', link: '/', icon: "fa6-solid:house-chimney"},
  {title: 'Dashboard', link: '/dashboard'},
]
</script>
