const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false })); // handle x-www-form-urlencoded 
app.use(express.json()); // handle json

let db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

// GET /testimonials – return all posts /all db array/ 
app.get('/testimonials', (req, res) => {
  res.json(db);
});

// OK // GET /testimonials/:id – return single post 
app.get('/testimonials/:id', (req, res) => {
  let newDb = db.filter((item) => {  // item = single db object
    return item.id == req.params.id;
  })
  res.json(newDb);
});

// GET /testimonials/random – return random post
app.get('/testimonials/random', (req, res) => {

});

// POST /testimonials – add new post using req.body received from frontend
app.post('/testimonials/', (req, res) => {
  const { author, text } = req.body;
  db.push({id: (db[db.length -1].id +1) ,author, text});
  // res.json(db); // show db with added item
  res.send({ message: 'OK' }); // show message only
});

// PUT /testimonials/:id – edit post with particular id using req.body received from frontend
app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;  
  const { id } = req.params;

  db.map((item) => {
    // console.log(item);
    if(item.id == id){
      item.author = author;
      item.text = text;
      return item;
    }
    return item;
  });
  // console.log(db);
  res.send({ message: 'OK' }); // show message only 
  // res.json(db); // show modified db
});

// DELETE /testimonials/:id – delete single post with particular id
app.delete('/testimonials/:id', (req, res) => {
  const {id} = req.params;
  db = db.filter((item) => {
    return item.id != id;
  })
  // res.json(db); // show new db with deleted item
  res.send({ message: 'OK' }); // show message only
});

app.use((req, res, next) => {
  res.send({ message: 'Not found' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});