import {AxiosResponse} from 'axios';
import axiosInstance from '../getInstance.js';

export const getPlaces = (selection: string): Promise<AxiosResponse<any, any>> => {
	// &type[]=administrative_region
	return axiosInstance.get(`/places?q=${selection}`);
}