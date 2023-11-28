<template>
    <EAlert v-if="submitButtonClicked && showSuccessAlert " type="success" effect="dark" center show-icon>
      <strong>{{ `Transaction Successfull` }}</strong><br>
      {{ `${message}` }}
    </EAlert>
    <EAlert v-else-if="submitButtonClicked && !showSuccessAlert" title="Transaction Failed" type="error" effect="dark" center show-icon>
      {{ `${error}` }}
    </EAlert>

    <div style="display: flex; flex-direction: column; align-items: center; width: 100vw; margin-top: 50px;">        
        <ECascader :options="walletOptions" 
                   :props="props1" 
                    clearable 
                    filterable 
                    v-model="InputSenderWalletId" placeholder="Sender Name" style="width: 25%;"/>
        <ECascader :options="walletOptions" 
                   :props="props1" 
                    clearable 
                    filterable 
                    v-model="InputReceiverWalletId" placeholder="Receiver Name" style="width: 25%;"/>
        <EInput v-model="InputAmount" placeholder="Amount" clearable style="width: 25%;"/>
        <EInput v-model="InputDescription" placeholder="Description" clearable style="width: 25%;"/>  
        <EButton @click="transferMoney" :disabled="isDisabled" style="width: 10%;">Submit</EButton> 

    <h3 v-if="senderDetails.length>0">Sender Details</h3>
    <ETable v-if="senderDetails.length>0" :data="senderDetails" border fit clearselection style="width: 100%">
        <ETableColumn prop="wallet_id" label="Id" width="80"/>
        <ETableColumn prop="amount" label="Amount" width="120"/>
        <ETableColumn prop="balance" label="Balance" width="120"/>
        <ETableColumn prop="type" label="Type" width="120">
            {{ InputAmount <= 0 ? 'Credit' : 'Debit' }}
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

    <h3 v-if="receiverDetails.length>0">Receiver Details</h3>
    <ETable v-if="receiverDetails.length>0" :data="receiverDetails" border fit clearselection style="width: 100%">
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
        
    </div>    
</template>

<script>
import { ref,onMounted,computed } from 'vue';
import { walletMixin  } from '../mixin/walletIdsMixing.js';
import axios from 'axios';
export default {
    name:'transferMoney',
    setup() {
        const InputSenderWalletId = ref('');
        const InputReceiverWalletId = ref('');
        const InputAmount = ref('');
        const InputDescription = ref('');
        const walletOptions= ref([]);
        const error = ref('');
        const message = ref('');
        const senderMoneyDetails = ref([]);
        const receiverMoneyDetails = ref([]);
        const showSuccessAlert = ref(false);
        const submitButtonClicked = ref(null);
        const senderDetails = ref([]);
        const receiverDetails = ref([]);

        const props1 = {
            checkStrictly: true,
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
        
        const transferMoney = async() =>{
            try{
                const fromAcc = InputSenderWalletId.value[0];
                const toAcc = InputReceiverWalletId.value[0]; 
                const description = InputDescription.value;
                const amount = Number(InputAmount.value);
                
                const transfer = await axios.post('http://localhost:3000/api/transferMoney',{
                    fromAcc,toAcc,description,amount,
                });

                message.value = transfer.data.message;
                senderDetails.value = [transfer.data.Sender_Details]; 
                receiverDetails.value = [transfer.data.Receiver_Details]; 

                showSuccessAlert.value = true;
                submitButtonClicked.value = true;
            }catch(error1){
                console.log(error1.response.data.error);
                error.value = error1.response.data.error; 
                showSuccessAlert.value = false;
                submitButtonClicked.value=true;
            }
        }

        onMounted(async () => {
                const walletData = await walletMixin();
                walletOptions.value = walletData ? walletData.walletId.map(wallet => ({value:wallet, label:wallet })) : [];
        });

        const isDisabled = computed(() =>{
                return !(InputSenderWalletId.value && InputReceiverWalletId.value && InputAmount.value && InputDescription.value);
        });

        return {
            transferMoney, 
            walletOptions, 
            isDisabled, 
            props1, 
            InputAmount,
            InputReceiverWalletId,
            InputSenderWalletId,
            InputDescription,
            formatDate,
            error,
            message,
            showSuccessAlert,
            submitButtonClicked,
            receiverMoneyDetails,
            senderMoneyDetails,
            senderDetails,
            receiverDetails,
        }

    },
}
</script>
