<template>
    <div style="width:200px">
        <ECascader :options="walletOptions" :props="props1" placeholder="Wallet Id" filterable clearable v-model="InputId"/>
        <EButton @click="performHistory" :disabled="isDisabled">Submit</EButton>
    </div>
    <ETable v-if="transactionList.length>0" :data="transactionList" border fit clearselection style="{ width: '100%'}">
        <ETableColumn prop="transaction_id" label="Transaction ID" width="270"/>
        <ETableColumn prop="wallet_id" label="Wallet ID" width="90"/>
        <ETableColumn prop="type" label="Type" width="80"/>
        <ETableColumn prop="amount" label="Amount" width="120"/>
        <ETableColumn prop="balance" label="Balance" width="120"/>
        <ETableColumn prop="created_at" label="Created At" width="185"/>
        <ETableColumn prop="updated_at" label="Updated At" width="185"/>
        <ETableColumn prop="description" label="Description" width="230"/>

        <div class="example-pagination-block">
            <div class="example-demonstration">Pages</div>
                <EPagination
                    @current-change="handlePaginationChange"
                    v-model:currentPage="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                />
            </div>
    </ETable>
</template>


<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { walletMixin } from '../mixin/walletIdsMixing.js';
export default {
    name: "transactionHistory",
    setup() {

        // const totalResponse = await axios.get(`http://localhost:3000/api/transactionTotal?walletId=${walletId}`,{});
        // const page_size = totalResponse.data.getTotal;
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
                console.log(pageSize,total,currentPage);
            }
            catch (error) {
                console.log("Error", error);
            }
        };
        console.log(pageSize);
        const handlePaginationChange = (page) =>{
            currentPage.value = page;
            performHistory();
        }
        const isDisabled = computed(() => {
            return !InputId.value;
        });
        onMounted(async () => {
            const walletData = await walletMixin();
            walletOptions.value = walletData ? walletData.walletId.map(wallet => ({ value: wallet, label: wallet })) : [];
        });
        return {
            InputId,
            isDisabled,
            walletOptions,
            props1,
            performHistory,
            transactionList,
            total,
            currentPage,
            pageSize,
            handlePaginationChange,
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