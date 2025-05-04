import { Suspense } from 'react'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capstone Project Allocator',
  description: 'An intelligent platform for streamlined project assignments',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body >
        <Suspense>{children}</Suspense></body>
    </html>
  )
}
