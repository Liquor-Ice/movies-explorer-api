const rateLimiter = require('express-rate-limit');

module.exports.limiter = rateLimiter({
  windowMs: 10 * 60 * 1000,
  limit: 100,
});
