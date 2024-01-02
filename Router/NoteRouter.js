const express = require('express');
const { CreateNote, GetNote, UpdateNote, DeleteNote } = require('../Controller/Note_Controller');
const router = express.Router()


router.post('/createnote', CreateNote);
router.get('/getnote', GetNote);
router.delete('/deletenote/:id', DeleteNote);
router.patch('/updatenote', UpdateNote);


module.exports = router