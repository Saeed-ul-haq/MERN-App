const mongoose = require("mongoose");


const mongoConnect = (callback) => {
    mongoose.connect(
    "mongodb+srv://saeed_user:0pJb35kbiNuZRGSl@cluster0.o2w8t.mongodb.net/places?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
    .then((client) => {
      console.log(`🚀 Server ready at http://localhost:5000/api`);
      callback();
    })
    .catch((err) => {
      console.log("err", err);
    });
};



exports.mongoConnect = mongoConnect;

