import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Orders = any[]
type Users = any[]

export type HomeState = {
  orders: Orders;
  users:Users;
};

const initialState: HomeState = {
  orders: [],
  users: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Orders>) => {
      state.orders = action.payload;
    },
    setUsers: (state, action: PayloadAction<Orders>) => {
      state.users = action.payload;
    },
  },
});

export const { setOrders } = homeSlice.actions;

export default homeSlice.reducer;
