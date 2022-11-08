const 
  getAllPosts
= require ("../controllers/post");
const express = require  ("express");


const router = express('router');

router.get('/', getAllPosts);

module.exports = router