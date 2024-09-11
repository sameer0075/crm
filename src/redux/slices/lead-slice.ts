import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LeadEndpoints } from '../endpoints';
import api from '../base-class';
import { toast } from 'react-toastify';

interface RecordsInterface {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title?: string;
  email: string;
  company: string;
  phone: string;
  type: string;
  status: string;
  website: string;
  industry?: string;
  lead_source: string;
  stage?: string; // For deals
  date?: Date;
  city?: string;
  state?: string;
  country?: string;
  company_linkedin_url?: string;
  linkedin_profile?: string;
  is_active?: boolean;
}

const initialState = {
  isLoading: <boolean>false,
  data: <RecordsInterface[]>null,
};

export const getLeads = createAsyncThunk(
  'leads/list',
  async (type: string, thunkAPI) => {
    try {
      const url = `${LeadEndpoints.leadsList(type)}`;
      const resp = await api.get(`${url}`);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const bulkUpload = createAsyncThunk(
  'leads/bulk-upload',
  async (data: FormData, thunkAPI) => {
    try {
      const url = `${LeadEndpoints.bulkUpload()}`;
      const resp = await api.post(`${url}`, data);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(
        getLeads.rejected,
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
      )

      .addCase(bulkUpload.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true;
      })
      .addCase(bulkUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        toast.info(action.payload.message);
      })
      .addCase(
        bulkUpload.rejected,
        (
          state: { isLoading: boolean },
          action: { payload: { message: string } }
        ) => {
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

export default leadsSlice.reducer;
