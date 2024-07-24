import axios from 'axios';
import dotenv from 'dotenv';
global.Buffer = require('buffer').Buffer;

dotenv.config()

// configure authorisation
const identifiers = `${process.env.AUTH_TOKEN}:`,
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