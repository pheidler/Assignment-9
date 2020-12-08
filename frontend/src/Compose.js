import React, {useState, useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import SharedContext from './SharedContext';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useHistory} from 'react-router-dom';

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
    height: '100vh',
  },
  composeInput: {
    width: '100%',
    marginTop: '5px',
  },
  contentInput: {
    width: '100%',
    marginTop: '20px',
  },
}));

/**
 * A full fledged web app
 *
 * @return {object} JSX
 */
function Compose() {
  const classes = useStyles();
  const history = useHistory();
  const [recipient, setRecipient] = useState('');
  const [recipientError, setRecipientError] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const {user, setUser} = React.useContext(SharedContext);
  const item = localStorage.getItem('user');
  if (!item) {
    console.log('Not signed in!');
    return;
  }
  const storedInfo = JSON.parse(item);
  const bearerToken = storedInfo ? storedInfo.accessToken : '';
  const bearerEmail = storedInfo ? storedInfo.email.replace(/\@/g, '%40') : '';
  console.log(recipientError);
  useEffect(async () => {
    await fetch(`http://localhost:3010/v0/user?email=${bearerEmail}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then((json) => {
          setUser(json);
        })
        .catch((error) => {
          if (error.status >= 400) {
            history.push('/');
          }
          console.log(error.toString());
        });
  }, []);

  return (
    <Paper className={classes.paper}>
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
              onClick={() => sendEmail()}
            >
              <SendIcon/>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      {
        recipientError ?
        <TextField
          error
          value={recipient}
          onChange={(e)=>updateRecipient(e.target.value)}
          className={classes.composeInput}
          label="To" /> :
          <TextField
            value={recipient}
            onChange={(e)=> updateRecipient(e.target.value)}
            className={classes.composeInput}
            label="To" />
      }
      <TextField
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}
        className={classes.composeInput}
        label="Subject" />
      <TextField
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        className={classes.contentInput}
        label="Content"
        multiline
        rows={8}
        variant="outlined"
      />
    </Paper>
  );
  /**
   * Send email
   */
  async function sendEmail() {
    const email = {
      'from': {
        'name': user.name,
        'email': user.email,
      },
      'to': {
        'name': '',
        'email': recipient,
      },
      'subject': subject ? subject : '',
      'content': content,
    };

    console.log(JSON.stringify(email));
    /* POST new email */
    await fetch(`http://localhost:3010/v0/mail`, {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      console.log(response);
      if (!response.ok) {
        throw response;
      }
      history.push('/main');
    })
        .catch((error) => {
          console.log(error);
          switch (error.status) {
            case 400:
              setRecipientError(true);
              setRecipient('');
              break;
            default:
              history.push('/main');
          }
        });
  }
  /**
   * Udpate recipient field
   * @param{string} value
   */
  function updateRecipient(value) {
    setRecipientError(false);
    setRecipient(value);
  }
}

export default Compose;
