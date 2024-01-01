const { Schema, model } = require("mongoose");

const Note_Taking_API = Schema({
    ownerID: {
        type: "String",
        required: [true, "OwnerID is Missing"],
        maxlength: 50,
        minlength: 3
    },
    title: {
        type: "String",
        required: [true, "Title is Missing"],
        maxlength: 30,
        minlength: 3
    },
    description: {
        type: "String",
        required: [true, "Description is Missing"],
        maxlength: 100,
        minlength: 3
    }
}, {
    timestamps: {
        createdAt: 'Created_at', // Use `created_at` to store the created date
        updatedAt: 'Updated_at'
    }
});

module.exports = model('Task-Notes', Note_Taking_API);