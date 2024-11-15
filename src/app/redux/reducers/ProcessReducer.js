import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processList: [],
  process: null,
  totalElements: 0,
  reload: false
};

const ProcessSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    getProcessListByIdEmployee: (state, action) => {
      state.processList = action.payload;
      state.totalElements = action.payload.length;
    },
    getProcessListByLeader: (state, action) => {
      state.processList = action.payload;
      state.totalElements = action.payload.length;
    },
    getProcessById: (state, action) => {
      state.process = action.payload;
    },
    createProcess: (state, action) => {
      state.processList = [...action.payload, ...state.processList];
      state.totalElements = state.totalElements + 1;
    },
    editProcess: (state, action) => {
      const index = state.processList.findIndex(process => process.id === action.payload.id);
      state.processList.splice(index, 1, action.payload);
    },
    deleteProcess: (state, action) => {
      state.reload = !state.reload;
      state.totalElements = state.totalElements - 1;
    }
  },
});

export const {
  getProcessListByIdEmployee,
  getProcessListByLeader,
  getProcessById,
  createProcess,
  editProcess,
  deleteProcess
} = ProcessSlice.actions;

export default ProcessSlice.reducer;
