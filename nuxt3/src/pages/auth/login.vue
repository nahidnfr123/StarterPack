<template>
  <div class="max-w-xl bg-white rounded-xl p-8 lg:p-12 flex flex-col w-full m-auto relative shadow-[0_15px_30px_#9600FF15]">
    <Logo class-name="h-14 mb-6 w-auto mx-auto"/>
    <h2 class="text-gray-900 text-xl mb-1 font-medium title-font">Login</h2>
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
    </ClientOnly>
    <p class="mt-4 text-center">Don't have a account?</p>
    <div class="mx-auto">
      <NuxtLink to="/auth/register" class="text-center text-primary-color">Register</NuxtLink>
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
const submitHandler = async (payload) => {
  if (isLoading.value) return
  isLoading.value = true

  // Prepare data for Upload ..
  const formData = new FormData()
  // formData.append('email', payload.email)
  // formData.append('password', payload.password)

  const {data, pending, error, refresh} = await authStore.login(formData)
  // this.$formkit.reset('registrationForm')
  console.log(error)
  console.log(data)
  if (error) {

  }
  // redirect('/')

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
