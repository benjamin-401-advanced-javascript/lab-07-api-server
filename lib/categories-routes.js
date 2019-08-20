
'use strict';

const schema = ['id', 'name', 'title', 'author', 'article'];
let db = [];

var express = require('express');
var router = express.Router();


//-----------------------------------------------------------------------------------------------------
// Middleware
//-----------------------------------------------------------------------------------------------------

router.use(express.json());

router.use(express.static('./public'));

router.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

const requestLogger = (message) => {
  return (req, res, next) => {
    console.log(message, req.method, req.path, req.requestTime);
    next();
  };
}

let isValid = (req, res, next) => {
  req.valid = Math.random() < 0.5 ? true : false;
  next();
};


//-----------------------------------------------------------------------------------------------------
// Categories Routes
//-----------------------------------------------------------------------------------------------------

/**
 * Get a list of records for a given model
 * @route GET /categories
 * @returns {object} 200 { count: 2, results: [ {}, {} ] }
 * @returns {Error}  500 - Server error
 */
router.get('/', requestLogger(`¯\\_(ツ)_/¯`), (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
});


/**
 * Post a record for a given model
 * @route POST /categories
 * @returns {object} 200 {object}
 * @returns {Error}  500 - Server error
 */
router.post('/', isValid, requestLogger(`¯\\_(ツ)_/¯`), (req, res, next) => {
  if (!req.valid) {
    next('This is an EREOR');

  } else {
    let record = req.body;
    record.id = Math.random();
    db.push(record);
    res.json(record);
  }

});


module.exports = router;