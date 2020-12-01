import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';

import SharedContext from './SharedContext';
import TitleBar from './TitleBar';
import Content from './Content';
import MailboxDrawer from './MailboxDrawer';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

/**
 * A full fledged web app
 *
 * @return {object} JSX
 */
function App() {
  const [mailbox, setMailbox] = React.useState('Inbox');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <SharedContext.Provider value= {{
        mailbox, setMailbox,
        drawerOpen, setDrawerOpen,
        toggleDrawerOpen,
      }}
      >
        <MailboxDrawer/>
        <TitleBar/>
        <Content/>
      </SharedContext.Provider>
    </div>
  );
}

export default App;
