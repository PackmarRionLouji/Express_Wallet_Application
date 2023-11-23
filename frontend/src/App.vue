<template>
    <router-view :key="$router.name"></router-view>
</template>

<script>
export default {
  name: "App",
  components: {
  }
}
</script>

<style>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>