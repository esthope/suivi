import { Text, Button } from "react-native";
const axios = require('axios').default;

function testRequest(): void {
  debugger
	console.log('axios')
}

export default function Test({ title }: { title: string }) {
  return (
	<Button title={title} onPress={testRequest} />
  );
}