import {useState, useEffect, ReactElement} from 'react';
import {Journey, Waypoint, WayTypes} from 'constant/interfaces';
import {treatJourneys} from 'util/dataTreatment';
import {View, Input, Box, Select, VStack, Stack, Text, Center} from "native-base";
import DropdownPlaceInput from 'component/DropdownPlaceInput';
import CustomButton from 'component/CustomButton';

const SearchForm = (): ReactElement => {
  const [datetime, setDatetime] = useState<string>('20240729T152000'), // [!] type custom date
        [minFecth, setMinFecth] = useState<number>(1),
        [maxFecth, setMaxFecth] = useState<number>(7),
        [fromStationID, setFromStationID] = useState<string>(),
        [toStationID, setToStationID] = useState<string>('')
        [waypoints, setWaypoints] = useState<Waypoint>(),
        [journeys, setJourneys] = useState<Journey>(),
        ;

  const onPressSearch = async (): Promise<void> => {
    // 87313874 87286005
    try {

      if (fromStationID && toStationID)
      {
        await getJourneys(fromStationID, toStationID, datetime, Number(maxFecth), Number(minFecth))
        .then((res) => {
          console.log('JOUR')

          const {data} = res;
          const {treatedJourneys, treatedwaypoints}: Journeys[] = treatJourneys(data, fromStationID, toStationID);
          setJourneys(treatedJourneys);

        }).catch((err) => {
            console.log('!JOUR', err?.code, err?.request?.responseURL ?? err?.message)
        })
      }
      else if (from_station_ID || to_station_ID)
      {
        let station=from_station_ID,
            direction='FROM';

        if (to_station_ID) {
          station = to_station_ID;
          direction = 'TO';
        }

        // [!] vérifier pour l'entité
        await getDirections(station, direction, datetime)
        .then((res) => {
            const {data} = res;
            /*sCode = data.code,
            aJourneys = (direction == 'FROM') ? data?.departures : data?.arrivals,
            daisruptions = data.disruptions;*/

            console.log('DIR : ', res.request.responseURL);
        })
        .catch((err) => {
            console.log('!DIR', err.code, err.request.responseURL);
        })
      }
    } catch(err) {
      console.log('TRY AGAIN B*TCH ', err)
    }
  }

  return (
  <View>
    <DropdownPlaceInput
      onSetStation={setFromStationID}
      placeholder="Départ" />

    <DropdownPlaceInput
      onSetStation={setToStationID}
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