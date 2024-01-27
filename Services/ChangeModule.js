// This file contains the original code, that is touched by many parts of code :)

const mongoose = require('mongoose');

// This line creates a reference to the original exec method of the mongoose.Query prototype. 
// The exec method is used to execute a query.
const exec = mongoose.Query.prototype.exec;

// Here, the code is modifying the exec method of the mongoose.Query prototype. 
// It adds a console.log statement, indicating that the code is "disturbing" the Mongoose file, 
// and then calls the original exec method using exec.apply(this, arguments).
mongoose.Query.prototype.exec = function(){
    console.log("Testing Goes Here!!")
    return exec.apply(this, arguments);
}
