import { Text, View, Button } from "react-native";

import App from '../../App.tsx';

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
      {/* <Text>test</Text> */}
    </View>
  );
}