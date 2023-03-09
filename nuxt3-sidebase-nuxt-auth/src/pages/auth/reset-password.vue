<template>
  <AuthFormContainer title="Forget Password">
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
              text="Reset"
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
import AuthButton from "~/components/common/Buttons/AuthButton.vue";
import {redirectTo, throwFormError} from "~/composables/useCommon";
import $api from "~/composables/useRequest";

definePageMeta({
  layout: 'auth',
  middleware: ["only-guest"]
})

const isLoading = ref(false)
const route = useRoute()

const _email = route.query.email
const _token = route.query.token

if (!_email || !_token) useRouter().push('/auth/verify-email')

const submitHandler = async (payload, node) => {
  if (isLoading.value) return
  node.clearErrors() // clear Previous form errors ...
  isLoading.value = true

  // Prepare data for Upload ..
  const formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('email', _email)
  formData.append('token', _token)
  formData.append('password', payload.password)
  formData.append('password_confirmation', payload.password_confirm)

  const {data, pending, error, refresh} = await $api.post('reset-password', formData) // Post request to the reset-password api end point ...

  if (error.value) {
    throwFormError(error.value, node) // Show Server side errors in form ...
  } else {
    node.reset()
    redirectTo('/auth/login') /// Redirect to ?next or to given path ...
  }

  isLoading.value = false
}
</script>
