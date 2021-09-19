const express = require("express");
const PlaceController = require("../controllers/placeController");
const { check } = require("express-validator");
const router = express.Router();

router.get('/',PlaceController.getPlaces);
router.get("/:pid", PlaceController.getPlaceById);

router.get("/user/:uid", PlaceController.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  PlaceController.createPlace
);

router.put(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 })
],
  PlaceController.updatePlace
);
router.delete("/:pid", PlaceController.deletePlace);

module.exports = router;
