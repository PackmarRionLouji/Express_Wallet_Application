<template>
    <EAlert v-if="submitButtonClicked && showSuccessAlert " type="success" effect="dark" center show-icon>
      <strong>{{ 'Successfull' }}</strong><br>
      {{ `Balance: ${balance}` }}
    </EAlert>
    <EAlert v-else-if="submitButtonClicked && !showSuccessAlert" title="Failed to check Balance" type="error" effect="dark" center show-icon>
      {{ `${error}` }}
    </EAlert>

    <div style="display: flex; flex-direction: column; align-items: center; width: 100vw; margin-top: 50px;">        
        <ECascader :options="walletOptions" :props="props1" placeholder="Wallet Name" clearable filterable v-model="InputId" style="width: 15%;"/>     
        <EButton @click="checkBalance" :disabled="isDisabled" style="width: 10%;">Submit</EButton>
    </div>    

        <ETable v-if="showSuccessAlert" :data="balanceDetails" border fit clearselection style="width: 100%">
            <ETableColumn prop="name" label="Name" width="210"/>
            <ETableColumn prop="id" label="Wallet Id" width="210"/>
            <ETableColumn prop="balance" label="Balance" width="210"/>
            <ETableColumn prop="created_at" label="Created At" width="360">
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
    import { ref,onMounted, computed } from 'vue';
    import { walletMixin } from '../mixin/walletIdsMixing';
    import axios from 'axios';
    export default {
        name: 'checkBalance',
        setup() {
            const InputId = ref('');
            const walletOptions = ref([]);
            const showSuccessAlert = ref(false);
            const submitButtonClicked = ref(null); 
            const balance = ref(0); 
            const error = ref('');
            const balanceDetails = ref([]);

            const props1 = {
                checkStrictly:true,
            };
            
            onMounted(async () => {
                const walletData = await walletMixin();
                walletOptions.value = walletData ? walletData.walletId.map(wallet => ({value:wallet, label:wallet })) : [];
            });

            const isDisabled = computed(() =>{
                return !InputId.value;
            });

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

            const checkBalance = async () => {
                try {
                    const walletId = InputId.value[0];
                    const balanceOutput = await axios.post('http://localhost:3000/api/getWalletBalance', {
                        walletId: walletId,
                    });
                    console.log(balanceOutput);
                    balance.value = balanceOutput.data.balance;
                    showSuccessAlert.value = true;
                    submitButtonClicked.value = true;
                    balanceDetails.value = [balanceOutput.data.wallet];
                } catch (error1) {
                    error.value = error1.error;
                    showSuccessAlert.value = false;
                    submitButtonClicked.value = true;
                }
            };

            return {
                props1, 
                InputId,
                checkBalance,
                walletOptions,
                isDisabled,
                showSuccessAlert,
                submitButtonClicked,
                balance,
                error,
                balanceDetails,
                formatDate,
            }
        }
    }
</script>


<style>
</style>