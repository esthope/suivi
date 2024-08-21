import {Journey, Waypoint, Stop, WayTypes} from 'constant/interfaces';

let way: Waypoint,
    currStop: Stop;

// overwrite initial stop points
export const overwriteStops = (stops: Stop[]): void => { 
    stops?.forEach((stop: any, index: number) => {
        currStop.stop_id = stop.stop_point.id;
        currStop.name = stop.stop_point.name;
        currStop.departure_datetime = stop?.base_departure_date_time ?? stop?.departure_date_time ?? '';
        // departure_delayed
        currStop.arrival_datetime = stop?.base_arrival_date_time ?? stop?.arrival_date_time ?? '';
        // arrival_delayed
        currStop.longitude = stop.stop_point.coord.lon ?? '';
        currStop.latitude = stop.stop_point.coord.lat ?? '';
        stops[index] = currStop;
    })
}

export const treatWaypoint = (section: any, journey_url: string): Waypoint => {
    // [?] clear way
    way.journey_url = journey_url;
    way.duration = section.duration;
    way.section_type = section.type;
    way.transfer_type = (section.type !== 'transfer') ? section?.transfer_type : '';
    way.departure_datetime = section?.base_departure_date_time ?? section.departure_date_time;
    way.arrival_datetime = section?.base_arrival_date_time ?? section.arrival_date_time;

    // [?] mettre simplement chemin ?? '' au lieu des conditions ?
    if (section.type !== 'waiting')
    {
        way.first_place = section?.from?.id;
        way.last_place = section?.to?.id;
    }

    if (section?.display_informations && /*[?] systématique, nécessaire > */ section.transfer_type !== 'walking')
    {
        let infos = section.display_informations;
        way.line_code = infos.code;
        way.direction = infos.direction;
        way.commercial_mode = infos.name;
    }

    // [?] meilleure condition
    if (section.transfer_type !== 'walking')
    {
        // way.arrival_delayed = disruption.
        // way.departure_delayed = disruption.

        overwriteStops(section?.stop_date_times);
        way.stops = section?.stop_date_times;
    }

    return way;
}

export const treatJourneyData = (data: any, fromStationID: string, toStationID: string): {journeysData: Journey[], waypointsData: Waypoint[]} => {

    let journey: Journey,
        journeys: Journey[] = [],
        waypoints: Waypoint[],
        sections: any[] = [],
        first_section: any = {},
        last_section: any = {},
        urlParamsStartAt: string,
        currJourneyUrl: string;

    debugger

    // journey = {disruptions: data.disruptions};
    journey.disruptions = data.disruptions;
    journeys = data.journeys.map((item: any): Journey => {
        // url as ID for the current journey
        const {href} = item.links.filter((link: any): string => link.rel = 'this_journey');
        urlParamsStartAt = href.indexOf('?');
        journey.url = href.slice(urlParamsStartAt)
        
        // get general data from sections
        // If only one section : both variable reference to the same objet
        first_section = item.sections.at(0);
        last_section = item.sections.at(-1);

        // add filtered sections and the journey url
        item.sections = item.sections.filter((section: any) => section.type !== 'crow_fly');
        // sections.push(journey.url);
        first_section.journey_ref = journey.url; // ? maj
        sections.push(item.sections);
        
        // general informations
        journey.duration = item.duration;
        journey.transfer = item.nb_transfers;
        
        // [! START : si après la suppression des crow_fly : données des stop_points
        journey.from_station_ID = fromStationID; // ? first_section
        // journey.from_station_label = from_station_label; // first_section.from.name 
        journey.to_station_ID = toStationID; // ? last_section
        // journey.to_station_label = to_station_label;
        // END !]

        journey.departure_datetime = item?.base_departure_date_time ?? item?.departure_date_time;
        journey.arrival_datetime = item?.base_arrival_date_time ?? item?.arrival_date_time;
        journey.line_code = (item.nb_transfers == 0) ? first_section?.display_informations?.code : undefined ;
        journey.status = item.status;
        journey.bbIsWatchingYou = false;
        
        return journey;
        
    })

    debugger
    
    // Treat the structure of all sections
    waypoints = sections.map((item: any): Waypoint => {
        // Means it's the first section of a journey
        // [!] bien vérifier si l'url est la bonne, comparaison de données
        if (item.hasOwnProperty('journey_ref')) {
            // Donnera l'url à toutes les sections suivantes jusqu'à la prochaine journey_ref
            currJourneyUrl = item.journey_ref;
        }

        // treatment with the journey url
        return treatWaypoint(item, currJourneyUrl);
    })

    // treatStops(waypoints);
    // finally
    return {
        journeysData: journeys, 
        waypointsData: waypoints
    }
}

/*export const treatStops = (waypoints: WayTypes): void => {
    waypoints.forEach((item: Waypoint): void => {
        overwriteStops(item.stops)
    })
}*/

export const getJourneyDisruption = (): void => {
    /*
    journey url
    boucle dans résultat recherche
    unique dans suivi
    */
}