var connectDB = () => {
  const mongoose = require('mongoose');
  let URL = `${process.env.DB_PROTOCOL}://${process.env.DB_HOST}/${process.env.DB_NAME}`; 
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Kết nối db thành công');
  });
  return mongoose;
};
module.exports = connectDB;  