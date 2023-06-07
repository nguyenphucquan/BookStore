import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authReducer';
import cartSlice from '../redux/cartSlice';

export default configureStore({
  reducer: {
    authReducer,
    cart: cartSlice,
  },
});
