import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StepsList from './step/StepsList';

const ExpansionPanel = withStyles( {
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': { borderBottom: 0, },
    '&:before': { display: 'none', },
    '&$expanded': { margin: 'auto', },
  },
  expanded: {},
} )( MuiExpansionPanel )

const ExpansionPanelSummary = withStyles( {
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': { minHeight: 56, },
  },
  content: {
    '&$expanded': { margin: '12px 0', },
  },
  expanded: {},
} )( MuiExpansionPanelSummary );

const ExpansionPanelDetails = withStyles( ( theme ) => ( {
  root: {
    padding: theme.spacing( 2 ),
  },
} ) )( MuiExpansionPanelDetails );

const ExpansionList = ( {
  items
} ) => {
  const [ expanded, setExpanded ] = React.useState( '' )

  const handleChange = ( panel ) => ( event, newExpanded ) => {
    setExpanded( newExpanded ? panel : false );
  }

  //================================================================================================
  return <div>

    { items.map( item =>
      <ExpansionPanel
        square expanded={ expanded === item.id }
        onChange={ handleChange( item.id ) }
        onClick
      >
        <ExpansionPanelSummary
          aria-controls={ item.id }
          id={ item.id }
          expandIcon={ <ExpandMoreIcon /> }
        >
          <div className="row" onClick={ ( event ) => event.stopPropagation() }>
            { item.title }
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <StepsList />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ) }

    <ExpansionPanel square expanded={ expanded === 'panel1' } onChange={ handleChange( 'panel1' ) }>
      <ExpansionPanelSummary aria-controls="gg" id="gg">
        vv
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>

  </div>
}


export default ExpansionList