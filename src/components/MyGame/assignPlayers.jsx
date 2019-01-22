import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

class AssignPlayers extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
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
