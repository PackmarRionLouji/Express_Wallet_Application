<template>
    <div style="width:200px">
        <ECascader :options="walletOptions" :props="props1" placeholder="Wallet Id" filterable clearable v-model="InputId"/>
        <EButton @click="performHistory" :disabled="isDisabled">Submit</EButton>
        
    </div>
    <EButton :disabled="isDisabled" @click="downloadTransaction">Download Transaction</EButton>
    <ETable v-if="transactionList.length>0" :data="transactionList" border fit clearselection style="width: 100%">
        <ETableColumn prop="transaction_id" label="Transaction ID" width="270"/>
        <ETableColumn prop="wallet_id" label="Wallet ID" width="85"/>
        <ETableColumn prop="type" label="Type" width="70">
            <template #default="{ row }">
                {{ type(row.type) }}
            </template>
        </ETableColumn>
        <ETableColumn prop="amount" label="Amount" width="100"/>
        <ETableColumn prop="balance" label="Balance" width="100"/>
        <ETableColumn prop="created_at" label="Created At" width="220"> 
            <template #default="{ row }">
                {{ formatDate(row.created_at) }}
            </template>
        </ETableColumn>
        <ETableColumn prop="updated_at" label="Updated At" width="220"> 
            <template #default="{ row }">
                {{ formatDate(row.created_at) }}
            </template>
        </ETableColumn>
        <ETableColumn prop="description" label="Description" width="220"/>
    </ETable>

    <div class="example-pagination-block">
    <EPagination
        @current-change="handlePaginationChange"
        v-model:currentPage.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
    />
    </div>

            

</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { walletMixin } from '../mixin/walletIdsMixing.js';
export default {
    name: "transactionHistory",
    setup() {
        const InputId = ref("");
        const walletOptions = ref([]);
        const transactionList = ref([]);
        const total = ref(0); 
        const currentPage = ref(1);
        const pageSize = ref(2);

        const props1 = {
            checkStrictly: true,
        };
        const performHistory = async () => {
            try {
                const walletId = Number(InputId.value[0]);
                const response = await axios.get(`http://localhost:3000/api/getTransactionsList?walletId=${walletId}&page=1`, {});
                console.log(response);
                if (response.data.transactions && response.data.transactions.length > 0) {
                    transactionList.value = response.data.transactions;
                    total.value = Number(response.data.totalCount);
                    // console.log(total.value);
                    pageSize.value = Math.ceil((total.value)/2);
                    // console.log(pageSize);
                }
                else {
                    transactionList.value = [];
                }
                // console.log(pageSize,total,currentPage);
            }
            catch (error) {
                console.log("Error", error);
            }
        };
        console.log(pageSize);

        const downloadTransaction = async() =>{
            try{
                const walletId = Number(InputId.value[0]);
                const format = "excel";
                const response = await axios.post('http://localhost:3000/api/downloadFile',{
                    walletId, format,
                },{responseType: 'blob'});
                console.log(response);

                    const filename = `download_${Date.now()}.xlsx`;  // Generate a filename

                    const blob = new Blob([response.data], { type: response.headers['content-type'] });
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = filename;
                    link.click();

            }catch(error){
                console.log("Error",error);
            }
        };

        const handlePaginationChange = (page) =>{
            currentPage.value = page;
            console.log(currentPage,total,pageSize);
        }

        const isDisabled = computed(() => {
            return !InputId.value;
        });
     
        onMounted(async () => {
            const walletData = await walletMixin();
            walletOptions.value = walletData ? walletData.walletId.map(wallet => ({ value: wallet, label: wallet })) : [];
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

        const type = (type) =>{
            if(type===0){
                return "Debit";
            }
            else if(type===1){
                return "Credit";
            }
        };

        return {
            InputId,
            isDisabled,
            formatDate,
            walletOptions,
            props1,
            performHistory,
            transactionList,
            total,
            currentPage,
            pageSize,
            handlePaginationChange,
            downloadTransaction,
            type,
        };
    },
}
</script>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>