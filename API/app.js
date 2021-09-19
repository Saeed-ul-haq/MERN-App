const express = require("express");
const bodyParser = require("body-parser");
const MongoConnect = require("./utils/database").mongoConnect;
const PlacesRoutes = require("./routes/places-routes");
const UsersRoutes = require("./routes/users-routes");
const Mongoose  = require("mongoose");

const app = express();

// Body Parser middleware for incomming requests

app.use(
  bodyParser.json({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,Accept, Content-Type, Authorization");
  next();
});

app.use("/api/places", PlacesRoutes);
app.use("/api/users", UsersRoutes);

// Unnamed Routes
app.use((req, res, next) => {
  const error = new Error("Could not find this router");
  error.status = 404;
  throw error;
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.status || 500);
  res.json({ message: error.message || "An Unknow error occured" });
});

MongoConnect(() => app.listen(5000));

// Mongoose.connect(
//   "mongodb+srv://saeed_user:0pJb35kbiNuZRGSl@cluster0.o2w8t.mongodb.net/places?retryWrites=true&w=majority"
// )
//   .then(() => console.log("connected"))
//   .catch((err) => console.log(err));
