const Schema = require("../Schema/Schema")

// Post Note-Given Here
const CreateNote = async (req, res) => {
    try {
        const { ID } = req.user
        const { title, description } = req.body;
        const Task_Notes = await Schema.create({ title, description, ownerID: ID })
        res.status(201).json({ status: "Sucessful", Task_Notes })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const GetNote = async (req, res) => {
    try {
        const { id } = req.query;
        const { ID } = req.user
        if (!id) {
            const Task_Notes = await Schema.find({ ownerID: ID }).select(['-__v']);
            res.status(200).json({ status: 'Successful', Task_Notes })
            return;
        }
        try {
            const Task_Notes = await Schema.findOne({ _id: id });
            res.status(200).json({ status: 'Successful', Task_Notes })
        } catch (err) {
            res.status(404).json({ status: 'Not Found!', message: "No Task Found for given ID" })
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ status: 'Something Went Wrong' })

    }
}

const UpdateNote = async (req, res) => {
    try {
        const { ID } = req.user;
        const { title, description, TID } = req.body;
        const Task_Notes = await Schema.findByIdAndUpdate({ _id: TID, ownerID: ID }, { title, description }, { runValidators: true, new: true }).select(['-__v'])
        if (Task_Notes) {
            res.status(200).json({ status: "Successfully Updated", Updated_Task_Notes: Task_Notes });
            return;
        }
        res.status(404).json({ status: "Requested ID Not Found", message: "No Note Exist for given ID" });

    } catch (err) {
        res.status(500).json({ message: "No Task Found for Given ID" })
    }
}

const DeleteNote = async (req, res) => {
    try {
        const { ID } = req.user
        const { id } = req.params;
        const Task_Notes = await Schema.findByIdAndDelete({ _id: id, ownerID: ID });
        if (Task_Notes) {
            res.status(200).json({ status: `Successfully Deleted` })
            return;
        }
        res.status(200).json({ message: `${id} Already Deleted` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}







module.exports = {
    CreateNote,
    GetNote,
    UpdateNote,
    DeleteNote
}