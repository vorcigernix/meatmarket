import Nav from './nav'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className='flex flex-col min-h-screen'>{children}</main>
      <Footer />
    </>
  )
}