export interface Place {
	place_id: string,
	name: string,
	embedded_type: "administrative_region" | "stop_point"| "stop_area" | never,
	longitude?: string,
	latitude?: string,
}

export interface BigBrother {
	id: string, // BIWY K44 87313874:Train 87286005:Train HHmm
	linked_id?: string, // BIWY K44 87313874:Train 87286005:Train HHmm
	journey_url: string,
	type: "ONE" | "DAYS" | "STALK",
	from_station_ID: string,
	from_station_label: string,
	to_station_ID: string,
	to_station_label: string,
	line_code: string,
	datetime: Date, // ?format
	alert_days?: ['mon' | 'tue' | 'wen' | 'thu' | 'fri' | 'sat' | 'sun'] | [],
	alert_types: ['RING' | 'VIBR' | 'DISRUPTION_ONLY'] | [],
	expire?: Date, // .datetime + 30min
	// disruption_only: true | false
}

export interface Line {
	line_code: string,
	startStation: string,
	terminus: string,
	stops_and_datetimes: object[],
	// ?duration: number, // où récupérer
}

export interface Stop {
	stop_id: string,
	name: string,
	departure_datetime: string, 
	departure_delayed?: string, // qd type != walking | transfer
	arrival_datetime: string, 
	arrival_delayed?: string, // qd type != walking | transfer
	longitude?: string,
	latitude?: string
}

// étape intermédiaire du trajet
export interface Waypoint {
	journey_url: string, // retirer/changer min_nb_journeys, datetime, count lors|dans de l'enregistrement des crières (ou d'après eux) de suivi (fractionner pour évo eventuelles)
	duration: number, // si 0 = trajet de zone à stop_point
	line_code?: string, // si type != walking
	direction?: string, // si type != walking
	section_type?: "crow_fly" | "public_transport" | "transfer" | "waiting",
	transfer_type?: "walking" | never, // si type transfer
	commercial_mode?: string, // si type != walking
	first_place?: Place, // 1er section : selection utilisateur, identifier type point:Coach ou admin..., si type != waiting
	departure_datetime: string, 
	departure_delayed?: string, // qd type != walking | transfer
	last_place?: Place, 
	arrival_datetime: string, 
	arrival_delayed?: string, // qd type != walking | transfer
	stops?: any[] | Stop[] // si type != walking
}

// itinerary
export interface Journey {
	url: string,
	duration: number,
	transfer: number,
	from_station_ID: string,
	from_station_label: string,
	to_station_ID: string,
	to_station_label: string,
	departure_datetime: string, 
	arrival_datetime: string,
	line_code ?: string, // si tranfer == 1
	status: ['' | 'SIGNIFICANT_DELAYS' | 'REDUCED_SERVICE' | 'NO_SERVICE' | 'MODIFIED_SERVICE' | 'ADDITIONAL_SERVICE' | 'UNKNOWN_EFFECT' | 'DETOUR' | 'OTHER_EFFECT'],
	disruptions?: object[],
	// waypoints: Waypoints | Waypoints[], ? plutôt par ID
	bbIsWatchingYou: true | false
}

export type WayTypes = Waypoint[] | Waypoint;