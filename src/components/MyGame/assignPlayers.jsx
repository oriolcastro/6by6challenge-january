import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import axios from 'axios'

class AssignPlayers extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const payload = {
      breaking_date: '2003-02-25',
    }
    axios
      .post('.netlify/functions/generateAndAssignKills', {
        payload,
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    console.log('Players assigned')
  }

  render() {
    return (
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h6" paragraph>
          Assigna els emparellaments
        </Typography>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Assigna
        </Button>
      </div>
    )
  }
}

export default AssignPlayers
