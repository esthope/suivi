import axiosInstance from '../getInstance.js';

export const getPlaces = (selection) => {
	// &type[]=administrative_region
	return axiosInstance.get(`/places?q=${selection}`);
}