 // DO NOT FORGET TO REMOVE API KEY 
const APIKEY = '969b0a3284a9fe2a3b43ff6c5cf355e3';

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
                personDiv.classList.add('person-card');

                const imageHTML = person.profile_path
                ? `<img src="https://image.tmdb.org/t/p/w200${person.profile_path}" 
                    alt="${person.name}" 
                    class="person-img" 
                    data-id="${person.id}"
                    data-name="${person.name}"
                    data-birthday="Loading...">`
                : `<p>No image available</p>`;

                personDiv.innerHTML = `
                    ${imageHTML}
                    <h3>${person.name}</h3>
                    <p class="birthday" id="bday-${person.id}">Loading birthday...</p>
                `;

                resultsContainer.appendChild(personDiv);

                fetch(`https://api.themoviedb.org/3/person/${person.id}?api_key=${APIKEY}`)
                    .then(res => res.json())
                    .then(detailData => {
                        const bdayElem = document.getElementById(`bday-${person.id}`);
                        const raw = detailData.birthday;
                        const display = raw ? `Born: ${raw}` : 'Birthday: N/A';
                        bdayElem.textContent = display;

                        const personImg = document.querySelector(`img[data-id="${person.id}"]`);
                        if (personImg) {
                        personImg.setAttribute('data-birthday', raw || '');
                        }
                    })
                    .catch(error => {
                        const bdayElem = document.getElementById(`bday-${person.id}`);
                        bdayElem.textContent = 'Birthday: N/A';
                        console.error(`Error getting birthday for ${person.name}:`, error);
                    });
                });

            document.querySelectorAll('.person-img').forEach(img => {
                img.addEventListener('click', () => {
                const personID = img.getAttribute('data-id');
                const name = img.getAttribute('data-name');
                const birthday = img.getAttribute('data-birthday');
                const imageUrl = img.getAttribute('src');

                const resultsContainer = document.getElementById('results');
                resultsContainer.innerHTML = '';

                const personDetailsWrapper = document.createElement('div');
                personDetailsWrapper.classList.add('person-details-wrapper');

                const personInfo = document.createElement('div');
                personInfo.classList.add('person-info');

                const selectedImg = document.createElement('img');
                selectedImg.src = imageUrl;
                selectedImg.alt = name;
                selectedImg.classList.add('selected-person-img');

                const nameEl = document.createElement('h2');
                nameEl.textContent = name;

                const birthdayEl = document.createElement('p');
                birthdayEl.textContent = `Birthday: ${birthday || 'Unknown'}`;

                personInfo.appendChild(selectedImg);
                personInfo.appendChild(nameEl);
                personInfo.appendChild(birthdayEl);

                const filmographyContainer = document.createElement('div');
                filmographyContainer.id = 'filmography';
                personDetailsWrapper.appendChild(personInfo);
                personDetailsWrapper.appendChild(filmographyContainer);
                resultsContainer.appendChild(personDetailsWrapper);
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


// DO NOT FORGET TO REMOVE API KEY