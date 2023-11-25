import axios from '../axios';

export const walletMixin = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/getWalletIds', {});
    const walletData = response.data.walletId;
    const walletObj = {
        walletId: walletData,
    };
    console.log(JSON.stringify(walletData[0]));
    return walletObj;
  } catch (error) {
    console.error('Error creating wallet:', error);
    return null;
  }
};
