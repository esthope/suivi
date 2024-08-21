import {useState, useEffect, ReactElement} from 'react';
import {Journey, Waypoint} from 'constant/interfaces';
import {getJourneys, getDirections} from 'service/journey';
import {treatJourneyData} from 'util/dataTreatment';
import {View, Input, Box, Select, VStack, Stack, Text, Center} from "native-base";
import DropdownPlaceInput from 'component/DropdownPlaceInput';
import CustomButton from 'component/CustomButton';

const SearchForm = (): ReactElement => {
  const // user filters
        [datetime, setDatetime] = useState<string>('20240729T152000'), // [!] type custom date
        [minFecth, setMinFecth] = useState<string>('1'),
        [maxFecth, setMaxFecth] = useState<string>('7'),
        [fromStationID, setFromStationID] = useState<string>(''),
        [toStationID, setToStationID] = useState<string>(''),
        // data treatment
        [waypoints, setWaypoints] = useState<Waypoint[]>(),
        [journeys, setJourneys] = useState<Journey[]>()
        ;

  const onPressSearch = async (): Promise<void> => {
    try {
      // 87313874 87286005
      if (fromStationID && toStationID)
      {
        await getJourneys(fromStationID, toStationID, datetime, Number(maxFecth), Number(minFecth))
        .then((res) => {
          console.log('JOUR')

          const {data} = res;
          const {journeysData, waypointsData} = treatJourneyData(data, fromStationID, toStationID);
          setJourneys(journeysData);
          setWaypoints(waypointsData);

        }).catch((err) => {
            console.log('!JOUR', err?.code, err?.request?.responseURL ?? err?.message)
        })
      }
      else if (fromStationID || toStationID)
      {
        let station=fromStationID,
            direction='FROM';

        if (toStationID) {
          station = toStationID;
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
        .catch((err: any) => {
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
      // inputMode='numeric'
      value={minFecth}
      onChangeText={setMinFecth}
      placeholder="Min"
      keyboardType="numeric"
      />

    <Input
      mb={5}
      type='text'
      inputMode='numeric'
      value={maxFecth}
      onChangeText={setMaxFecth}
      placeholder="Max"
      // keyboardType="numeric"
    />

    <CustomButton title="Franck" pressFunction={onPressSearch} />
  </View>)
}

export default SearchForm;