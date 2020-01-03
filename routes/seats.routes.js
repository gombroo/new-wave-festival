const express = require('express');
const router = express.Router();
const db = require('./../db');

// GET /seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

// GET /seats/:id
// POST /seats
// DELETE /seats/:id
// PUT /seats/id

module.exports = router;