import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosDannyInstance from "app/utils/dannysaxios";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  loading: true,
  topics: {},
  topic: {},
  comments: [],
  errors: {},
  error: "",
  previousPage: "",
  nextPage: "",
  currentPage: Number(""),
  pageCount: Number(""),
  totalPages: Number(""),
};


export const getDsApps = createAsyncThunk(
  "chat/getDsApps",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        `https://django-server-production-dac4.up.railway.app/api/dsapps/`
        // let response = await axiosDannyInstance(
        //   baseURL +
        //     `api/prd/myp/?page=${args.page}&q=${args.query ? args.query : ""}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("chat error: " + err);
      return rejectWithValue(err.response?.data);
    }
  }
);




export const getTopics = createAsyncThunk(
  "chat/getTopics",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(
        `topic/?q=${args ? args : ""}`
        // `http://localhost:8000/api/topic/?q=${args ? args : ""}`
        // let response = await axiosDannyInstance(
        //   baseURL +
        //     `api/prd/myp/?page=${args.page}&q=${args.query ? args.query : ""}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("chat error: " + err);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getTopic = createAsyncThunk(
  "chat/getTopic",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance(
        `topic/${args}/`
        // `http://localhost:8000/api/topic/${args}/`
        // let response = await axiosDannyInstance(
        //   baseURL +
        //     `api/prd/myp/?page=${args.page}&q=${args.query ? args.query : ""}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("chat error: " + err);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const deleteTopic = createAsyncThunk(
  "chat/deleteTopic",
  async (args, { rejectWithValue }) => {
    console.log("ass", args);
    try {
      let response = await axiosDannyInstance.delete(
        `topic/${args.slug}/`
        // let response = await axiosDannyInstance(
        //   baseURL +
        //     `api/prd/myp/?page=${args.page}&q=${args.query ? args.query : ""}`
      );
      if (response.status === 204) {
        toast("topic deleted successfully", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        console.log("response", response);
        return response.data;
      }
    } catch (err) {
      console.log("chat error: " + err);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const addTopics = createAsyncThunk(
  "chat/addTopics",
  async (args, { rejectWithValue }) => {
    console.log('add topic args ', args)
    try {
      let response = await axiosDannyInstance.post(
        `topic/`,
        args
        // let response = await axiosDannyInstance(
        //   baseURL +
        //     `api/prd/myp/?page=${args.page}&q=${args.query ? args.query : ""}`
      );
      console.log('me', response)
      if (response.status === 201) {
        toast("topic successfully added", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        return response.data;
      }
    } catch (err) {
      console.log("chat error: " + err);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getComments = createAsyncThunk(
  "chat/getComments",
  async (id = null, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(
        `comment/`
        // let response = await axiosDannyInstance(
        //   baseURL +
        //     `api/prd/myp/?page=${args.page}&q=${args.query ? args.query : ""}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("comment error: " + err);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const addComments = createAsyncThunk(
  "chat/addComments",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.post(
        `comment/`,
        args
        // let response = await axiosDannyInstance(
        //   baseURL +
        //     `api/prd/myp/?page=${args.page}&q=${args.query ? args.query : ""}`
      );
      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      console.log("comment error: " + err);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const addLikes = createAsyncThunk(
  "chat/addLikes",
  async (args, { rejectWithValue }) => {
    console.log("args", args);
    try {
      let response = await axiosDannyInstance.put(
        `add-likes/${args.id}/`,
        args
        // let response = await axiosDannyInstance(
        //   baseURL +
        //     `api/prd/myp/?page=${args.page}&q=${args.query ? args.query : ""}`
      );
      if (response.status === 200) {
        console.log("see", response.data);
        return response.data;
      }
    } catch (err) {
      console.log("comment error: " + err);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: (state, action) => {},
  extraReducers: (builder) => {
    builder
    .addCase(getDsApps.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(getDsApps.fulfilled, (state, action) => {

      state.app_list = action.payload.results;
      state.loading = false;
      state.pageCount = action.payload.count;
      state.previousPage = action.payload.previous;
      state.nextPage = action.payload.next;
      state.totalPages = action.payload.results.length;
    
    })
    .addCase(getDsApps.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.errors = action.error.message;
    })

      .addCase(getTopics.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTopics.fulfilled, (state, action) => {
        // console.log("action client: " + JSON.stringify(action.payload));
        state.topics = action.payload.results;
        state.loading = false;
        state.pageCount = action.payload.count;
        state.previousPage = action.payload.previous;
        state.nextPage = action.payload.next;
        state.totalPages = action.payload.results.length;
        // console.log("previous page:", state.previousPage);
        // console.log("next page:", state.nextPage);
        // // console.log(location.search)
        // console.log("currentPage", state.pageCount);
      })
      .addCase(getTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getComments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        // console.log("action client: " + JSON.stringify(action.payload));
        state.comments = action.payload.results;
        state.loading = false;
        state.pageCount = action.payload.count;
        state.previousPage = action.payload.previous;
        state.nextPage = action.payload.next;
        state.totalPages = action.payload.results.length;
        // console.log("previous page:", state.previousPage);
        // console.log("next page:", state.nextPage);
        // // console.log(location.search)
        // console.log("currentPage", state.pageCount);
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(addComments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addComments.fulfilled, (state, action) => {
        console.log("new comment", action.payload.topic);

        // console.log("action client: " + JSON.stringify(action.payload));

        state.comments = [...state.comments, action.payload];

        state.loading = false;
      })
      .addCase(addComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(addTopics.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addTopics.fulfilled, (state, action) => {
        console.log("new comment", action.payload.topic);

        // console.log("action client: " + JSON.stringify(action.payload));

        state.topics = [...state.topics, action.payload];

        state.loading = false;
      })
      .addCase(addTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getTopic.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTopic.fulfilled, (state, action) => {
        state.topic = action.payload;
        state.loading = false;
      })
      .addCase(getTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      });
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
