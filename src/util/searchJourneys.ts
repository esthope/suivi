import {getJourneys, getDirections} from 'service/journey';
import {Journey, Waypoint} from 'constant/interfaces'
import {treatWaypoints, treatStops} from 'util/sectionTreatment'

let journey: Journey,
    waypoints: Waypoint | Waypoint[],
    journeys: Journey[];

const searchJourneys = async (
    origin: string,
    destination: string,
    datetime?: string,
    maxFecth?: number,
    minFecth?: number
): Promise<{journeys: Journey[], waypoints: Waypoint | Waypoint[]}> => {
    debugger
    if (origin && destination) {
        await getJourneys(origin, destination, datetime, Number(maxFecth), Number(minFecth))
        .then((res) => {
          	console.log('JOUR !', res.request.responseURL)
        	const {data} = res;

            // journey
            journey.seleted_from = origin;
            journey.seleted_to = destination;
            journey.disturbtions = data.disturbtions;

            data.journeys.map((item:any, index:number) => {
                journey.journey_id = 'test' + index;
                journey.duration = item.duration;
                journey.transfer = (item.nb_transfers > 1) ? true : false;
                journey.departure_datetime = item.departure_date_time;
                journey.arrival_datetime = item.arrival_date_time;
                journey.status = item.status;
                journey.bbIsWatchingYou = false;
                journeys.push(journey)

                // (item?.sections && item.sections.length > 1)
                if (item.nb_transfers > 1)
                {
                    // vérifier si retourne toute la table ou la première itération
                    // ne pas vider la table car contiendra tous les trajets (waypoints) de tous les voyage (journey)
                    waypoints = item.sections.map((section:any): Waypoint | Waypoint[] => {
                        return treatWaypoints(section, journey.journey_id); // waypoints.push                       
                    })
                }
                else
                {
                    waypoints = treatWaypoints(item.sections[0], journey.journey_id);
                }
            })

            treatStops(waypoints);
          	journeys = data.journeys;
        })
        .catch((err) => {
          console.log('noooon ', err.code, err.request.responseURL)
        })

    } else if (origin || destination) {
        let station=origin,
            direction='FROM';

        if (destination) {
          station = destination;
          direction = 'TO';
        }

        // [!] vérifier pour l'entité
        await getDirections(station, direction, datetime)
        .then((res) => {
          	const {data} = res,
                sCode = data.code,
                aJourneys = (direction == 'FROM') ? data?.departures : data?.arrivals,
                adisturbtions = data.disturbtions;

          	console.log('DIR : ', res.request.responseURL);
          	journeys = data.departures ?? data.arrivals;
        })
        .catch((err) => {
          	console.log('noooon ', err.code, err.request.responseURL);
        })
    }

    // finally
    return {
        journeys: journeys, 
        waypoints: waypoints
    }
}

export default searchJourneys;