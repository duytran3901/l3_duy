import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  certificates: [],
  certificate: null,
  totalElements: 0
};

const CertificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    getCertificatesByIdEmployee: (state, action) => {
      state.certificates = action.payload;
      state.totalElements = action.payload.length;
    },
    getCertificateById: (state, action) => {
      state.certificate = action.payload;
    },
    createCertificate: (state, action) => {
      state.totalElements = state.totalElements + 1;
    },
    editCertificate: (state, action) => {
      const index = state.certificates.findIndex(certificate => certificate.id === action.payload.id);
      state.certificates.splice(index, 1, action.payload);
    },
    deleteCertificate: (state, action) => {
      state.totalElements = state.totalElements - 1;
    }
  },
});

export const {
  getCertificatesByIdEmployee,
  getCertificateById,
  createCertificate,
  editCertificate,
  deleteCertificate
} = CertificateSlice.actions;

export default CertificateSlice.reducer;
