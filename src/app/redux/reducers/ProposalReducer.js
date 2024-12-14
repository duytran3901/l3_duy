import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proposals: [],
  proposalsByIdEmployee: [],
  proposal: null,
  totalElements: 0,
  totalElementsByIdEmployee: 0,
  reload: false
};

const ProposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    getProposalsByIdEmployee: (state, action) => {
      state.proposalsByIdEmployee = action.payload;
      state.totalElementsByIdEmployee = action.payload.length;
    },
    getProposalsByLeader: (state, action) => {
      state.proposals = action.payload;
      state.totalElements = action.payload.length;
    },
    getProposalById: (state, action) => {
      state.proposal = action.payload;
    },
    createProposal: (state, action) => {
      state.proposalsByIdEmployee = [...action.payload, ...state.proposalsByIdEmployee];
      state.totalElementsByIdEmployee = state.totalElementsByIdEmployee + 1;
    },
    editProposal: (state, action) => {
      const index = state.proposalsByIdEmployee.findIndex(proposal => proposal.id === action.payload.id);
      state.proposalsByIdEmployee.splice(index, 1, action.payload);
      state.reload = !state.reload;
    },
    deleteProposal: (state, action) => {
      state.reload = !state.reload;
      state.totalElementsByIdEmployee = state.totalElementsByIdEmployee - 1;
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
