import axiosInstance from '../getInstance.js';
import {Place} from 'constant/interface';

export const getPlaces = (selection: string): Array<Place> => {
	// &type[]=administrative_region
	return axiosInstance.get(`/places?q=${selection}`)
	.then((res) => {
    
	    const {data} = res,
	          status = res.status;

	    let result = [];
        if (data?.places) 
        {
			data.places.map((place)=>{
				delete place.stop_area;
				delete place.quality;
			})

			result = data.places
        }

		// console.log('result : ', result)
		return result;
  	})
  	.catch((err) => {
  		console.log('noooon ', err?.code, err?.request?.responseURL ?? err?.message)
  	})
}