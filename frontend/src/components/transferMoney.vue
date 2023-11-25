<template>
    <div style="width: 200px">
        <ECascader :options="walletOptions" 
                   :props="props" 
                    clearable 
                    filterable 
                    v-model="InputSenderWalletId" placeholder="Sender Wallet Id"/>
        <ECascader :options="walletOptions" 
                   :props="props" 
                    clearable 
                    filterable 
                    v-model="InputReceiverWalletId" placeholder="Receiver Wallet Id"/>
        <EInput v-model="InputAmount" placeholder="Amount" clearable/>
        <EInput v-model="InputDescription" placeholder="Description" clearable/>   
    </div>    
</template>

<script>
import { ref,onMounted } from 'vue';
import { walletMixin  } from '../mixin/walletIdsMixing.js';
export default {
    name:'transferMoney',
    setup() {
        const InputSenderWalletId = ref('');
        const InputReceiverWalletId = ref('');
        const InputAmount = ref('');
        const InputDescription = ref('');
        const walletOptions= ref('');

        const props = {
            checkStrictly: true,
        };

        onMounted(async () => {
            const walletData = await walletMixin();
            walletOptions.value = walletData ? walletData.walletId.map(wallet => ({ value: wallet, label: wallet})) : [];
        })

        return {
            walletOptions, props, InputAmount,InputReceiverWalletId,InputSenderWalletId,InputDescription
        }

    },
}
</script>
