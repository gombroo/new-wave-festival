const express = require('express');
const router = express.Router();
const db = require('./../db');

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

/* ... */

module.exports = router;