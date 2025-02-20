// Select HTML elements that need to be manipulated
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Replace with your actual OpenWeatherMap API key
const apiKey = 'bd5a95d7d72fe87d1f401fbb551029cb';

// Coordinates for Trier, Germany (latitude and longitude with 2 decimal digits)
const lat = 49.75;
const lon = 6.64;

// Construct the API URL using the Current Weather API endpoint
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Asynchronous function to fetch weather data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // For testing; remove after confirming output
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to display weather results on the page
function displayResults(data) {
  // Set the current temperature (rounded)
  currentTemp.textContent = Math.round(data.main.temp) + '°F';
  
  // Get the icon code from the first weather event
  const icon = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.alt = data.weather[0].description;
  
  // Set the figure caption to the weather description
  captionDesc.textContent = data.weather[0].description;
}

// Invoke the API fetch function
apiFetch();
