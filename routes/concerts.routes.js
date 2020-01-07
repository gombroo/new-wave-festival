const express = require('express');
const router = express.Router();
const db = require('./../db');

// GET /concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// GET /concerts/:id
router.route('/concerts/:id').get((req, res) => {
  let newDb = db.concerts.filter((item) => {  // item = single db object
    return item.id == req.params.id;
  })
  res.json(newDb);
});

// POST /concerts
router.route('/concerts/').post((req, res) => {
  const { author, text } = req.body;
  db.concerts.push({id: (db.concerts[db.concerts.length -1].id +1) ,author, text});
  // res.json(db.concerts); // show db with added item
  res.send({ message: 'OK' }); // show message only
});

// PUT /concerts/:id
router.route('/concerts/:id').put((req, res) => {
  const { author, text } = req.body;  
  const { id } = req.params;

  db.concerts.map((item) => {
    if(item.id == id){
      item.author = author;
      item.text = text;
      return item;
    }
    return item;
  });
  res.send({ message: 'OK' }); // show message only 
  // res.json(db.concerts); // show modified db
});


// DELETE /concerts/:id
router.route('/concerts/:id').delete((req, res) => {
  const { id } = req.params;
  db.concerts = db.concerts.filter((item) => {
    return item.id != id;
  })
  // res.json(db.concerts); // show new db with deleted item
  res.send({ message: 'OK' }); // show message only
});

module.exports = router;