const form = document.getElementById('weather-form');
const input = document.getElementById('city-input');
const result = document.getElementById('weather-result');

const apiKey = '565db0e19cfb66b94e17b77e59d3f708'; // Your OpenWeather API key

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const city = input.value.trim();
  if (city !== '') {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const dataWrapped = await response.json();
    const data = JSON.parse(dataWrapped.contents);
    showWeather(data);
  } catch (error) {
    result.innerHTML = `<p>${error.message}</p>`;
  }
}

function showWeather(data) {
  result.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}
