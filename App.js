//import 'react-devtools'

import Search from "./components/search/search";
import { useState } from "react";
import CurrentWeather from "./components/current_weather/current_weather";
import { WEATHER_API_KEY,WEATHER_API_URL } from "./api";
import Forecast from "./components/forecast/forecast";
//import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import './App.css';
<script src="http://172.17.29.156:8097"></script>
function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

const handleOnSearchChange=(searchData)=>{
  const [lat, lon] = searchData.value.split(" ");

  const currentWeatherFetch = fetch(
    `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  const forecastFetch = fetch(
    `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );

  Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forcastResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forcastResponse });
    }
    )
    .catch(console.log);
  }
  
  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast} />}

    </div>
  );
}

export default App;
