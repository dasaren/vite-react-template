import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosDannyInstance from "app/utils/dannysaxios";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";

const getTeamsFromLocalStorage = JSON.parse(localStorage.getItem("teams"))
  ? JSON.parse(localStorage.getItem("teams"))
  : {};

// const location = useLocation()
const getPage = 2;
const initialState = {
  loading: false,
  isAuthenticated: false,
  token: "",
  leads: [],
  lead: {},
  error: "",
  errors: [],
  teams: getTeamsFromLocalStorage,
  team: [],
  previousPage: "",
  nextPage: "",
  currentPage: Number(""),
  pageCount: Number(""),
  plan: {},
  plans: [],
};

export const getLeads = createAsyncThunk(
  "crm/getLeads",

  async (args, { rejectWithValue }) => {
    console.log("args", args);
    try {
      let response = await axiosDannyInstance.get(
        // `leads/?page=${args.page}`
        `leads/?page=${args.page}&search=${args.query ? args.query : ""}`
        // `leads/?page=${args.page}?search=${args.query}`
      );
      // let response = await axiosDannyInstance.get(`leads/?page=${state.currentPage}`)
      if (response.status === 200) {
        // previousPage = response.data
        return response.data;
      }
    } catch (err) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getLead = createAsyncThunk(
  "crm/getLead",

  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(`leads/${args}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addLead = createAsyncThunk(
  "crm/addLead",
  async (args, { rejectWithValue }) => {
    console.log("args  ", args);
    try {
      let response = await axiosDannyInstance.post("leads/", args);
      console.log("addLeadResponse :", response);
      if (response.status === 201) {
        toast("new lead created", {
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

export const editLead = createAsyncThunk(
  "crm/editLead",
  async (args, { rejectWithValue }) => {
    console.log("args  ", args);
    try {
      let response = await axiosDannyInstance.put(`leads/${args.id}/`, args);
      console.log("addLeadResponse :", response);
      if (response.status === 200) {
        toast(" lead edited succesfully", {
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

export const getTeams = createAsyncThunk(
  "crm/getTeams",

  async (id = null, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get("teams");
      if (response.status === 200) {
        return response.data.results;
      }
    } catch (err) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getMyTeam = createAsyncThunk(
  "crm/getMyTeam",

  async (id = null, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get("teams/myteam");

      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addTeam = createAsyncThunk(
  "crm/addTeam",
  async (args, { rejectWithValue }) => {
    console.log("args  ", args);
    try {
      let response = await axiosDannyInstance.post("teams/", args);
      console.log("addTeamResponse :", response);
      if (response.status === 201) {
        toast("new team created", {
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

export const addMember = createAsyncThunk(
  "crm/addMember",
  async (args, { rejectWithValue }) => {
    console.log("args add member ", args);
    try {
      let response = await axiosDannyInstance.post("teams/addmember/", args);
      console.log("addMmberResponse :", response);
      if (response.status === 200) {
        toast("new member added", {
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

export const getPlans = createAsyncThunk(
  "clients/getPlans",

  async (id, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(`teams/plans/getplans/`);
      console.log("plan response   ", response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const upgradePlan = createAsyncThunk(
  "crm/upgradePlan",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.post("teams/upgrade-plan/", args);
      // console.log("upgrade : ", response);
      if (response.status === 200) {
        toast("plan upgrade success", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        return response.data;
      }
    } catch (error) {
      console.log(error.response);
      rejectWithValue(error.response?.data);
      return;
    }
  }
);

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    increasePage: (state, action) => {
      state.currentPage += 1;
      console.log("inc", state.currentPage);
    },
    decreasePage: (state, action) => {
      if (state.currentPage > 0) {
        state.currentPage--;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeads.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLeads.fulfilled, (state, action) => {
        console.log("action: " + JSON.stringify(action.payload));
        console.log("previous page:", state.previousPage);
        state.pageCount = action.payload.count;
        state.previousPage = action.payload.previous;
        state.nextPage = action.payload.next;
        console.log("previous page:", state.previousPage);
        console.log("next page:", state.nextPage);
        // console.log(location.search)
        console.log("currentPage", state.pageCount);
        state.leads = action.payload.results;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(addLead.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        console.log("action: " + action.payload);
        state.leads = [...state.leads, action.payload];
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(addLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })

      .addCase(getLead.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLead.fulfilled, (state, action) => {
        state, (state.leads = [...state.leads]), (state.lead = action.payload);
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(editLead.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editLead.fulfilled, (state, action) => {
        state, (state.leads = [...state.leads]), (state.lead = action.payload);
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(editLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getTeams.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        console.log("action: " + action.payload);
        state.teams = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(addTeam.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        console.log("action: " + action.payload);
        state.teams = [...state.teams, action.payload];
        localStorage.setItem("teams", JSON.stringify(state.teams)),
          (state.isAuthenticated = true);
        state.loading = false;
        state.leads = [...state.leads];
      })
      .addCase(addTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getMyTeam.fulfilled, (state, action) => {
        state.team = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getMyTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        console.log("action: " + action.payload);
        // state.teams = [state.teams]
        // state.team = [state.team.member, action.payload]
        state.loading = false;
        state.leads = [state.leads];
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        console.log("action: " + JSON.stringify(action.payload));
        // console.log("previous page:", state.previousPage);
        state.pageCount = action.payload.count;
        state.previousPage = action.payload.previous;
        state.nextPage = action.payload.next;
        // console.log("previous page:", state.previousPage);
        // console.log("next page:", state.nextPage);
        // console.log(location.search)
        console.log("currentPage", state.pageCount);
        state.plans = action.payload.results;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      });
  },
});

export const { increasePage, decreasePage } = crmSlice.actions;
export default crmSlice.reducer;
