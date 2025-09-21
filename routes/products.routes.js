// products.routes.js

const express = require('express');
const router = express.Router();
const Products = require('../models/products.model');
const ObjectId = require('mongodb').ObjectId;

router.get('/products', async (req, res) => {
  try {
    res.json(await Products.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Products.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const product = await Products.findOne().skip(rand);
    if(!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if(!product) res.status(404).json({ message: 'Not found' });
    else res.json(product);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/products', async (req, res) => {
  try {
    const newProduct = new Products({ name: req.body.name, client: req.body.client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if(product) {
      await Products.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, client: req.body.client }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}); 

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if(product) {
      await Department.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;