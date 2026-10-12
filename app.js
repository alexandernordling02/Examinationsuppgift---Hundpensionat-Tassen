// === LIVE VÄDER === 

fetch("https://api.open-meteo.com/v1/forecast?latitude=59.57&longitude=17.53&current_weather=true")
  .then(response => response.json())
  .then(data => {
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    document.getElementById("vader").innerHTML =
      `Temperatur: ${temp}°C · Vind: ${wind} m/s`;
  });
