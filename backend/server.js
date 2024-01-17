const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Middleware to parse JSON requests
app.use(express.json());

// Define port
const port = 8000;

// Route for handling POST requests
app.post('/api/resume', (req, res) => {
   console.log(req.body); // Log the data to the console
   res.status(200).json({ message: 'Data received successfully' });
});

// Start the server
app.listen(port, () => {
   console.log(`Server listening at http://localhost:${port}`);
});
