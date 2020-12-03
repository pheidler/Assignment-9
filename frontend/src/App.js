import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import ViewEmail from './ViewEmail';
import Main from './Main';
import SharedContext from './SharedContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';


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
  const classes = useStyles();
  const [mailbox, setMailbox] = React.useState('Inbox');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedEmail, setSelectedEmail] = React.useState({});
  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <SharedContext.Provider value= {{
        mailbox, setMailbox,
        drawerOpen, setDrawerOpen,
        toggleDrawerOpen, selectedEmail, setSelectedEmail,
      }}
      >
        <Router>
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/mailView">
              <ViewEmail />
            </Route>
          </Switch>
        </Router>
      </SharedContext.Provider>
    </div>
  );
}

export default App;
