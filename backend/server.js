const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Middleware to parse JSON requests
app.use(express.json());

// Define port
const port = 8000;

const { connect } = require('./mongodb/dbconfig');
const User = require('./mongodb/models/userModel');

// Route for handling POST requests
app.post('/api/resume', async (req, res) => {
   try {
      const db = await connect();
      const user = new User(req.body.bio, req.body.educationHistory, req.body.jobHistory, req.body.projects, req.body.awards, req.body.languages, req.body.skills); // and so on for all fields
      const collection = db.collection('users');
      await collection.insertOne(user);
      res.status(200).json({ message: 'Data stored in MongoDB' });
   } catch (err) {
      res.status(500).json({ message: 'Error storing data', error: err });
   }
});

// Start the server
app.listen(port, () => {
   console.log(`Server listening at http://localhost:${port}`);
});
