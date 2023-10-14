const JWT_SECRET_KEY = 'super-secret-key';
// eslint-disable-next-line no-useless-escape
const regular = /^(https|http):\/\/(w{3}\.)?[A-ZА-ЯЁ0-9\-\._~:/?#[\]@!$&'()*\+,;=]+\.[A-ZА-ЯЁ0-9\-\._~:/?#[\]@!$&'()*\+,;=]{2,256}/i;
const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
module.exports = {
  JWT_SECRET_KEY,
  regular,
  PORT,
  DB_URL,
};
