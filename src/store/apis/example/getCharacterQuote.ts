import { exampleApi } from '@store/apis/example';

export interface CharacterApiGetCharacterQuoteRequest {
  id: string;
}

export interface CharacterApiGetCharacterQuoteResponse {
  docs: {
    _id: string;
    character: string;
    dialog: string;
  }[];
}

export const {
  useGetCharacterQuoteQuery,
  useLazyGetCharacterQuoteQuery,
  util: { invalidateTags: invalidateCharacterQuoteTags, updateQueryData: updateCharacterQuoteData },
} = exampleApi
  .enhanceEndpoints({
    addTagTypes: ['CHARACTER_QUOTE_DATA'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCharacterQuote: build.query<CharacterApiGetCharacterQuoteResponse, CharacterApiGetCharacterQuoteRequest>({
        query: ({ id }) => ({
          method: 'GET',
          url: `character/${id}/quote`,
        }),
        providesTags: (result, error, { id }) => {
          if (result)
            return [
              {
                type: 'CHARACTER_QUOTE_DATA',
                id,
              },
            ];
          if (error?.status === 401) return ['UNAUTHORIZED'];
          return [];
        },
      }),
    }),
  });
