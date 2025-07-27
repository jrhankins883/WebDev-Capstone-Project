// DO NOT FORGET TO REMOVE API KEY 

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');
const filmographyDiv = document.getElementById('filmography');
const roleSelect = document.getElementById('role-select');

const roleJobMap = {
    acting: 'cast',
    directing: 'Director',
    writing: ['Writer', 'Screenplay', 'Story'],
    composing: ['Original Music Composer', 'Music'],
    cinematography: 'Director of Photography'
};

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    const selectedRole = roleSelect.value;

    if (!query) return;

    const url = `https://api.themoviedb.org/3/search/person?api_key=${APIKEY}&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    const people = data.results;

    resultsDiv.innerHTML = '';
    filmographyDiv.innerHTML = '';

    if (people.length === 0) {
        resultsDiv.innerHTML = `<p>No results found for "${query}"</p>`;
        return;
    }

    people.forEach(person => {
        if (!person.profile_path) return;

        const card = document.createElement('div');
        card.classList.add('person-card');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w200${person.profile_path}`;
        img.alt = person.name;
        img.addEventListener('click', () => {
            showSelectedPerson(person);
            getCreditsByRole(person.id, selectedRole);
    });

        const name = document.createElement('h3');
        name.textContent = person.name;

        card.appendChild(img);
        card.appendChild(name);
        resultsDiv.appendChild(card);
    });
});

function getCreditsByRole(personID, selectedRole) {
    fetch(`https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${APIKEY}`)
        .then(res => res.json())
        .then(data => {
        const jobType = roleJobMap[selectedRole];
        let credits = [];
        
        if (Array.isArray(jobType)) {
            credits = data.crew.filter(credit => jobType.includes(credit.job));
        } else if (jobType === 'cast') {
            credits = data.cast;
        } else {
            credits = data.crew.filter(credit => credit.job === jobType);
        }

        credits.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        if (credits.length === 0) {
            filmographyDiv.innerHTML = `<p>No ${capitalize(selectedRole)} credits found.</p>`;
            return;
        }

        const list = document.createElement('ul');
        credits.forEach(movie => {
            const item = document.createElement('li');
            item.textContent = `${movie.title} (${movie.release_date || 'N/A'})`;
            list.appendChild(item);
        });

        filmographyDiv.innerHTML = `<h2>${capitalize(selectedRole)} Filmography</h2>`;
        filmographyDiv.appendChild(list);
        })
        .catch(error => {
        console.error(`Error fetching ${selectedRole} credits:`, error);
        filmographyDiv.innerHTML = `<p>Something went wrong fetching ${capitalize(selectedRole)} credits.</p>`;
        });
}

function showSelectedPerson(person) {
    resultsDiv.innerHTML = ''; 

    const wrapper = document.createElement('div');
    wrapper.classList.add('person-details-wrapper');

    const info = document.createElement('div');
    info.classList.add('person-info');

    const selectedImg = document.createElement('img');
    selectedImg.src = `https://image.tmdb.org/t/p/w300${person.profile_path}`;
    selectedImg.alt = person.name;
    selectedImg.classList.add('selected-person-img');

    const name = document.createElement('h2');
    name.textContent = person.name;

    info.appendChild(selectedImg);
    info.appendChild(name);

    const filmographyContainer = document.createElement('div');
    filmographyContainer.id = 'filmography';

    wrapper.appendChild(info);
    wrapper.appendChild(filmographyContainer);
    resultsDiv.appendChild(wrapper);
}
