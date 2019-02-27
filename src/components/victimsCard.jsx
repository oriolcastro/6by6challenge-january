import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const VictimsCard = props => {
  const {
    Title,
    kills_aggregate: {
      aggregate: { count },
    },
  } = props
  return (
    <Paper style={{ padding: '8px' }}>
      <Grid item>
        <Typography variant="h6" align="center">
          {Title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h2" align="center">
          {count}
        </Typography>
      </Grid>
    </Paper>
  )
}

export default VictimsCard
