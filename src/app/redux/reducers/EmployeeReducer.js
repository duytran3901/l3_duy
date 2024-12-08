import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  employee: null,
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
    createEmployee: (state, action) => {
      state.employee = action.payload;
      state.reload = !state.reload;
    },
    resetEmployee: (state) => {
      state.employee = null;
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
  createEmployee,
  resetEmployee, 
  editEmployee,
  searchEmployee,
  deleteEmployee
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;

