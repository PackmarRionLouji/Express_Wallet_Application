<template>
    <div style="width: 200px">
        <ECascader :options="options" 
                :props="props" 
                    clearable 
                    filterable 
                    v-model="InputSenderWalletId" placeholder="Sender Wallet Id"/>
        <ECascader :options="options" 
                :props="props" 
                    clearable 
                    filterable 
                    v-model="InputReceiverWalletId" placeholder="Receiver Wallet Id"/>
        <EInput v-model="InputAmount" placeholder="Amount" clearable/>
        <EInput v-model="InputDescription" placeholder="Description" clearable/>   
    </div>    
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        const InputSenderWalletId = ref('');
        const InputReceiverWalletId = ref('');
        const InputAmount = ref('');
        const InputDescription = ref('');
        const props = {
            checkStrictly: true,
        };
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
            options, props, InputAmount,InputReceiverWalletId,InputSenderWalletId,InputDescription
        }

    },
}
</script>
