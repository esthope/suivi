import {Text} from "react-native";
import {NativeBaseProvider/*, Text*/} from "native-base";
import App from '../../App';

export default function Index() {
  return (
    <NativeBaseProvider> {/*<App />*/}
      <Text>TEST</Text>
    </NativeBaseProvider>
  );
}

// expo install react-native-svg@12.1.1
// npx install react-native-safe-area-context@3.3.2
