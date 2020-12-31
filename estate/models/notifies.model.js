let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let notifiesSchema = new Schema({
  idOwner: { type: String, ref: "users" },
  idPost: { type: String, ref: "poster_room" },
  content: { type: String }
}, {
  collection: 'notifies',
  timestamps: true,
})
var notifiesModel = mongoose.model('notifies', notifiesSchema);
module.exports = notifiesModel;