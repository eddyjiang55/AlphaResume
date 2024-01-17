const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB URL
const dbName = 'airesumedb'; // Database Name

const client = new MongoClient(url);

async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connect }