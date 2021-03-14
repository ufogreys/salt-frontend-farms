import { createGlobalStyle } from 'styled-components'
import { SaltTheme } from '@saltswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends SaltTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    background-image: url(${({ theme }) => `./images/salt-bottom-bg-${theme.isDark ? 'dark' : 'light'}.svg`});
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
