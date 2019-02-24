import jsonServer from 'json-server';
import path from 'path';
import passport from 'passport';
import { BasicStrategy as Strategy } from 'passport-http';

import User from '../models/User.js';

const server = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, './src/json/db.json'));
const middlewares = jsonServer.defaults();

passport.use(new Strategy(
  (username, password, cb) => {
    const user = User.getUserByField('username', username);

    if (!user) { return cb(null, false); }
    if (user.password !== password) { return cb(null, false); }

    return cb(null, user);
  },
));

server.get('/login',
  passport.authenticate('basic'),
  (req, res) => {
  console.log(req);
  console.log(res);
    res.json({ username: req.user.username });
  });

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on 3000');
});
