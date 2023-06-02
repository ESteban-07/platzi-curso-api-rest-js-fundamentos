// API endpoint for cat images
const CAT_API = 'https://api.thecatapi.com/v1/images/search';

// API key for authentication
const CAT_API_KEY =
  'live_JjyzzpfG3XygyPRbBMlTLmUUNAiGJCXYAtiVYxfwTvlEQqPi12pqE5auLhPOPOy4';

// Selecting DOM elements
const container = document.querySelector('.container'); // Container element for cat images
const imageTemplate = document.getElementById('image-template'); // Template for cat image
const btn = document.querySelector('.btn'); // Button element

// Event listener for button click
btn.addEventListener('click', getRandomCatImage);

// Function to append the image template to the container
function appendImageTemplate() {
  for (let i = 0; i < 3; i++) {
    container.append(imageTemplate.content.cloneNode(true));
  }
}

// Asynchronous function to fetch and display random cat images
async function getRandomCatImage() {
  const response = await fetch(`${CAT_API}?limit=3&api_key=${CAT_API_KEY}`);
  const cats = await response.json();
  console.log(cats);

  // Clear container before adding new images
  container.innerHTML = '';

  cats.forEach((cat) => {
    const div = imageTemplate.content.cloneNode(true);
    div.querySelector('.cat-img').src = cat.url;
    container.append(div);
  });
}

// Initial setup: append image template to the container
appendImageTemplate();

// Fetch and display random cat images
getRandomCatImage();
