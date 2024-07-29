import {fetchJourneys, fetchAreaDirections} from 'service/journey';
import {Journey} from 'constant/interface'

export default const searchJourneys = async (fromStation: string, toStation: string, datetime?: string, maxFecth?: number, minFecth?: number) => {
	let station=fromStation,
        direction='FROM',
        fetchedJourneys = [];

    if (toStation) {
      station = toStation
      direction = 'TO'
    }

	if (fromStation && toStation) {
        fetchedJourneys = await fetchJourneys(fromStation, toStation, datetime, Number(maxFecth), Number(minFecth))
        .then((res) => {
    
        	const {data} = res,
                status = res.status,
                aJourneys = data.journeys,
                // oJourney = data.journeys[0].sections[0],
                // sJourneyStatus = data.journeys[0].status,
                aDisruptions = data.disruptions;

          	console.log('JOUR !', res.request.responseURL)
          	return data.journeys;
        })
        .catch((err) => {
          console.log('noooon ', err.code, err.request.responseURL)
        })

    } else if (station) {
        fetchedJourneys = await fetchAreaDirections(station, direction, datetime)
        .then((res) => {
          	const {data} = res,
                sCode = data.code,
                aJourneys = (type == 'FROM') ? data?.departures : data?.arrivals,
                aDisruptions = data.disruptions;

          	console.log('DIR : ', res.request.responseURL);
          	return data.departures ?? data.arrivals;
        })
        .catch((err) => {
          	console.log('noooon ', err.code, err.request.responseURL);
        })
    }
}