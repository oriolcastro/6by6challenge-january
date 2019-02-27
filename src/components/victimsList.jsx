import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const VictimsList = props => {
  return (
    <List>
      {props.victims.map(({ victim }) => {
        return (
          <ListItem divider key={victim.player_id} disableGutters>
            <ListItemText
              primary={`${victim.name} ${victim.firstSurname} ${
                victim.secondSurname
              }`}
            />
            <ListItemText
              secondary={victim.team.name}
              secondaryTypographyProps={{ align: 'right' }}
              style={{ maxWidth: '50%' }}
            />
          </ListItem>
        )
      })}
    </List>
  )
}

export default VictimsList
