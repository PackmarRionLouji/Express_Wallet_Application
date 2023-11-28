<template>
  <div class="button-container">
    <EAlert v-if="submitButtonClicked && showSuccessAlert" title="Wallet Created Successfully" type="success" effect="dark" center show-icon>
      {{ `Wallet Id: ${id}` }}<br>
      {{ `Wallet Name: ${nameInput}`  }}
    </EAlert>
    <EAlert v-else-if="submitButtonClicked && !showSuccessAlert" title="Wallet not created" type="error" effect="dark" center show-icon>
      {{ `${error}` }}
    </EAlert>
    <EInput v-model="nameInput" placeholder="Enter your name" clearable/>
    <EInput v-model="balanceInput" placeholder="Enter balance" clearable/>
    <EButton @click="handleCreateWallet" :disabled="isDisabled">Create Wallet</EButton>
    <ETable v-if="walletDetails.length>0" :data="walletDetails" border fit clearselection style="width: 100%">
        <ETableColumn prop="name" label="Name" width="300"/>
        <ETableColumn prop="id" label="Id" width="200"/>
        <ETableColumn prop="balance" label="Amount" width="250"/>
        <ETableColumn prop="created_at" label="Created At" width="300">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </ETableColumn>
        <ETableColumn prop="updated_at" label="Updated At" width="300">
          <template #default="{ row }">
            {{ formatDate(row.updated_at) }}
          </template>
          
        </ETableColumn>
    </ETable>
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
    const id = ref('');
    const error = ref('');
    const showSuccessAlert = ref(false);
    const submitButtonClicked = ref(null);
    const walletDetails = ref([]) ;
    const isDisabled = computed(() =>{
      return !(nameInput.value && balanceInput.value);
    });


    const handleCreateWallet = async() =>{
      try{
        submitButtonClicked.value = false;
        const name = nameInput.value;
        const balance = Number(balanceInput.value);
        const createWallet = await axios.post('http://localhost:3000/api/wallet/setup',{
          name,balance,
        });
        // console.log(createWallet.data.id)
        id.value = createWallet.data.id;

        showSuccessAlert.value = true;
        submitButtonClicked.value = true;
        walletDetails.value = createWallet.data.wallet;
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

    return {
      nameInput,
      balanceInput,
      handleCreateWallet,
      isDisabled,
      showSuccessAlert,
      walletDetails,
      formatDate,
      submitButtonClicked,
      id,
      error,
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
