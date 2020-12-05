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
  return (
    <>
      <MailboxDrawer/>
      <TitleBar/>
      <Content/>
    </>
  );
}

export default Main;
