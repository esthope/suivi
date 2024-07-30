import {useState, useEffect, ReactElement} from 'react';
import {View, Box, Select, Input, VStack,Stack,Text,Center} from "native-base";
import {Journey} from 'constant/interface'
import DropdownInput from 'component/DropdownInput';
import CustomButton from 'component/CustomButton';
import searchJourneys from 'util/searchJourneys';

const SearchForm = (): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false),
        [places, setPlaces] = useState([]),
        [datetime, setDatetime] = useState('20240729T152000'),
        [minFecth, setMinFecth] = useState('1'),
        [maxFecth, setMaxFecth] = useState('7'),
        [fromStation, setFromStation] = useState(''),
        [toStation, setToStation] = useState('');

  const onPressSearch = async (): Promise<void> => {
    // 87313874 87286005
    try {
      let fetchedJourneys = searchJourneys(fromStation, toStation, datetime, Number(maxFecth), Number(minFecth))
      console.log(fetchedJourneys)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <View>
      <DropdownInput
        onSetStation={setFromStation}
        placeholder="Départ" />

      <DropdownInput
        onSetStation={setToStation}
        placeholder="Arrivée" />

      <Input
        mb={5}
        type='text'
        value={datetime}
        onChangeText={setDatetime}
        placeholder="Horaire"
      />

      <Input
        mb={2}
        type='text'
        value={minFecth}
        onChangeText={setMinFecth}
        placeholder="Min"
        keyboardType="numeric"
      />

      <Input
        mb={5}
        type='text'
        value={maxFecth}
        onChangeText={setMaxFecth}
        placeholder="Max"
        keyboardType="numeric"
      />

      <CustomButton title="Franck" pressFunction={onPressSearch} />
    </View>
  )
}

export default SearchForm;