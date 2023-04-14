import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  FaCloud,
  FaSun,
  FaCloudSun,
  FaCloudRain,
  FaSnowflake,
} from "react-icons/fa";
import "./Weather.css";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
}

const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = async () => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchWeatherData();
  };

  if (!weatherData) {
    return (
      <div className="weather-container">
        <form className="search-form" onSubmit={handleFormSubmit}>
          <input
            className="search-input"
            type="text"
            value={city}
            onChange={handleCityChange}
          />
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }

  const weatherIcon =
    weatherData.weather[0].id >= 200 && weatherData.weather[0].id < 300 ? (
      <FaCloudRain />
    ) : weatherData.weather[0].id >= 300 && weatherData.weather[0].id < 500 ? (
      <FaCloudRain />
    ) : weatherData.weather[0].id >= 500 && weatherData.weather[0].id < 600 ? (
      <FaCloudRain />
    ) : weatherData.weather[0].id >= 600 && weatherData.weather[0].id < 700 ? (
      <FaSnowflake />
    ) : weatherData.weather[0].id >= 700 && weatherData.weather[0].id < 800 ? (
      <FaCloud />
    ) : weatherData.weather[0].id === 800 ? (
      <FaSun />
    ) : (
      <FaCloudSun />
    );

  return (
    <div className="weather-container">
      <form className="search-form" onSubmit={handleFormSubmit}>
        <input
          className="search-input"
          type="text"
          value={city}
          onChange={handleCityChange}
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      {weatherData && (
        <div className="weather-info">
          <div className="location">{weatherData.name}</div>
          <div className="date">{moment().format("MMMM Do YYYY")}</div>
          <div className="icon-temp">
            <div className="icon">{weatherIcon}</div>
            <div className="temp">{weatherData.main.temp} ℃</div>
          </div>
          <div className="description">{weatherData.weather[0].main}</div>
          <div className="feels-like">
            Feels like: {weatherData.main.feels_like} ℃
          </div>
          <div className="wind">Wind: {weatherData.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

export default Weather;
