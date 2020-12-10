import React, {useState} from 'react';
// import SharedContext from './SharedContext';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import SharedContext from './SharedContext';


const useStyles = makeStyles((theme) => ({
  starIcon: {
    marginTop: '10px',
    marginLeft: '20px',
  },
}));

/**
 * A full fledged web app
 * @param {object} props
 * @return {object} JSX
 */
function Favorite(props) {
  const classes = useStyles();
  const [starred, setStarred] = useState(props.email.starred);
  const {mailbox} = React.useContext(SharedContext);
  const item = localStorage.getItem('user');
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';

  return (
    <>
      {
      starred ?
      <StarIcon
        onClickCapture={()=>setFavorite(props.email, event)}
        className={classes.starIcon}/> :
      <StarBorderIcon
        onClickCapture={()=>setFavorite(props.email, event)}
        className={classes.starIcon}/>
      }
    </>
  );
  /**
   * Select/unselect email as favorite
   * @param {object} email
   * @param {object} event
   */
  async function setFavorite(email, event) {
    event.stopPropagation();

    email.starred = !email.starred;
    email.mailbox = mailbox;

    await fetch(`http://localhost:3010/v0/mail/${email['id']}`, {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
        .catch((error) => {
          console.log(error);
          if (error.status >= 401) {
            history.push('/');
          }
          console.log(error.toString());
        });

    setStarred(!starred);
  }
}
Favorite.propTypes = {
  email: PropTypes.object,
};

export default Favorite;
