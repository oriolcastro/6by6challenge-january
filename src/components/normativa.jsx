import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

const Normativa = props => {
  const { classes } = props
  return (
    <div style={{ marginBottom: '32px' }}>
      <Typography variant="h6" paragraph>
        Funcionament del joc
      </Typography>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Bases</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography align="justify">
            Cada jugador té <strong>un</strong> objectiu concret (amb noms i
            cognoms) a matar i a la vegada podrà ser mort per un altre jugador.
            L’arma homicida serà una pastanaga que s’haurà de clavar al pit de
            la víctima seguint les normes. Un cop es comet un crim, la víctima
            mor, quedant eliminada, i ha d'entregar el nom del seu objectiu a
            qui l'ha matat perque aquest pugui continuar jugant, i així fins al
            final.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Els jugadors</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography align="justify">
            Els jugadors són membres de diferents entitats de Vilanova i la
            Geltrú, però juguen <strong>individualment</strong>, i amb el
            compromís d’estar <strong>tots</strong>
            els dies de Carnaval presents a Vilanova i la Geltrú. Cada jugador
            té inicialment <strong>un</strong> objectiu a matar, escrit en un
            clauer que s'entrega personalment a l'inici i que també poden trobar
            a l'apartat "El meu joc" del web. L’organització crea un cercle
            perfecte de participants de tal manera que no es pugui tancar fins a
            l’acabar el joc, per la qual cosa és molt important que cada jugador
            tingui molt clar <strong>qui</strong> és el seu objectiu en cada
            moment.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Com es mata?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography align="justify">
            Per matar, assassí i víctima han d’estar cara a cara, i l’assassí ha
            de tocar el pit de la víctima amb <strong>una pastanaga</strong>. Un
            cop comés el crim, l’assassí ha de mostrar el clauer amb el nom a la
            víctima per validar l’assassinat, o sigui que{' '}
            <strong>el clauer s’ha de portar sempre a sobre</strong>{' '}
            obligatòriament mentre duri el joc. No portar el clauer amb el nom
            de la víctima significa no poder jugar. No coneixes la teva víctima?
            Tranquil, el Carnaval és el millor lloc per conèixer gent! Per
            localitzar la víctima els assassins poden utilitzar qualsevol
            estratègia al seu abast: amics, coneguts, xarxes socials, padró
            municipal…
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Com evitar que et matin?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography align="justify">
            El primer és el primer, camufla la teva identitat, és Carnaval!
            Canvia de pentinat, de sexe, d’amics… no siguis previsible ni fàcil
            de trobar, dissimula... i si veus algu amb una pastanaga venint
            directe cap a tu... corre!!! Però la única forma de ser realment
            immune a l’assassinat és portar un{' '}
            <strong>nas de pallasso posat</strong>. Mentre es dugui el nas de
            pallasso, el teu botxí no et pot fer res de res.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            I quan em maten que?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography align="justify">
            Un cop et maten, estàs eliminat del joc (però podràs seguir fent
            vinagre, és clar) i has d’entregar el clauer amb el teu objectiu
            <strong>actual</strong> al teu assassí i validar la mort a través de
            la web. O sigui, si et maten <strong>només</strong> has d’entregar
            el clauer amb el nom de la teva próxima víctima i no els altres que
            hagis pogut acumular de víctimes anteriors mortes per tu (aquests
            contabilitzaran igual en el recompte al final del joc).
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Regles</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography align="justify">
            Només hi ha 4 normes estrictes que ajuden a que el joc funcioni i
            sigui més divertit i just per tothom:
            <ol>
              <li>
                No es pot matar a cap persona que vagi completament nua o
                estigui completament inconscient.
              </li>
              <li>
                No es pot matar quan la víctima porti posat un nas de pallasso
                (IMPORTANT: El nas només protegeix a la víctima si es porta
                degudament col·locat a la cara).
              </li>
              <li>
                No es pot arrencar el nas a la víctima de cap manera, ni
                prendre-li.
              </li>
              <li>
                Per matar la víctima només se la pot tocar amb la pastanaga al
                pit, no se la pot empènyer, colpejar o apunyalar per l’esquena.
              </li>
            </ol>
            A part d'això, res més. No cal matar a cara descoberta (les màscares
            sòn permeses es clar, és Carnaval), però quan hagis de matar fes-ho
            segur del que estàs fent i seguint les normes, per tal de no crear
            mals entesos. Cal evitar matar si quan ho fem podem crear confusions
            en base a les normes del joc. Qui incompleixi les normes podrà ser
            denunciat i eliminat del joc per l’autoritat competent de Sa Dotada
            Majestat.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default withStyles(styles)(Normativa)
