import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosDannyInstance from "app/utils/dannysaxios";
import { toast } from "react-toastify";
const initialState = {
  notes: [],
  note: {},
  clients: [],
  client: {},
  isAuthenticated: false,
  loading: false,
  status: "",
  error: "",
  errors: {},
  previousPage: "",
  nextPage: "",
  currentPage: Number(""),
  pageCount: Number(""),
  totalPages: Number(""),
  plan: {},
};

export const getClients = createAsyncThunk(
  "clients/getClients",

  async (args, { rejectWithValue }) => {
    console.log("args", args);
    try {
      let response = await axiosDannyInstance.get(
        `clients/?page=${args.page}&q=${args.query ? args.query : ""}` // `clients/?page=${args.page}&?q=${args.query}`
        // `leads/?page=${args.page}&search=${args.query ? args.query : ""}`
      );
      console.log("client response   ", response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addClient = createAsyncThunk(
  "clients/addClient",
  async (args, { rejectWithValue }) => {
    console.log("args  ", args);
    try {
      let response = await axiosDannyInstance.post("clients/", args);
      console.log("addClientResponse :", response);
      if (response.status === 201) {
        toast("new client created", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getClient = createAsyncThunk(
  "clients/getClient",

  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(`clients/${args}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editClient = createAsyncThunk(
  "crm/editClient",
  async (args, { rejectWithValue }) => {
    console.log("args  ", args);
    try {
      let response = await axiosDannyInstance.put(`clients/${args.id}/`, args);
      console.log("addLeadResponse :", response);
      if (response.status === 200) {
        toast(" client edited succesfully", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getNotes = createAsyncThunk(
  "clients/getNotes",

  async (id, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(`notes/?client_id=${id}`);
      console.log("client response   ", response);
      if (response.status === 200) {
        return response.data.results;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addNotes = createAsyncThunk(
  "notes/addNotes",
  async (args, { rejectWithValue }) => {
    console.log("args  ", args);
    try {
      let response = await axiosDannyInstance.post("notes/", args);
      console.log("addNotesResponse :", response);
      if (response.status === 201) {
        toast("new notes created", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        return response.data;
      }
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getNote = createAsyncThunk(
  "notes/getNote",

  async (id, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(
        `notes/${id}/?client_id=${id}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editNote = createAsyncThunk(
  "crm/editNote",
  async (args, { rejectWithValue }) => {
    console.log("args  ", args);
    try {
      let response = await axiosDannyInstance.put(
        `notes/${args.id}/?client_id=${args.id}`,
        args
      );
      console.log("addLeadResponse :", response);
      if (response.status === 200) {
        toast(" client edited succesfully", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        console.log("action client: " + JSON.stringify(action.payload));
        state.clients = action.payload.results;
        state.isAuthenticated = true;
        state.loading = false;
        state.pageCount = action.payload.count;
        state.previousPage = action.payload.previous;
        state.nextPage = action.payload.next;
        state.totalPages = action.payload.results.length;
        console.log("previous page:", state.previousPage);
        console.log("next page:", state.nextPage);
        // console.log(location.search)
        console.log("currentPage", state.pageCount);
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(addClient.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        console.log("action: " + action.payload);
        state.clients = [...state.clients, action.payload];
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getClient.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getClient.fulfilled, (state, action) => {
        console.log("client :", action.payload);
        state,
          (state.clients = [...state.clients]),
          (state.client = action.payload);

        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(editClient.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editClient.fulfilled, (state, action) => {
        state,
          (state.clients = [...state.clients]),
          (state.client = action.payload);
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(editClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getNotes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        console.log("action note: " + JSON.stringify(action.payload));
        state.notes = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(addNotes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        console.log("action: " + action.payload);
        state.notes = [...state.notes, action.payload];
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(addNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getNote.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state, (state.notes = [...state.notes]), (state.note = action.payload);
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(editNote.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state, (state.notes = [...state.notes]), (state.note = action.payload);
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(editNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      });
  },
});

export const {} = clientSlice.actions;
export default clientSlice.reducer;
