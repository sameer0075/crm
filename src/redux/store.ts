import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';
import authSlice from './slices/auth-slice';

export const rootReducer = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = ThunkDispatch<[], void, AnyAction>;
