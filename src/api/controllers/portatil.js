const Portatil = require("../models/portatil");
const portatil = require("../../../products.json");

const getPortatiles = async (req, res, next) => {
  try {
    const portatiles = await Portatil.find();
    return res.status(200).json(portatiles);
  } catch (error) {
    return res.status(400).json(error.message);
  };
};


const insertPortatiles = async (req, res, next) => {
  try {
    await Portatil.insertMany(portatil.results)
    return res.status(201).json("productos subidos a BBDD")
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const updatePortatil = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newPortatil = new Portatil(req.body);
    newPortatil._id = id;
    const updatedPortatil = await Portatil.findByIdAndUpdate(id, newPortatil, { new: true });
    return res.status(200).json(updatedPortatil);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const deletePortatil = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPortatil = await Portatil.findByIdAndDelete(id);
    return res.status(200).json(deletedPortatil);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};


module.exports = { insertPortatiles, getPortatiles, updatePortatil, deletePortatil }