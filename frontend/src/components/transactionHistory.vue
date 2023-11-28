<template>

    <EAlert v-if="submitButtonClicked && showSuccessAlert " type="success" effect="dark" center show-icon>
      <strong>{{ `${displayMessage}` }}</strong><br>
    </EAlert>
    <EAlert v-else-if="submitButtonClicked && !showSuccessAlert" title="Transaction Failed" type="error" effect="dark" center show-icon>
      {{ `${errorMessage}` }}
    </EAlert>


    <div style="display: flex; flex-direction: column; align-items: center; width: 100vw; margin-top: 50px;">        
        <ECascader :options="walletOptions" :props="props1" placeholder="Name" filterable clearable v-model="InputId" style="20%;"/>
        <EButton @click="performHistory" :disabled="isDisabled" style="20%;">Submit</EButton>
        <EButton v-if="transactionList.length>0" :disabled="isDisabled" @click="downloadTransaction" style="25%;">Download All Transactions</EButton>
    </div>
    <ETable v-if="transactionList.length>0" :data="transactionList" border fit clearselection style="width: 100%">
        <ETableColumn prop="transaction_id" label="Transaction ID" width="300"/>
        <ETableColumn prop="wallet_id" label="Wallet ID" width="100"/>
        <ETableColumn prop="type" label="Type" width="90">
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

    <div class="pagination-container" v-if="pageSize>1">
        <EPagination
            v-if="pageSize>1"
            :page-size=pageSize
            :pager-count="calculatePagerCount"
            background layout="prev, pager, next"
            :total="total"
            @current-change="handlePaginationChange"
            v-model:currentPage.sync="currentPage"
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
        const pageSize = ref(0);
        const displayMessage = ref('');
        const errorMessage = ref('');
        const showSuccessAlert = ref(false);
        const submitButtonClicked = ref(null);

        const props1 = {
            checkStrictly: true,
        };
        const performHistory = async () => {
            try {
                const walletId = InputId.value[0];
                // console.log(walletId);
                const response = await axios.get(`http://localhost:3000/api/getTransactionsList?walletId=${walletId}&page=${currentPage.value}`, {});
                // console.log(response);
                if (response.data.transactions && response.data.transactions.length > 0) {
                    transactionList.value = response.data.transactions;
                    // console.log(response.data.transactions);
                    total.value = Number(response.data.totalCount);
                    pageSize.value = Number(response.data.limit);
                    displayMessage.value = 'Transactions fetched Successfully';
                    // console.log(transactionList);
                    // console.log(total.value);
                    // console.log(pageSize);
                    showSuccessAlert.value = true;
                    submitButtonClicked.value = true;

                }
                else {
                    transactionList.value = [];
                    showSuccessAlert.value = true;
                    submitButtonClicked.value = true;
                }
                // console.log(pageSize,total,currentPage);
            }
            catch (error) {
                showSuccessAlert.value = false;
                submitButtonClicked.value = true;
                error.value = 'Error fetching Transactions';
            }
        };


        const calculatePagerCount = computed(() => {
            return Math.ceil(total.value / pageSize.value);
        });
        // console.log(pageSize);

        const downloadTransaction = async() =>{
            try{
                const userName = InputId.value[0];
                const format = "excel";
                const response = await axios.post('http://localhost:3000/api/downloadFile',{
                    userName, format,
                },{responseType: 'blob'});
                console.log(response);

                    const filename = `download_${Date.now()}.xlsx`;  // Generate a filename

                    const blob = new Blob([response.data], { type: response.headers['content-type'] });
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = filename;
                    link.click();
                    showSuccessAlert.value = true;
                    submitButtonClicked.value = true;
                    displayMessage.value = "File Downloaded Successfully";

            }catch(error){
                showSuccessAlert.value = false;
                submitButtonClicked.value = true;
                errorMessage.value = "File Download Failed";
            }
        };

        const handlePaginationChange = (page) =>{
            currentPage.value = page;
            performHistory();
        }

        const isDisabled = computed(() => {
            return !InputId.value;
        });
     
        onMounted(async () => {
            // await performHistory();
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
            calculatePagerCount,
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
            displayMessage,
            errorMessage,
            showSuccessAlert,
            submitButtonClicked,
        };
    },
}
</script>

<style scoped>
</style>