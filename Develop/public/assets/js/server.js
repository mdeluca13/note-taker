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

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// Setting API Routes
app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => req.json(`${noteData} new notes added`));