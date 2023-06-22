import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import Cards from './page'
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
        {children}
      </body>
    </html>
  )
}


function Home() {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            AIO
          </a>
        </div>
      </nav>
      {/* <Cards></Cards> */}
    </>
  )
}

