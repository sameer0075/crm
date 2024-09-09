import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginInterface } from '../interfaces/interface';
import { AuthEndpoints } from '../endpoints';
import api from '../base-class';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: <boolean>false,
  token: <string | null>null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginInterface, thunkAPI) => {
    try {
      const url = `${AuthEndpoints.loginUser()}`;
      const resp = await api.post(`${url}`, data);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        sessionStorage.setItem('token', action.payload.token);
        toast.info(action.payload.message);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      })
      .addCase(login.rejected, (state, action) => {
        toast.error(action.payload.message);
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
