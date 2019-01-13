import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import favicon from "../images/favicon.ico"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <fragment>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <link rel="shortcut icon" href={favicon} />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>{children}</div>
      </fragment>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
