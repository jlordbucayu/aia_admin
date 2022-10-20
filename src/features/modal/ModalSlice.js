import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuccess: false,
};

export const Modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModalSuccess } = Modal.actions;

export default Modal.reducer;
