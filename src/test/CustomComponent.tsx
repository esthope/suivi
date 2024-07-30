import {useState, useEffect, ReactElement} from 'react';
import {View, Box, Select, Input, VStack, Stack, Text, Center} from "native-base";
import DropdownInput from 'component/DropdownInput';
import {fetchJourneys, fetchAreaDirections} from 'service/journey';

const CustomComponent = (): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false),
        [places, setPlaces] = useState([]),
        [toStation, setToStation] = useState('');

  const onChange = (): void => {
  }

  return (
    <View>
    </View>
  )
}

export default CustomComponent;