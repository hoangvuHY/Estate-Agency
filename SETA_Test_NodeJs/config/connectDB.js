var connectDB = () => {
  const mongoose = require('mongoose');
  let URL = process.env.MONGO_DB;
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Connect Database Success');
  });
  return mongoose;
};
module.exports = connectDB;  