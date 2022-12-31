const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');

//ROUTE 1:Get all the Notes using GET "/api/notes/fetchnotes". login required.
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})


//ROUTE 2:Add a new note using post "api/notes/addnote".login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter your note title').isLength({ min: 3 }),
    body('description', 'Describe your note if you want').isLength({ min: 6 }),], async (req, res) => {
        try {


            const { title, description, tag } = req.body;
            //if there is any error return bad req
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    })
//ROUTE 3:update an existing note "api/notes/updatenote".login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
    //creating a new Note obj
    const newNote = {};

    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (title) { newNote.tag = tag };

    //find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("You are not allowed to do that");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
} catch(error){
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})
//ROUTE 4:deleting an existing note "api/notes/deletenote".login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // const { title, description, tag } = req.body;
    try {
        
    
    //find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    //allow deletion after authentication
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("You are not allowed to do that");
    }


    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success":"The desired note has been deleted", note:note});
} catch(error){
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})


module.exports = router