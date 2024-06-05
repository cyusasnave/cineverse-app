import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicData } from "../../@types/DynamicTypes";

const initialState: DynamicData = {
  data: []
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    initialMovies: (state, action: PayloadAction ) => {
      state.data = [action.payload, ...state.data];
    }
  }
})

export const { initialMovies } = movieSlice.actions;

export default movieSlice.reducer;