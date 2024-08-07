import {Waypoint, Stop} from 'constant/interfaces';

let way: Waypoint,
    currStop: Stop;

export const treatWaypoints = (section:any, journeyID: string): Waypoint => {
    let infos = section.display_informations;
    
    way.journey_id = journeyID;
    way.duration = section.duration;
    way.line_code = infos.code;
    way.direction = infos.direction;
    way.section_type = section.type;
    way.transfer_type = section.transfer_type;
    way.commercial_mode = infos.name;
    way.first_place = section.from.id;
    way.departure_datetime = section?.departure_date_time ?? section?.base_departure_date_time;
    // way.departure_delayed = disruption.;
    way.last_place = section.to.id;
    way.arrival_datetime = section?.arrival_date_time ?? section?.base_arrival_date_time;
    // way.arrival_delayed = disruption. ;
    way.stops = section.stop_date_times;

    return way;
}

const overwriteStops = (stops: Waypoint["stops"]): void => { 
    stops?.forEach((stop: any) => {
        // currStop = {};
        currStop.stop_id = stop.stop_point.id;
        currStop.name = stop.stop_point.name;
        currStop.departure_datetime = stop?.departure_date_time ?? stop?.base_departure_date_time;
        currStop.arrival_datetime = stop?.arrival_date_time ?? stop?.base_arrival_date_time;
        currStop.longitude = stop.stop_point.coord.lon;
        currStop.latitude = stop.stop_point.coord.lat;

        // vérifier si contexte est bon & si overwrite est bon
        stop = currStop;
    })
}

export const treatStops = (waypoints: Waypoint | Waypoint[]): void => {

    // overwrite initial stop points
    if (Array.isArray(waypoints)) 
    {
        waypoints.forEach((item: Waypoint): void => {
            overwriteStops(item.stops)
        })
    }
    else
    {
        overwriteStops(waypoints.stops)
    }
}