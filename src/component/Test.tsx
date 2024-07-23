import { Button } from "react-native";
import { getRequest } from 'service/testRequest.js'

function testRequest(): any {
  getRequest().then((res) => {
    console.log(res)
    debugger
  })
  .catch((err) => {
    console.log(err)
    debugger
  })
}

export default function Test({ title }: { title: string }) {
  return (
	<Button title={title} onPress={testRequest} />
  );
}