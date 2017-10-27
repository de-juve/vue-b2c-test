<template>
  <main>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style scoped>

</style>
