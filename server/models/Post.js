const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    countryAlpha2: {
        type: String,
        required: true,
    },
    url: {
      type: String,
      required: true,
    },
    subCountry: {
      type: String,
    },
});

module.exports = mongoose.model("Post", PostSchema, 'islandsPosts')