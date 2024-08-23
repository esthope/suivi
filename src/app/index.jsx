import {NativeBaseProvider, Text} from "native-base";

export default function Index() {
  return (
    <NativeBaseProvider>
      <Text>TEST</Text>
    </NativeBaseProvider>
  );
}

/*export default function Index() {
import App from '../../App';
  return (
      <App />
  );
}*/