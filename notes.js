
const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body 
    }

    var duplicatesNotes = notes.filter((note) => {
        return note.title == title;
    })
    if (duplicatesNotes.length == 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }

};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => {
        return note.title == title;
    });
    return filteredNotes[0];
};

var removeNote = (title) => {
    //fetch note
    var notes = fetchNotes();
    //filter notes, removing the one with title of arguement
    var filteredNotes = notes.filter((note) => {
        return note.title != title;
    });
    //save new notes array
    saveNotes(filteredNotes);

    return notes.length != filteredNotes.length;
};

var logNote = (note) => {

    console.log('----');
    console.log('Title: ' + note.title);
    console.log('Body: ' + note.body);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
