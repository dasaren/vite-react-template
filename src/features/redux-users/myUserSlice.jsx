import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { API_URL } from 'config'
import axios from "axios";
import jwt_decode from "jwt-decode";
import axiosInstance from "app/utils/dannysaxios";
import axiosDannyInstance from "app/utils/dannysaxios";
import axiosAuthInstance from "app/utils/Login";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const tryUserFromStorage = JSON.parse(localStorage.getItem("userProfile"))
  ? JSON.parse(localStorage.getItem("userProfile"))
  : {};

const initialState = {
  entities: [],
  users: [],
  userProfile: {},
  errors: [],
  isAuthenticated: false,
  // user: null,
  loading: false,
  registered: false,
  token: "",
  refresh: "",
  access: "",
  user: {
    token: "",
    name: "",
    email: "",
    first_name: "",
  },
  tryUser: tryUserFromStorage,
  tokenUser: {},
  facebook: {},
};

export const getUsers = createAsyncThunk(
  "myuser/getUsers",
  async (id = null, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get("users/list");
      // console.log('user response res', response)
      if (response.status === 200) {
        // console.log('user response', response.data)
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getProfile = createAsyncThunk(
  "myuser/getProfile",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(`/users/user/${args}`);

      // if (response.status === 200) {
      return response.data;
      // }
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "myuser/getUserInfo",
  async (id = null, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(`/users/user-profile/`);

      // if (response.status === 200) {
      return response.data;
      // }
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "myuser/updateUser",
  async (args, { rejectWithValue }) => {
    console.log("args", args);
    try {
      let response = await axiosDannyInstance.put(
        `users/user-profile/${args.id}/`,
        args.formData
      );
      console.log("update user response:  ", response.data);
      if (response.data === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("error", error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const tokenLogin = createAsyncThunk(
  "myuser/tokenLogin",
  async (args, thunkAPI) => {
    try {
      let response = await axiosInstance
        //  let response = await axios
        //  .post('http://localhost:8000/api/token/',args
        .post(
          `${baseURL}token/`,
          args
          //  {
          //   email: email,
          //   password: password,
          // }
        );
      // console.log('token response', response)
      // localStorage.setItem('authTokens', JSON.stringify(response.data))
      // console.log('fff', response.data.access)
      //  axiosInstance.defaults.headers['Authorization'] =
      //    'Bearer ' + response.data.access

      // console.log('headerrrsss', axiosInstance.defaults.headers['Authorization'])

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");

        // console.log(
        //   "investigate resp header:",
        //   axiosInstance.defaults.headers["Authorization"]
        // );
        // localStorage.setItem('authTokens', JSON.stringify(response.data))
        // localStorage.setItem('authRefresh', response.data.refresh)
        // axiosInstance.post('token/',args)

        return response.data;
      }

      console.log('finnaly');
    } catch (err) {
      console.error("inuserslice token error", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const mytoken = createAsyncThunk(
  "myuser/mytoken",
  async ({ email, password }, thunkAPI) => {
    // console.log(email, password, 'checking....')
    try {
      let response = await axios.post(`https://django-server-production-dac4.up.railway.app/api/token/`, {
        email: email,
        password: password,
      });
      // console.log("re is 200ggg", response);
      // console.log("re is 200 and ...", response.data);
      if (response.status === 200) {
        // console.log("fine fine ")
        // console.log('rrrrrrrrr', response.data)
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosDannyInstance.defaults.headers["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");

        // console.log(
        //   "mytoken authothorization head",
        //   axiosInstance.defaults.headers["Authorization"]
        // );
        return response.data;
      }
    } catch (err) {
      console.error("inuserslice token error", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const mysocialtokenlogin = createAsyncThunk(
  "myuser/mysocialtokenlogin",
  async ({ email, password }, thunkAPI) => {
    try {
      let response = await axios.post("http://localhost:8000/auth/token", {
        username: email,
        password: password,
        grant_type: "password",
        client_id: "t0SULE7DeZcPcebnvxytgObJcp425AgmDrTcnlxs",
        client_secret:
          "y04sNMddLAawcxM3BTNhenzlRpXv6a2E5uR1bFPbqteR8cdzspMuLR0zU2EblJley8zyiw6QTc9qm8JCDbMWeR6yhVBs3xVfXE4YuMuf3dmRIZcp65PqYvrA4epLs78Q",
      });
      console.log("socialAuth response 200:", response);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        axiosAuthInstance.defaults.headers["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");
        // axiosDannyInstance.defaults.headers['Authorization'] =
        //   'Bearer ' + localStorage.getItem('access_token')

        //  console.log('SOCIALAUTH authothorization head:', axiosAuthInstance.defaults.headers['Authorization'])
        return response.data;
      }
    } catch (err) {
      console.error("inuserslice token error", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const facebookLogin = createAsyncThunk(
  "myuser/facebookLogin",
  async (args, thunkAPI) => {
    try {
      console.log("Facebook login args", args);
      let response = await axios.post(
        "http://localhost:8000/auth/convert-token",
        {
          token: args,
          backend: "facebook",
          grant_type: "convert_token",
          client_id: "t0SULE7DeZcPcebnvxytgObJcp425AgmDrTcnlxs",
          client_secret:
            "y04sNMddLAawcxM3BTNhenzlRpXv6a2E5uR1bFPbqteR8cdzspMuLR0zU2EblJley8zyiw6QTc9qm8JCDbMWeR6yhVBs3xVfXE4YuMuf3dmRIZcp65PqYvrA4epLs78Q",
        }
      );
      console.log("Faceboook Login response SLICE:", response);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        axiosAuthInstance.defaults.headers["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");
        // axiosDannyInstance.defaults.headers['Authorization'] =
        //   'Bearer ' + localStorage.getItem('access_token')

        //  console.log('SOCIALAUTH authothorization head:', axiosAuthInstance.defaults.headers['Authorization'])
        return response.data;
      }
    } catch (err) {
      console.error("inuserslice token error", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "myuser/register",
  //   async ({first_name, last_name,email,password}, thunkAPI) => {
  async (args, thunkAPI) => {
    // console.log("args", args);
    // const body = JSON.stringify({
    //   first_name,
    //   last_name,
    //   email,
    //   password,
    // })
    // const body = { first_name, last_name, email, password }
    try {
      let response = await axios.post(
        `https://django-server-production-dac4.up.railway.app/api/users/register/`,
        // `${baseURL}users/register/`,
        // "http://localhost:8000/api/users/register/",
        args
      );
      // console.log("auth", response);
      if (response.status === 201) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }

      //   const data = await response.data()
      //   if (response.status === 201) {
      //     return data
      //   } else {
      //     return thunkAPI.rejectWithValue(data)
      //   }

      //   const res = await fetch(`http://localhost:8000/api/users/register`, {
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },

      //     body,
      //   })
      //   const data = await res.json()
      //   if (res.status === 201) {
      //     return data
      //   } else {
      //     return thunkAPI.rejectWithValue(data)
      //   }
    } catch (err) {
      console.error("inuserslice", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const myUserSlice = createSlice({
  name: "myuser",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },

    logoutJWT: (state, action) => {
      (state.users = []), (state.tryUser = {});
      // localStorage.clear()
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isRegistered");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("locaL_user");
      localStorage.removeItem("userProfile");
    },
    addUserToTeam: (state, action) => {
      state, (state.tryUser.team = [action.payload]);

      localStorage.setItem("userProfile", JSON.stringify([state.tryUser]));
      console.log("my team", state.tryUser.team);
    },
    getUser: (state, action) => {
      state.tryUser = state.tryUser;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(mytoken.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(mytoken.fulfilled, (state, action) => {
      console.log("it worked", action.payload);

      console.log("it succeeded");
      localStorage.setItem(
        "locaL_user",
        JSON.stringify(jwt_decode(action.payload.access))
      );

      state.entities.push(action.payload);
      state.token = action.payload.access;

      state.loading = false;
      state.registered = true;
      state.isAuthenticated = true;
      state.user.token = action.payload.access;
      state.tryUser = jwt_decode(action.payload.access);
      localStorage.setItem("userProfile", JSON.stringify(state.tryUser));

      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify(state.isAuthenticated)
      );
      localStorage.setItem(
        "isRegistered",
        JSON.stringify(state.isAuthenticated)
      );

      // return action.payload
      // console.log("ssssaa biaaa", action.payload);

      // console.log('it worked', action.payload)
      // state.entities.push(action.payload)
      // state.token = action.payload.access
      // state.refresh = action.payload.refresh
      // state.loading = false
      // state.registered = true
      // state.isAuthenticated = true
      // state.user.token = token
      // localStorage.setItem('authToken', state.token)
      // localStorage.setItem('authToken', state.refresh)

      // return action.payload
      // console.log('ssssaa biaaa', action.payload)
    });
    builder.addCase(mytoken.rejected, (state, action) => {
      console.log(' it did not work', action.payload)
      state.loading = false;
    });
    builder.addCase(mysocialtokenlogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(mysocialtokenlogin.fulfilled, (state, action) => {
      console.log("it worked", action.payload);

      console.log("it succeeded");
      // localStorage.setItem('locaL_user', JSON.stringify(jwt_decode(action.payload.access)))
      state.entities.push(action.payload);
      state.token = action.payload.access_token;

      state.loading = false;
      state.registered = true;
      state.isAuthenticated = true;
      state.refresh = action.payload.refresh_token;
      state.user.token = action.payload.access_token;
      // state.tryUser = jwt_decode(action.payload.access)
      // return action.payload
      console.log("social token slice action.payload::", action.payload);
    });
    builder.addCase(mysocialtokenlogin.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(facebookLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(facebookLogin.fulfilled, (state, action) => {
      console.log("facebook logn ACTION.PAYLOAD", action.payload);

      state.facebook = action.payload;
    });
    builder.addCase(facebookLogin.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(tokenLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(tokenLogin.fulfilled, (state, action) => {
      // console.log('loading', action)
      //   localStorage.setItem('access_token', action.payload.access)
      // localStorage.setItem('refresh_token', action.payload.refresh)
      // axiosInstance.defaults.headers['Authorization'] =
      //   'JWT ' + localStorage.getItem('access_token')

      console.log("it succeededed", action);
      localStorage.setItem(
        "locaL_user",
        JSON.stringify(jwt_decode(action.payload.access))
      );
      state.entities.push(action.payload);
      state.token = action.payload.access;

      state.loading = false;
      state.registered = true;
      state.isAuthenticated = true;
      state.user.token = action.payload.access;
      state.tryUser = jwt_decode(action.payload.access);
      // return action.payload
      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify(state.isAuthenticated)
      );
    });
    builder.addCase(tokenLogin.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      // state.users.push(action.payload)
      state.users = action.payload;
      // console.log('it succeeded')
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      console.log(
        "it succeeded action. payload in getProfile  :  :",
        action.payload
      );
      return {
        ...state,
        userProfile: action.payload,
        registered: true,
        isAuthenticated: true,
      };
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      return {
        loading: false,
        errors: action.payload,
      };
    });
    builder.addCase(updateUser.pending, (state, action) => {
      // state.users.push(action.payload)
      state.loading = true;
      // state.users = action.payload
      // console.log('it succeeded')
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log("acion payload for update:", action.payload);
      // const updateUser = state.users.map

      // return {
      //   ...state,
      //   selfUser: action.payload[0],
      //   tryUser: action.payload,
      //   registered: true,
      //   isAuthenticated: true,
      // }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        loading: false,
        errors: action.payload,
      };
    });
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = true;
      state.isAuthenticated = true;
      state.userProfile = action.payload.results;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
    });
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const { resetRegistered, logoutJWT, addUserToTeam, getUser } =
  myUserSlice.actions;

export default myUserSlice.reducer;
