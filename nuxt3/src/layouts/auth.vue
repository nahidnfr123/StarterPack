<template>
  <div class="authBG flex flex-col justify-center items-center">
    <slot/>
  </div>
</template>


<style lang="scss">
.authBG {
  height: 100vh;
  width: 100%;
  background: url("/images/authBg.png");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>
