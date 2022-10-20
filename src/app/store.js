import { configureStore } from "@reduxjs/toolkit";

import ckeditorReducer from "../features/ckeditor/CkEditorSlice";

import articlesReducer from "../features/articles/ArticlesSlice";

import modalReducer from "../features/modal/ModalSlice";

export const store = configureStore({
  reducer: {
    ckeditor: ckeditorReducer,
    articles: articlesReducer,
    modal: modalReducer,
  },
});
