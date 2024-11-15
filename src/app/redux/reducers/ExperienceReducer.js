import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experiences: [],
  experience: null,
  totalElements: 0,
  reload:  false
};

const ExperienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    getExperiencesByIdEmployee: (state, action) => {
      state.experiences = action.payload;
      state.totalElements = action.payload.length;
    },
    getExperienceById: (state, action) => {
      state.experience = action.payload;
    },
    createExperience: (state, action) => {
      state.experiences = [...action.payload, ...state.experiences];
      state.totalElements = state.totalElements + 1;
    },
    editExperience: (state, action) => {
      const index = state.experiences.findIndex(experience => experience.id === action.payload.id);
      state.experiences.splice(index, 1, action.payload);
    },
    deleteExperience: (state, action) => {
      state.reload = !state.reload;
      state.totalElements = state.totalElements - 1;
    }
  },
});

export const {
  getExperiencesByIdEmployee,
  getExperienceById,
  createExperience,
  editExperience,
  deleteExperience
} = ExperienceSlice.actions;

export default ExperienceSlice.reducer;
