const BASE_URL = 'http://localhost:3000/api/search';

const roleJobMap = {
    acting: 'cast',
    directing: 'Director',
    writing: ['Writer', 'Writing', 'Screenplay', 'Story'],
};

const roleSelect = document.getElementById('role-select');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
const filmographyContainer = document.getElementById('filmography');
const layoutResults = document.querySelector('.layout-results');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    resultsContainer.innerHTML = '';
    filmographyContainer.style.display = 'none';
    filmographyContainer.innerHTML = '';

    const query = searchInput.value.trim();
    const selectedRole = roleSelect.value;

    if (!query) {
        alert('Please enter a name to search.');
        return;
    }

    const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
    if (!nameRegex.test(query)) {
        alert("Please enter a valid name (letters, spaces, hyphens, or apostrophes only).");
        return;
    }

    try {
        const searchUrl = `${BASE_URL}?query=${encodeURIComponent(query)}&role=${selectedRole}`;
        const response = await fetch(searchUrl);
        console.log('[Frontend] Fetching search with:', searchUrl);
        const searchData = await response.json();

        if (!searchData.results || searchData.results.length === 0) {
            resultsContainer.innerHTML = '<p>No person found with that name.</p>';
            filmographyContainer.innerHTML = '';
            return;
        }

        const person = searchData.results[0];
        displayPerson(person);
    } catch (error) {
        console.error('Error fetching person:', error);
        resultsContainer.innerHTML = '<p>Error fetching data.</p>';
        filmographyContainer.innerHTML = '';
    }
});

function displayPerson(person) {
    const imgUrl = person.profile_path
        ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

    resultsContainer.innerHTML = `
        <div class="person-container">
            <button id="reset-btn" class="reset-btn">Reset</button>
            <div class="person-card">
                <img src="${imgUrl}" alt="${person.name}" class="person-img" id="person-photo" loading="lazy">
                <h2 class="person-name">${person.name}</h2>
                <p>Popularity: ${person.popularity ? person.popularity.toFixed(1) : 'N/A'}</p>
            </div>
        </div>
    `;

    layoutResults.classList.remove('hidden');

    document.getElementById('person-photo').addEventListener('click', () => {
        document.getElementById('person-photo').classList.add('slide-left');
        getFilmography(person.id, roleSelect.value);
});

    document.getElementById('reset-btn').addEventListener('click', () => {
    searchInput.value = '';                 
    resultsContainer.innerHTML = '';        
    filmographyContainer.innerHTML = '';    
    filmographyContainer.style.display = 'none';
    layoutResults.classList.add('hidden');  
});
}

async function getFilmography(personId, roleKey) {
    const jobCriteria = roleJobMap[roleKey];
    const creditsUrl = `${BASE_URL}/credits?personId=${personId}&role=${roleKey}`;

    try {
        filmographyContainer.style.display = 'none';
        const response = await fetch(creditsUrl);
        console.log('[Frontend] Fetching credits with:', creditsUrl);
        const data = await response.json();

        let filteredCredits = [];

        if (roleKey === 'acting') {
            filteredCredits = (data.cast || []).filter(credit => credit.media_type === 'movie');
        } else {
            filteredCredits = (data.crew || []).filter(credit => {
                const isMovie = credit.media_type === 'movie';
                if (Array.isArray(jobCriteria)) {
                    return jobCriteria.includes(credit.job) && isMovie;
                } else {
                    return credit.job === jobCriteria && isMovie;
                }
            });
        }

        if (filteredCredits.length === 0) {
            filmographyContainer.innerHTML = `<p>No ${roleKey} credits found.</p>`;
            return;
        }

        const creditList = filteredCredits
            .sort((a, b) => (b.release_date || b.first_air_date || '').localeCompare(a.release_date || a.first_air_date || ''))
            .map(credit => `<li>${credit.title || credit.name} (${(credit.release_date || credit.first_air_date || 'N/A').slice(0, 4)})</li>`)
            .join('');

        filmographyContainer.innerHTML = `
            <h3>${roleKey.charAt(0).toUpperCase() + roleKey.slice(1)} Filmography:</h3>
            <ul>${creditList}</ul>
        `;

        filmographyContainer.style.display = 'block';
    } catch (error) {
        console.error('Error fetching credits:', error);
        filmographyContainer.innerHTML = '<p>Error loading filmography.</p>';
    }
}
