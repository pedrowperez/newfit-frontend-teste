import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Open Sans, sans-serif;
    margin: 0;
    padding: 0px 22px;
    box-sizing: border-box;
    background-color: #2b2d42;
  }

  button {
    cursor: pointer;
  }

  h1, h2, p {
    margin: 0;
  }
`;

export default GlobalStyle;
