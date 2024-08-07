import {useState, useEffect, ReactElement} from 'react';
import {View, Input, Box, Select, VStack, Stack, Text, Center} from "native-base";
import DropdownPlaceInput from 'component/DropdownPlaceInput';
import CustomButton from 'component/CustomButton';
import searchJourneys from 'util/searchJourneys';

const SearchForm = (): ReactElement => {
  const [datetime, setDatetime] = useState('20240729T152000'),
        [minFecth, setMinFecth] = useState('1'),
        [maxFecth, setMaxFecth] = useState('7'),
        [origin, setOrigin] = useState(''),
        [destination, setDestination] = useState('');

  const onPressSearch = async (): Promise<void> => {
    // 87313874 87286005
    try {
      const {waypoints, journeys} = await searchJourneys(origin, destination, datetime, Number(maxFecth), Number(minFecth))
      console.log(journeys)
    } catch(err) {
      console.log(err)
    }
  }

  return (
  <View>
    <DropdownPlaceInput
      onSetStation={setOrigin}
      placeholder="Départ" />

    <DropdownPlaceInput
      onSetStation={setDestination}
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
  </View>)
}

export default SearchForm;