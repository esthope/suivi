import axiosInstance from '../network/getInstance.js';

export function getRequest() {
	return axiosInstance.get('/lines')
}