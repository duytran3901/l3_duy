import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processList: [],
  processListByIdEmployee: [],
  process: null,
  totalElements: 0,
  totalElementsByIdEmployee: 0,
  reload: false
};

const ProcessSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    getProcessListByIdEmployee: (state, action) => {
      state.processListByIdEmployee = action.payload;
      state.totalElementsByIdEmployee = action.payload.length;
    },
    getProcessListByLeader: (state, action) => {
      state.processList = action.payload;
      state.totalElements = action.payload.length;
    },
    getProcessById: (state, action) => {
      state.process = action.payload;
    },
    createProcess: (state, action) => {
      state.processListByIdEmployee = [...action.payload, ...state.processListByIdEmployee];
      state.totalElementsByIdEmployee = state.totalElementsByIdEmployee + 1;
    },
    editProcess: (state, action) => {
      const index = state.processListByIdEmployee.findIndex(process => process.id === action.payload.id);
      state.processListByIdEmployee.splice(index, 1, action.payload);
      state.reload = !state.reload;
    },
    deleteProcess: (state, action) => {
      state.reload = !state.reload;
      state.totalElementsByIdEmployee = state.totalElementsByIdEmployee - 1;
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
