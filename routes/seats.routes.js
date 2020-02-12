const express = require("express");
const router = express.Router();
const db = require("./../db");

// GET /seats
router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

// POST /seats
router.route("/seats/").post((req, res) => {
  const { client, email, day, seat } = req.body;
  
  // if the seat is already booked
  const isBusy = db.seats.find((someSeat) => someSeat.day === day && someSeat.seat === seat);
  
  if (isBusy) {
    res.status(400).json({ message: 'The slot is already taken.' });
  } else {  
    db.seats.push({ id: db.seats[db.seats.length - 1].id + 1, client, email, day, seat });
    res.json(db.seats); // show db with added item
    // res.send({ message: 'OK' }); // show message only
  }
  console.log(db.seats);
});

// PUT /seats/:id
router.route("/seats/:id").put((req, res) => {
  const { client, email, day, seat } = req.body;
  const { id } = req.params;

  db.seats.map(item => {
    if (item.id == id) {
      item.client = client;
      item.email = email;
      item.day = day;
      item.seat = seat;
      return item;
    }
    return item;
  });
  res.send({ message: "OK" }); // show message only
  // res.json(db.seats); // show modified db
});

// DELETE /seats/:id
router.route("/seats/:id").delete((req, res) => {
  const { id } = req.params;
  db.seats = db.seats.filter(item => {
    return item.id != id;
  });
  // res.json(db.seats); // show new db with deleted item
  res.send({ message: "OK" }); // show message only
});

module.exports = router;
