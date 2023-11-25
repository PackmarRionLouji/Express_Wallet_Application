import { createWebHistory, createRouter } from 'vue-router';
import createWallet from '../components/createWallet.vue';
import homePage from '../components/homePage.vue'
import transactMoney from '../components/transactMoney.vue';
import transferMoney from '../components/transferMoney.vue';
import checkBalance from '../components/checkBalance.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage,
    },
    {
      path: '/createWallet',
      name: 'createWallet',
      component: createWallet,
    },
    {
      path: '/transactMoney',
      name: 'transactMoney',
      component: transactMoney,
    },
    {
      path: '/transferMoney',
      name: 'transgerMoney',
      component: transferMoney,
    },
    {
      path: '/checkBalance',
      name: 'checkBalance',
      component: checkBalance,
    },
  ],
});

export default router;



router.js