const mongoose = require('mongoose');

const opinionRenterSchema = mongoose.Schema({
  idRenter: {
    type: String,
    ref: "users"  
  },
  idPost: {
    type: String,
    ref: "poster_room"
  },
  content: String,
  status: {
    type: String,
    default: "pending"
  },
  typeOpinion: {
    type: String,
    default: "comment"
  },
  voteStar: {
    type: Number
  }
}, {
  collection: 'opinion_renter',
  timestamps: true
});

const opinionRenterModel = mongoose.model('opinion_renter', opinionRenterSchema);
module.exports = opinionRenterModel;