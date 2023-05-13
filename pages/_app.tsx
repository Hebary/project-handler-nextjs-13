import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { AuthProvider } from '@/context/auth'
import { ProjectsProvider } from '@/context/projects'
import { UiProvider } from '@/context/ui'
import '@/styles/globals.css'
import theme from '@/theme'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <UiProvider>
            <AuthProvider>
                    <ProjectsProvider>
                        <ThemeProvider theme={theme} >
                            <CssBaseline />
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </ProjectsProvider>
            </AuthProvider>
        </UiProvider>
    )
}
