import { View, Text } from "react-native";

import App from '../../App';
// import App from '../../App.js';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <App />
      {/* <Text text="t  est" /> */}
    </View>
  );
}