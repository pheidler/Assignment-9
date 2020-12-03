import React, {useState} from 'react';
// import SharedContext from './SharedContext';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';


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
 * A full fledged web app
 * @param {object} props
 * @return {object} JSX
 */
function Favorite(props) {
  const classes = useStyles();
  const [starred, setStarred] = useState(props.email.starred);

  return (
    <>
      {
      starred ?
      <StarIcon
        onClick={()=>setFavorite(props.email, event)}
        className={classes.starIcon}/> :
      <StarBorderIcon
        onClick={()=>setFavorite(props.email, event)}
        className={classes.starIcon}/>
      }
    </>
  );
  /**
   * Parse date object
   * @param {object} email
   * @param {object} event
   */
  async function setFavorite(email, event) {
    console.log('this is happening1');
    event.stopPropagation();
    await fetch(`http://localhost:3010/v0/mail/${email['id']}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    }).then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
        .catch((error) => {
          console.log(error.toString());
        });
    setStarred(!starred);
  }
}
Favorite.propTypes = {
  email: PropTypes.object,
};

export default Favorite;
