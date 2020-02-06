const mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  link: {
    type: String,
    unique: true,
    required: true
  }
});

// Creates Article model from the above schema
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;