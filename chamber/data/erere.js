 /* === Meet & Greet Banner === */
 const banner = document.getElementById('meetGreetBanner');
 const closeBannerButton = document.getElementById('closeBanner');
 const today = new Date().getDay(); // Sunday=0, Monday=1, Tuesday=2, Wednesday=3, etc.
 // Display banner only on Mon (1), Tue (2), and Wed (3)
 if (today === 1 || today === 2 || today === 3) {
   banner.style.display = 'block';
 } else {
   banner.style.display = 'none';
 }
 closeBannerButton.addEventListener('click', () => {
   banner.style.display = 'none';
 });

/* === Spotlight Members === */
    const spotlightContainer = document.getElementById('spotlight-container');
    fetch('data/members.json')
      .then(response => response.json())
      .then(data => {
        // Assume the JSON data has a property "members" which is an array
        const eligible = data.members.filter(member => {
          const level = member.membership.toLowerCase();
          return level === 'silver' || level === 'gold';
        });
        // Randomly pick two or three spotlight members
        const numToShow = Math.min(eligible.length, 3);
        const shuffled = eligible.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, numToShow);
        selected.forEach(member => {
          const card = document.createElement('div');
          card.classList.add('spotlight-card');
          // Member name
          const nameEl = document.createElement('h3');
          nameEl.textContent = member.name;
          card.appendChild(nameEl);
          // Member image (if available)
          if (member.image) {
            const img = document.createElement('img');
            img.src = `images/${member.image}`; // Assumes images are stored in an "images" folder
            img.alt = member.name;
            card.appendChild(img);
          }
          // Website link
          const websiteEl = document.createElement('a');
          websiteEl.href = member.website;
          websiteEl.textContent = member.website;
          websiteEl.target = '_blank';
          card.appendChild(websiteEl);
          spotlightContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching members data:', error));
  
const apiKey = 'bd5a95d7d72fe87d1f401fbb551029cb'; // Replace with your API key
const city = 'Spanish Fork'; // Change to your desired location
const forecastContainer = document.getElementById('forecast-container');
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
fetch(weatherURL)
  .then(response => response.json())
  .then(data => {
    
    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°F`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').alt = data.weather[0].description;
    document.getElementById('forecast-container');
    
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
fetch(forecastUrl)
.then(response => response.json())
.then(data => {
  // Use the first forecast data point as the "current" conditions
  if (data.list && data.list.length > 0) {
    const current = data.list[0];
    currentTempEl.textContent = `${Math.round(current.main.temp)}°F`;
    weatherDescEl.textContent = current.weather[0].description;
  }
  // Process forecast data for the next 3 days
  // We'll pick one forecast per day from around 12:00:00 (noon)
  const forecasts = {};
  data.list.forEach(item => {
    if (item.dt_txt.includes("12:00:00")) {
      const date = item.dt_txt.split(" ")[0];
      forecasts[date] = item;
    }
  });
  // Display up to three forecast cards
  let count = 0;
  for (let date in forecasts) {
    if (count >= 3) break;
    const forecast = forecasts[date];
    const card = document.createElement('div');
    card.classList.add('forecast-card');
    // Display date
    const dateEl = document.createElement('h4');
    dateEl.textContent = date;
    card.appendChild(dateEl);
    // Temperature
    const tempEl = document.createElement('p');
    tempEl.textContent = `${Math.round(forecast.main.temp)}°F`;
    card.appendChild(tempEl);
    // Weather description
    const descEl = document.createElement('p');
    descEl.textContent = forecast.weather[0].description;
    card.appendChild(descEl);
    forecastContainer.appendChild(card);
    count++;
  }
})

.catch(error => console.error('Error fetching forecast data:', error));
