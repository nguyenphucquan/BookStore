import { createSlice } from '@reduxjs/toolkit';

const CART_LOCAL_STORAGE_KEY = 'cartItems';

// Load cart items from localStorage
const cartItemsFromStorage = JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cartItemsFromStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const { bookId, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.bookId === bookId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const newItem = { bookId, quantity };
        state.cartItems.push(newItem);
        console.log(newItem)
      }
     
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const { bookId } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.bookId === bookId);
      console.log(itemIndex)
      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
      }
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(state.cartItems));
    }, 
    updateCartItems: (state, action) => {
      state.cartItems = action.payload;
    }
    
  }
});

export const { addToCart, removeFromCart, updateCartItems} = cartSlice.actions;
export default cartSlice.reducer;
