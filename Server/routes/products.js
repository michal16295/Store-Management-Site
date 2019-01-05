const { Product } = require('../models/product');
const { PurchasLogs } = require('../models/purchase_logs');
const { User } = require('../models/users');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const customer = require('../middlewares/customer');
const admin = require('../middlewares/admin');
const adminOrWorker = require('../middlewares/adminOrWorker');
const Joi = require('joi');

//adding a new product to the stock
router.post('/newProduct', [auth, adminOrWorker], async (req, res) => {
  const { error } = ValidateNewProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = await Product.findOne({ id: req.body.id });
  if (product) return res.status(400).send('Product already exists');

  product = {
    name: req.body.name,
    id: req.body.id,
    buyingPrice: req.body.buyingPrice,
    sellingPrice: req.body.sellingPrice,
    quantity: 0
  };
  product = await Product.create(product);
  if (!product) return res.status(400).send("ERROR - Product wasn't created!");

  const response = {
    message: 'Product created successfully'
  };
  return res.status(200).send(response);
});
//deleting a product from the stock
router.delete('/:id', [auth, admin], async (req, res) => {
  let productID = parseInt(req.params.id);
  if (isNaN(productID) || productID <= 0)
    return res.status(404).send('ID must be a positive number');

  const product = await Product.findOne({ id: productID });
  if (!product) return res.status(404).send('The product was not found');
  await Product.deleteOne(product);
  const response = {
    message: 'Product deleted successfully'
  };

  return res.status(200).send(response);
});
// ordering items to the stock
router.put('/buy/:id', [auth, admin], async (req, res) => {
  let productID = parseInt(req.params.id);
  if (isNaN(productID) || productID <= 0)
    return res.status(404).send('ID must be a positive number');
  const product = await Product.findOne({ id: productID });
  if (!product) return res.status(404).send('The product was not found');
  purchaseLog = {
    name: product.name,
    price: product.buyingPrice,
    user_id: req.user.id,
    product_id: product._id,
    quantity: req.body.quantity,
    date: new Date(),
    direction: 'buy'
  };
  await PurchasLogs.create(purchaseLog);
  await Product.update(
    { id: productID },
    {
      $inc: {
        quantity: req.body.quantity
      }
    }
  );
  const response = {
    message: 'Product ordered successfully'
  };

  return res.status(200).send(response);
});

router.get('/history/', [auth, customer], async (req, res) => {
  const products = await PurchasLogs.find({ user_id: req.user.id }).select('-_id -__v');
  if (!products) return res.status(404).send('ERROR - Finding products');
  return res.status(200).send(products);
});

router.get('/', [auth], async (req, res) => {
  const products = await Product.find().select('-_id -__v -buyingPrice');
  if (!products) return res.status(404).send('ERROR - Finding products');
  return res.status(200).send(products);
});

router.get('/:id', [auth], async (req, res) => {
  const products = await Product.findOne({ id: req.params.id }).select(
    '-_id -__v'
  );
  if (!products) return res.status(404).send('ERROR - Finding products');
  return res.status(200).send(products);
});

// selling items
router.put('/sell/:id', [auth], async (req, res) => {
  let productID = parseInt(req.params.id);
  if (isNaN(productID) || productID <= 0)
    return res.status(404).send('ID must be a positive number');
  const product = await Product.findOne({ id: productID });
  if (!product) return res.status(404).send('The product was not found');
  let customer = await User.findOne({ id: req.user.id });
  if (!customer) return res.status(404).send('Customer not found');
  if (req.body.quantity <= 0)
    return res.status(400).send('Quantity should be a positive number');
  if (customer.points < product.sellingPrice * req.body.quantity)
    return res.status(400).send('Insufficient funds');
  if (product.quantity <= 0) return res.status(400).send('Product no available');

  purchaseLog = {
    name: product.name,
    price: product.sellingPrice,
    product_id: product._id,
    user_id: customer.id,
    quantity: req.body.quantity,
    date: new Date(),
    direction: 'sell'
  };
  await PurchasLogs.create(purchaseLog);
  await Product.updateOne(
    { id: productID },
    {
      $inc: {
        quantity: -req.body.quantity
      }
    }
  );

  await User.updateOne(
    { id: req.user.id },
    {
      $inc: {
        points: -product.sellingPrice * req.body.quantity
      }
    }
  );

  const response = {
    message: 'Product selled successfully'
  };

  return res.status(200).send(response);
});

function ValidateNewProduct(req) {
  const schema = {
    id: Joi.number().required(),
    name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    buyingPrice: Joi.number().required(),
    sellingPrice: Joi.number().required()
  };
  return Joi.validate(req, schema);
}

module.exports = router;
