import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'

import { Prompt } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import { Toaster } from 'sonner'

const prompt = Prompt({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--my-font-family',
})

export const metadata: Metadata = {
  title: 'CE Project',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="mytheme">
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <body className={prompt.className}>
            <Toaster position="top-right" />
            {children}
          </body>
        </ThemeProvider>
      </CookiesProvider>
    </html>
  )
}
