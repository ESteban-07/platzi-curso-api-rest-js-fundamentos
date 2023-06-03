// API endpoint for cat images
const CAT_API = 'https://api.thecatapi.com/v1/images/search';
const FAVOURITES_API = 'https://api.thecatapi.com/v1/favourites';

// API key for authentication
const CAT_API_KEY =
  'live_JjyzzpfG3XygyPRbBMlTLmUUNAiGJCXYAtiVYxfwTvlEQqPi12pqE5auLhPOPOy4';

// Selecting DOM elements
const randomCatsContainer = document.getElementById('random-cats-container'); // Container element for cat images
const imageTemplate = document.getElementById('image-template'); // Template for cat image
const favouriteCatsContainer = document.getElementById(
  'favourite-cats-container'
);
const catsForm = document.getElementById('cats-form');
const reloadButton = document.getElementById('reload-btn');

reloadButton.addEventListener('click', () => {
  let catsQty = randomCatsContainer.children.length;
  getRandomCats(catsQty);
});

catsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let formData = new FormData(catsForm);
  console.log(formData.get('cats-qty'));
  getRandomCats(formData.get('cats-qty'));
  e.currentTarget.reset();
});

// Function to append the image template to the randomCatsContainer
function appendImageTemplate() {
  for (let i = 0; i < 3; i++) {
    randomCatsContainer.append(imageTemplate.content.cloneNode(true));
  }
}

// Asynchronous function to fetch and display random cat images
async function getRandomCats(qty = 3) {
  const response = await fetch(
    `${CAT_API}?limit=${qty}&api_key=${CAT_API_KEY}`
  );
  const cats = await response.json();
  console.log(cats);

  // Clear randomCatsContainer before adding new images
  randomCatsContainer.innerHTML = '';

  cats.forEach((cat) => {
    const div = imageTemplate.content.cloneNode(true);
    div.querySelector('.cat-img').src = cat.url;
    div.querySelector('.favourites-btn').addEventListener('click', () => {
      console.log('click', cat.id);
      addToFavourites(cat.id);
    });
    randomCatsContainer.append(div);
  });
}

async function addToFavourites(id) {
  try {
    const response = await fetch(`${FAVOURITES_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${CAT_API_KEY}`,
      },
      body: JSON.stringify({ image_id: id }),
    });
    console.log(response);
    if (response.ok) {
      getFavouriteCats();
      console.log('Added successfully');
    } else {
      alert('Operation failed');
    }
  } catch (error) {
    console.error(error);
  }
}

async function getFavouriteCats() {
  const response = await fetch(`${FAVOURITES_API}?api_key=${CAT_API_KEY}`);
  const favouriteCats = await response.json();

  if (favouriteCats.length === 0) {
    favouriteCatsContainer.innerHTML =
      '<p>Ups! The list seems to be empty...</p>';
    return;
  }

  favouriteCatsContainer.innerHTML = '';

  favouriteCats.forEach((cat) => {
    console.log(cat);
    const div = imageTemplate.content.cloneNode(true);
    div.querySelector('.cat-img').src = cat.image.url;
    div.querySelector('.favourites-btn').innerHTML = 'Remove from favourites';
    div.querySelector('.favourites-btn').addEventListener('click', () => {
      console.log('click', cat.id);
      removeFromFavourites(cat.id);
    });
    favouriteCatsContainer.append(div);
  });
}

async function removeFromFavourites(id) {
  console.log(id);
  try {
    const response = await fetch(`${FAVOURITES_API}/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': `${CAT_API_KEY}`,
      },
    });
    console.log(response);
    if (response.ok) {
      console.log('Deleted successfully');
      getFavouriteCats();
    }
  } catch (error) {
    console.error(error);
  }
}

// Initial setup: append image template to the randomCatsContainer
appendImageTemplate();

// Fetch and display random cat images
getRandomCats();

// Fetch and display favourites cat images
getFavouriteCats();
