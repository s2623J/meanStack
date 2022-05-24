const express = require('express');
const app = express();

// Router Section
app.get('/', (req, res) => {
    res.send('Hello API!');
})

app.listen(3000, () => {
    console.log('Server now running on http://localhost:3000');
})