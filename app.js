require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_URL } = require('./utils/constants');
const errorHandler = require('./middlewares/handleError');
const router = require('./routes/index');

mongoose.connect(DB_URL);

const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'https://elem.nomoreparties.co', 'http://elem.nomoreparties.co'], credentials: true }));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
