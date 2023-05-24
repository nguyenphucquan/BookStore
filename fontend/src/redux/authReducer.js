import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem('accessToken') ? true : false ,
  userRole: localStorage.getItem('userRole') ? localStorage.getItem('userRole') : "GUEST"
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userRole = action.payload
    }
  }
})

export const {login} = authReducer.actions;
export default authReducer.reducer;
