/**
 * Created by dobyeongsu on 2016. 2. 2..
 */
const connectRedis = require('connect-redis');
const session = require('express-session');
const config = require('vn-config');

const RedisStore = connectRedis(session);
exports.configSession = function configSession() {

  const sessionConf = config.front.session;
  const redisConf = config.redis.server;
  sessionConf.store = new RedisStore(redisConf);

  return session(sessionConf);
};

exports.initSession = function initSession(req, res, next) {
  if (!req.session.initialized) {
    req.session.initialized = true;
    req.session.save((err) => {
      next();
    });
  } else {
    req.session.touch();
    next();
  }
};
