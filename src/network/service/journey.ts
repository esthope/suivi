import {AxiosResponse} from 'axios';
import axiosInstance from '../getInstance.js';

// interface Arrivals = {}
// interface Departures = {}

export function getJourneys(from: string, to: string, datetime?: string, maxFecth?: number, minFecth?: number): Promise<AxiosResponse<any, any>> {
	/* stop_point:SNCF:87313874:Train
		stop_point:SNCF:87286005:Train */
	datetime = datetime ?? '20240724T165000'
	return axiosInstance.get(`/journeys?from=${from}&to=${to}&datetime=${datetime}&min_nb_journeys=${minFecth}&max_nb_journeys=${maxFecth}`)
}

export function getPointDirections(stop_point: string, dir_type: string, datetime?: string):Promise<AxiosResponse<any, any>> {
	const direction = (dir_type == 'FROM') ? 'departures' : 'arrivals';
	datetime = datetime ?? '20240724T165000';

	return axiosInstance.get(`/stop_points/${stop_point}/${direction}?from_datetime=${datetime}`);
}

export function getAreaDirections(stop_area: string, dir_type: string, datetime?: string): Promise<AxiosResponse<any, any>> {
	const direction = (dir_type == 'FROM') ? 'departures' : 'arrivals';
	datetime = datetime ?? '20240724T165000';

	return axiosInstance.get(`/stop_areas/${stop_area}/${direction}?from_datetime=${datetime}`);
}