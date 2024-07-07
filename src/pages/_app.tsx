import '~/styles/global.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import 'swiper/scss'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { lazy } from 'react'
import { Html } from 'next/document'
import { ScrollProvider } from '~/utils/useScrollContext'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const theme = extendTheme({
  fonts: {
    heading: 'HankenGrotesk, sans-serif',
    body: 'HankenGrotesk Light, sans-serif',
  },
})

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      <meta name="description" content="Noreva" />
      <title>Noreva</title>
      <link rel="icon" href="/img/favicon.ico" sizes="any" />
      <link rel="preconnect" href="https://cdn.sanity.io/" />
      <link
        rel="preload"
        href="/fonts/HankenGrotesk-Regular.ttf"
        as="font"
        type="font/ttf"
      />
      <link rel="preload" href="/fonts/SitkaVF.ttf" as="font" type="font/ttf" />
      <ChakraProvider theme={theme}>
        <ScrollProvider>
          <Global
            styles={css`
          @font-face {
            font-family: 'HankenGrotesk';
            src: url('/fonts/HankenGrotesk-Regular.ttf') format('truetype'),
            font-weight: normal;
            font-style: normal;
          }
            @font-face {
              font-family: 'HankenGrotesk Light';
              src: url('/fonts/HankenGrotesk-Light.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
          `}
          />
          {draftMode ? (
            <PreviewProvider token={token}>
              <Component {...pageProps} />
            </PreviewProvider>
          ) : (
            <Component {...pageProps} />
          )}
        </ScrollProvider>
      </ChakraProvider>
    </>
  )
}
