<template>
  <div class="max-w-xl bg-white rounded-xl p-8 lg:p-12 flex flex-col w-full m-auto relative shadow-[0_15px_30px_#9600FF15]">
    <Logo class-name="h-14 mb-6 w-auto mx-auto"/>
    <h2 class="text-gray-900 text-xl mb-1 font-medium title-font">Sign Up</h2>
    <p class="leading-relaxed mb-5 text-base text-gray-600">Create a new account to get started with us.</p>
    <!--        :form-class="isLoading.value ? 'hide' : 'show'"-->
    <ClientOnly>
      <FormKit
          type="form"
          id="registrationForm"
          submit-label="Register"
          @submit="submitHandler"
          :actions="false"
          #default="{ value, state: { valid } }"
          #error="{error}"
          incomplete-message="Please fill in the form correctly."
      >
        <FormKit
            type="text"
            name="name"
            placeholder="Full Name"
            help=""
            validation="required|matches:/[a-zA-Z]/"
            :validation-messages="{ matches: 'Name must not include a number.' }"
        />
        <FormKit
            type="text"
            name="email"
            placeholder="Email Address"
            help=""
            validation="required|email"
        />
        <FormKit
            type="password"
            name="password"
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{matches: 'Please include at least one symbol'}"
            placeholder="Your password"
            help=""
        />
        <FormKit
            type="password"
            name="password_confirm"
            placeholder="Confirm password"
            validation="required|confirm"
            help=""
        />
        <!--      <FormKit-->
        <!--          type="file"-->
        <!--          label="Drivers license"-->
        <!--          name="license"-->
        <!--          help="Please add a scan of your driver’s license"-->
        <!--          accept=".jpg,.png,.pdf"-->
        <!--          validation="required"-->
        <!--      />-->

        <div
            class="mt-6"
        >
          <FormKit
              type="submit"
              input-class="$reset w-full"
              :disabled="!valid || isLoading"
          >
            <!-- Custom Auth Button -->
            <AuthButton
                class-name="w-full py-4 rounded-lg"
                :disabled="!valid || isLoading"
                :isLoading="!!isLoading"
                text="Next"
            />
          </FormKit>
        </div>
        <!--      <pre wrap>{{ value }}</pre>-->
      </FormKit>
    </ClientOnly>
    <p class="mt-4 text-center">Already have a account?</p>
    <div class="mx-auto">
      <NuxtLink to="/auth/login" class="text-center text-primary-color">Login</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import Logo from "~/components/common/Logo.vue";
import {useAuthStore} from "~/stores/auth";
import AuthButton from "~/components/common/Buttons/AuthButton.vue";

definePageMeta({layout: 'auth'})

const authStore = useAuthStore()
const isLoading = ref(false)

// Handel Registration Form Submit ...
const submitHandler = async (payload) => {
  if (isLoading.value) return
  isLoading.value = true
  await new Promise((r) => setTimeout(r, 1000))

  // Prepare data for Upload ..
  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('email', payload.email)
  formData.append('password', payload.password)
  formData.append('password_confirm', payload.password_confirm)
  // payload.license.forEach((fileItem) => {
  //   formData.append('license', fileItem.file)
  // })

  // Send data to Pinia Store ...
  const {data, pending, error, refresh} = await authStore.register(formData)
  // this.$formkit.reset('registrationForm')


  isLoading.value = false
}
</script>
