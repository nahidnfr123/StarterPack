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

    <Alert v-if="successMessage" type="success">
      {{ successMessage }}
    </Alert>

    <p class="mt-4 text-center">Go Back to
      <NuxtLink to="/auth/login" class="text-center underline text-primary-color">Login</NuxtLink>
    </p>
  </AuthFormContainer>
</template>

<script setup>
import AuthButton from "~/components/common/Buttons/AuthButton.vue";
import $api from "~/composables/useRequest";
import {throwFormError} from "~/composables/useCommon";
import Alert from "~/components/common/Alert.vue";

definePageMeta({
  layout: 'auth',
  middleware: ["only-guest"]
})

const successMessage = ref('')
const isLoading = ref(false)

const submitHandler = async (payload, node) => {
  if (isLoading.value) return
  node.clearErrors() // clear Previous form errors ...
  isLoading.value = true

  // Prepare data for Upload ..
  const formData = new FormData()
  formData.append('email', payload.email)
  formData.append('password_reset_link', window.location.host + '/auth/reset-password')

  const options = {showSuccess: true, showError: true, successMessage: 'An Email with password reset link has been sent to your email address!'}
  const {data, pending, error, refresh} = await $api.post('send-password-reset-link', formData, options)

  if (error.value) {
    throwFormError(error.value, node) // Show Server side errors in form ...
  } else {
    successMessage.value = data.value?.status || data.value?.email || ''
  }

  isLoading.value = false
}
</script>
