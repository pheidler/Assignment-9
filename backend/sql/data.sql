
-- Populate Your Tables Here --

--USERS--
INSERT INTO users(email, passwordHash, mailboxes, profilePicture, name, showAvatar) VALUES ('pheidler@ucsc.edu', '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y', '{ Inbox, Trash, Sent, Starred, Drafts, Custom Mailbox }', 'https://res.cloudinary.com/rrees/image/upload/v1607544879/ql0ecyz5ocouitkbcs8z.jpg', 'Pete Heidler', true);

INSERT INTO users(email, passwordHash, mailboxes, profilePicture, name, showAvatar) VALUES ('dcharris@ucsc.edu', '$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze', '{ Inbox, Trash, Sent, Starred, Drafts }', '', 'David Harrison', true);


--EMAILS--
INSERT INTO mail(mailbox, email, mail) VALUES ('Inbox', 'pheidler@ucsc.edu', '{"to":{"name":"Pete Heidler","email":"pheidler@ucsc.edu"},"from":{"name":"David Harrison","email":"dcharris@ucsc.edu"},"received":"2020-11-17T23:17:19Z","sent":"2020-11-14T17:09:17Z","content":"Wow Pete, I am beyond impressed with you. Keep up the great work!","subject":"A message from your Professor"}');
