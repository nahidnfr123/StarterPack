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
      <RouterLink to="/auth/login" class="text-center underline text-primary-color">Login</RouterLink>
    </p>
  </AuthFormContainer>
</template>

<script setup>
import AuthButton from "@/components/common/buttons/AuthButton.vue";
import $api from "@/composables/useRequest";
import {throwFormError} from "@/composables/useCommon";
import Alert from "@/components/common/Alert.vue";
import {ref} from "vue";
import AuthFormContainer from "@/components/AuthFormContainer.vue";

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

  const notifyOption = {showSuccess: true, showError: true, successMessage: 'An Email with password reset link has been sent to your email address!'}
  const response = await $api.post('send-password-reset-link', formData, notifyOption)


  if (response.message === 'error') {
    throwFormError(response.data, node) // Show Server side errors in form ...
  } else {
    console.log(response.data)
    successMessage.value = response.data?.status || response.data?.email || ''
  }

  isLoading.value = false
}
</script>
