<template>
    <div style="width: 200px">
        <ECascader :options="walletOptions" :props="props1" placeholder="Wallet Name" clearable filterable v-model="InputId"/>
        <EInput v-model="InputAmount" placeholder="Amount" clearable/>   
        <EInput v-model="InputDescription" placeholder="Description" clearable/>  
        <EButton @click="createTransaction" :disabled="isDisabled">Submit</EButton>
    </div>
  </template>
  
  <script>
import { ref,onMounted, computed } from 'vue';
import { walletMixin } from '../mixin/walletIdsMixing.js';
import axios from 'axios';
  export default {
    name: "transactMoney",
    setup() {
        const props1={
            checkStrictly: true,
        };
        const InputId = ref('');
        const InputAmount = ref('');
        const InputDescription = ref('');
        const walletOptions = ref([]);
        
        
        onMounted(async () => {
            const walletData = await walletMixin();
            walletOptions.value = walletData ? walletData.walletId.map(wallet => ({value:wallet, label:wallet })) : [];
        });

        const createTransaction = async() => {
            try{
                const amount = InputAmount.value;
                const description = InputDescription.value;
                const walletId = InputId.value; 
                const transactionData = await axios.post(`http://localhost:3000/api/transact/${walletId}`,{
                    amount,
                    description,
                });
                console.log(transactionData? transactionData : "Failed to perform Transaction");
            }catch(error){
                console.log("Error performing Transaction",error);
            }
        }

        const isDisabled = computed(() => {
            return !InputId.value || !InputAmount.value || !InputDescription.value;
        });

        return {
            props1,InputId,InputAmount,InputDescription,walletOptions,isDisabled,createTransaction,
        };
  }
};
  </script>
  
  <style>
  /* Add your styles here if needed */
  </style>
  