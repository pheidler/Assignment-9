import React from 'react';
import {useHistory} from 'react-router-dom';

import SharedContext from './SharedContext';
import Toolbar from '@material-ui/core/Toolbar';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReplyIcon from '@material-ui/icons/Reply';
import ListItemText from '@material-ui/core/ListItemText';
import Favorite from './Favorite';


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
function ViewEmail() {
  const classes = useStyles();
  const {selectedEmail, mailbox} = React.useContext(SharedContext);
  const history = useHistory();

  const currentDate = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];


  /* Ask about during office hours */
  if (Object.keys(selectedEmail).length === 0 || selectedEmail === undefined) {
    console.log('returning to /');
    history.push('/', selectedEmail);
    return;
  }

  console.log(selectedEmail);
  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.header}>
        <Box display="flex" className={classes.header}>
          <Box flexGrow={1}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => history.push('/')}
            >
              <ArrowBackIosIcon/>
            </IconButton>
          </Box>
          <Box>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => markAsUnread()}
            >
              <MailIcon/>
            </IconButton>
          </Box>
          <Box>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => saveInbox()}
            >
              <SaveAltIcon/>
            </IconButton>
          </Box>
          <Box>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => deleteEmail()}
            >
              <DeleteIcon/>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <h3>{selectedEmail.subject}</h3>
      <h4>{mailbox}</h4>
      <Avatar
        className={classes.profilePicture}>
        {selectedEmail.from.name[0]}
      </Avatar>
      <ListItemText
        primary={selectedEmail.from.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.block}
              color="textPrimary"
            >
              {selectedEmail.subject}
              <br></br>
            </Typography>
            <Typography
              component="span"
              variant="body2"
              className={classes.block}
              color="textSecondary"
            >
              {selectedEmail.content}
            </Typography>
          </React.Fragment>
        }/>
      <Box className={classes.dateColumn}>
        <Typography
          component="span"
          variant="body2"
          color="textPrimary"
          className={classes.selectedEmailDate}>
          {parseDate(selectedEmail.received)}
        </Typography>
        <Favorite email={selectedEmail}/>
        <ReplyIcon
          onClick={()=>replyTo()}/>

      </Box>
    </Paper>
  );
  /**
   * Reply to selected email
   * @param {object} email
   */
  function replyTo() {
    console.log('Replying to selected email');
  }
  /**
   * Delete email object
   * @param {object} email
   */
  function deleteEmail() {
    console.log('deleting');
  }
  /**
   * Delete email object
   * @param {object} email
   */
  function saveInbox() {
    console.log('Saving to inbox');
  }
  /**
   * Delete email object
   * @param {object} email
   */
  function markAsUnread() {
    console.log('Marking as unread');
  }

  /**
   * Parse date object
   * @param {object} date
   * @return {String} date
   */
  function parseDate(date) {
    const received = new Date(date);
    if (received.getFullYear() < currentDate.getFullYear()) {
      return received.getFullYear();
    } else if (received.getMonth() == currentDate.getMonth() &&
    received.getDate() == currentDate.getDate()) {
      return `${received.getHours()}:${received.getMinutes()}`;
    } else {
      return `${months[received.getMonth()]} ${received.getDate()}`;
    }
  }
};

export default ViewEmail;
