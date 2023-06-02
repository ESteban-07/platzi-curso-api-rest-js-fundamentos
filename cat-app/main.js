// API endpoint for cat images
const CAT_API = 'https://api.thecatapi.com/v1/images/search';

// API key for authentication
const CAT_API_KEY =
  'live_JjyzzpfG3XygyPRbBMlTLmUUNAiGJCXYAtiVYxfwTvlEQqPi12pqE5auLhPOPOy4';

// Selecting DOM elements
const container = document.querySelector('.container'); // Container element for cat images
const imageTemplate = document.getElementById('image-template'); // Template for cat image

const catsForm = document.querySelector('#cats-form');
catsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let formData = new FormData(catsForm);
  console.log(formData.get('cats-qty'));
  getRandomCatImage(formData.get('cats-qty'));
  e.currentTarget.reset();
});

// Function to append the image template to the container
function appendImageTemplate() {
  for (let i = 0; i < 3; i++) {
    container.append(imageTemplate.content.cloneNode(true));
  }
}

// Asynchronous function to fetch and display random cat images
async function getRandomCatImage(qty = 3) {
  const response = await fetch(
    `${CAT_API}?limit=${qty}&api_key=${CAT_API_KEY}`
  );
  const cats = await response.json();
  console.log(cats);

  // Clear container before adding new images
  container.innerHTML = '';

  cats.forEach((cat) => {
    const div = imageTemplate.content.cloneNode(true);
    div.querySelector('.cat-img').src = cat.url;
    div.querySelector('.favourites-btn').addEventListener('click', () => {
      console.log('click', cat.id);
      addToFavourites(cat.id);
    });
    container.append(div);
  });
}

async function addToFavourites(id) {
  console.log(id);
  try {
    const response = await fetch('https://api.thecatapi.com/v1/favourites', {
      method: 'POST',
      headers: { 'x-api-key': `${CAT_API_KEY}` },
      body: JSON.stringify({ image_id: id }),
    });
    console.log(response);
    if (response.ok) {
      alert('Added successfully');
    } else {
      alert('Operation failed');
    }
  } catch (error) {
    console.error(error);
  }
}

// Initial setup: append image template to the container
appendImageTemplate();

// Fetch and display random cat images
getRandomCatImage();
