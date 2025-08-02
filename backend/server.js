const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3000;

const apiKey = process.env.APIKEY;

app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    const role = req.query.role;

    if (!query || !role) {
        return res.status(400).json({ error: 'Missing query or role parameter' });
    }

    const url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data); 
    } catch (err) {
        console.error('Error fetching from TMDb:', err);
        res.status(500).json({ error: 'Failed to fetch from TMDb' });
    }
});

app.get('/api/random', async (req, res) => {
    const genreID = req.query.genre;
    const page = Math.floor(Math.random() * 20) + 1;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.APIKEY}&with_genres=${genreID}&page=${page}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error fetching random picks:', err);
        res.status(500).json({ error: 'Failed to fetch random movies' });
    }
});

const path = require('path');
app.use(express.static(path.join(__dirname)));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});