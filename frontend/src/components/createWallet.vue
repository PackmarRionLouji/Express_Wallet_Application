<template >
  <EInput v-model="input" placeholder="Please enter your name" clearable/>
  <EInput v-model="input" placeholder="Please enter balance" clearable/>
 </template>



<script>
import { ref } from 'vue'
export default {
  name: 'createWallet',
  setup() {
    const input = ref('');

    return {
      input,
    };
  },
};
</script>

<style>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.centered-button {
  background-color: yellowgreen !important;
  color: black !important;
  margin: 10px !important;
  padding: 20px 80px !important;
}
</style>
