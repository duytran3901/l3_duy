import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proposals: [],
  proposal: null,
  totalElements: 0,
  reload: false
};

const ProposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    getProposalsByIdEmployee: (state, action) => {
      state.proposals = action.payload;
      state.totalElements = action.payload.length;
    },
    getProposalsByLeader: (state, action) => {
      state.proposals = action.payload;
      state.totalElements = action.payload.length;
    },
    getProposalById: (state, action) => {
      state.proposal = action.payload;
    },
    createProposal: (state, action) => {
      state.proposals = [...action.payload, ...state.proposals];
      state.totalElements = state.totalElements + 1;
    },
    editProposal: (state, action) => {
      const index = state.proposals.findIndex(proposal => proposal.id === action.payload.id);
      state.proposals.splice(index, 1, action.payload);
    },
    deleteProposal: (state, action) => {
      state.reload = !state.reload;
      state.totalElements = state.totalElements - 1;
    }
  },
});

export const {
  getProposalsByIdEmployee,
  getProposalsByLeader,
  getProposalById,
  createProposal,
  editProposal,
  deleteProposal
} = ProposalSlice.actions;

export default ProposalSlice.reducer;
