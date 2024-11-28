import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { theOneApiAuthToken } from '@config';

export const exampleApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://the-one-api.dev/v2/',
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${theOneApiAuthToken}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'exampleApi',
  tagTypes: ['UNAUTHORIZED'],
});

export const {
  util: { invalidateTags: invalidateExampleApiTags },
} = exampleApi;
