// @TODO
// Note for Engineers:
// No unit testing due to time.

import { Box, Modal, Typography } from '@mui/material';
import { css } from '@emotion/react';

import type { CharacterApiGetCharacterQuoteResponse } from '@store/apis/example/getCharacterQuote';
import type { CharacterApiGetCharacterResponse } from '@store/apis/example/getCharacter';

import { Fragment } from 'react/jsx-runtime';
import { useCallback, useEffect, useState } from 'react';
import { useGetCharacterQuery } from '@store/apis/example/getCharacter';
import { useLazyGetCharacterQuoteQuery } from '@store/apis/example/getCharacterQuote';

// @TODO
// Note for Engineers:
// If Typescript is used, finding a good abstraction for where types live and how they're used, both for single components
// like this and types shared across components would be something I'd explore early on and keep an eye on as the app scales.
type ActiveCharacter = CharacterApiGetCharacterResponse['docs'][number] & {
  quotes: CharacterApiGetCharacterQuoteResponse['docs'];
};

export const HomePage = () => {
  const { data: characterData, isLoading: characterIsLoading } = useGetCharacterQuery();
  const [
    getCharacterQuote,
    { currentData: characterQuoteData, isLoading: characterQuoteIsLoading },
    { lastArg: characterQuoteArgs },
  ] = useLazyGetCharacterQuoteQuery();
  const [activeCharacter, setActiveCharacter] = useState<ActiveCharacter>(null);

  // @TODO
  // Note for Engineers:
  // The below implementation of only fetching quotes after a specific data-driven result is selected as active works,
  // but it would definitely be a candidate for both splitting the modals into shared components (which may lead to better
  // data fetching patterns/redability), and it would likely be a perfect candidate to explore with the upcoming 'use' and
  // 'Suspense' in conjuction with that abstraction.
  const handleOpen = useCallback(
    (id: string) => () => {
      const char = characterData.docs.find((char) => char._id === id);
      getCharacterQuote({ id: char._id });
    },
    [characterData, getCharacterQuote],
  );
  const handleClose = useCallback(() => {
    setActiveCharacter(null);
  }, [setActiveCharacter]);

  useEffect(() => {
    if (!characterQuoteIsLoading && characterQuoteData && characterQuoteArgs) {
      const char = characterData.docs.find((char) => char._id === characterQuoteArgs.id);
      const quotes = characterQuoteData.docs.slice(0, 2);
      setActiveCharacter({ ...char, quotes });
    }
  }, [setActiveCharacter, characterQuoteData, characterQuoteIsLoading, characterQuoteArgs]);

  // @TODO
  // Note for Engineers:
  // Currently I'm using a combination of the pre-styled Material UI and custom, from scratch CSS (through Emotion).
  // Ideally, we commit to one or the other, whichever we feel would put us in a better place to scale
  const cssLiSpan = css`
    color: #339900;
    cursor: pointer;

    &:hover {
      color: #44cc00;
    }

    &:active {
      color: #226600;
    }
  `;
  const cssModal = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const cssModalBox = css`
    width: 33%;
    border-radius: 0.5rem;
    background-color: #242424;
    padding: 1rem;
  `;
  const cssModalHeader = css`
    margin-bottom: 0.5rem;
  `;
  const cssStrong = css`
    font-weight: 600;
  `;

  // @TODO
  // Note for Engineers:
  // Should have a proper loading screen.
  if (characterIsLoading || !characterData) return false;

  return (
    <Fragment>
      <ul>
        {characterData.docs.map((char) => {
          return (
            <li key={char._id} onClick={handleOpen(char._id)}>
              <span css={cssLiSpan}>{char.name}</span>
            </li>
          );
        })}
      </ul>

      <Modal
        open={!!activeCharacter}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        css={cssModal}
      >
        <Box css={cssModalBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2" css={cssModalHeader}>
            {activeCharacter?.name}
          </Typography>

          <Typography id="modal-modal-description">
            <strong css={cssStrong}>Race:</strong> <span>{activeCharacter?.race}</span>
          </Typography>

          <Typography id="modal-modal-description">
            <strong css={cssStrong}>Gender:</strong> <span>{activeCharacter?.gender}</span>
          </Typography>

          {activeCharacter
            ? activeCharacter.quotes.map((quote) => (
                <Typography key={quote._id} id="modal-modal-description">
                  <strong css={cssStrong}>Quote:</strong> <span>{quote.dialog}</span>
                </Typography>
              ))
            : false}
        </Box>
      </Modal>
    </Fragment>
  );
};
