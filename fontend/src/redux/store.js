import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/authReducer'


export default configureStore({
  reducer: {
    authReducer
  }
})