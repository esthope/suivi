// import contants
import {getJourneys, getPointDirections, getAreaDirections} from 'service/journey'
import {Journey} from 'constant/interface'

// fetch journeys with user selection
export const fetchJourneys = (from: string, to: string, datetime?: string, maxFecth?: number, minFecth?: number): Array<Journey> => {
	return getJourneys(from, to, datetime, maxFecth, minFecth)
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
}

//
// export const fetchAreaDirections = (stop_point: string, type: string, datetime?: string): void => {
export const fetchAreaDirections = (stop_point: string, type: string, datetime: string): void => {
	return getAreaDirections(stop_point, type, datetime)
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