const APIKEY = '31264489254ebb16345c74bb957e0215';

document.getElementById('search-btn').addEventListener('click', () => {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;

    fetch(`https://api.themoviedb.org/3/search/person?api_key=${APIKEY}&query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        if (data.results.length === 0) {
            resultsContainer.innerHTML = `<p>No results found</p>`;
            return;
        }

        data.results.forEach(person => {
            const personDiv = document.createElement('div');
            personDiv.innerHTML = `
            <h3>${person.name}</h3>
            ${person.profile_path
            ? `<img src="https://image.tmdb.org/t/p/w200${person.profile_path}" alt="${person.name}">` 
            : `<p>No image available</p>`
        }
        `;
        resultsContainer.appendChild(personDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});