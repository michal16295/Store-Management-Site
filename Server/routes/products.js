const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const adminOrWorker = require('../middlewares/adminOrWorker');

//adding a new product to the stock
router.post("/newProduct" ,[auth, admin], async(req, res) => {
    const { error } = ValidateNewProduct(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let product = await Product.findOne({ id: req.body.id});
    if(product) return res.status(400).send("Product already exists");

    product = {
        name: req.body.name,
        id: req.body.id,
        price: req.body.price,
        quantity: req.body.quantity
    }
    product = await Product.create(product);
    if (!product) return res.status(400).send("ERROR - Product wasn't created!");

    const response = {
        message: "Product created successfully"
    }
    return res.status(200).send(response);
});
//deleting a product from the stock
router.delete("/:id", [auth, admin], async(req, res)=>{
    let productID = parseInt(req.params.id);
    if (isNaN(productID ) || productID  <= 0) return res.status(404).send("ID must be a positive number");
    
    const product = await Product.findOne({id: productID});
    if(!product) return res.status(404).send("The product was not found");
    await Product.deleteOne(product);
    const response = {
        message: "Product deleted successfully"
    }

    return res.status(200).send(response); 
});
// update quantity
router.put('/update/:id', [auth, admin], async(req, res)=>{
    let productID = parseInt(req.params.id);
    if (isNaN(productID) || productID <= 0) return res.status(404).send("ID must be a positive number");
    const product = await Product.findOne({id: productID});
    if(!product) return res.status(404).send("The product was not found");
    await Product.update({_id: productID}, {
        $set:{
            quantity: req.body.quantity
        }
    });
    const response = {
        message: "Product updated successfully"
    }

    return res.status(200).send(response); 

});
 
function ValidateNewProduct(req){
    const schema = {
        id: Joi.number().required(),
        name: Joi.string().min(2).max(255).required(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
    };
    return Joi.validate(req , schema);
}

module.exports = router;