import {View} from "native-base";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchForm from "component/SearchForm";
import {ScreenOptions} from 'constant/BaseStyle';
/* <Route path="screen/journey/:journeyID" /> */

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Stack.Navigator screenOptions={ScreenOptions} >
      <Stack.Screen name="Select" component={SearchForm} />
    </Stack.Navigator>
  );
}