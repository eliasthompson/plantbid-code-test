import { exampleApi } from '@store/apis/example';

export interface ExampleApiGetExampleRequest {
  id: number;
}

export interface ExampleApiGetExampleResponse {
  id: number;
  name: string;
}

export const {
  useGetExampleQuery,
  useLazyGetExampleQuery,
  util: { invalidateTags: invalidateExampleTags, updateQueryData: updateExampleData },
} = exampleApi
  .enhanceEndpoints({
    addTagTypes: ['EXAMPLE_DATA'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getExample: build.query<ExampleApiGetExampleResponse, ExampleApiGetExampleRequest>({
        query: ({ id }) => ({
          method: 'GET',
          url: `pokemon/${id}`,
        }),
        providesTags: (result, error, { id }) => {
          if (result)
            return [
              {
                type: 'EXAMPLE_DATA',
                id,
              },
            ];
          if (error?.status === 401) return ['UNAUTHORIZED'];
          return [];
        },
      }),
    }),
  });
