<template>

    <EAlert v-if="submitButtonClicked && showSuccessAlert " type="success" effect="dark" center show-icon>
      <strong>{{ 'Transaction details fetched Successfully' }}</strong><br>
    </EAlert>
    <EAlert v-else-if="submitButtonClicked && !showSuccessAlert" title="Failed to check Transaction" type="error" effect="dark" center show-icon>
      {{ `${error}` }}
    </EAlert>

    <div style="display: flex; flex-direction: column; align-items: center; width: 100vw; margin-top: 50px;">                
        <EInput v-model="InputId" placeholder="Enter Transaction Id" clearable style="width: 25%;"/>  
        <EButton @click="checkTransaction" :disabled="isDisabled">Submit</EButton>
    </div>    

    <ETable v-if="showSuccessAlert" :data="transactionDetails" border fit clearselection style="width: 100%">
        <ETableColumn prop="wallet_id" label="Wallet Id" width="100"/>
        <ETableColumn prop="balance" label="Balance" width="150"/>
        <ETableColumn prop="transaction_id" label="Transaction Id" width="320"/>
        <ETableColumn prop="type" label="Type" width="100">
            <template #default="{ row }">
                {{ row.type === 0 ? 'Debit' : 'Credit' }}
            </template>
        </ETableColumn>
        <ETableColumn prop="created_at" label="Created At" width="320">
        <template #default="{ row }">
            {{ formatDate(row.created_at) }}
        </template>
        </ETableColumn>
        <ETableColumn prop="updated_at" label="Updated At" width="360">
        <template #default="{ row }">
            {{ formatDate(row.updated_at) }}
        </template>
        </ETableColumn>
    </ETable>


</template>

<script> 
    import { ref,computed } from 'vue';
    import axios from 'axios';
    export default {
        name: 'transactionDetails',
        setup() {
            const InputId = ref('');
            const showSuccessAlert = ref(false);
            const submitButtonClicked = ref(null);
            const transactionDetails = ref([]);
            const error = ref('');

            const isDisabled = computed(() =>{
                return !InputId.value;
            });

            const checkTransaction = async () => {
                try {
                    const transactionId = InputId.value;
                    console.log(transactionId);
                    const transactionOutput = await axios.post('http://localhost:3000/api/getTransaction', {
                        transactionId,
                    });
                    showSuccessAlert.value = true;
                    submitButtonClicked.value = true;
                    transactionDetails.value = [transactionOutput.data.transaction];
                } catch (error1) {
                    error.value = (error1.response.data.error);
                    showSuccessAlert.value = false;
                    submitButtonClicked.value = true;
                }
            };

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
                InputId,
                checkTransaction,
                isDisabled,
                showSuccessAlert,
                submitButtonClicked,
                transactionDetails,
                formatDate,
                error,
            }
        }
    }
</script>


<style>
</style>