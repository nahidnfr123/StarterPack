<template>
  <AuthFormContainer title="Login">
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
      <FormKit
          type="password"
          name="password"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{matches: 'Please include at least one symbol'}"
          placeholder="Password"
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
    <div class="flex justify-end">
      <NuxtLink to="/auth/verify-email" class="underline text-primary-color">Forget Password</NuxtLink>
    </div>
    <p class="mt-4 text-center">Don't have a account?
      <NuxtLink to="/auth/register" class="text-center underline text-primary-color">Register</NuxtLink>
    </p>
  </AuthFormContainer>
</template>

<script setup>
import {useAuthStore} from "~/stores/auth";
import AuthButton from "~/components/common/Buttons/AuthButton.vue";
import {redirectTo, throwFormError} from "~/composables/useCommon";

definePageMeta({
  layout: 'auth',
  middleware: ["only-guest"]
})

const authStore = useAuthStore()
const isLoading = ref(false)

const submitHandler = async (payload, node) => {
  if (isLoading.value) return
  node.clearErrors() // clear Previous form errors ...
  isLoading.value = true

  // Prepare data for Upload ..
  const formData = new FormData()
  formData.append('email', payload.email)
  formData.append('password', payload.password)

  const {data, pending, error, refresh} = await authStore.login(formData) // call to login action in the auth store ...

  if (error.value) {
    throwFormError(error.value, node) // Show Server side errors in form ...
  } else {
    node.reset()
    redirectTo('/profile') /// Redirect to ?next or to given path ...
  }

  isLoading.value = false
}
</script>
