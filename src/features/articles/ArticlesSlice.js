import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import articlesService from "./ArticlesReducer";

const initialState = {
  articles: [],
  form: {
    type: "",
    pillar: "",
    title: "",
    header_image: "",
    header_image_mobile: "",
    author: "",
    by_line: "",
    header: "",
    sub_header: "",
    source_url: "",
    banner_image: "",
    banner_link: "",
    life_stage_tag: [],
    persona_tag: [],
    interest_tags: [],
    point: 0,
    duration: 0,
    content: "",
    img: "",
    publish: false,
  },
};

export const get_articles = createAsyncThunk(
  "articles/get_articles",
  async (_, thunkAPI) => {
    try {
      const response = await articlesService.get_articles();

      return response;
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

export const get_single_articles = createAsyncThunk(
  "articles/get_single_articles",
  async (id, thunkAPI) => {
    try {
      const response = await articlesService.get_articles(id);

      return response;
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

export const create_article = createAsyncThunk(
  "articles/create_article",
  async (body, thunkAPI) => {
    try {
      return await articlesService.create_article(body);
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

export const update_article = createAsyncThunk(
  "articles/update_article",
  async (body, thunkAPI) => {
    try {
      return await articlesService.update_article(body);
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

export const Articles = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setPersonaTags: (state, action) => {
      state.form.persona_tag = action.payload;
    },
    setLifeStageTags: (state, action) => {
      state.form.life_stage_tag = action.payload;
    },
    setInterestTags: (state, action) => {
      state.form.interest_tags = action.payload;
    },
    setTextFields: (state, action) => {
      state.form.title = action.payload.title;
      state.form.by_line = action.payload.by_line;
      state.form.header = action.payload.header;
      state.form.sub_header = action.payload.sub_header;
      state.form.banner_link = action.payload.banner_link;
      state.form.source_url = action.payload.source_url;
    },
    setType: (state, action) => {
      state.form.type = action.payload;
    },
    setPillar: (state, action) => {
      state.form.pillar = action.payload;
    },
    setHeaderImg: (state, action) => {
      state.form.header_image = action.payload;
    },
    setCkEditorContent: (state, action) => {
      state.form.content = action.payload;
    },
    removeHeaderImage: (state) => {
      state.form.header_image = "";
    },
    setPublishStatus: (state, action) => {
      state.form.publish = action.payload;
    },
    clearBannerImage: (state, action) => {
      state.form.banner_image = "";
    },
    resetForm: (state) => {
      state.form = {
        type: "",
        pillar: "",
        title: "",
        header_image: "",
        header_image_mobile: "",
        author: "",
        by_line: "",
        header: "",
        sub_header: "",
        source_url: "",
        banner_image: "",
        banner_link: "",
        life_stage_tag: [],
        persona_tag: [],
        interest_tags: [],
        point: 0,
        duration: 0,
        content: "",
        img: "",
        publish: false,
      };
    },
  },

  extraReducers: (builder) => {
    builder

      //get auth access_level
      .addCase(get_articles.pending, (state) => {})
      .addCase(get_articles.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(get_articles.rejected, (state, action) => {})

      .addCase(get_single_articles.pending, (state) => {})
      .addCase(get_single_articles.fulfilled, (state, action) => {
        state.form = action.payload[0];
      })
      .addCase(get_single_articles.rejected, (state, action) => {});
  },
});

// Action creators are generated for each case reducer function
export const {
  setPersonaTags,
  setInterestTags,
  setType,
  setPillar,
  setTextFields,
  setHeaderImg,
  setCkEditorContent,
  removeHeaderImage,
  setLifeStageTags,
  resetForm,
  setPublishStatus,
  clearBannerImage,
} = Articles.actions;

export default Articles.reducer;
