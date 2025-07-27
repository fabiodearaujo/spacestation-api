require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Enable CORS for your frontend domain
app.use(cors());

// NASA APOD endpoint
app.get('/', async (req, res) => {
    // returns just a message
    res.json({ message: 'Welcome to the NASA APOD API!' });
});

    // if route is /apod, fetch the APOD data
app.get('/apod', async (req, res) => {
    // Ensure the NASA API key is set in the environment variables
    if (!process.env.NASA_API_KEY) {
        return res.status(500).json({ error: 'NASA API key is not set' });
    }
    try {
        const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
        const response = await fetch(nasaUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching NASA APOD:', error);
        res.status(500).json({ error: 'Failed to fetch NASA APOD' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
