import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import activityService from './activityService'

const initialState = {
  activies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new activity
export const createActivity = createAsyncThunk(
  'activies/create',
  async (activityData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await activityService.createActivity(activityData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user activies
export const getActivies = createAsyncThunk(
  'activies/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await activityService.getActivies(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user activity
export const deleteActivity = createAsyncThunk(
  'activies/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await activityService.deleteActivity(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.activies.push(action.payload)
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getActivies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getActivies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.activies = action.payload
      })
      .addCase(getActivies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteActivity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.activies = state.activies.filter(
          (activity) => activity._id !== action.payload.id
        )
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = activitySlice.actions
export default activitySlice.reducer
