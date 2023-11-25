import { createWebHistory, createRouter } from 'vue-router';
import createWallet from '../components/createWallet.vue';
import homePage from '../components/homePage.vue'
import transactMoney from '../components/transactMoney.vue';
import transferMoney from '../components/transferMoney.vue';

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
  ],
});

export default router;



router.js
// import { createRouter, createWebHistory } from 'vue-router';
// import homePage from '@/components';
// import createWallet from '../components';

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: homePage,
//   },
//   {
//     path: '/createWallet',
//     name: 'createWallet',
//     component: createWallet,
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
