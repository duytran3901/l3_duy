import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salarys: [],
  salarysByIdEmployee: [],
  salary: null,
  totalElements: 0,
  totalElementsByIdEmployee: 0,
  reload: false
};

const SalarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    getSalarysByIdEmployee: (state, action) => {
      state.salarysByIdEmployee = action.payload;
      state.totalElementsByIdEmployee = action.payload.length;
    },
    getSalarysByLeader: (state, action) => {
      state.salarys = action.payload;
      state.totalElements = action.payload.length;
    },
    getSalaryById: (state, action) => {
      state.salary = action.payload;
    },
    createSalary: (state, action) => {
      state.salarysByIdEmployee = [...action.payload, ...state.salarysByIdEmployee];
      state.totalElements = state.totalElements + 1;
      state.totalElementsByIdEmployee = state.totalElementsByIdEmployee + 1;
    },
    editSalary: (state, action) => {
      const index = state.salarysByIdEmployee.findIndex(salary => salary.id === action.payload.id);
      state.salarysByIdEmployee.splice(index, 1, action.payload);
      state.reload = !state.reload;
    },
    deleteSalary: (state, action) => {
      state.reload = !state.reload;
      state.totalElementsByIdEmployee = state.totalElementsByIdEmployee - 1;
    }
  },
});

export const {
  getSalarysByIdEmployee,
  getSalarysByLeader,
  getSalaryById,
  createSalary,
  editSalary,
  deleteSalary
} = SalarySlice.actions;

export default SalarySlice.reducer;
