import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: '100%',
  },
  mailView: {
    width: '100%',
    display: 'block',
  },
  profilePicture: {
    marginRight: '10px',
    marginTop: '10px',
  },
}));

/**
 * A full fledged web app
 *
 * @return {object} JSX
 */
function Compose() {
  const classes = useStyles();

  return (
    <Toolbar className={classes.header}>
      <Box display="flex" className={classes.header}>
        <Box flexGrow={1}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => history.push('/main')}
          >
            <ArrowBackIosIcon/>
          </IconButton>
        </Box>
        <Box>
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => deleteEmail()}
          >
            <SendIcon/>
          </IconButton>
        </Box>
      </Box>
    </Toolbar>
  );
}

export default Compose;
