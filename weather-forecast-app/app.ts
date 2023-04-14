require('dotenv').config()

// Define the shape of the data returned by the API
interface WeatherData {
  main: {
    temp: number
    humidity: number
  }
  wind: {
    speed: number
  }
}

// DOM要素の取得
const form = document.querySelector('.form') as HTMLFormElement
const input = document.querySelector('input[name="city"]') as HTMLInputElement
const temp = document.querySelector(
  '.weather-data__temp .weather-data__value'
) as HTMLSpanElement
const humidity = document.querySelector(
  '.weather-data__humidity .weather-data__value'
) as HTMLSpanElement
const wind = document.querySelector(
  '.weather-data__wind .weather-data__value'
) as HTMLSpanElement

// 都市を入力後、json形式でデータを返す
async function getWeather(city: string): Promise<WeatherData> {
  const apiKey = process.env.API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  const response = await fetch(url)
  return await response.json()
}

// UIをDOM操作で動的に変化させる
function updateUI(weather: WeatherData): void {
  temp.textContent = weather.main.temp.toFixed(1)
  humidity.textContent = weather.main.humidity.toFixed(1)
  wind.textContent = weather.wind.speed.toFixed(1)
}

// submitボタンを押すと、getWeather関数、updateUI関数を順に実行し、UIをそれに沿ったものに変化させる
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const city = input.value.trim()
  if (!city) return
  const weather = await getWeather(city)
  updateUI(weather)
})
