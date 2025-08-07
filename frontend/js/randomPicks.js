const resultContainer = document.getElementById('results');

document.querySelectorAll('.genre-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const genreID = button.getAttribute('data-genre-id');
        
        try {
            const response = await fetch(`/api/random?genre=${genreID}`);
            const data = await response.json();
            const firstFive = data.results.slice(0, 5);
            resultContainer.style.display = 'flex';
            resultContainer.innerHTML = '';


            firstFive.forEach((movie, index) => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                movieCard.style.animationDelay = `${index * 0.3}s`;
                const posterPath = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                    : 'https://via.placeholder.com/185x278?text=No+Poster';

                movieCard.innerHTML = `
                    <img src="${posterPath}" alt="${movie.title} poster"/>
                    <p>${movie.title}</p>
                `;

                resultContainer.appendChild(movieCard);
            });
        } catch (error) {
            console.error('Fetch fails:', error);
            alert('Something went wrong. Check the console.');
        }
    });
});
