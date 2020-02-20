const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const socket = require('socket.io'); 
const app = express();

// return static files from the react app
app.use(express.static(path.join(__dirname, '/client/build')));

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: "GET, POST, PUT, DELETE", 
  })
);
app.use(express.urlencoded({ extended: false })); // handle x-www-form-urlencoded 
app.use(express.json()); 
app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concert routes 
app.use('/api', seatsRoutes); // add seats routes 

// return react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res, next) => {
  res.send({ message: 'Not found' });
});

// connect with mongo DB
mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// db listeners
db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// connect & disconnect
const io = socket(server); 

io.on('connection', (socket) => {
  console.log('New socket: ', socket.id, ' has joined!');
});