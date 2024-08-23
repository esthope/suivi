import {getJourneys, getDirections} from 'service/journey';
import {Journey, Waypoint, WayTypes} from 'constant/interfaces'
import {treatWaypoints, treatStops, overwriteStops} from 'util/dataTreatment'

const searchJourneys = async (
    from_station_ID: string,
    from_station_label: string,
    to_station_ID: string,
    to_station_label: string,
    datetime?: string,
    maxFecth?: number,
    minFecth?: number
): Promise<{journeys: Journey[], waypoints: WayTypes}> => {

    let journey: Journey = {},
        journeys: Journey[] = [],
        sections: any[] = [],
        first_section: any = {},
        last_section: any = {},
        urlParamsStartAt: string,
        waypoints: WayTypes;

    if (from_station_ID && to_station_ID) {
        await getJourneys(from_station_ID, to_station_ID, datetime, Number(maxFecth), Number(minFecth))
        .then((res) => {
            console.log('JOUR !')

            const {data} = res;

            journey.disruptions = data.disruptions;
            journeys = data.journeys.map((item:any, index:number) => {

                debugger
                // get general data from sections
                /* If only one section : both variable reference to the same objet
                */

                first_section = item.sections.at(0);
                last_section = item.sections.at(-1);

                // url as ID for the current journey
                const {href} = item.links.filter((link: string): string => link.rel = 'this_journey');
                urlParamsStartAt = href.indexOf('?');
                journey.url = href.slice(urlParamsStartAt)

                // add filtered sections
                item.sections = item.sections.filter((section) => section.type !== 'crow_fly');
                sections.push(item.sections);

                // general informations
                journey.duration = item.duration;
                journey.transfer = item.nb_transfers;
                journey.from_station_ID = from_station_ID // first_section.from.id;
                journey.to_station_ID = to_station_ID // last_section.to.id;
                journey.from_station_label = 
                journey.to_station_label = 
                journey.departure_datetime = item?.base_departure_date_time ?? item?.departure_date_time;
                journey.arrival_datetime = item?.base_arrival_date_time ?? item?.arrival_date_time;
                journey.line_code = (item.nb_transfers == 0) ? first_section?.display_informations?.code : undefined ;
                journey.status = item.status;
                journey.bbIsWatchingYou = false;

                /*.map((section:any): WayTypes => {
                    return treatWaypoints(section, journey.journey_id);
                })*/

                return journey;
            })

            // treat structure of all sections
            /*waypoints = sections.map((item: any) => Waypoint[] {
            })*/

            debugger
            treatStops(waypoints);
            journeys = data.journeys;
        })
        .catch((err) => {
            console.log('noooon ', err?.code, err?.request?.responseURL ?? err?.message)
        })

    } else if (from_station_ID || to_station_ID) {
        let station=from_station_ID,
            direction='FROM';

        if (to_station_ID) {
          station = to_station_ID;
          direction = 'TO';
        }

        // [!] vérifier pour l'entité
        await getDirections(station, direction, datetime)
        .then((res) => {
            const {data} = res,
                sCode = data.code,
                aJourneys = (direction == 'FROM') ? data?.departures : data?.arrivals,
                daisruptions = data.disruptions;

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