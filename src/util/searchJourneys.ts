import {getJourneys, getAreaDirections} from 'service/journey';
import {Journey} from 'constant/interfaces'

const searchJourneys = async (
    fromPoint: string,
    toStation: string,
    datetime?: string,
    maxFecth?: number,
    minFecth?: number
): Array<Journey> =>
{
    let fetchedJourneys: Journey[],
        currentJourney: Journey,
        station=fromPoint,
        direction='FROM';

    if (toStation) {
      station = toStation;
      direction = 'TO';
    }

    debugger
	
    if (fromPoint && toStation) {
        await getJourneys(fromPoint, toStation, datetime, Number(maxFecth), Number(minFecth))
        .then((res) => {
    
        	const {data} = res,
                status = res.status,
                aJourneys = data.journeys,
                // oJourney = data.journeys[0].sections[0],
                // sJourneyStatus = data.journeys[0].status,
                aDisruptions = data.disruptions;

            currentJourney.seleted_from = fromPoint;
            currentJourney.seleted_to = toStation;
            data.journeys.map((journey:any) => {
                currentJourney.id = 'test';
                /*currentJourney.line_code = ;
                currentJourney.datetime_departure = ;
                currentJourney.datetime_arrival = ;
                currentJourney.journey_status = journey.status;
                currentJourney.stops_and_datetimes = ;
                currentJourney.disturbtions = ;
                currentJourney.duration = ;
                currentJourney.formatted_duration = ;
                currentJourney.brotherIsWatching = npm ;*/

                if (journey.sections.length > 1) 
                {
                    console.log('plus 1 section')
                }

                // journey.sections[0].
            })


          	console.log('JOUR !', res.request.responseURL)
          	fetchedJourneys = data.journeys;
        })
        .catch((err) => {
          console.log('noooon ', err.code, err.request.responseURL)
        })

    } else if (station) {
        await getAreaDirections(station, direction, datetime)
        .then((res) => {
          	const {data} = res,
                sCode = data.code,
                aJourneys = (type == 'FROM') ? data?.departures : data?.arrivals,
                aDisruptions = data.disruptions;

          	console.log('DIR : ', res.request.responseURL);
          	fetchedJourneys = data.departures ?? data.arrivals;
        })
        .catch((err) => {
          	console.log('noooon ', err.code, err.request.responseURL);
        })
    }
    return fetchedJourneys;
}

export default searchJourneys;