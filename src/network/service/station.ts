import {AxiosResponse} from 'axios';
import axiosInstance from '../getInstance.js';

export function getPlaces (selection: string): Promise<AxiosResponse<any, any>> {
	// &type[]=administrative_region
	return axiosInstance.get(`/places?q=${selection}`)
}