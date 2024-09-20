import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommentsEndpoints } from '../endpoints';
import api from '../base-class';
import { toast } from 'react-toastify';

export interface CommentsInterface {
  id: string;
  comment: string;
  userId: string;
  recordId: string;
}

const initialState = {
  isLoading: <boolean>false,
  data: <CommentsInterface[]>[],
};

export const getComments = createAsyncThunk(
  'comments/list',
  async (data: { id: string }, thunkAPI) => {
    try {
      const url = `${CommentsEndpoints.commentsList(data?.id)}`;
      const resp = await api.get(`${url}`);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: { comment: string; recordId: string }, thunkAPI) => {
    try {
      const url = `${CommentsEndpoints.addComment()}`;
      const resp = await api.post(`${url}`, data);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(
        getComments.rejected,
        (state, action: { payload: { message: string } }) => {
          if (action?.payload?.message === 'Unauthorized') {
            sessionStorage.removeItem('token');
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          }
          toast.error(action?.payload?.message);
          state.isLoading = false;
        }
      )

      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, action.payload.data];
      })
      .addCase(
        addComment.rejected,
        (state, action: { payload: { message: string } }) => {
          if (action?.payload?.message === 'Unauthorized') {
            sessionStorage.removeItem('token');
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          }
          toast.error(action?.payload?.message);
          state.isLoading = false;
        }
      );
  },
});

export default commentSlice.reducer;
