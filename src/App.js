import { Text, View, Button } from 'react-native';
//import axios from 'axios';
const axios = require('axios');

const buttonPressed = () => {
  console.log(axios);
  debugger
}

export default function App() {
  return (
       <Button
          title="Request"
          onPress={buttonPressed}
        />
  );
}