import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    phoneNumber: null,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    logOut: (state) => {
      state.id = null;
      state.phoneNumber = null;
    }
  }
});

export const { setId, setPhoneNumber, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
