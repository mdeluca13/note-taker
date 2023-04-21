// Adding what is required
const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');

// Instance of express
const app = express();

// Port express will use
const PORT = process.env.PORT || 3001;

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

// Delete note route
app.delete('/api/notes/:id', (req, res) => {

  const requestedNote = req.params.id.toLowerCase();
  const noteToDelete = noteData.find(el => el.id === requestedNote);
  const i = noteData.indexOf(noteToDelete);
  noteData.splice(i, 1);
  fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) => 
    err ? console.log(err) : console.log('Working'));

});

// Catch for any url not matching to go to static
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Listening to incoming connections on port 3001
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
