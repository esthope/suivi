import { Text, View, Button } from 'react-native';
//import axios from 'axios';
//const axios = require('axios');
import axios, * as others from 'axios';


// service
const buttonPressed = () => {
axios.get('/')
  .then((res) => {
    console.log(res)
    debugger
  })
  .catch((err) => {
    console.log(err)
    debugger
  })
  debugger
}

export default function App() {
  return (
       <Button title="Request" onPress={buttonPressed} />
  );
}