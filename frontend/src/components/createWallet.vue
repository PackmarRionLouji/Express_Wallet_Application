<template>
  <div class="button-container">
    <EInput v-model="nameInput" placeholder="Enter your name" clearable/>
    <EInput v-model="balanceInput" placeholder="Enter balance" clearable/>
    <button @click="createWallet">Create Wallet</button>
  </div>
 </template>

 
<script>
import axios from '../axios';
import { ref } from 'vue'
export default {
  name: 'createWallet',
  setup() {
    const nameInput = ref('');
    const balanceInput = ref('');

    const createWallet = async() =>{
      try{
        const response = await axios.get('http://localhost:3000/api/getWalletIds',{
          name:nameInput.value,
          balance:balanceInput.value,
        });
        console.log(response.data);
        nameInput.value='';
        balanceInput.value='';
      }catch(error){
        console.error('Error creating wallet:',error);
      }
    };

    return {
      nameInput,
      balanceInput,
      createWallet,
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
