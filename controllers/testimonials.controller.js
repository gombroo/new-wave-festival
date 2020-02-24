const Testimonial = require('../models/testimonial.model');

// GET all
exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json(err); 
  }
}

// GET random
exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const item = await Testimonial.findOne().skip(rand);
    if(!item) res.status(404).json({message: 'Not found' });
    else res.json(item);
  }
  catch(err) {
    res.json(err);
  }
}

// GET one
exports.getOne = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
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
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({author: author, text: text});
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json(err);
  }
}

// PUT one
exports.putOne = async (req, res) => {
  try {
    const { author, text } = req.body;
    const item = await(Testimonial.findById(req.params.id));
    if (item) {
      item.author = author;
      item.text = text;
      await (item.save());
      res.json(await Testimonial.find());
    } else res.status(404).json({ message: 'Not found'});
  }
  catch(err) {
    res.status(500).json(err);
  };
}

// DELETE one
exports.deleteOne = async (req, res) => {
  try {
    const item = await(Testimonial.findById(req.params.id));
    if(item) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json(await Testimonial.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }
}