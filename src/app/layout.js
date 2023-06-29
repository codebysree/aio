import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aio',
  description: 'All In One',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Home></Home>
        <div className="container">
          <div className="row">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}


function Home() {
  return (
    <>
      <nav className="navbar bg-body-tertiary bg-light shadow">
        <div className="container">
          <Link className="navbar-brand link-dark" href="/">
            AIO
          </Link>
        </div>
      </nav>
    </>
  )
}

