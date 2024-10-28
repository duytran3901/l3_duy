import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  employee: null,
  idEmployee: 0,
  totalElements: 0,
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
      state.employee = action.payload.data;
    },
    createEmployee: (state, action) => {
      state.idEmployee = action.payload.id;
      state.totalElements = state.totalElements + 1;
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(employee => employee.id === action.payload.id);
      state.employees.splice(index, 1, action.payload);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
      state.employee = null;
      state.totalElements = state.totalElements - 1;
    }
  },
});

export const {
  getEmployeeById,
  createEmployee,
  editEmployee,
  searchEmployee,
  deleteEmployee
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;

