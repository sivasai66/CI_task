const express = require('express');
const app = express();
const port = 3000;

// Define a route that sends the "Welcome" message
app.get('/', (req, res) => {
    res.send('<h1>Welcome!!!</h1>');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

