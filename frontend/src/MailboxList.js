import React from 'react';
import {useState, useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import StarIcon from '@material-ui/icons/Star';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';


import SharedContext from './SharedContext';


const boxes = [
  {name: 'Inbox', icon: <MailIcon/>},
  {name: 'Starred', icon: <StarIcon/>},
  {name: 'Sent', icon: <SendIcon/>},
  {name: 'Drafts', icon: <DraftsIcon/>},
  {name: 'Trash', icon: <DeleteIcon/>},
];

/* Styling */
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer +200,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: -20,
  },
  mailboxCount: {
    position: 'absolute',
    marginLeft: 230,
  },
}));

/**
 * @return {object} JSX
 */
function MailboxList() {
  const classes = useStyles();
  const {mailbox, selectMailbox} = React.useContext(SharedContext);
  const [mailboxes, setMailboxes] = useState([]);
  const history = useHistory();


  /* API call to get emails */
  useEffect(async () => {
    const item = localStorage.getItem('user');
    if (!item) {
      console.log('Not signed in!');
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    await fetch(`http://localhost:3010/v0/mailboxes`, {
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
          setMailboxes(json);
        })
        .catch((error) => {
          if (error.status >= 400) {
            history.push('/');
          }
          console.log(error.toString());
        });
  }, []);

  const mailboxObjects = parseMailboxes(mailboxes);


  return (
    <div className={classes.drawerPaper}>
      <Toolbar>
        <Typography variant="h5" className={classes.header}>
          CSE183 Mail
        </Typography>
      </Toolbar>
      {/* Default mailboxes */}
      <List>
        {mailboxObjects.map((box) => (
          <ListItem button
            key={box.name}
            disabled={mailbox == box.name}
            onClick={() => selectMailbox(box.name)}
          >
            <ListItemIcon>
              {box.icon}
            </ListItemIcon>
            <ListItemText primary={box.name}/>
            <ListItemText
              className={classes.mailboxCount}
              primary={box.count}/>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* User created mailboxes */}

    </div>
  );

  /* Helper functions */

  /**
   * Parse mailboxes
   * @param{object} mailboxes
   * @return{object} mailboxObjs
   */
  function parseMailboxes(mailboxes) {
    const mailboxObjs = [];
    for (let i = 0; i < mailboxes.length; i++ ) {
      mailboxObjs.push({
        name: mailboxes[i]['mailbox'],
        count: mailboxes[i]['emails'] === 0 ? '' : mailboxes[i]['emails'],
        icon: <ArrowForwardIosIcon />,
      });
      for (let j = 0; j < boxes.length; j++ ) {
        if (mailboxes[i]['mailbox'] === boxes[j]['name']) {
          mailboxObjs[i]['icon'] = boxes[j]['icon'];
        }
      }
    }
    return mailboxObjs;
  }
}

export default MailboxList;
