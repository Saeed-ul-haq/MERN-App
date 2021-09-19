const { validationResult } = require("express-validator");
const User = require("../models/User");

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res
        .status(200)
        .json({ message: "User fetched successfully", data: users });
    })
    .catch((err) => {});
};

const login = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const validationError = new Error(
      "Could'nt identify user, credentials seem to be wrong"
    );

    validationError.status = 422;
    throw validationError;
  }
  const { email, password } = req.body;

  User.findOne({ email: email }).then((existUser) => {
    if (!existUser || existUser.password != password) {
      const error = new Error("Invalid credentils , could not login you");
      error.status = 401;
      return next(error);
    }
    res
      .status(200)
      .json({ data: existUser, message: "User logined successfully" });
  });
};

const signup = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const validationError = new Error(
      "Could'nt identify user, credentials seem to be wrong"
    );

    validationError.status = 422;
    next(validationError);
  }
  const { name, email, password } = req.body;
  User.findOne({ email: email })
    .then((existedUser) => {
      if (existedUser) {
        const error = new Error("User already exist, please login instead");
        error.status = 422;
        return next(error);
      }
      const user = new User({
        name,
        email,
        password,
        image:
          "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
        places : [],
      });

      user.save().then((user) => {
        res
          .status(200)
          .json({ data: user, message: "User has been created" });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const deleteUser = (req,res,next) => {
  console.log('delete user ', req.params.uid);
  User.findByIdAndDelete(req.params.uid).then(() => {
    res.json({message: 'user has been deleted'})
  })
}
module.exports = {
  getUsers,
  login,
  signup,
  deleteUser
};
