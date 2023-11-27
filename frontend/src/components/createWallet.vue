<template>
  <div class="button-container">
    <EInput v-model="nameInput" placeholder="Enter your name" clearable/>
    <EInput v-model="balanceInput" placeholder="Enter balance" clearable/>
    <button @click="handleCreateWallet">Create Wallet</button>
  </div>
</template>


<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'createWallet',
  setup() {
    const nameInput = ref('');
    const balanceInput = ref('');

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
