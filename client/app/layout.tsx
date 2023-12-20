import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/globals.css'
import AsideMenu from './ui/components/AsideMenu/AsideMenu'
import AppContextProvider from './context/AppContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personal Finance',
  description: 'Application to manage personal finances',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <AsideMenu />
          <div className='flex-col w-full'>
            <header className='sticky top-0 w-full h-20 bg-white shadow-topBanner'>

            </header>
            {children}
          </div>
        </AppContextProvider>
      </body>
    </html>
  )
}
