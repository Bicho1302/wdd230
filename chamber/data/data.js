const apiKey = 'bd5a95d7d72fe87d1f401fbb551029cb'; // Replace with your API key
const city = 'Spanish Fork'; // Change to your desired location
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

fetch(weatherURL)
  .then(response => response.json())
  .then(data => {
    
    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°F`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').alt = data.weather[0].description;
  })
  .catch(error => console.error('Error fetching weather:', error));

const baseURL = 'https://bicho1302.github.io/wdd230/'; 

const linksURL = `${baseURL}data/links.json`;

async function getLinks() {
try {
  const response = await fetch(linksURL);
  const data = await response.json();
 
  displayLinks(data.weeks);
} catch (error) {
  console.error('Error fetching links data:', error);
}
}

function displayLinks(weeks) {
const linksContainer = document.getElementById('activity-links');

linksContainer.innerHTML = '';

weeks.forEach(weekObj => {
  
  const weekSection = document.createElement('section');

  // Week heading (e.g., "Week 1")
  const heading = document.createElement('h2');
  heading.textContent = weekObj.week;
  weekSection.appendChild(heading);

  // List for the week's activity links
  const ul = document.createElement('ul');

  weekObj.links.forEach(linkObj => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = linkObj.url;
    a.textContent = linkObj.title;
    li.appendChild(a);
    ul.appendChild(li);
  });

  weekSection.appendChild(ul);
  linksContainer.appendChild(weekSection);
});
}

// Call the function to get and display the links.
getLinks();
