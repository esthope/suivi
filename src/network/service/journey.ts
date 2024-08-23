import {AxiosResponse} from 'axios';
import axiosInstance from '../getInstance.js';

// interface Arrivals = {}
// interface Departures = {}

export function getJourneys(from: string, to: string, datetime?: string, maxFecth?: number, minFecth?: number): Promise<AxiosResponse<any, any>> {
	/* stop_point:SNCF:87313874:Train
		stop_point:SNCF:87286005:Train */

	let freshness = 'base_schedule'; // [!] test pour voir les trajets etc. "service supprimé"
	let avoidMode = ''; //'physical_mode:RapidTransit';
	datetime = datetime ?? '20240724T165000'

	return axiosInstance.get(`/journeys?from=${from}&to=${to}&datetime=${datetime}&min_nb_journeys=${minFecth}&max_nb_journeys=${maxFecth}&data_freshness=${freshness}&forbidden_uris[]=${avoidMode}`)
}

// [!] vérifier pour l'entité
export function getDirections(stopID: string, dir_type: string, datetime?: string):Promise<AxiosResponse<any, any>> {
	const direction = (dir_type == 'FROM') ? 'departures' : 'arrivals',
		  entity = (stopID.includes('point')) ? 'stop_points' : 'stop_area';
	datetime = datetime ?? '20240724T165000';
	return axiosInstance.get(`/${entity}/${stopID}/${direction}?from_datetime=${datetime}`);
}