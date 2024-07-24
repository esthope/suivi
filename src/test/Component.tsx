import { Button } from "react-native";
import { getRequest } from './axiosRequest.js'

const testRequest = (): void => {
  getRequest().then((res) => {
    console.log(res)
    debugger
  })
  .catch((err) => {
    console.log(err)
    debugger
  })
}

export default function Component() {
  return (
	<Button title="Franck" onPress={testRequest} />
  );
}