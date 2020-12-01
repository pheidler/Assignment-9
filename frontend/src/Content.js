import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EmailList from './EmailList';

import SharedContext from './SharedContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    marginTop: '45px',
    padding: theme.spacing(2),

  },
}));

/**
 * @return {object} JSX
 */
function Content() {
  const {mailbox} =
    React.useContext(SharedContext);

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <h3>{mailbox}</h3>
      <EmailList/>
    </Paper>
  );
}

export default Content;
