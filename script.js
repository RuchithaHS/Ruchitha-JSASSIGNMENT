const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const languages = ['English', 'Kannada', 'Hindi', 'Telugu', 'Tamil', 'Malayalam'];
const cardContainer = document.getElementById('card-container');
const searchInput = document.getElementById('search');
const languageFilter = document.getElementById('languageFilter');

async function fetchData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayCards(data);
}

function displayCards(users) {
    cardContainer.innerHTML = '';
    users.forEach(user => {
        const randomLikes = Math.floor(Math.random() * 1000) + 1;
        const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
        
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${user.name}</h2>
            <p>Likes: ${randomLikes}</p>
            <p>Language: ${randomLanguage}</p>
            <button onclick="deleteCard(this)">Delete</button>
        `;
        cardContainer.appendChild(card);
    });
}

function deleteCard(button) {
    const card = button.parentElement;
    cardContainer.removeChild(card);
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h2').innerText.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});

languageFilter.addEventListener('change', () => {
    const selectedLanguage = languageFilter.value;
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const language = card.querySelector('p:nth-child(3)').innerText.split(': ')[1];
        card.style.display = selectedLanguage === '' || language === selectedLanguage ? 'block' : 'none';
    });
});

fetchData();