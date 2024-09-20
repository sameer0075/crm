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

export const sendMail = createAsyncThunk(
  'logs/send/mail',
  async (
    data: {
      id: string;
      to: string;
      subject: string;
      text: string;
      cc?: string;
      bcc?: string;
    },
    thunkAPI
  ) => {
    try {
      const { id, ...rest } = data;
      const url = `${ActivityLogs.sendMail(id)}`;
      const resp = await api.post(`${url}`, rest);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const clearLogs = createAsyncThunk(
  'logs/list/clear',
  async (thunkAPI) => {
    try {
      true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const logsSlice = createSlice({
  name: 'logs',
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
      )

      .addCase(clearLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearLogs.fulfilled, (state) => {
        state.isLoading = false;
        state.allLogs = [];
      })
      .addCase(
        clearLogs.rejected,
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
