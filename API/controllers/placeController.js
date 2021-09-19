const { validationResult } = require("express-validator");
const Place = require("../models/Place");
const User = require("../models/User");
const mongoose = require("mongoose");

const getPlaces = (req, res, next) => {
  Place.find()
    .then((places) => {
      res
        .status(200)
        .json({ message: "Places fetched successfully", data: places });
    })
    .catch((err) => {});
};

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  //   const place = DUMMY_PLACES.find((place) => place.id == placeId);
  Place.findById(placeId)
    .then((place) => {
      if (place !== null) {
        res
          .status(200)
          .json({ data: place, message: "Places fetched successfully" });
      } else {
        const error = new Error("No  places found");
        error.status = 404;
        return next(error);
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  // Place.find({ creator: userId })
  //   .then((places) => {
  //     if (places) {
        // res.json({ data: places, message: "Places fetched successfully" });
  //     } else {
        // const error = new Error("No  places found");
        // error.status = 404;
        // return next(error);
  //     }
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });

  // Alternate method for places using placeId

  User.findById(userId).populate('places').then(user => {
    if(!user || user.places.length === 0)
    {
      const error = new Error("No  places found");
        error.status = 404;
        return next(error);

    }
    res.json({ data: user.places.map(place => place), message: "Places fetched successfully" });

  })
};

const createPlace = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const validationError = new Error(
      "invalid inputs passed, please check your input"
    );

    validationError.status = 422;
    next(validationError);
  }
  const { title, description, address, coordinates, image, creator } = req.body;

  const newPlace = new Place({
    title,
    description,
    image,
    location: coordinates,
    address,
    creator,
  });

  User.findById(creator).then((existUser) => {
    if (!existUser) {
      const error = new Error("Could not find user for provided id ", creator);
      error.status = 404;
      return next(error);
    }

    mongoose
      .startSession()
      .then((sess) => {
        sess.startTransaction();
        newPlace
          .save({ session: sess })
          .then(() => {
            existUser.places.push(newPlace);
            return existUser.save({ session: sess });
          })
          .then(() => {
            sess.commitTransaction();
            res.json({
              message: "new place has been created",
              newPlace: newPlace,
            });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
  // newPlace
  //   .save()
  //   .then((place) => {
  //     res
  //       .status(201)
  //       .json({ data: place, message: "New place has been created" });
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
};

const updatePlace = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const validationError = new Error(
      "invalid inputs passed, please check your input"
    );

    validationError.status = 422;
    throw validationError;
  }
  console.log("body of place ", req.body);
  const { title, description } = req.body;
  const placeId = req.params.pid;
  Place.findById(placeId)
    .then((place) => {
      place.title = title;
      place.description = description;
      return place.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ place: result, message: "Place updated successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  Place.findById(placeId)
    .populate("creator")
    .then((place) => {
      if (!place) {
        const error = new Error("nO place found against id");
        error.status = 404;
        next(error);
      }
      place.remove().then(() => {
        place.creator.places.pull(place);
        place.creator.save().then(() => {
          res.status(200).json({ message: "Place deleted successfully" });
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = {
  getPlaces,
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
