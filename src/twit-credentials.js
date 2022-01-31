const { parsed: env } = require("dotenv").config();
const Twit = require("twit");

/*

    https://www.npmjs.com/package/twit
    https://developer.twitter.com/en/docs/api-reference-index
    https://developer.twitter.com/en/docs/tweets/search/guides/standard-operators
    https://api.twitter.com/1.1/users/lookup.json?screen_name=turnofftheDOTtv

*/

const {
  API: consumer_key,
  API_SECRET: consumer_secret,
  ACCESS: access_token,
  ACCESS_SECRET: access_token_secret
} = env;

const Twitter = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
  // strictSSL: true,         // optional - requires SSL certificates to be valid.
});

module.exports = Twitter
// export default Twitter;