import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';
import authSlice from './slices/auth-slice';
import leadsSlice from './slices/lead-slice';
import logsSlice from './slices/logs-slice';
import commentSlice from './slices/commentSlice';
import statusSlice from './slices/status-slice';

export const rootReducer = combineReducers({
  auth: authSlice,
  leads: leadsSlice,
  logs: logsSlice,
  comments: commentSlice,
  status: statusSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = ThunkDispatch<[], void, AnyAction>;
