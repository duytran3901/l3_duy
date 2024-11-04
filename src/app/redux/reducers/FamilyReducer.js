import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  family: [],
  familyMember: null,
  totalElements: 0,
};

const FamilySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    getFamilyByIdEmployee: (state, action) => {
      state.family = action.payload;
      state.totalElements = action.payload.length;
    },
    getFamilyMemberById: (state, action) => {
      state.familyMember = action.payload;
    },
    createFamilyMember: (state, action) => {
      state.totalElements = state.totalElements + 1;
    },
    editFamilyMember: (state, action) => {
      const index = state.family.findIndex(familyMember => familyMember.id === action.payload.id);
      state.family.splice(index, 1, action.payload);
    },
    deleteFamilyMember: (state, action) => {
      state.totalElements = state.totalElements - 1;
    }
  },
});

export const {
  getFamilyByIdEmployee,
  getFamilyMemberById,
  createFamilyMember,
  editFamilyMember,
  deleteFamilyMember
} = FamilySlice.actions;

export default FamilySlice.reducer;
