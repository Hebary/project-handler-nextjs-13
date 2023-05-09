import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/auth'
import { ThemeProvider } from '@emotion/react'
import theme from '@/theme'
import { CssBaseline } from '@mui/material'
import { UiProvider } from '@/context/ui'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <AuthProvider>
            <UiProvider>
                <ThemeProvider theme={theme} >
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </UiProvider>
        </AuthProvider>
    )
}
