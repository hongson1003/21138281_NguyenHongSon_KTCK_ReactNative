import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bikes: [], // Mảng để lưu danh sách xe đạp
};

const bikeSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    addBike: (state, action) => {
      state.bikes.push(action.payload);
    },
    setBikes: (state, action) => {
      state.bikes = action.payload;
    },
  },
});

export const { addBike, setBikes } = bikeSlice.actions;

export default bikeSlice.reducer;
