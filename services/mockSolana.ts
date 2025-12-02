import { UserState } from '../types';
import { MOCK_USER_ADDRESS, MOCK_INITIAL_BALANCE } from '../constants';

// Keys for localStorage
const STORAGE_KEY_USER = 'pokemarket_user_v1';

export const getStoredUser = (): UserState => {
  const stored = localStorage.getItem(STORAGE_KEY_USER);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    isConnected: false,
    address: null,
    balance: 0,
    inventoryIds: [],
  };
};

export const saveUser = (user: UserState) => {
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
};

export const connectWalletMock = async (): Promise<UserState> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getStoredUser();
      const updatedUser = {
        ...user,
        isConnected: true,
        address: MOCK_USER_ADDRESS,
        balance: user.balance || MOCK_INITIAL_BALANCE, // Restore balance or init
      };
      saveUser(updatedUser);
      resolve(updatedUser);
    }, 1500); // Simulate network delay
  });
};

export const disconnectWalletMock = async (): Promise<UserState> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        const resetUser = {
            isConnected: false,
            address: null,
            balance: 0,
            inventoryIds: []
        };
        // In a real app we might keep inventory in local storage but clear session
        // For simulation, we'll keep the inventory in storage but 'lock' access
        const currentUser = getStoredUser();
        saveUser({...currentUser, isConnected: false});
        resolve({...currentUser, isConnected: false});
    }, 500);
  });
};

export const purchaseAssetMock = async (assetId: string, price: number): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getStoredUser();
      
      if (!user.isConnected) {
        resolve({ success: false, message: 'Wallet not connected' });
        return;
      }

      if (user.balance < price) {
        resolve({ success: false, message: 'Insufficient SOL balance' });
        return;
      }

      if (user.inventoryIds.includes(assetId)) {
          resolve({ success: false, message: 'You already own this asset' });
          return;
      }

      // Process "transaction"
      const updatedUser = {
        ...user,
        balance: user.balance - price,
        inventoryIds: [...user.inventoryIds, assetId],
      };
      saveUser(updatedUser);
      resolve({ success: true, message: 'Transaction Confirmed!' });
    }, 2000);
  });
};