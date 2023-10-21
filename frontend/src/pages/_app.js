// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

import RainbowWallet from 'src/layouts/RainbowWallet.js'


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>DeepBook Maxi</title>
        <meta
          name='description'
          content={`DeepBook Maxi`}
        />
        <meta name='keywords' content='Leveraged Yield Farming, Crypto, Polygon' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <RainbowWallet>
      <SettingsProvider>
        <SettingsConsumer>

        {/* <RainbowWallet> */}
          {/* <div> */}
            {({ settings }) => {
              return (
                // <RainbowWallet>
                <ThemeComponent settings={settings}>
                  {getLayout(<Component {...pageProps} />)}
                </ThemeComponent>
                // </RainbowWallet>
              )
            }}
          {/* </div> */}

        {/* </RainbowWallet> */}
        </SettingsConsumer>
      </SettingsProvider>

      </RainbowWallet>
    </CacheProvider>
  )
}

export default App
