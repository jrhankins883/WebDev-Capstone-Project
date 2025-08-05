const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
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
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreID}&page=${page}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error fetching random picks:', err);
        res.status(500).json({ error: 'Failed to fetch random movies' });
    }
});

app.get('/api/credits', async (req, res) => {
    const personId = req.query.personId;
    const role = req.query.role;

    if (!personId || !role) {
        return res.status(400).json({ error: 'Missing personId or role parameter' });
    }

    const url = `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error fetching credits from TMDb:', err);
        res.status(500).json({ error: 'Failed to fetch credits from TMDb' });
    }
});

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

