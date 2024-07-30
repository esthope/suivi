import { ReactElement } from "react";
import { Button } from "react-native";

const CustomComponent = ({title, pressFunction}:{title:string, pressFunction:()=>void}): ReactElement => {
  return (<Button title={title} onPress={pressFunction} />)
}

/* onPress
onPressIn
onPressOut
onLongPress */

export default CustomComponent;