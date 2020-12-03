import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import StarIcon from '@material-ui/icons/Star';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';


import SharedContext from './SharedContext';

/* Default Mailboxes */
const inbox = {name: 'Inbox', icon: <MailIcon/>};

const boxes = [
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
}));

/**
 * @return {object} JSX
 */
function MailboxList() {
  const classes = useStyles();
  const {mailbox, selectMailbox} = React.useContext(SharedContext);


  return (
    <div className={classes.drawerPaper}>
      <Toolbar>
        <Typography variant="h5" className={classes.header}>
          CSE183 Mail
        </Typography>
      </Toolbar>
      {/* Default mailboxes */}
      <List>
        <ListItem button
          key={inbox.name}
          disabled={mailbox == inbox.name}
          onClick={() => selectMailbox(inbox.name)}
        >
          <ListItemIcon>
            {inbox.icon}
          </ListItemIcon>
          <ListItemText primary={inbox.name}/>
        </ListItem>
        <Divider />
        {boxes.map((box) => (
          <ListItem button
            key={box.name}
            disabled={mailbox == box.name}
            onClick={() => selectMailbox(box.name)}
          >
            <ListItemIcon>
              {box.icon}
            </ListItemIcon>
            <ListItemText primary={box.name}/>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* User created mailboxes */}

    </div>
  );
}

export default MailboxList;
