const mongoose = require('mongoose');
const { regular } = require('../utils/constants');

const moviesSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: (v) => regular.test(v),
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator: (v) => regular.test(v),
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator: (v) => regular.test(v),
    },
  },
  owner: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    require: true,
    type: Number,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
}, { versionKey: false });
module.exports = mongoose.model('movie', moviesSchema);
