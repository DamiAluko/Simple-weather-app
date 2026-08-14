// api key: 5f23b76687f3ed180bbf16854ab727dc

const app = document.getElementById('app')
const city = document.getElementById('city')
const date = document.getElementById('date')
const searchInput = document.getElementById('searchBarInput')
const searchButton = document.getElementById('searchIcon')
const description = document.getElementById('description')
const temperature = document.getElementById('temp')
const tempMax = document.getElementById('tempMax')
const tempMin = document.getElementById('tempMin')
const tempImg = document.getElementById('tempImg')

const months = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
]

const dateObj = new Date()

const month = months[dateObj.getUTCMonth()]
const day = dateObj.getUTCDate()
const year = dateObj.getUTCFullYear()

date.innerHTML = `${month} ${day}, ${year}`

const getWeather = async () => {
  const lat = 51.5074;
  const lon = -0.1278;
  const apiKey = "5f23b76687f3ed180bbf16854ab727dc";

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, {
      headers: {
        Accept: 'application/json'
      }
    });
    const weatherDetails = await response.json()
    console.log(weatherDetails)
    //console.log(weatherDetails.weather[0].icon);

    temperature.innerHTML = weatherDetails.main.temp
    tempMax.innerHTML = weatherDetails.main.temp_max
    tempMin.innerHTML = weatherDetails.main.temp_min
    description.innerHTML = weatherDetails.weather[0].description
    tempImg.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png" />`;
    city.innerHTML = weatherDetails.name
  } 
  catch (error) {
    console.log(error)
  }
}

getWeather()