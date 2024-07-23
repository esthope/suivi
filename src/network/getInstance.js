import axios from 'axios';
global.Buffer = require('buffer').Buffer;

// configure authorisation
const identifiers = `f4547ec8-19e7-4b0a-bb2c-50792519fb97:`;
      credentials = Buffer.from(identifiers).toString('base64');

// Set default configurations
const axiosInstance = axios.create({
  baseURL: 'https://api.sncf.com/v1/coverage/sncf',
  headers: {
    'Authorization': `Basic ${credentials}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 2500,
});

export default axiosInstance;