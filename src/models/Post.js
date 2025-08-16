const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: 'Anonymous',
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    published: {
      type: Boolean,
      default: true
    },
    description: {
  type: String,
  trim: true,
  maxlength: 300
},

    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);