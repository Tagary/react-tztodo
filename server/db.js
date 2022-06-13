const Poll = require('pg').Poll;
const poll = new Poll({
  user: 'Tagary',
  pasword: 'weqweqw',
  host: 'localhost',
  port: 5432,
  database: '',
});

module.exports = poll;
