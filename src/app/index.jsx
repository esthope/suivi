import {NativeBaseProvider} from "native-base";
import App from '../../App';

export default function Index() {
  return (
    <NativeBaseProvider>
      <App />
      {/*<Text>TEST</Text>*/}
    </NativeBaseProvider>
  );
}