import React from 'react'
import Favorite from '@material-ui/icons/Favorite'
import Typography from '@material-ui/core/Typography'
import { OutboundLink } from 'gatsby-plugin-gtag-outbound'

const Footer = () => (
  <div
    style={{
      textAlign: 'center',
      backgroundColor: '#212121',
      padding: '8px',
    }}
  >
    <Typography style={{ color: '#ffffff' }}>
      Fet amb <Favorite fontSize="inherit" color="error" /> a Vilanova i la
      Geltrú per{' '}
      <OutboundLink
        href="https://okstudio.tech"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {' '}
        Ok! Studio
      </OutboundLink>
    </Typography>
  </div>
)

export default Footer
