// app/layout.tsx
import { Providers } from './providers'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'], // Add the weight property
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}> {/* Apply Poppins class to the body */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}