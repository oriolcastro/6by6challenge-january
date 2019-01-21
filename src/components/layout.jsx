import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Hidden from '@material-ui/core/Hidden'
import posed, { PoseGroup } from 'react-pose'

import Header from './header'
import Footer from './footer'
import Navigation from './navigation'
import favicon from '../images/favicon.ico'

const transitionDuration = 200
const transitionDelay = 250

const Transition = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: transitionDuration },
    delay: transitionDelay,
    beforeChildren: true,
  },
  exit: { opacity: 0, transition: { duration: transitionDuration } },
})

const Layout = ({ children, ...props }) => (
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

        {/* Header section */}
        <Header
          siteTitle={data.site.siteMetadata.title}
          siteLogo={data.imageSharp.fixed}
        />

        {/* Main page content */}
        <div
          style={{
            flex: '1',
            padding: '16px 24px',
            marginBottom: '32px',
            paddingTop: '72px',
          }}
        >
          <PoseGroup>
            <Transition key={props.location.pathname}>{children}</Transition>
          </PoseGroup>
        </div>

        {/* Footer section */}
        <Hidden smDown implementation="css">
          <Footer />
        </Hidden>
        <Hidden mdUp implementation="css">
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
