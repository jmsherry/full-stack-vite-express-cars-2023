const path = require("path");
const express = require("express");
const router = express.Router();

const {
  getCars,
  addCar,
  updateCar,
  removeCar,
} = require("../controllers/car.controller");


router
  .get("/:id?", getCars)
  .post("/", addCar)
  .put("/:id", updateCar)
  .delete("/:id", removeCar);

module.exports = router;