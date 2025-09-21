// departments.routes.js

const express = require('express');
const router = express.Router();
const Employees = require('../models/employees.model');
const ObjectId = require('mongodb').ObjectId;

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employees.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employees.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const item = await Employees.findOne().skip(rand);
    if(!item) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const item = await Employees.findById(req.params.id);
    if(!item) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const newEmployees = new Employees({ 
      firstName: req.body.firstName, 
      lastName: req.body.lastName, 
      department: req.body.department });
    await newEmployees.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  try {
    const item = await Employees.findById(req.params.id);
    if(item) {
      await Employees.updateOne({ _id: req.params.id }, 
        { $set: {firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department} });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const item = await Employees.findById(req.params.id);
    if(item) {
      await Employees.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;