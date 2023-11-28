<template>
    <EAlert v-if="submitButtonClicked && showSuccessAlert " type="success" effect="dark" center show-icon>
      <strong>{{ `${message} (Id: ${id})` }}</strong><br>
      {{ `Balance: ${balance}`  }}
    </EAlert>
    <EAlert v-else-if="submitButtonClicked && !showSuccessAlert" title="Transaction Failed" type="error" effect="dark" center show-icon>
      {{ `${error}` }}
    </EAlert>
    
    
    <div style="display: flex; flex-direction: column; align-items: center; width: 100vw; margin-top: 50px;">
        <ECascader :options="walletOptions" :props="props1" placeholder="Wallet Name" clearable filterable v-model="InputId" style="width: 50%;"/>
        <EInput v-model="InputAmount" placeholder="Amount" clearable style="width: 50%;"/>
        <EInput v-model="InputDescription" placeholder="Description" clearable style="width: 50%;"/>
        <EButton @click="createTransaction" :disabled="isDisabled" style="width: 10%;">Submit</EButton>
    </div>

    <ETable v-if="transactionDetails.length>0" :data="transactionDetails" border fit clearselection style="width: 100%">
        <ETableColumn prop="wallet_id" label="Id" width="80"/>
        <ETableColumn prop="amount" label="Amount" width="120"/>
        <ETableColumn prop="balance" label="Balance" width="120"/>
        <ETableColumn prop="type" label="Type" width="120">
            {{ InputAmount >= 0 ? 'Credit' : 'Debit' }}
        </ETableColumn>
        <ETableColumn prop="description" label="Description" width="300"/>
        <ETableColumn prop="created_at" label="Created At" width="300">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </ETableColumn>
        <ETableColumn prop="updated_at" label="Updated At" width="310">
          <template #default="{ row }">
            {{ formatDate(row.updated_at) }}
          </template>
          
        </ETableColumn>
    </ETable>

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
        const transactionDetails = ref([]);
        const id = ref('');
        const InputAmount = ref('');
        const InputDescription = ref('');
        const walletOptions = ref([]);
        const error = ref('');
        const message = ref('');
        const showSuccessAlert = ref(false);
        const submitButtonClicked = ref(null);
        const balance = ref('');
        
        
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
                message.value = transactionData.data.message;
                balance.value = transactionData.data.transaction[0][0].balance;
                id.value = transactionData.data.transaction[0][0].wallet_id;
                showSuccessAlert.value = true;
                submitButtonClicked.value = true;
                console.log(transactionData.data.transaction[0]);
                transactionDetails.value = transactionData.data.transaction[0];
            }catch(error1){
                error.value = error1.response.data.error; 
                showSuccessAlert.value = false;
                submitButtonClicked.value=true;
            }
        }

        const formatDate = (dateString) =>{
            const options = {
                year:'numeric',
                month:'numeric',
                day:'numeric',
                hour:'numeric',
                minute:'numeric',
                second:'numeric',
                timeZoneName:'short',
            };
            return new Date(dateString).toLocaleDateString(undefined,options);
        };

        const isDisabled = computed(() => {
            return !InputId.value || !InputAmount.value || !InputDescription.value;
        });

        return {
            props1,
            InputId,
            InputAmount,
            InputDescription,
            walletOptions,
            isDisabled,
            createTransaction,
            error,
            submitButtonClicked,
            showSuccessAlert,
            message,
            balance,
            id,
            formatDate,
            transactionDetails,
        };
  }
};
  </script>
  
  <style>
  /* Add your styles here if needed */
  </style>
  