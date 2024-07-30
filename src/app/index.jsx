import {NativeBaseProvider} from "native-base";
import App from '../../App';

export default function Index() {
  return (
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
  );
}