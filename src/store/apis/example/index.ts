import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const exampleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: () => ({}),
  reducerPath: 'exampleApi',
  tagTypes: ['UNAUTHORIZED'],
});

export const {
  util: { invalidateTags: invalidateExampleApiTags },
} = exampleApi;
