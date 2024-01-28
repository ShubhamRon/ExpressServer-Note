// This file contains the original code, that is touched by many parts of code :)
const mongoose = require('mongoose');
const { createClient } = require('redis');
const util = require('util');
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
(async function () {
    await client.connect();
    console.log("CONNECTED TO REDIS");
}());



// This line creates a reference to the original exec method of the mongoose.Query prototype. 
// The exec method is used to execute a query.
const exec = mongoose.Query.prototype.exec;


// Create a chaining like property for the query of mongoose
mongoose.Query.prototype.cache = function (options = {}) {
    this.UseCache = true;

    // Create hashKey for each User 
    // So that it do not throw undefined error
    this.hashKey = JSON.stringify(options.key || '')
    // Create a chain like property for mongoose 
    return this;
}






// Here, the code is modifying the exec method of the mongoose.Query prototype. 
// It adds a console.log statement, indicating that the code is "disturbing" the Mongoose file, 
// and then calls the original exec method using exec.apply(this, arguments).
mongoose.Query.prototype.exec = async function () {
    // Check, if cache is applied or not
    if (!this.UseCache) {
        return exec.apply(this, arguments);
    }

    // this.getQuery will query applied on the call like 
    // -> _id, sort, limit e.t.c all of these
    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    const cacheValue = await client.hGet(this.hashKey, key);
    if (cacheValue) {
        console.log("Returning from Redis Cache... :)");
        const doc = JSON.parse(cacheValue);

        // Convert the array into Object Instance on monoose
        return Array.isArray(doc)
            ? doc.map((d) => new this.model(d))
            : new this.model(doc);
    }
    console.log("Returning from Database.. :)")
    const result = await exec.apply(this, arguments);
    await client.hSet(this.hashKey, key, JSON.stringify(result), 'EX', 10);
    return result;
}

// Function to clear all the data as soon as new it is called such as Creating, deleting, updating the note
const ClearCache = async (hashKey) => {
    await client.del(JSON.stringify(hashKey));
}

module.exports = {
    ClearCache
}