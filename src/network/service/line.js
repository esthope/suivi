import axiosInstance from '../sgetInstance.js';

export function getRequest() {
	return axiosInstance.get('/lines')
	.then((res)=>{console.log(res)})
	.catch((err)=>{console.log(err)})
}