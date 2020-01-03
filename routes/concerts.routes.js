const express = require('express');
const router = express.Router();
const db = require('./../db');

// GET /concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
  console.log(concerts); 
});

// GET /concerts/:id
// POST /concerts
// DELETE /concerts/:id
// PUT /concerts/:id

module.exports = router;