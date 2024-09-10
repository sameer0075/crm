import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LeadEndpoints } from '../endpoints';
import api from '../base-class';
import { toast } from 'react-toastify';

interface RecordsInerface {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  company: string;
  type: string;
  status: string;
  website: string;
  industry: string;
  lead_source: string;
  date: Date | string;
  stage: string;
}

const initialState = {
  isLoading: <boolean>false,
  data: <RecordsInerface[]>null,
};

export const getLeads = createAsyncThunk('leads/list', async (thunkAPI) => {
  try {
    const url = `${LeadEndpoints.loginUser()}`;
    const resp = await api.get(`${url}`);
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

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
      .addCase(getLeads.rejected, (state, action) => {
        toast.error(action.payload.message);
        state.isLoading = false;
      });
  },
});

export default leadsSlice.reducer;
