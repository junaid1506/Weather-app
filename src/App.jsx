import { useEffect, useState } from "react";
import notFound from "/assets/not_found-removebg-preview (1).png";
import rain from "/assets/rain_with_cloud.png";
import sun from "/assets/sun.png";
import thunder from "/assets/thunder.png";
import tornado from "/assets/Tornado.png";

function App() {

  const [city, setCity] = useState('delhi')
  const [weatherData, setWeatherData] = useState(null)

  const currentDate = new Date()

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()]
  const date = currentDate.getDate()
  const year = currentDate.getFullYear()
  const formatedDate = `${month} ${date} ${year}`


  const API_KEY = 'f55c9862151330e8f2ff346498862335';

  const fetchWeatherData = async () => {
    try {
      const responce = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      const data = await responce.json();
      console.log(data)
      setWeatherData(data)

    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const handle = (e) => {
    console.log(e.target.value)
    setCity(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  }

  const getWeatherImg = (main) => {
    switch (main) {
      case 'Clouds':
        return thunder
      case 'Rain':
        return rain
      case 'Mist':
        return tornado
      case 'Haze':
        return sun
         case 'Clear':
        return sun      
      default:
        return notFound
   
    }
  }
  
  return (
    <>
      <div className="App">
        <div className="container">

          {weatherData && (
           <>
             <h1 className='container_date'>{formatedDate}</h1>
              <div className="weather_data">
                <h2 className='container_city'>{weatherData.name}</h2>
                <img className='container_img' src={getWeatherImg(weatherData.weather[0].main)} width='180px' />
                <h2 className='container_degree'>{`${weatherData.main.temp} Kel`}</h2>
                <h2 className='country_per'>{weatherData.weather[0].main}</h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" className='input' placeholder='Enter City Name' onChange={handle} />
                  <button type='submit'>Find</button>
                </form>
              </div>
           </>
          )
          }

        </div>
      </div>
    </>
  )
}

export default App
