const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    alpha2: {
      type: String,
      required: true,
    },
    alpha3: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
});

module.exports = mongoose.model("Country", CountrySchema, 'countries')