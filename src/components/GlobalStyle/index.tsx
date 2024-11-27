import { Global, css } from '@emotion/react';

import robotoLightFont from '@assets/fonts/Roboto-Light.ttf';
import robotoRegularFont from '@assets/fonts/Roboto-Regular.ttf';
import robotoMediumFont from '@assets/fonts/Roboto-Medium.ttf';

export const GlobalStyle = () => {
  const cssGlobal = css`
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 300;
      src: url(${robotoLightFont}) format('truetype');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
        U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      src: url(${robotoRegularFont}) format('truetype');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
        U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      src: url(${robotoMediumFont}) format('truetype');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
        U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @keyframes rotate {
      to {
        transform: translate(-50%, -50%) rotate(1turn);
      }
    }

    :root {
      /*  */
    }

    * {
      margin: 0px;
      outline: 0px;
      border: 0px;
      padding: 0px;
    }

    html,
    body,
    #root {
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    body,
    #root {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    body {
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      background-color: #121212;
      color: #ffffff;
      font-weight: 400;
    }

    #root {
      align-items: center;
      justify-content: center;
      background-size: cover;
    }
  `;

  return <Global styles={cssGlobal} />;
};
