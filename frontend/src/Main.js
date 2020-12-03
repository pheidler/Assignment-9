import React from 'react';

import TitleBar from './TitleBar';
import Content from './Content';
import MailboxDrawer from './MailboxDrawer';


/**
 * A full fledged web app
 *
 * @return {object} JSX
 */
function Main() {
  const item = localStorage.getItem('user');
  console.log(item);
  console.log(JSON.parse(item));
  if (!item) {
    console.log('not signed in!!');
  }
  return (
    <>
      <MailboxDrawer/>
      <TitleBar/>
      <Content/>
    </>
  );
}

export default Main;
