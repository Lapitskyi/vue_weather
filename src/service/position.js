import axios from "axios";

export const instance = axios.create({
  baseURL: `https://api.ipregistry.co/`,
  method: 'get',
  params: {
    // 'appid': `${import.meta.env.API_KEY_WEATHER}`
    'key': `36904zr7qajdn1wu`
  },
});


export const getPosition = () =>{
  return instance()
      .then(response => {
        return response.data
      }).catch(err => {
      if (err.response) {
        // client never received a response, or request never left
      } else if (err.request) {
        // client never received a response, or request never left
      }
    })
  }


