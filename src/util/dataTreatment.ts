import {Journey, Waypoint, Stop, WayTypes} from 'constant/interfaces';

// overwrite initial stop points
export const overwriteStops = (stops: Stop[]): void => { 
    let currStop: Stop;

    stops?.forEach((stop: any, index: number) => {

        currStop = {
            stop_id: stop?.stop_point.id,
            name: stop?.stop_point.name,
            departure_datetime: stop?.base_departure_date_time ?? stop?.departure_date_time ?? '',
            // departure_delayed
            arrival_datetime: stop?.base_arrival_date_time ?? stop?.arrival_date_time ?? '',
            // arrival_delayed
            longitude: stop?.stop_point?.coord.lon ?? '',
            latitude: stop?.stop_point?.coord.lat ?? ''
        }

        stops[index] = currStop;
    })
}

export const treatWaypoint = (section: any, journey_url: string): Waypoint => {

    // clear way
    let way: Partial<Waypoint> = {};

    way.journey_url = journey_url;
    way.duration = section.duration;
    way.section_type = section.type;
    way.transfer_type = (section.type === 'transfer') ? section?.transfer_type : '';
    way.departure_datetime = section?.base_departure_date_time ?? section.departure_date_time;
    way.arrival_datetime = section?.base_arrival_date_time ?? section.arrival_date_time;

    // [?] mettre simplement chemin ?? '' au lieu des conditions ?
    if (section.type !== 'waiting')
    {
        way.first_place = section?.from?.id;
        way.last_place = section?.to?.id;
    }

    if (section?.display_informations && /*[?] systématique, nécessaire > */ section?.transfer_type !== 'walking')
    {
        let infos = section.display_informations;
        way.line_code = infos.code;
        way.direction = infos.direction;
        way.commercial_mode = infos.commercial_mode // ? name;
    }

    // [?] meilleure condition
    if (section?.transfer_type !== 'walking')
    {
        // way.arrival_delayed = disruption.
        // way.departure_delayed = disruption.

        overwriteStops(section?.stop_date_times);
        way.stops = section?.stop_date_times;
    }

    return way;
}

export const treatJourneyData = (data: any, fromStationID: string, toStationID: string): {journeysData: Journey[], waypointsData: Waypoint[]} => {

    let journey: Partial<Journey> = {},
        journeys: Journey[] = [],
        waypoints: Waypoint[],
        sections: any[] = [],
        first_section: any = {},
        last_section: any = {},
        urlParamsStartAt: any,
        currJourneyUrl: string;

    journey.disruptions = data.disruptions;
    data.journeys.forEach((item: any): Partial<Journey> => {

        // let journey: Partial<Journey> = {};

        // url as ID for the current journey
        const {href} = item.links.find((link: any): string => link.rel === 'same_journey_schedules');
        let decodedUri = decodeURIComponent(href);
        urlParamsStartAt = decodedUri.indexOf('?');
        journey.url = decodedUri.slice(urlParamsStartAt);

        // add filtered sections and the journey url
        item.sections = item.sections.filter((section: any) => section.type !== 'crow_fly');

        // get general data from section
        // If only one section : both variable reference to the same objet
        first_section = item.sections.at(0);
        last_section = item.sections.at(-1);

        // sections.push(journey.url);
        first_section.journey_ref = journey.url; // ? maj
        sections.push(...item.sections);
        
        // general informations
        journey.duration = item.duration;
        journey.transfer = item.nb_transfers;
        
        // [! START : si après la suppression des crow_fly : données des stop_points
        journey.from_station_ID = fromStationID; // ? first_section.from.id
        journey.from_station_label = first_section.from.name; // ? from_station_label 
        journey.to_station_ID = toStationID; // ? last_section.to.id
        journey.to_station_label = last_section.to.name;
        // END !]

        journey.departure_datetime = item?.base_departure_date_time ?? item?.departure_date_time;
        journey.arrival_datetime = item?.base_arrival_date_time ?? item?.arrival_date_time;

        journey.arrival_datetime = 
            (datetime.arrival_date_time != datetime.base_arrival_date_time) 
            ? datetime.arrival_date_time 
            : datetime.base_arrival_date_time;

        // (journey.disruptionsID) ?
        // departure from station 
        journey.departure_datetime = 
            (datetime.departure_date_time != datetime.base_departure_date_time)
            ? datetime.departure_date_time 
            : datetime.base_departure_date_time;

        if (item?.base_departure_date_time) 
        {
           journey.departure_datetime = item?.base_departure_date_time;
           journey.departure_delayed = item?.departure_date_time;
           journey.arrival_datetime = item?.base_arrival_date_time;
           journey.arrival_delayed = item?.departure_date_time;
        }

        journey.line_code = (item.nb_transfers == 0) ? first_section?.display_informations?.code : undefined ;
        journey.status = item.status;
        journey.bbIsWatchingYou = false;
        
        journeys.push(journey);
    })

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

export const getJourneyDisruption = (): void => {
    /*
    journey url
    boucle dans résultat recherche
    unique dans suivi
    */
}