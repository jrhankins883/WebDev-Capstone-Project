// REMOVE API KEY REMOVE API KEY REMOVE API KEY!!!!!!!!!!!!!!!
const BASE_URL = 'https://api.themoviedb.org/3/search/person';


document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const roleSelect = document.getElementById('role-select');
    const layoutResults = document.querySelector('.layout-results');

    searchBtn.addEventListener('click', async (event) => {
        event.preventDefault(); 

    const searchTerm = searchInput.value.trim();
    const selectedRole = roleSelect.value;

    if (!searchTerm) {
        alert('Please enter a name to search.');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?api_key=${APIKEY}&query=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const person = data.results[0]; 
            const personName = person.name;
            const personPhotoUrl = person.profile_path
                ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image';

        layoutResults.innerHTML = '';

        const img = document.createElement('img');
        img.src = personPhotoUrl;
        img.alt = personName;
        img.classList.add('person-photo');

        layoutResults.appendChild(img);
        layoutResults.classList.remove('hidden');

        img.addEventListener('click', () => {
            img.classList.add('slide-left');

            if (!document.querySelector('.filmography')) {
                const filmographyDiv = document.createElement('div');
                filmographyDiv.classList.add('filmography');
                filmographyDiv.textContent = `${personName}`;

            layoutResults.appendChild(filmographyDiv);
            }
        });
            } else {
                alert('No results found. Try another name.');
        }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Something went wrong. Try again later.');
    }
  });
});
