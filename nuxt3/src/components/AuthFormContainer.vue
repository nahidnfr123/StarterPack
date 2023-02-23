<template>
  <Container>
    <div class="max-w-xl bg-white rounded-xl p-8 lg:p-12 flex flex-col w-full m-auto relative shadow-[0_15px_30px_#9600FF15]">
      <Logo class-name="h-14 mb-6 w-auto mx-auto"/>
      <h2 class="text-gray-900 text-xl mb-2 font-medium title-font">{{ title }}</h2>
      <!--        :form-class="isLoading.value ? 'hide' : 'show'"-->
      <ClientOnly>
        <slot/>
      </ClientOnly>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Logo from "~/components/common/Logo.vue";
import Container from "~/components/common/Container.vue";

defineProps({
  title: {type: String, default: ''}
})
</script>
