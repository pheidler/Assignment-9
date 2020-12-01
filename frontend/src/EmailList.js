import React from 'react';
import {makeStyles} from '@material-ui/core/styles';


import SharedContext from './SharedContext';

const useStyles = makeStyles((theme) => ({

}));

/**
 * @return {object} JSX
 */
function EmailList() {
  const {mailbox} = React.useContext(SharedContext);

  /* API call to get emails */

  const classes = useStyles();
  console.log(classes);
  console.log(mailbox);
  return (
    <p>Help</p>
  );
}

export default EmailList;
