import { BlurLinear } from '@mui/icons-material'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import axiosDannyInstance from 'app/utils/dannysaxios'
import axiosInstance from 'app/utils/myaxios'
import { ToastContainer, toast } from 'react-toastify'
import axiosAuthInstance from 'app/utils/Login'

const baseURL = 'http://localhost:8000/api/blog/'

const initialState = {
  posts: [],
  singlePost: {},
  post: {},
  filteredResults: [],
  loading: false,
  status: '',
  errors: [],
}

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (id = null, { rejectWithValue }) => {
    try {
      // let response = await axiosDannyInstance.get(baseURL);
      let response = await axiosDannyInstance.get(baseURL)
      console.log('first respose ', response)
      if (response.status === 200) {
        return response.data.results
      }
    } catch (err) {
      console.log('post error: ' + err.response.data.results)
      return rejectWithValue((err.response?.data).results)
    }
  },
)
export const filterAllPost = createAsyncThunk(
  'posts/filterAllPost',
  async (args, { rejectWithValue }) => {
    console.log('you filterAllPost', args)

    try {
      // http://localhost:8000/api/blog/view/me/?q=css

      let response = await axiosDannyInstance.get(`blog/view/me/?q=${args}`)

      // if (response.status === 200) {

      return response.data.results
      // }
    } catch (err) {
      console.log('post error: ' + err.response.data.results)
      return rejectWithValue((err.response?.data).results)
    }
  },
)
export const getSinglePost = createAsyncThunk(
  'posts/geSingletPost',
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(
        `blog/view/viewset/${args.slug}/`,
      )
      console.log('sisngle response', response)
      if (response.status == 200) {
        toast.success('hippee ')
        return response.data
      }
    } catch (err) {
      console.log('post error: ' + err.response.data.results)
      return rejectWithValue((err.response?.data).results)
    }
  },
)
export const getPost = createAsyncThunk(
  'posts/gePost',
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(
        `blog/admin/edit/postdetail/${args}/`,
      )
      console.log('post for edit', response)
      // if (response.status == 200) {

      return response.data
      // }
    } catch (err) {
      console.log('post error: ' + err.response.data.results)
      return rejectWithValue((err.response?.data).results)
    }
  },
)
export const editPost = createAsyncThunk(
  'posts/editPost',
  async (args, { rejectWithValue }) => {
    console.log('args', args)
    try {
      let response = await axiosDannyInstance.put(
        `blog/admin/edit/${args.id}/`,
        args,
      )
      console.log('post for edit', response)
      // if (response.status == 200) {

      return response.data
      // }
    } catch (err) {
      console.log('post error: ' + err.response.data.results)
      return rejectWithValue((err.response?.data).results)
    }
  },
)
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (args, { rejectWithValue }) => {
    console.log('args', args)
    try {
      let response = await axiosDannyInstance.post('blog/admin/create/', args)
      console.log('post for create', response)
      console.log('response header', axiosDannyInstance.defaults.headers)
      if (response.status === 201) {
        toast.success('post added ')
        return response.data
      }
    } catch (err) {
      console.log('post error: ' + err.response.data.results)
      return rejectWithValue((err.response?.data).results)
    }
  },
)
export const createNewPost = createAsyncThunk(
  'posts/createNewPost',
  async (args, { rejectWithValue }) => {
    console.log('args', args)
    try {
      let response = await axiosDannyInstance.post('blog/admin/create/', args)
      console.log('post for create response:', response)
      if (response.status === 201) {
        toast.success('post added ')
        return response.data
      }
    } catch (err) {
      console.log('post error: ' + err.response.data.results)
      return rejectWithValue((err.response?.data).results)
    }
  },
)
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (args, { rejectWithValue }) => {
    console.log('args', args)
    try {
      let response = await axiosDannyInstance.delete(
        `blog/admin/delete/${args.id}/`,
      )
      if (response.status === 204) {
        toast.success('post deleted')
        return response.data
      }
    } catch (err) {
      console.log('post error: ' + err.response.data.results)
      return rejectWithValue((err.response?.data).results)
    }
  },
)

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    filterPosts: (state, action) => {
      if (action.payload) {
        // console.log('actoion.payload', action.payload)
        state.posts = state.posts.filter(
          (post) =>
            post.title.includes(action.payload) ||
            post.excerpt.includes(action.payload) ||
            post.content.includes(action.payload),
        )
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = true
        state.errors = 'something went wrong'
      })
      .addCase(filterAllPost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(filterAllPost.fulfilled, (state, action) => {
        console.log('filter action', action.payload)

        state.loading = false
        state.filteredResults = action.payload
        state.posts = action.payload
      })
      .addCase(filterAllPost.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = true
        state.errors = 'something went wrong'
      })
      .addCase(getSinglePost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.loading = false
        state.singlePost = action.payload
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = true
        state.errors = 'something went wrong'
      })
      .addCase(deletePost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const currentPosts = state.posts.filter(
          (post) => post.id !== action.payload.id,
        )
        state.loading = false
        state.posts = currentPosts
      })
      .addCase(deletePost.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = true
        state.errors = 'something went wrong'
      })
      .addCase(getPost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false
        state.post = action.payload
      })
      .addCase(getPost.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = true
        state.errors = 'something went wrong'
      })
      .addCase(editPost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(editPost.fulfilled, (state, action) => {
        console.log('edit.post.fulfilled', action.payload)
        const updatedPost = state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post,
        )
        const prdId = action.payload
        const updatePost = state.posts.find((prd) =>
          prd.id === action.payload.id ? action.payload : prd,
        )

        state.loading = false
        state.post = updatedPost
      })
      .addCase(editPost.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = true
        state.errors = 'something went wrong'
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        state.posts = [action.payload, ...state.posts]
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = true
        state.errors = 'something went wrong'
      })
      .addCase(createNewPost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.loading = false
        state.posts = [action.payload, ...state.posts]
      })
      .addCase(createNewPost.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = true
        state.errors = 'something went wrong'
      })
  },
})

export const { filterPosts } = postSlice.actions
export default postSlice.reducer
