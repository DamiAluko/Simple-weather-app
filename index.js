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

const getWeather = async (cityName = "Lagos") => {
  const apiKey = "5f23b76687f3ed180bbf16854ab727dc";

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`, {
      headers: {
        Accept: 'application/json'
      }
    });
    if(!response.ok){
      throw new Error("City not found")

    }
    const weatherDetails = await response.json()
    console.log(weatherDetails)
    //console.log(weatherDetails.weather[0].icon);

    temperature.innerHTML = Math.round(weatherDetails.main.temp) +"°C"
    tempMax.innerHTML = Math.round(weatherDetails.main.temp_max) +"°C"
    tempMin.innerHTML = Math.round(weatherDetails.main.temp_min) +"°C"
    description.innerHTML = weatherDetails.weather[0].description
    tempImg.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@4x.png" />`;
    city.innerHTML = weatherDetails.name

    searchInput.value = ""
  } 
  catch (error) {
    console.log(error)
    description.innerHTML = error.message
    temperature.innerHTML = ""
    tempMax.innerHTML = ""
    tempMin.innerHTML = ""
    tempImg.innerHTML = ""
    city.innerHTML = ""
    searchInput.value = ""
  }
}

getWeather()

searchButton.addEventListener("click", function(){
  if(searchInput.value.trim() !== ""){
    getWeather(searchInput.value)
  }
})

searchInput.addEventListener("keydown", function(event){
  if(event.key === "Enter" && searchInput.value.trim() !== ""){
    getWeather(searchInput.value)
  }
})