import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shift Scheduler',
  description: 'Advanced shift scheduling application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b">
              <div className="container mx-auto px-4 flex items-center justify-between py-4">
                <h1 className="text-xl font-bold">Shift Scheduler</h1>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}