import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;

  }

  :root {
    --gray: ${props => props.theme.gray};
    --blue: ${props => props.theme.blue};
    --offWhite: ${props => props.theme.offWhite};
  }

  body {
    background: var(--gray);
    font-size: 62.5%;
  }

  h1 {
    font-size: 2.2em;
  }

  h2 {
    font-size: 1.8em;
  }

`;
