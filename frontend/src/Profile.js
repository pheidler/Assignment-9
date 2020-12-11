import React, {useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SaveIcon from '@material-ui/icons/Save';
import PersonalAvatar from './PersonalAvatar';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SharedContext from './SharedContext';

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
  profilePagePicture: {
    marginLeft: '10px',
    width: '30vw',
    height: '30vw',
  },
  profilePageName: {
    fontSize: '20pt',
    fontWeight: 'bold',
    marginLeft: '30px',
    marginTop: '25px',
  },
  profilePageEmail: {
    marginLeft: '30px',
    color: 'grey',
  },
  profilePageCheckbox: {
    marginLeft: '30px',
  },
}));

/**
 * A full fledged web app
 *
 * @return {object} JSX
 */
function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const {user, setUser} = React.useContext(SharedContext);
  const item = localStorage.getItem('user');
  const [checked, setChecked] = React.useState(user.showavatar);
  const [openModal, setOpenModal] = React.useState(false);
  const [input, setInput] = React.useState('');
  const storedInfo = JSON.parse(item);
  const bearerToken = storedInfo ? storedInfo.accessToken : '';
  const bearerEmail = storedInfo ? storedInfo.email.replace(/\@/g, '%40') : '';
  /* https://codesandbox.io/s/18h0z?file=/demo.js:514-625 */
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSaveURL = () => {
    user['profilepicture'] = input;
    updateUser();
    handleCloseModal();
    setInput('');
  };

  /* https://codesandbox.io/s/rrrmf?file=/demo.js:174-251 */
  const updateShowAvatar = (async (user, event) => {
    user['showavatar'] = !user['showavatar'];
    updateUser();
    setChecked(!checked);
  });

  const updateUser = (async () => {
    await fetch(`http://localhost:3010/v0/user`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw response;
      }
    })
        .catch((error) => {
          console.log(error);
          history.push('/main');
        },
        );
  });
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
  }, [openModal]);
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
              onClick={()=>history.push('/main')}
            >
              <SaveIcon/>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <Grid container>
        <Grid item xs={4}>
          <Button onClick={handleOpenModal}>
            <PersonalAvatar
              email={user['email']}
              name={user['name']}
              styleName={classes.profilePagePicture}
              isProfilePage={true}/>
          </Button>
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Upload</DialogTitle>
            <DialogContent>
              <DialogContentText>
            To update your photo, please enter a new URL.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Url of New Photo"
                type="url"
                fullWidth
                onChange={handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
            Cancel
              </Button>
              <Button onClick={handleSaveURL} color="primary">
            Save
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.profilePageName}>
            {user['name']}
          </Typography>
          <Typography className={classes.profilePageEmail}>
            {user['email']}
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={user.showavatar}
                onChange={()=>updateShowAvatar(user)}
                className={classes.profilePageCheckbox} />
            }
            label="Show Avatar"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Profile;
