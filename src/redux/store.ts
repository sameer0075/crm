import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';
import authSlice from './slices/auth-slice';
import leadsSlice from './slices/lead-slice';

export const rootReducer = combineReducers({
  auth: authSlice,
  leads: leadsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = ThunkDispatch<[], void, AnyAction>;
