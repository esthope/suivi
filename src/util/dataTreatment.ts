import {Waypoint, Stop, WayTypes} from 'constant/interfaces';

let way: Waypoint,
    currStop: Stop;

// overwrite initial stop points
export const overwriteStops = (stops: Stop[]): void => { 
    stops?.forEach((stop: any, index: number) => {
        // currStop = {}; // ? plante
        currStop.stop_id = stop.stop_point.id;
        currStop.name = stop.stop_point.name;
        currStop.departure_datetime = stop?.departure_date_time ?? stop?.base_departure_date_time;
        currStop.arrival_datetime = stop?.arrival_date_time ?? stop?.base_arrival_date_time;
        currStop.longitude = stop.stop_point.coord.lon;
        currStop.latitude = stop.stop_point.coord.lat;
        stops[index] = currStop;
    })
}

export const treatWaypoints = (section: any, journey_url: string): Waypoint => {
    way.journey_url = journey_url;
    way.duration = section.duration;
    way.section_type = section.type;
    way.transfer_type = section.transfer_type;
    way.first_place = section.from.id;
    way.departure_datetime = section?.departure_date_time ?? section?.base_departure_date_time;
    // way.departure_delayed = disruption.;
    way.last_place = section.to.id;
    way.arrival_datetime = section?.arrival_date_time ?? section?.base_arrival_date_time;
    // way.arrival_delayed = disruption. ;
    way.stops = section.stop_date_times;

    if (section.display_informations) 
    {
        let infos = section.display_informations;
        way.line_code = infos.code;
        way.direction = infos.direction;
        way.commercial_mode = infos.name;
    }

    return way;
}

export const treatStops = (waypoints: WayTypes): void => {
    waypoints.forEach((item: Waypoint): void => {
        overwriteStops(item.stops)
    })
}

export const getJourneyDisruption = (): void => {
    /*
    journey url
    boucle dans résultat recherche
    unique dans suivi
    */
}