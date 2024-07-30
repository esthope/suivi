// namespace BigBrother 
export interface Place {
	embedded_type: string,
	id: string,
	name: string
}

/**
 * id: Follow's ID : "BIWY" + line_code + selected departure station number + selected arrival station number + departure time
 * linked_id: ID rempli si ce trajet est suivi dans la direction opposé (back/forth)
 * type: ONE = suivi sur un horaire seulement, DAYS = horaire suivi sur un plusieurs jours toutes les semaines, STALK = suivi à chaque trajet effectué
 * selected_from: gare de départ choisie
 * selected_to: gare d'arrivée choisie
 * line_code: code de la ligne
 * datetime: horaire du prochain trajet
 * alert_days: si type 'DAYS', renseigne les jours d'alerte
 * alert_types: type d'alerte à utiliser
 * expire: si type 'ONE', date d'expiration pour supprimer le suivi automatiquement [30 min] après l'arrivée en gare
 */
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

export interface JourneyHeader {
	id: string, // JOU K44 87313874:Train 87286005:Train HHmm
	seleted_from: string,
	seleted_to: string,
	// startStation: string,
	// terminus: string,
	line_code: string,
	datetime_departure: string,
	datetime_arrival: string,
	journey_status: ['' | 'SIGNIFICANT_DELAYS' | 'REDUCED_SERVICE' | 'NO_SERVICE' | 'MODIFIED_SERVICE' | 'ADDITIONAL_SERVICE' | 'UNKNOWN_EFFECT' | 'DETOUR' | 'OTHER_EFFECT'],
	duration: number,
	formatted_duration: string, 
	bbIsWatchingYou: [true | false]
}

export interface Journey extends JourneyHeader {
	stops_and_datetimes: Array<object>,
	disturbtions: Array<object>,
}

export interface Line {
	line_code: string,
	startStation: string,
	terminus: string,
	stops_and_datetimes: Array<object>,
	// ?duration: number, // où récupérer
}