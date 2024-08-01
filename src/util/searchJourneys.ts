*import {getJourneys, getAreaDirections} from 'service/journey';
import {Journey} from 'constant/interfaces'

let fetchedJourneys: Array<Journey>,
    journey: Journey;

const searchJourneys = async (
    fromPlace: string,
    toPlace: string,
    datetime?: string,
    maxFecth?: number,
    minFecth?: number
): Promise<Journey[]> =>
{
    let station=fromPlace,
        direction='FROM';

    if (toPlace) {
      station = toPlace;
      direction = 'TO';
    }

    debugger
	
    if (fromPlace && toPlace) {
        await getJourneys(fromPlace, toPlace, datetime, Number(maxFecth), Number(minFecth))
        .then((res) => {
    
        	const {data} = res;

            // header informations
            journey.seleted_from = fromPlace;
            journey.seleted_to = toPlace;
            journey.disruptions = data.disruptions;

            data.journeys.map((item:any, index:number) => {
                journey.id = 'test' + index;
                journey.duration = item.duration;
                journey.transfer = (item.nb_transfers > 1) ? true : false;
                journey.departure_datetime = item.departure_date_time;
                journey.arrival_datetime = item.arrival_date_time;
                journey.status = item.status;
                journey.waypoints = (item.nb_transfers > 1) ? item.sections[0] : item.sections;
                // journey.waypoints = (item?.sections && item.sections.length > 1) ? item.sections[0] : item.sections;
                journey.bbIsWatchingYou = false;

                if (Array.isArray(journey.waypoints))
                {
                    console.log('plus 1 section')
                }
                else
                {
                    
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
                aJourneys = (direction == 'FROM') ? data?.departures : data?.arrivals,
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