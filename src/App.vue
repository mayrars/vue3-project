<script setup>
  import PageHeader from './components/PageHeader.vue';
</script>
<template>
  <PageHeader />
  <div class="container max-w-screen-lg mx-auto px-6">
    <router-view></router-view>
  </div>
</template>