import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { OutboundLink } from 'gatsby-plugin-gtag-outbound'
import SvgIcon from '@material-ui/core/SvgIcon'
import { withStyles } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'

const styles = theme => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    icon: {
      marginRight: theme.spacing.unit,
      marginTop: theme.spacing.unit
    },
    devlink: {
      color: theme.palette.secondary.dark,
    }
  })
  
const InstagramIcon = 'M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z'
const TwitterIcon= 'M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.71,9.33C18.19,8.93 18.75,8.45 19,7.92C18.59,8.13 18.1,8.26 17.56,8.33C18.06,7.97 18.47,7.5 18.68,6.86C18.16,7.14 17.63,7.38 16.97,7.5C15.42,5.63 11.71,7.15 12.37,9.95C9.76,9.79 8.17,8.61 6.85,7.16C6.1,8.38 6.75,10.23 7.64,10.74C7.18,10.71 6.83,10.57 6.5,10.41C6.54,11.95 7.39,12.69 8.58,13.09C8.22,13.16 7.82,13.18 7.44,13.12C7.81,14.19 8.58,14.86 9.9,15C9,15.76 7.34,16.29 6,16.08C7.15,16.81 8.46,17.39 10.28,17.31C14.69,17.11 17.64,13.95 17.71,9.33Z'
const GitHubIcon= 'M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H14.56C14.24,20.93 14.23,20.32 14.23,20.11L14.24,17.64C14.24,16.8 13.95,16.25 13.63,15.97C15.64,15.75 17.74,15 17.74,11.53C17.74,10.55 17.39,9.74 16.82,9.11C16.91,8.89 17.22,7.97 16.73,6.73C16.73,6.73 15.97,6.5 14.25,7.66C13.53,7.46 12.77,7.36 12,7.35C11.24,7.36 10.46,7.46 9.75,7.66C8.03,6.5 7.27,6.73 7.27,6.73C6.78,7.97 7.09,8.89 7.18,9.11C6.61,9.74 6.26,10.55 6.26,11.53C6.26,15 8.36,15.75 10.36,16C10.1,16.2 9.87,16.6 9.79,17.18C9.27,17.41 7.97,17.81 7.17,16.43C7.17,16.43 6.69,15.57 5.79,15.5C5.79,15.5 4.91,15.5 5.73,16.05C5.73,16.05 6.32,16.33 6.73,17.37C6.73,17.37 7.25,19.12 9.76,18.58L9.77,20.11C9.77,20.32 9.75,20.93 9.43,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3Z'
const LinkedInIcon = 'M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z'

const DevInfo = (props) => (
  <div style={{ marginBottom: '32px' }}>
    <Typography variant="subtitle1" paragraph>
      Desenvolupada per Oriol Castro - Ok! Studio
    </Typography>
    <Grid container justify="space-between" spacing={16}>
      <Grid item xl={3} lg={3} md={3} sm={4} xs={4}>
        <StaticQuery
          query={graphql`
            query DevInfoQuery {
              imageSharp(fixed: { originalName: { eq: "logook.png" } }) {
                fixed(width: 100) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          `}
          render={data => <Img fixed={data.imageSharp.fixed} />}
        />
      </Grid>
      <Grid item xl={9} lg={9} md={9} sm={8} xs={8}>
        <Typography variant="body2" gutterBottom color='secondary'>
          <OutboundLink
            href="https://www.oriolcastro.me/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={props.classes.devlink}
          >
            www.oriolcastro.me
          </OutboundLink>
        </Typography>
        <Typography variant="body2" gutterBottom color='secondary' >
          <OutboundLink href="mailto:uri@oriolcastro.me" className={props.classes.devlink}>
            uri@oriolcastro.me{' '}
          </OutboundLink>
        </Typography>
        <div className={props.classes.root}>
        <OutboundLink href='https://www.instagram.com/oriolcastro_/' target="_blank"
            rel="nofollow noopener noreferrer">
          <SvgIcon className={props.classes.icon} color='secondary'>
            <path d={InstagramIcon} />
          </SvgIcon>
          </OutboundLink>
          <OutboundLink href='https://twitter.com/oriolcastro_' target="_blank"
            rel="nofollow noopener noreferrer">
          <SvgIcon className={props.classes.icon} color='secondary'>
            <path d={TwitterIcon} /> 
          </SvgIcon>
          </OutboundLink>
          <OutboundLink href='https://www.linkedin.com/in/oriolcaar/' target="_blank"
            rel="nofollow noopener noreferrer">
          <SvgIcon className={props.classes.icon} color='secondary'>
            <path d={LinkedInIcon} />
          </SvgIcon>
          </OutboundLink>
          <OutboundLink href='https://github.com/oriolcastro' target="_blank"
            rel="nofollow noopener noreferrer">
          <SvgIcon className={props.classes.icon} color='secondary'>
            <path d={GitHubIcon} />
          </SvgIcon>
          </OutboundLink>
        </div>
      </Grid>
    </Grid>
  </div>
)
export default withStyles(styles)(DevInfo)
