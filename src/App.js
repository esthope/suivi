import { Button } from 'react-native';
import { getRequest } from 'service/testRequest.js'

const buttonPressed = () => {

  getRequest().then((res) => {
    console.log(res)
    debugger
  })
  .catch((err) => {
    console.log(err)
    debugger
  })

}

export default function App() {
  return (
    <Button title="Request" onPress={buttonPressed} />
  );
}