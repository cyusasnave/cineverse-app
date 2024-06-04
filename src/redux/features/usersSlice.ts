import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicData } from "../../@types/DynamicTypes";

const initialState: DynamicData = {
  data: [],
};

  const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      usersInitialData: (state, action: PayloadAction) => {
        state.data = [action.payload, ...state.data];
      },
      addData: (state, action: PayloadAction<{ data: DynamicData, index: number }>) => {
        state.data[action.payload.index] = [action.payload.data, ...state.data[action.payload.index]] 
      }
    },
  });


export const { usersInitialData } = usersSlice.actions;

export default usersSlice.reducer;
