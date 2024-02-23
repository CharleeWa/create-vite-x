<script setup lang="ts">
useHead({
  title: 'create-vite-x',
  meta: [
    {
      name: 'description',
      content: '⚡ Personal Vite + Vue + TS quick start template',
    },
    {
      name: 'theme-color',
      content: () => '#ffffff',
    },
  ],
})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped>

</style>
