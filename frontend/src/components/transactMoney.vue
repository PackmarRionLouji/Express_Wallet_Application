<template>
    <div style="width: 200px">
        <ECascader :options="options" :props="props1" placeholder="Wallet Id" clearable filterable v-model="InputId"/>
        <EInput v-model="InputAmount" placeholder="Amount" clearable/>   
        <EInput v-model="InputDescription" placeholder="Description" clearable/>   
    </div>
  </template>
  
  <script>
import { ref } from 'vue';
  export default {
    name: "transactMoney",
    setup() {
        const props1={
            checkStrictly: true,
        };
        const InputId = ref('');
        const InputAmount = ref('');
        const InputDescription = ref('');
        const options= [
            {
                value: 1,
                label: 1,
            },
            {
                value: 2,
                label: 2,
            },
            {
                value: 3,
                label: 3,
            },
        ];
        return {
            props1,options,InputId,InputAmount,InputDescription
        };
  }
};
  </script>
  
  <style>
  /* Add your styles here if needed */
  </style>
  