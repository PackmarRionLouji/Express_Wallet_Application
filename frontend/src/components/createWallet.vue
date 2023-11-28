<template>
  <div class="button-container">
    <EInput v-model="nameInput" placeholder="Enter your name" clearable/>
    <EInput v-model="balanceInput" placeholder="Enter balance" clearable/>
    <EButton @click="handleCreateWallet" :disabled="isDisabled">Create Wallet</EButton>
    <ETable v-if="walletDetails.length>0" :data="walletDetails" border fit clearselection style="width: 100%">
        <ETableColumn prop="name" label="Name" width="270"/>
        <ETableColumn prop="id" label="Id" width="85"/>
        <ETableColumn prop="amount" label="Amount" width="70"/>
        <ETableColumn prop="created_at" label="Created At" width="70">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </ETableColumn>
        <ETableColumn prop="updated_at" label="Updated At" width="70">
          <template #default="{ row }">
            {{ formatDate(row.updated_at) }}
          </template>
        </ETableColumn>
    </ETable>
    <EAlert v-if="showSuccessAlert" title="Wallet Created Successfully" type="success"/>
    <EAlert v-else-if="showErrorAlert" title="Wallet not created" type="error"/>
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
    const showSuccessAlert = ref(null);
    const showErrorAlert = ref(null);
    const walletDetails = ref([]) ;
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
        walletDetails.value = createWallet.data.wallet;
        console.log(createWallet.data.wallet);
        console.log(walletDetails)
        if (createWallet.data.success) {
          showSuccessAlert.value = true;
          showErrorAlert.value = false;
        } else {
          showSuccessAlert.value = false;
          showErrorAlert.value = true;
        }
      }catch(error){
        console.log("Error Creating Wallet",error);
      }
    }

    return {
      nameInput,
      balanceInput,
      handleCreateWallet,
      isDisabled,
      showSuccessAlert,
      showErrorAlert,
      walletDetails,
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
