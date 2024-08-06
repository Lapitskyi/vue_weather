export const dateWeather = (date, options) => {
  return new Date(date * 1000).toLocaleDateString('en-US', {...options});
}

export const dayWeather = (date) => {
  return new Date(date * 1000).toLocaleString('en-US', {weekday: 'short'});
}
export const tempWeatherCel = (temp) => {
  return Math.round(temp - 273);
}
export const tempWeatherFar = (temp) => {
  return Math.round((temp - 273.15) * 9 / 5 + 32);
}

export const feelsLike = (feels_like) => {
  return Math.round(feels_like - 273);
}
export const getTime = (time) => {
  return new Date(time * 1000).toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit"});
}

export const currentTime = () => {
  return new Date().toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit"});
}


