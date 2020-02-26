const Concert = require('../models/concert.model');

// GET all
exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json(err);
  }
};

// GET random
exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const item = await Concert.findOne().skip(rand);
    if(!item) res.status(404).json({ message: 'Not found' });
    else res.json(item);
  }
  catch(err) {
    res.json(err);
  }
};

// GET one
exports.getOne = async (req, res) => {
  try {
    const item = await Concert.findById(req.params.id);
    if(!item) res.status(404).json({message: 'Not found'})
    else res.json(item);
  }
  catch(err) {
    res.status(500).json(err);
  }
}

// POST one
exports.postOne = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json(err);
  }
}

// PUT one
exports.putOne = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const item = await(Concert.findById(req.params.id));
    if (item) {
      item.performer = performer;
      item.genre = genre;
      item.price = price;
      item.day = day;
      item.image = image;
      await item.save();
      res.json(await Concert.find());
    } 
    else res.status(404).json({ message: 'Not found'});
  }
  catch(err) {
    res.status(500).json(err);
  };
}

// DELETE one
exports.deleteOne = async (req, res) => {
  try {
    const item = await(Concert.findById(req.params.id));
    if(item) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }
}