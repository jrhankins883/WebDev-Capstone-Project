const APIKEY = '31264489254ebb16345c74bb957e0215';

document.getElementById('search-btn').addEventListener('click', (event) => {
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
                        ? `<img src="https://image.tmdb.org/t/p/w200${person.profile_path}" alt="${person.name}" class="person-img" data-id="${person.id}">`
                        : `<p>No image available</p>`
                    }
                `;

                resultsContainer.appendChild(personDiv);
            });

            document.querySelectorAll('.person-img').forEach(img => {
                img.addEventListener('click', () => {
                    const personID = img.getAttribute('data-id');
                    getDirectingCredits(personID);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


function getDirectingCredits(personID) {
    fetch(`https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${APIKEY}`)
        .then(res => res.json())
        .then(data => {
            const directingCredits = data.crew.filter(credit => credit.job === "Director");

            if (directingCredits.length === 0) {
                console.log("No directing credits found.");
                return;
            }

            directingCredits.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

            const filmographyDiv = document.createElement('div');
            filmographyDiv.innerHTML = `<h2>Directed Movies</h2>`;

            directingCredits.forEach(movie => {
                const movieItem = document.createElement('p');
                movieItem.textContent = `${movie.title} (${movie.release_date || "N/A"})`;
                filmographyDiv.appendChild(movieItem);
            });

            const filmographySection = document.getElementById('filmography');
            filmographySection.innerHTML = '';
            filmographySection.appendChild(filmographyDiv);
        })
        .catch(error => console.error("Error fetching directing credits:", error));
}
