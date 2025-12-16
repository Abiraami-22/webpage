const API_KEY = "e55a6db5e8f14b68bc054808250512";
const CITY = "Coimbatore";

async function getWeather() {

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById("weather").innerHTML =
      `<h2>${data.location.name}</h2>
       <img src="https:${data.current.condition.icon}" />
       <p>Temperature: ${data.current.temp_c}°C</p>
       <p>Condition: ${data.current.condition.text}</p>
       <p>Humidity: ${data.current.humidity}%</p>`;
    return {
      lat: data.location.lat,
      lon: data.location.lon,
      name: data.location.name
    };

  } catch (error) {
    console.log(error);
    document.getElementById("weather").innerHTML = "Failed to load weather.";
  }
}

async function init() {
  const loc = await getWeather(); // use correct function name!
  if (!loc) return;
  const map = L.map('map').setView([loc.lat, loc.lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);
  L.marker([loc.lat, loc.lon]).addTo(map)
    .bindPopup(loc.name)
    .openPopup();
}

init();
