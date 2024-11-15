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
      state.totalElements = state.totalElements + 1;
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(employee => employee.id === action.payload.id);
      state.employees.splice(index, 1, action.payload);
      state.employee = action.payload;
      state.reload = !state.reload;
    },
    deleteEmployee: (state, action) => {
      state.employee = null;
      state.totalElements = state.totalElements - 1;
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

