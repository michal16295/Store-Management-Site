const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const Product_Schema = new Schema({
  id: {
    type: Number,
    min: 1,
    required: true
  },
  name: {
    type: String,
    minlength: 2,
    required: true
  },
  buyingPrice: {
    type: Number,
    min: 0,
    required: true
  },
  sellingPrice: {
    type: Number,
    min: 0,
    required: true
  },
  quantity: {
    type: Number,
    min: 0,
    required: true
  }
});

function ValidateNewProduct(req) {
  const schema = {
    id: Joi.number().required(),
    name: Joi.string()
      .min(1)
      .max(255)
      .required(),
    buyingPrice: Joi.number()
      .min(0)
      .required(),
    sellingPrice: Joi.number()
      .min(0)
      .required()
  };
  return Joi.validate(req, schema);
}

exports.Product = mongoose.model("Product", Product_Schema);
exports.ValidateNewProduct = ValidateNewProduct;
