<template>
    <div style="width: 200px">
        <ECascader :options="walletOptions" 
                   :props="props1" 
                    clearable 
                    filterable 
                    v-model="InputSenderWalletId" placeholder="Sender Name"/>
        <ECascader :options="walletOptions" 
                   :props="props1" 
                    clearable 
                    filterable 
                    v-model="InputReceiverWalletId" placeholder="Receiver Name"/>
        <EInput v-model="InputAmount" placeholder="Amount" clearable/>
        <EInput v-model="InputDescription" placeholder="Description" clearable/>  
        <EButton @click="transferMoney" :disabled="isDisabled">Submit</EButton> 
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

        const props1 = {
            checkStrictly: true,
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
                console.log(transfer);
            }catch(error){
                console.log("Error transferring money",error);
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
            transferMoney, walletOptions, isDisabled, props1, InputAmount,InputReceiverWalletId,InputSenderWalletId,InputDescription
        }

    },
}
</script>
