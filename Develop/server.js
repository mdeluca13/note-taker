// Adding what is required
const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');

// Instance of express
const app = express();

// Port express will use
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting static public folder
app.use(express.static('public'));

// Setting HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Setting API Routes
app.get('/api/notes', (req, res) => {
  res.json(noteData)
}
);

app.post('/api/notes', (req, res) => {
  noteData.push(req.body)
  fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) => 
  err ? console.log(err) : console.log('Working'))
});

app.get('/api/notes/:id', (req, res) => {
  console.log(req.params)
  const notes = req.params.id.toLowerCase();

 
  for (let i = 0; i < noteData.length; i++) {
    if (notes === noteData[i].term.toLowerCase()) {
      return res.json(noteData[i]);
    }
  }


  return res.json('No match found');
});

// Delete note route
app.delete('/api/notes/:id', (req, res) => {
  console.log('req.params: ',req.params)

  const requestedNote = req.params.id.toLowerCase();
  console.log('requestedNote: ',requestedNote)


  const noteToDelete = noteData.find(el => el.id === requestedNote);
  const i = noteData.indexOf(noteToDelete);
  noteData.splice(i, 1);
  fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) => 
    err ? console.log(err) : console.log('Working'));

//   for (let i = 0; i < noteData.length; i++) {
//     if (requestedNote === noteData[i].id.toLowerCase()) {
//       return res.json(noteData[i]);
//     }
//   }

//   // Return a message if the term doesn't exist in our DB
//   return res.json('No match found');
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
