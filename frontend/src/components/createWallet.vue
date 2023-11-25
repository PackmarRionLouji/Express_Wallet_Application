<template>
  <div class="button-container">
    <EInput v-model="nameInput" placeholder="Enter your name" clearable/>
    <EInput v-model="balanceInput" placeholder="Enter balance" clearable/>
    <!-- <button @click="handleCreateWallet">Create Wallet</button> -->
  </div>
</template>


<script>
import { ref } from 'vue';
// import { walletMixin } from '../mixin/walletIdsMixing.js';

export default {
  name: 'createWallet',
  setup() {
    const nameInput = ref('');
    const balanceInput = ref('');

  //   const handleCreateWallet = async () => {
  //       const walletData = await walletMixin();
  //       console.log(walletData.walletId);
  //   };

    return {
      nameInput,
      balanceInput,
      // handleCreateWallet,
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
  margin-top: 200px;
}
</style>
