import {axiosInstance} from '../getInstance.js';

export function getRequest() {
	return axiosInstance.get('/lines')
}