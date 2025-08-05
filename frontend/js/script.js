document.addEventListener('DOMContentLoaded', () => {
    
    const findFaveButton = document.getElementById('find-fave');
    if (findFaveButton) {
        findFaveButton.onclick = () => location.href = 'findFave.html';
    }

    const randomPicksButton = document.getElementById('random-picks');
    if (randomPicksButton) {
        randomPicksButton.onclick = () => location.href = 'randomPicks.html';
    }

    const backHomeButton = document.getElementById('back-home');
    if (backHomeButton) {
        backHomeButton.onclick = () => location.href = 'index.html';
    }

});
