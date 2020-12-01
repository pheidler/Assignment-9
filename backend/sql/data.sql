-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
INSERT INTO mail(mailbox, mail) VALUES ('sent','{"to":{"name":"Shandra Rheam","email":"srheam0@myspace.com"},"from":{"name":"CSE183 Student","email":"cse183student@ucsc.edu"},"received":"2020-11-17T23:17:19Z","sent":"2020-11-14T17:09:17Z","content":"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","subject":"Sent sent sent"}');

INSERT INTO mail(mailbox, mail) VALUES ('inbox','{"to":{"name":"Shandra Rheam","email":"srheam0@myspace.com"},"from":{"name":"CSE183 Student","email":"cse183student@ucsc.edu"},"received":"2020-11-17T23:17:19Z","sent":"2020-11-14T17:09:17Z","content":"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","subject":"Inbox inbox inbox"}');

INSERT INTO mail(mailbox, mail) VALUES ('trash','{"to":{"name":"Shandra Rheam","email":"srheam0@myspace.com"},"from":{"name":"CSE183 Student","email":"cse183student@ucsc.edu"},"received":"2020-11-17T23:17:19Z","sent":"2020-11-14T17:09:17Z","content":"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","subject":"Trash trash trash"}');
