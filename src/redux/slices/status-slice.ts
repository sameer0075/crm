import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StatusEndpoints } from '../endpoints';
import api from '../base-class';
import { toast } from 'react-toastify';

export interface StatusInterface {
  id: string;
  name: string;
  statusFor: string;
  statusCode: string;
}

const initialState = {
  isLoading: <boolean>false,
  data: <StatusInterface[]>[],
};

export const getStatuses = createAsyncThunk(
  'status/list',
  async (data: { id: string }, thunkAPI) => {
    try {
      const url = `${StatusEndpoints.statusList(data.id)}`;
      const resp = await api.get(`${url}`);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatuses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(
        getStatuses.rejected,
        (state, action: { payload: { message: string } }) => {
          if (action.payload.message === 'Unauthorized') {
            sessionStorage.removeItem('token');
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          }
          toast.error(action.payload.message);
          state.isLoading = false;
        }
      );
  },
});

export default statusSlice.reducer;
