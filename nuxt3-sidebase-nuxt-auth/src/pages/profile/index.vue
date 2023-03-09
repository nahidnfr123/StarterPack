<template>
  <Container>
    <div v-if="isAuthenticated" class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
      <div id="profile" class="w-full lg:w-3/5 rounded-2xl lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
        <div class="p-4 md:p-12 text-center lg:text-left">
          <!-- Image for mobile view-->
          <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" :style="`background-image: url(${user.avatar || 'https://source.unsplash.com/EVCX6ph5o2Y'})`"></div>

          <h1 class="text-3xl font-bold pt-8 lg:pt-0">{{ user.name }}</h1>
          <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
          <p v-if="user.email" class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            <Icon name="carbon:email" class="mt-1 mr-2 text-sky-500"/>
            {{ user.email }}
          </p>
          <p v-if="user.phone" class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            <Icon name="carbon:phone" class="mt-1 mr-2 text-sky-500"/>
            {{ user.phone }}
          </p>

          <div class="pt-12 pb-8">
            <NuxtLink to="/profile/edit" class="bg-sky-500 hover:bg-sky-700 duration-200 text-white font-bold py-3 px-4 rounded-full">
              Edit Profile
            </NuxtLink>
          </div>
        </div>
      </div>

      <!--Img Col-->
      <div class="w-full lg:w-2/5">
        <img :src="user.avatar || 'https://source.unsplash.com/EVCX6ph5o2Y'" class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt="">
      </div>
    </div>
  </Container>
</template>

<script setup>
import Container from "~/components/common/Container.vue";
import {useAuthStore} from "~/stores/auth";

definePageMeta({
  middleware: ["require-auth"]
})

const {user, isAuthenticated} = useAuthStore()
</script>
