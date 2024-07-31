import {getJourneys, getAreaDirections} from 'service/journey';
import {Journey} from 'constant/interfaces'

let fetchedJourneys: Array<Journey>,
    currentJourney: Journey;

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
    
        	const {data} = res,
                status = res.status,
                aJourneys = data.journeys,
                // oJourney = data.journeys[0].sections[0],
                // sJourneyStatus = data.journeys[0].status,
                aDisruptions = data.disruptions;

                currentJourney.seleted_from = fromPlace;
                currentJourney.seleted_to = toPlace;
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
                currentJourney.brotherIsWatching = npm ;
                */

                // 
                if (journey.sections.length > 1)
                {
                    console.log('plus 1 section')

// détail marche à pied entre arrêt de bus et quai train ou TGV
// idée évolution: carte chemin détaillé avec géo 
{
    "duration": 32220,
    "nb_transfers": 2,
    "departure_date_time": "20240801T062000",
    "arrival_date_time": "20240801T151700",
    "status": "",
    "durations"?: { // si nb_transfers > 1
        "total": 32220,
        "walking": 600,
        "bike": 0,
        "car": 0,
        "ridesharing": 0,
        "taxi": 0
    },
    "disruptions": [],
    "terminus": [], // ? nécessaire
    "sections": [ // ignorer les crow_fly
        {
            "duration": 0, // si 0 : d'une zone area/admin à un stop_point
            "departure_date_time": "20240801T062000",
            "arrival_date_time": "20240801T062000",
            "base_departure_date_time"?: "20240801T062000", // qd type != walking, transfer
            "base_arrival_date_time"?: "20240801T070500", // qd type != walking, transfer
            "mode"?: "walking", // ? quand type crow_fly
            "type": "crow_fly" | "public_transport" | "transfer" | "waiting",
            "transfer_type"?: "walking", // si type transfer
            "from"?: { // 1er sectino : selection utilisateur, si type != waiting
                "id": "admin:fr:80021" | "...:LongDistanceTrain",
                "name": "Amiens (80000-80090)",
                "embedded_type": "administrative_region" | "stop_point",
                "administrative_region" | "stop_point": { // prévision évolution
                    "coord": { // déplacer vers ../
                        "lon": "2.2956951",
                        "lat": "49.8941708"
                    }
                }
            },
            "to"?: { // si type != waiting
                "id": "stop_point:SNCF:87313874:Coach",
                "name": "Amiens (Amiens)",
                "embedded_type": "idem"
                "stop_point": { // prévision évolution
                    "coord": { // déplacer vers ../
                        "lon": "2.308277",
                        "lat": "49.890584"
                    },

                }
            },
            "display_informations"?: { // si type != walking
                "direction": "TGV Haute Picardie (Estrées-Deniécourt)",
                "label": "Navettes TGV HPI" | "L32",
                "code": "" | "L32",
                "headsign": "69400" | "L32", // ? qd != de line, numéro de train ?
                "trip_short_name": "865214", // ? nnuméro du train ?
                "commercial_mode": "TGV INOUI",
                "physical_mode"?: "Train grande vitesse",
                "links": [ // récupérer le terminus de cette section ?
                    {
                        "type": "stop_area",
                        "id": "stop_area:SNCF:87313882"
                    }
                ],
            },
            "stop_date_times"?: [ // si type != walking
                {
                    "departure_date_time": "20240801T062000",
                    "base_departure_date_time": "20240801T062000",
                    "arrival_date_time": "20240801T062000",
                    "base_arrival_date_time": "20240801T062000",
                    "stop_point": { // ?remonter tout en haut
                        "id": "stop_point:SNCF:87313874:Coach",
                        "name": "Amiens",
                        "label": "Amiens (Amiens)",
                        "coord": { // prévision évolution carte détaillée d'une ligne 
                            "lon": "2.308277",
                            "lat": "49.890584"
                        },
                    }
                },
                {/*...*/}
            ]
        },
    ]
}


arrival_date_time: "20240801T062000"
departure_date_time: "20240801T062000"
duration: 0
type: "crow_fly" "transfer" "public_transport"
transfer_type?: "walking"
from: {id: 'admin:fr:80021', name: 'Amiens (80000-80090)', embedded_type: 'administrative_region'}
to: {id: 'stop_point:SNCF:87313874:Coach', name: 'Amiens (Amiens)', embedded_type: 'stop_point'}
geojson: {type: 'LineString', coordinates: Array(2), properties: Array(1)}
display_informations?: {
    code: ""
    direction: "TGV Haute Picardie (Estrées-Deniécourt)"
    headsign: "69400"
    label: "Navettes TGV HPI"
    name: "Navettes TGV HPI"
    physical_mode: "Autocar"
}
mode?: "walking"
stop_date_times?: (2) [{…}, {…}]

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