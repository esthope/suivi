import {useState, useEffect, ReactElement} from 'react';
import {Journey, Waypoint} from 'constant/interfaces';
import {getJourneys, getDirections} from 'service/journey';
import {treatJourneyData} from 'util/dataTreatment';
import {View, Input, Box, Select, VStack, Stack, Center} from "native-base";
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
        [nexts, setNexts] = useState<Next[]>()
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
          if (data?.error) {
              throw(data.error)
          }

          const {journeysData, waypointsData} = treatJourneyData(data, fromStationID, toStationID);
          setJourneys(journeysData);
          setWaypoints(waypointsData);

        }).catch((err) => {
            console.log('!JOUR', err?.code ?? err?.id, err?.request?.responseURL ?? err?.message)
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
            console.log('DIR : ', res.request.responseURL);
            console.log(data);
            /*sCode = data.code,
            aJourneys = (direction == 'FROM') ? data?.departures : data?.arrivals,
            disruptions = data.disruptions;*/
            
            let journeysDir: Journey[] = [],
                journey: Journey<Next> = {};

            journey.url = null; // [!] que faire ?
            journey.transfer = 0;

            res.data.map((item: any): Next => {
              let datetime = item.stop_date_time,
                  point = item.stop_point,
                  route = item.route,
                  infos = item.display_informations;

              journey = {
                // entete
                from_station_ID: point.id,
                from_station_label: point.name /*point.label, fromStationID*/,
                to_station_ID: route.direction.id /*.dir.stop_area.id, fromStationID*/,
                to_station_label: route.direction.name /*.dir.stop_area.name*/,
                // item
                line_code: route.code /*route.line.code, infos.name*/,
                // [!] vérifier les données – arrival in station 
                departure_datetime: datetime.departure_date_time,
                departure_delayed: datetime.base_departure_date_time,
                arrival_datetime: datetime.base_arrival_date_time,
                // [!] vérifier les données – departure from station 
                arrival_delayed: datetime.arrival_date_time,
                // url: ,
                disruptionsID: infos.links[0/*type = disruption*/].id,
                status: disruption.severity.effect,
              }

              journeysDir.push(journey);
            })

            setJourneys(journeysDir); // recherche journey on click dessus
        })
        .catch((err: any) => {
            console.log('!DIR', err.code, err.request.responseURL ?? err?.mess);
        })
      }
    } catch(err) {
      console.log('TRY AGAIN B*TCH ', err)
    }
  }

  return (
  <View>
    <DropdownPlaceInput
      onSetChoice={setFromStationID}
      placeholder="Départ" />

    <DropdownPlaceInput
      onSetChoice={setToStationID}
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