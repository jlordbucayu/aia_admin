import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ckeditorService from "./CkEditorReducer";

const initialState = {

  content: "",
  img: "",
};

export const submit_form = createAsyncThunk(
  "ckeditor/submit_form",
  async (body, thunkAPI) => {
    try {
      return await ckeditorService.submit_form(body);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const CkEditor = createSlice({
  name: "ckeditor",
  initialState,
  reducers: {
    
    getCkEditorContent: (state, action) => {
      state.content = action.payload.content;
    },
    getCkEditorImage: (state, action) => {
      state.img = action.payload.image;
    },
  },

  extraReducers: (builder) => {
    builder

      //get auth access_level
      .addCase(submit_form.pending, (state) => {})
      .addCase(submit_form.fulfilled, (state, action) => {})
      .addCase(submit_form.rejected, (state, action) => {});
  },
});

// Action creators are generated for each case reducer function
export const { getCkEditorContent, getCkEditorImage } =
  CkEditor.actions;

export default CkEditor.reducer;
