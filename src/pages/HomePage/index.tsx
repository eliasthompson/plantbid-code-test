import { css } from '@emotion/react';
import { useCallback } from 'react';

import { FlexContainer } from '@components/shared/FlexContainer';
import { toTitleCase } from '@lib/toTitleCase';
import { togglePrefix } from '@store/slices/ui';
import { useDispatch, useSelector } from '@store';
import { useGetExampleQuery } from '@store/apis/example/getExample';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { prefix } = useSelector(({ ui }) => ui);
  const { data: exampleData, isLoading: exampleIsLoading } = useGetExampleQuery({ id: 5 });
  let name = '...';

  if (!exampleIsLoading && exampleData) name = ` ${toTitleCase(exampleData.name)}!`;

  const handleTogglePrefix = useCallback(() => {
    dispatch(togglePrefix());
  }, [dispatch, togglePrefix]);

  const cssButton = css`
    align-self: center;
    width: 4rem;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.25rem;
    background-color: #226600;
    color: white;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
      background-color: #339900;
    }

    &:active {
      background-color: #113300;
    }
  `;

  // Render component
  return (
    <FlexContainer column={true}>
      <span>
        {prefix}
        {name}
      </span>

      <button onClick={handleTogglePrefix} css={cssButton}>
        Toggle
      </button>
    </FlexContainer>
  );
};
