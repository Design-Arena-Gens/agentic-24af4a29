import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bharat Life Care - Social Media Manager',
  description: 'AI-powered social media management for Bharat Life Care',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
