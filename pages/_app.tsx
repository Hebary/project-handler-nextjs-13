import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/auth'
import { ThemeProvider } from '@emotion/react'
import theme from '@/theme'
import { CssBaseline } from '@mui/material'
import { UiProvider } from '@/context/ui'
import { ProjectsProvider } from '@/context/projects'
import '@/styles/globals.css'

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
