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

// app.get('/api/notes/:notes', (req, res) => {
//   console.log(req.params)
//   // Coerce the specific search term to lowercase
//   const requestedNote = req.params.notes.toLowerCase();

//   // Iterate through the note name name to check if it matches `req.params.notes`
//   for (let i = 0; i < noteData.length; i++) {
//     if (requestedNote === noteData[i].notes.toLowerCase()) {
//       return res.json(noteData[i]);
//     }
//   }

//   // Return a message if the term doesn't exist in our DB
//   return res.json('No match found');
// });

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
