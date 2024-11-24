import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  employee: null,
  idEmployee: 0,
  totalElements: 0,
  reload: false
};

const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    searchEmployee: (state, action) => {
      state.employees = action.payload.data;
      state.totalElements = action.payload.totalElements;
    },
    getEmployeeById: (state, action) => {
      state.employee = action.payload;
    },
    resetEmployeeId: (state) => {
      state.idEmployee = 0;
    },
    createEmployee: (state, action) => {
      state.idEmployee = action.payload.id;
      state.reload = !state.reload;
    },
    editEmployee: (state, action) => {
      state.employee = action.payload;
      state.reload = !state.reload;
    },
    deleteEmployee: (state) => {
      state.employee = null;
      state.reload = !state.reload
    }
  },
});

export const {
  getEmployeeById,
  resetEmployeeId,
  createEmployee,
  editEmployee,
  searchEmployee,
  deleteEmployee
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;

