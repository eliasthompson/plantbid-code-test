import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useDispatchUntyped, useSelector as useSelectorUntyped } from 'react-redux';

import { exampleApi } from '@store/apis/example';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(exampleApi.middleware),
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useDispatch = useDispatchUntyped.withTypes<AppDispatch>();
export const useSelector = useSelectorUntyped.withTypes<RootState>();
