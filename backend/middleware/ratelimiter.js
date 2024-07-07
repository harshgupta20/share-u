const rateLimit = require('express-rate-limit');

const rateLimiterUsingThirdParty = rateLimit({
//   windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  windowMs: 60 * 1000, // 24 hrs in milliseconds
  max: 60,
  message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429
});

module.exports = rateLimiterUsingThirdParty;