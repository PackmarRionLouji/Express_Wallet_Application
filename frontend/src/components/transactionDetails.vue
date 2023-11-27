<template>
    <div style="width: 200px">
        <EInput v-model="InputId" placeholder="Enter Transaction Id" clearable/>  
        <EButton @click="checkTransaction" :disabled="isDisabled">Submit</EButton>
    </div>    
</template>

<script> 
    import { ref,computed } from 'vue';
    import axios from 'axios';
    export default {
        name: 'transactionDetails',
        setup() {
            const InputId = ref('');

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
                    console.log(transactionOutput);
                } catch (error) {
                    console.log('Error finding transaction', error);
                }
            };

            return {
                InputId,checkTransaction,isDisabled,
            }
        }
    }
</script>


<style>
</style>