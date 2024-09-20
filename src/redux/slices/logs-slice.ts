import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ActivityLogs } from '../endpoints';
import api from '../base-class';
import { toast } from 'react-toastify';

export interface LogsInterface {
  id: string;
  type: string; // email,phone,message,comment
  openPhoneType: string;
  logType: string;
  recordId: string;
  emailText: string;
  openphoneId: string;
  openPhoneVersion: string;
  eventCreation: Date;
  messageCallId: string;
  from: string;
  to: string;
  direction: string;
  status: string;
  openPhoneUserId: string;
  phoneNumberId: string;
  conversationId: string;
  body: string; //for message type
  media: JSON; // for message type
  eventPayload: JSON;
  createdAt: Date;
}

const initialState = {
  isLoading: <boolean>false,
  allLogs: <LogsInterface[]>[],
  phoneLogs: <LogsInterface[]>[],
  commentLogs: <LogsInterface[]>[],
};

export const getLogs = createAsyncThunk(
  'logs/list/all',
  async (data: { id: string; type: string }, thunkAPI) => {
    try {
      const url = `${ActivityLogs.logsList(data.id, data.type)}`;
      const resp = await api.get(`${url}`);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const logsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allLogs = action.payload.data;
      })
      .addCase(
        getLogs.rejected,
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

export default logsSlice.reducer;
