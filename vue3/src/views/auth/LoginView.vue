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
      <RouterLink to="/auth/verify-email" class="underline text-primary-color">Forget Password</RouterLink>
    </div>
    <p class="mt-4 text-center">Don't have a account?
      <RouterLink to @click="redirectTo('/auth/register')" class="text-center underline text-primary-color">Register</RouterLink>
    </p>
  </AuthFormContainer>
</template>

<script setup>
import {useAuthStore} from "@/stores/auth";
import AuthButton from "@/components/common/Buttons/AuthButton.vue";
import {throwFormError} from "@/composables/useCommon";
import {ref} from "vue";
import AuthFormContainer from "@/components/AuthFormContainer.vue";
import {useRoute, useRouter} from "vue-router";

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

  const response = await authStore.login(formData) // call to register action in the auth store ...

  if (response.message === 'error') {
    throwFormError(response.data, node) // Show Server side errors in form ...
  } else {
    node.reset()
    redirectTo('/profile') /// Redirect to ?next or to given path ...
  }

  isLoading.value = false
}

const redirectTo = (path) => {
  const router = useRouter()
  const route = useRoute()
  const $next = route.query.next
  let routePath = path
  if ($next) routePath = $next
  router.push({path: routePath})
}
</script>
