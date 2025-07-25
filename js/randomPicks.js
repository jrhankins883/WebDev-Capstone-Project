const  APIKEY = '969b0a3284a9fe2a3b43ff6c5cf355e3';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

document.querySelectorAll('.genre-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const genreID = button.getAttribute('data-genre-id');
        const url = `${BASE_URL}?api_key=${APIKEY}&with_genres=${genreID}&page=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const firstFive = data.results.slice(0, 5);
            const resultContainer = document.getElementById('results');
            resultContainer.style.display = 'block';
            resultContainer.innerHTML = '';

            firstFive.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = 
                    `<h3>${movie.title}</h3>
                    <p>${movie.overview || 'No description available.'}</p>
                `;

                resultContainer.appendChild(movieCard);
            });
        } catch (error) {
            console.error('Fetch fails:', error);
            alert('Something went wrong. Check the console.');
        }
    });
});