import { exampleApi } from '@store/apis/example';

export interface CharacterApiGetCharacterResponse {
  docs: {
    _id: string;
    name: string;
    race: string;
    gender: string;
  }[];
}

export const {
  useGetCharacterQuery,
  useLazyGetCharacterQuery,
  util: { invalidateTags: invalidateCharacterTags, updateQueryData: updateCharacterData },
} = exampleApi
  .enhanceEndpoints({
    addTagTypes: ['CHARACTER_DATA'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCharacter: build.query<CharacterApiGetCharacterResponse, void>({
        query: () => ({
          method: 'GET',
          url: `character?limit=10&race=Maiar`,
        }),
        providesTags: (result, error) => {
          if (result)
            return [
              {
                type: 'CHARACTER_DATA',
              },
            ];
          if (error?.status === 401) return ['UNAUTHORIZED'];
          return [];
        },
      }),
    }),
  });
