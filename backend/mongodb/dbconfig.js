const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://leoyuruiqing:<password>@airesume.niop3nd.mongodb.net/?retryWrites=true&w=majority&appName=AIResume";
// const dbName = 'airesumedb'; // Database Name

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB");
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connect }