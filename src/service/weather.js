import axios from "axios";

export const instance = axios.create({
  baseURL: `https://api.openweathermap.org`,
  method: 'get',
  params: {
    // 'appid': `${import.meta.env.API_KEY_WEATHER}`
    'appid': `51dad89eefad388f12dc3e66208be5c9`
  },
});


export const getWeatherCurrentCity = (city) => {
  return instance(`/data/2.5/weather?q=${city}`)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getForecastDays = (lat, lon) => {
  return instance(`/data/2.5/forecast/?lat=${lat}&lon=${lon}`)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getListCity = (city) => {
  return instance(`/data/2.5/find?q=${city}`)
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err && "error"
    })
}


export const getWeatherLocation = (lat, lon, units) => {
  return instance(`/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}`)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}


export const getImg = (icon) => {
  return axios.get(`https://openweathermap.org/img/wn/${icon}@2x.png`)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getFlags = async (icon) => {
  return await axios.get(`https://openweathermap.org/images/flags/${icon}.png`)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
