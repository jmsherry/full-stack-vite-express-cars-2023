const Car = require("../models/car.model");
const logger = require('../middleware/logger');

exports.getCars = async (req, res) => {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }

  try {
    const cars = await Car.find(query);
    res.status(200).json(cars);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err)
  }

};

exports.addCar = async (req, res) => {
  const carData = req.body;
  logger.info("carData", carData);
  try {
    const newCar = new Car(carData);
    const result = await newCar.save();
    res.status(201).json(result);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err)
  }
};

exports.updateCar = async (req, res) => {
  try {
    const result = await Car.updateOne({ _id: req.params.id }, req.body);
    if(result.n === 0) return res.sendStatus(404)
    res.sendStatus(200);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err)
  }
};

exports.removeCar = async (req, res) => {
  try {
    const result = await Car.deleteOne({ _id: req.params.id });
    if(result.n === 0) return res.sendStatus(404)
    res.sendStatus(204)
  } catch (err) {
    logger.error(err);
    res.status(500).send(err)
  }
};