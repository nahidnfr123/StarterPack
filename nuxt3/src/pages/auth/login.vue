<template>
  <div
      class="max-w-xl bg-white rounded-xl p-8 lg:p-12 flex flex-col w-full m-auto relative shadow-[0_15px_30px_#9600FF15]"
  >
    <Logo class-name="h-14 mb-6 w-auto mx-auto"/>
    <h2 class="text-gray-900 text-xl mb-1 font-medium title-font">Sign Up</h2>
    <p class="leading-relaxed mb-5 text-base text-gray-600">Create a new account to get started with us.</p>
    <ClientOnly>
      <FormKit
          type="form"
          id="registration-example"
          :form-class="submitted ? 'hide' : 'show'"
          submit-label="Register"
          @submit="submitHandler"
          :actions="false"
          #default="{ value, state: { valid } }"
          #error="{error}"
      >
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
            type="submit"
            input-class="$reset w-full"
            :disabled="!valid || loading.value"
        >
          <AuthButton
              class-name="w-full py-4 rounded-lg"
              :disabled="!valid || loading.value"
              :loading="loading.value"
              text="Next"
          />
        </FormKit>
        <!--      <pre wrap>{{ value }}</pre>-->
      </FormKit>
    </ClientOnly>
    <NuxtLink to="/auth/forget-password" class="my-4 text-right text-primary-color">Forgot password?</NuxtLink>

    <p class="mt-4 text-center">Don’t have an account?</p>
    <div class="mx-auto">
      <NuxtLink to="/auth/register" class="text-center text-primary-color">Sign Up</NuxtLink>
    </div>

    <!--    <div v-if="submitted">-->
    <!--      <h2>Submission successful!</h2>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import Logo from "~/components/common/Logo.vue";
import PrimaryButton from "~/components/common/Buttons/PrimaryButton.vue";
import AuthButton from "~/components/common/Buttons/AuthButton.vue";

definePageMeta({
  layout: 'auth'
})
const loading = ref(false)
const submitted = ref(false)
const submitHandler = async () => {
  // Let's pretend this is an ajax request:
  await new Promise((r) => setTimeout(r, 1000))
  submitted.value = true
}
</script>
