import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Typography from '@material-ui/core/Typography'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import NextPage from '@material-ui/icons/ChevronRight'
import PreviousPage from '@material-ui/icons/ChevronLeft'
import Search from '@material-ui/icons/Search'
import Filter from '@material-ui/icons/FilterList'
import Delete from '@material-ui/icons/Delete'
import { Query } from 'react-apollo'

import { GET_PLAYERS } from '../../utils/queries'

const columns = [
  { title: 'Nom', field: 'name' },
  { title: 'Primer cognom', field: 'firstSurname' },
  { title: 'Segon cognom', field: 'secondSurname' },
  { title: 'Correu electrònic', field: 'email' },
]

const icons = {
  FirstPage: () => <FirstPage />,
  LastPage: () => <LastPage />,
  NextPage: () => <NextPage />,
  PreviousPage: () => <PreviousPage />,
  Search: () => <Search />,
  Filter: () => <Filter />,
}

const localization = {
  pagination: {
    labelDisplayedRows: '{from}-{to} de {count}',
    labelRowsPerPage: 'Files per pàgina',
    firstTooltip: 'Primera pàgina',
    previousTooltip: 'Pàgina prèvia',
    nextTooltip: 'Seguent pàgina',
    lastTooltip: 'Última pàgina',
  },
  toolbar: {
    searchTooltip: 'Cerca',
  },
}

class ReviewPlayers extends Component {
  constructor(props) {
    super(props)
  }

  eliminatePlayer = (e, rowData) => {
    e.preventDefault()
    console.log(`You clicked the row from user: ${rowData.player_id}`)
    //TODO: Add logic to eliminate player and cal the lambda function to perform the actions required
  }

  render() {
    return (
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h6" paragraph>
          Revisa les dades i elimina aquells que no han recollit el clauer
        </Typography>
        <Query query={GET_PLAYERS}>
          {({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error: ${error}`
            return (
              <MaterialTable
                columns={columns}
                data={data.playersDev} //TODO: before merging with Master branch change playersDev to players
                title="Jugadors inscrits"
                icons={icons}
                localization={localization}
                options={{
                  actionsColumnIndex: 5,
                  doubleHorizontalScroll: true,
                  filtering: false,
                  pageSize: 20,
                  pageSizeOptions: [20, 50, 100],
                  doubleHorizontalScroll: true,
                }}
                actions={[
                  {
                    icon: () => <Delete />,
                    tooltip: 'Eliminar aquest jugador',
                    onClick: this.eliminatePlayer,
                  },
                ]}
              />
            )
          }}
        </Query>
      </div>
    )
  }
}

export default ReviewPlayers
