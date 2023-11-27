<template>
  <div class="button-container">
    <EInput v-model="nameInput" placeholder="Enter your name" clearable/>
    <EInput v-model="balanceInput" placeholder="Enter balance" clearable/>
    <EButton @click="handleCreateWallet" :disabled="isDisabled">Create Wallet</EButton>
  </div>
</template>


<script>
import { ref,computed } from 'vue';
import axios from 'axios';

export default {
  name: 'createWallet',
  setup() {
    const nameInput = ref('');
    const balanceInput = ref('');

    const isDisabled = computed(() =>{
      return !(nameInput.value && balanceInput.value);
    });

    const handleCreateWallet = async() =>{
      try{
        const name = nameInput.value;
        const balance = Number(balanceInput.value);
        const createWallet = await axios.post('http://localhost:3000/api/wallet/setup',{
          name,balance,
        });
        console.log(createWallet.data);
      }catch(error){
        console.log("Error Creating Wallet",error);
      }
    }

    return {
      nameInput,
      balanceInput,
      handleCreateWallet,
      isDisabled,
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
