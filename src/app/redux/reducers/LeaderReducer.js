import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaders: [],
  leader: null,
};

const LeaderSlice = createSlice({
  name: "leader",
  initialState,
  reducers: {
    getLeaders: (state, action) => {
      state.leaders = action.payload;
    },
    getLeaderById: (state, action) => {
      state.leader = action.payload;
    }
  },
});

export const {
  getLeaderById,
  getLeaders
} = LeaderSlice.actions;

export default LeaderSlice.reducer;
