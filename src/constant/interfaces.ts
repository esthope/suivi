export interface Place {
	embedded_type: string,
	id: string,
	name: string
}

export interface BigBrother {
	id: string,
	linked_id: string,
	type: "ONE" | "DAYS" | "STALK",
	seleted_from: string,
	seleted_to: string,
	line_code: string,
	datetime: Date,
	alert_days: ['MON' | 'TUE' | 'WEN' | 'THU' | 'FRI' | 'SAT' | 'SUN'],
	expire: Date, // .datetime + 30min
	alert_types: ['RING' | 'VIBR' | 'DISRUPTION_ONLY'],
	disruption_onlye: true | false
}

export interface Journey {
	id: string,
	seleted_from: string,
	seleted_to: string,
	line_code: string,
	datetime_departure: string,
	datetime_arrival: string,
	journey_status: ['' | 'SIGNIFICANT_DELAYS' | 'REDUCED_SERVICE' | 'NO_SERVICE' | 'MODIFIED_SERVICE' | 'ADDITIONAL_SERVICE' | 'UNKNOWN_EFFECT' | 'DETOUR' | 'OTHER_EFFECT'],
	stops_and_datetimes: Array<object>,
	disturbtions: Array<object>,
	duration: number,
	formatted_duration: string, 
	brotherIsWatching: [true | false]
}