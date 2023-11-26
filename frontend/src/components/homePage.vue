<!-- transaction histore -->
<!-- download file -->
<!-- transaction details -->
<template>
  <div>
    <div class="button-container">
      <!-- <router-link to="/create-wallet"> -->
      <EButton round @click="createWallet" class="centered-button">Create Wallet</EButton>
      <!-- </router-link> -->
      <EButton round @click="transferMoney" class="centered-button">Transfer Money</EButton>
      <EButton round @click="transactMoney" class="centered-button">Transact Money</EButton>
      <EButton round @click="checkBalance" class="centered-button">Check Balance</EButton>
      <EButton round @click="transactionHistory" class="centered-button">Transaction History</EButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      count: 0
    };
  },
  methods: {
    createWallet() {
      console.log("Create Wallet");
      this.$router.push('/createWallet');
    },
    transferMoney() {
      console.log("Transfer Money Clicked");
      this.$router.push('/transferMoney');
    },
    transactMoney() {
      console.log("Transact Money Clicked");
      this.$router.push('/transactMoney');
    },
    checkBalance() {
      console.log("Check Balance Clicked");
      this.$router.push('/checkBalance');
    },
    transactionHistory() {
      console.log("Transaction history clicked");
      this.$router.push('/transactionHistory');
    },
  },
};
</script>

<style>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.centered-button {
  background-color: yellowgreen !important;
  color: black !important;
  margin: 10px !important;
  padding: 20px 80px !important;
}
</style>
