import axiosInstance from '../sgetInstance.js';

export function getRequest() {
	return axiosInstance.get('/lines')
}