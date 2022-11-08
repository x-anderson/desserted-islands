const 
  getAllCountries
= require ("../controllers/country");
const express = require  ("express");


const router = express('router');

router.get('/', getAllCountries);

module.exports = router