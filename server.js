// Dependencies
const express = require('express');
const path = require('path');
const uniqid = require('uniqid');
const db = require('./db/db.json');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// Routes
// Home page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// Notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// Returns all entries stored in db.json
app.get('/api/notes', (req, res) => res.json(db));

// Add a new note to db.json and return it to the client
app.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    const newNote = req.body;

    newNote.id = uniqid();

    console.log(newNote);

    db.push(newNote);
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    // TODO:
    // DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. 
    // In order to delete a note, you'll need to read all notes from the db.json file, remove the note 
    // with the given id property, and then rewrite the notes to the db.json file.
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

module.exports = uniqid;