// namespace BigBrother 
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
	type: "ONE" | "DAYS" | "STALK",
	seleted_from: string,
	seleted_to: string,
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
	stops_and_datetimes: Array<object>,
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
	journey_id: string,
	duration: number, // si 0 = trajet zone à stop_point
	line_code: string, // si type != walking
	direction: string, // si type != walking
	section_type?: "crow_fly" | "public_transport" | "transfer" | "waiting",
	transfer_type?: "walking" | never, // si type transfer
	commercial_mode: string, // si type != walking
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
	journey_id: string, // JOU K44 87313874:Train 87286005:Train HHmm
	duration: number,
	transfer: true | false, // si > 1
	departure_datetime: string, 
	arrival_datetime: string,
	status: ['' | 'SIGNIFICANT_DELAYS' | 'REDUCED_SERVICE' | 'NO_SERVICE' | 'MODIFIED_SERVICE' | 'ADDITIONAL_SERVICE' | 'UNKNOWN_EFFECT' | 'DETOUR' | 'OTHER_EFFECT'],
	seleted_from: string,
	seleted_to: string,
	disturbtions: Array<object>,
	// waypoints: Waypoints | Array<Waypoints>, ? plutôt par ID
	bbIsWatchingYou: true | false
}