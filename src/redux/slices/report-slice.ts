import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DashboardEndpoints } from '../endpoints';
import api from '../base-class';
import { toast } from 'react-toastify';

export interface DashboardReportInterface {
  id: string;
  title: string;
  type: string;
  value: number | string;
}

const initialState = {
  isLoading: <boolean>false,
  data: <DashboardReportInterface[]>[],
};

export const getDashboardInsights = createAsyncThunk(
  'dashboard/insights',
  async (
    data: {
      startDate: string | Date | null;
      endDate: string | Date | null;
      userId: string | null;
    },
    thunkAPI
  ) => {
    try {
      const url = `${DashboardEndpoints.dashboardReport()}`;
      const resp = await api.post(`${url}`, data);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardInsights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardInsights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(
        getDashboardInsights.rejected,
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

export default reportSlice.reducer;
