<template>
    <div style="width: 200px">
        <ECascader :options="walletOptions" :props="props1" placeholder="Wallet Id" clearable filterable v-model="InputId"/>     
        <EButton @click="checkBalance" :disabled="isDisabled">Submit</EButton>
    </div>    
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

            const checkBalance = async () => {
                try {
                    const walletId = Number(InputId.value[0]);
                    const balanceOutput = await axios.post('http://localhost:3000/api/getWalletBalance', {
                        walletId: walletId,
                    });
                    console.log(balanceOutput);
                } catch (error) {
                    console.log('Error finding Wallet', error);
                }
            };

            return {
                props1, InputId,checkBalance,walletOptions,isDisabled,
            }
        }
    }
</script>


<style>
</style>