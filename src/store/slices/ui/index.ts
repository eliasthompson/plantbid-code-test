import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  prefix: 'Hello' | 'Goodbye';
}

export const initialUiState: UiState = {
  prefix: 'Hello',
};

export const uiSlice = createSlice({
  initialState: initialUiState,
  name: 'ui',
  reducers: {
    togglePrefix: (state) => {
      if (state.prefix === 'Hello') state.prefix = 'Goodbye';
      else state.prefix = 'Hello';
    },
  },
});

export const {
  actions: { togglePrefix },
} = uiSlice;
