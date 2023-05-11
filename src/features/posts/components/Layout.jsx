import React from 'react'

// import { Helmet } from 'react-helmet'
import { Helmet } from 'react-helmet-async'

import AdminNavbar from './AdminNavbar'
import MyFooter from 'components/MyFooter'

// const Layout = (props) => (
// const meow = 'margin-inline: auto'
const Layout = ({ children, title, content, type, name, description }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
      {/* own */}
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>

    <AdminNavbar />
    {/* <div className="container max-w-5xl min-h-screen px-2 mx-auto mb-10 md:pt-5"> */}

    <div className="container">{children}</div>
    <div className="mt-7">
      <MyFooter />
    </div>
  </>
)

export default Layout
