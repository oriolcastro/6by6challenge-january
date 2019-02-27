import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Hidden from '@material-ui/core/Hidden'

import Header from './header'
import Footer from './footer'
import favicon from '../images/favicon.ico'
import Navigation from './navigation'

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
          fixed(width: 128) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
        <Header
          siteTitle={data.site.siteMetadata.title}
          siteLogo={data.imageSharp.fixed}
        />
        <div
          style={{
            flex: '1',
            padding: '16px 24px',
            marginBottom: '32px',
            paddingTop: '72px',
          }}
        >
          {children}
        </div>
        <Hidden smDown>
          <Footer />
        </Hidden>
        <Hidden mdUp>
          <Navigation />
        </Hidden>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
