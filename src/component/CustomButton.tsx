import { ReactElement } from "react";
import { Button } from "react-native";

const CustomComponent = ({title, pressFunction}): ReactElement => {
  return (<Button title={title} onPress={pressFunction} />)
}

export default CustomComponent;