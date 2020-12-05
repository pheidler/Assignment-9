import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Favorite from './Favorite';

import Box from '@material-ui/core/Box';
import {useHistory} from 'react-router-dom';


import SharedContext from './SharedContext';

const useStyles = makeStyles((theme) => ({
  block: {
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  emailList: {
    width: '100%',
  },
  dateColumn: {
    minWidth: '15%',
    display: 'block',
    position: 'relative',
  },
  emailDate: {
    right: '0px',
  },
  starIcon: {
    marginTop: '10px',
    marginLeft: '30px',
  },
  profilePicture: {
    marginLeft: '-10px',
    marginRight: '10px',
    marginTop: '10px',
  },

}));


/**
 * @return {object} JSX
 */
function EmailList() {
  const {mailbox,
    setSelectedEmail} = React.useContext(SharedContext);
  const [mail, setMail] = useState([]);
  const [deprecated, setDeprecated] = useState(false);
  const history = useHistory();
  const currentDate = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];

  /* API call to get emails */
  useEffect(async () => {
    const item = localStorage.getItem('user');
    if (!item) {
      console.log('Not signed in!');
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    await fetch(`http://localhost:3010/v0/mail?mailbox=${mailbox}`, {
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
          setMail(json);
        })
        .catch((error) => {
          if (error.status >= 400) {
            history.push('/');
          }
          console.log(error.toString());
        });
    setDeprecated(false);
  }, [mailbox, deprecated]);
  const sortedEmails = mail.sort((a, b) => {
    const bDate = new Date(b.received);
    const aDate = new Date(a.received);
    return bDate - aDate;
  });
  const classes = useStyles();
  return (
    <List
      className={classes.emailList}
      component="nav"
      aria-label="main mailbox folders">
      {sortedEmails.map((email) => (
        /* https://codesandbox.io/s/si9yq?file=/demo.js:2241-2356 */
        <ListItem
          key={email.id}
          button
          alignItems="flex-start"
          onClick={() => viewEmail(email)}>
          <Avatar
            className={classes.profilePicture}>
            {email.from.name[0]}
          </Avatar>
          <ListItemText
            primary={email.from.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.block}
                  color="textPrimary"
                >
                  {email.subject}
                  <br></br>
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.block}
                  color="textSecondary"
                >
                  {email.content}
                </Typography>
              </React.Fragment>
            }/>
          <Box className={classes.dateColumn}>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              className={classes.emailDate}>
              {parseDate(email.received)}
            </Typography>
            <Favorite onClick={()=>handleStarredClick} email={email}/>
          </Box>
        </ListItem>
      ))}
    </List>
  );

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

  /**
   * View email
   * @param {object} email
   */
  async function viewEmail(email) {
    setSelectedEmail(email);
    history.push('/mailView');
  }
}

export default EmailList;
