const express = require('express');
const router = express.Router();
const db = require('./../db');

// GET /seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

// POST /seats
router.route('/seats/').post((req, res) => {
  const { author, text } = req.body;
  db.seats.push({id: (db.seats[db.seats.length -1].id +1) ,author, text});
  // res.json(db.seats); // show db with added item
  res.send({ message: 'OK' }); // show message only
});

// PUT /seats/:id
router.route('/seats/:id').put((req, res) => {
  const { author, text } = req.body;  
  const { id } = req.params;

  db.seats.map((item) => {
    if(item.id == id){
      item.author = author;
      item.text = text;
      return item;
    }
    return item;
  });
  res.send({ message: 'OK' }); // show message only 
  // res.json(db.seats); // show modified db
});


// DELETE /seats/:id
router.route('/seats/:id').delete((req, res) => {
  const { id } = req.params;
  db.seats = db.seats.filter((item) => {
    return item.id != id;
  })
  // res.json(db.seats); // show new db with deleted item
  res.send({ message: 'OK' }); // show message only
});

module.exports = router;