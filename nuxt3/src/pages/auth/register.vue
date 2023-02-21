<template>
  <div class="max-w-xl bg-white rounded-xl p-8 lg:p-12 flex flex-col w-full m-auto relative shadow-[0_15px_30px_#9600FF15]">
    <Logo class-name="h-14 mb-6 w-auto mx-auto"/>
    <h2 class="text-gray-900 text-xl mb-1 font-medium title-font">Register</h2>
    <!--        :form-class="isLoading.value ? 'hide' : 'show'"-->
    <ClientOnly>
      <FormKit
          type="form"
          id="formkitForm"
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
            validation="required|matches:/[a-zA-Z]/"
            :validation-messages="{ matches: 'Name must not include a number.' }"
            help="Your full name."
        />
        <FormKit
            type="text"
            name="email"
            placeholder="Email Address"
            validation="required|email"
            help=""
        />
        <FormKit
            type="password"
            name="password"
            validation="required|?length:6"
            :validation-messages="{
              matches: 'Please include at least one symbol',
              length: 'Try to make your password longer!',
            }"
            placeholder="Password"
            help="At-least 6 characters."
        />
        <FormKit
            type="password"
            name="password_confirm"
            placeholder="Confirm password"
            validation="required|confirm"
            help=""
        />

        <div class="mt-6">
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
                text="Register"
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

definePageMeta({
  layout: 'auth',
  middleware: ["only-guest"]
})

const authStore = useAuthStore()
const isLoading = ref(false)

// Handel Registration Form Submit ...
const submitHandler = async (payload, node) => {
  if (isLoading.value) return
  isLoading.value = true

  // Prepare data for Upload ..
  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('email', payload.email)
  formData.append('password', payload.password)
  formData.append('password_confirmation', payload.password_confirm)

  // Send data to Pinia Store ...
  const {data, pending, error, refresh} = await authStore.register(formData)
  const errorCodes = [422, 419, 500, 403, 401]
  if (error && errorCodes.includes(error?.status)) {
    // if (error?.status === 422) this.$formkit.setErrors('formkitForm', {})
    if (error?.status === 422) node.setErrors(error?.data?.errors)
  } else {
    redirect('/')
  }

  isLoading.value = false
}

const redirect = (path) => {
  const route = useRoute()
  const router = useRouter()
  const $next = route.query.next
  let routePath = path
  if ($next) routePath = $next
  router.push({path: routePath})
}
</script>
