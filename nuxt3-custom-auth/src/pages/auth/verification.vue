<template>
  <AuthFormContainer title="Verify Email">
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
          name="email"
          placeholder="Email Address"
          validation="required|email"
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
              text="Send Password Reset Link"
          />
        </FormKit>
      </div>
      <!--      <pre wrap>{{ value }}</pre>-->
    </FormKit>
    <p class="mt-4 text-center">Go Back to
      <NuxtLink to="/auth/login" class="text-center underline text-primary-color">Login</NuxtLink>
    </p>
  </AuthFormContainer>
</template>

<script setup>
import Logo from "~/components/common/Logo.vue";
import {useAuthStore} from "~/stores/auth";
import AuthButton from "~/components/common/Buttons/AuthButton.vue";
import $api from "~/composables/useRequest";

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
  formData.append('email', payload.email)
  formData.append('password_reset_link', window.location.host + '/auth/reset-password')

  const {data, pending, error: _error, refresh} = await $api.post('send-password-reset-link', formData)
  const error = _error?.value

  if (error) {
    if (error?.status === 422) node.setErrors(error?.data?.errors) // Validation Error ...
    else if (error?.status) node.setErrors('Server Error: ' + error?.data?.message || '') // General Error Message from Server.
    else node.setErrors('Error Connecting to Server! ' + error.name) // Error occurred, but server did not send any error status ... (Could Not Connect to server)
  } else {
    // redirect('/')
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
