import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Hidden from '@material-ui/core/Hidden'

import Header from './header'
import Footer from './footer'
import favicon from '../images/favicon.ico'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        imageSharp(fixed: { originalName: { eq: "icon.png" } }) {
          fixed(width: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    `}
    render={data => (
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <link rel="shortcut icon" href={favicon} />
        </Helmet>
        <Hidden smDown>
          <Header
            siteTitle={data.site.siteMetadata.title}
            siteLogo={data.imageSharp.fixed}
          />
        </Hidden>
        <div style={{ flex: '1', padding: '16px 24px', marginBottom: '32px' }}>
          {children}
        </div>
        <Hidden smDown>
          <Footer />
        </Hidden>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
