const token = `'f4547ec8-19e7-4b0a-bb2c-50792519fb97:''`

const instance = axios.create({
  baseURL: 'https://api.sncf.com/v1/coverage/sncf/',
  timeout: 1000,
  headers: {'Authorization': 'Basic' + token}
});