const express = require('express');
const router = express.Router();
const db = require('./../db');

// GET /testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

// GET /testimonials/:id
router.route('/testimonials/:id').get((req, res) => {
  let newDb = db.testimonials.filter((item) => {  // item = single db object
    return item.id == req.params.id;
  })
  res.json(newDb);
});

// POST /testimonials
router.route('/testimonials/').post((req, res) => {
  const { author, text } = req.body;
  db.testimonials.push({id: (db.testimonials[db.testimonials.length -1].id +1) ,author, text});
  // res.json(db.testimonials); // show db with added item
  res.send({ message: 'OK' }); // show message only
});

// PUT /testimonials/:id – edit post with particular id using req.body received from frontend
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;  
  const { id } = req.params;

  db.testimonials.map((item) => {
    if(item.id == id){
      item.author = author;
      item.text = text;
      return item;
    }
    return item;
  });
  res.send({ message: 'OK' }); // show message only 
  // res.json(db.testimonials); // show modified db
});

// DELETE /testimonials/:id – delete single post with particular id
router.route('/testimonials/:id').delete((req, res) => {
  const { id } = req.params;
  db.testimonials = db.testimonials.filter((item) => {
    return item.id != id;
  })
  // res.json(db.testimonials); // show new db with deleted item
  res.send({ message: 'OK' }); // show message only
});

module.exports = router;