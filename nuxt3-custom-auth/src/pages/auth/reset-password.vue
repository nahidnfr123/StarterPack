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
              text="Login"
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
import {useAuthStore} from "~/stores/auth";
import AuthButton from "~/components/common/Buttons/AuthButton.vue";
import {redirectTo, throwFormError} from "~/composables/useCommon";
import $api from "~/composables/useRequest";

definePageMeta({
  layout: 'auth',
  middleware: ["only-guest"]
})

const authStore = useAuthStore()
const isLoading = ref(false)
const route = useRoute()


// Handel Registration Form Submit ...
const submitHandler = async (payload, node) => {
  if (isLoading.value) return
  node.clearErrors()
  isLoading.value = true

  // Prepare data for Upload ..
  const formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('email', route.query.email)
  formData.append('token', route.query.token)
  formData.append('password', payload.password)
  formData.append('password_confirmation', payload.password_confirm)

  const {data, pending, error, refresh} = await $api.post('reset-password', formData)

  if (error.value) {
    throwFormError(error.value, node)
  } else {
    node.reset()
    redirectTo('/auth/login')
  }

  isLoading.value = false
}
</script>
