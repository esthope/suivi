import {getPlaces} from 'service/station';

interface Place {
	embedded_type: string,
	id: string,
	name: string
}

export const fetchPlaces = (selection: string): Array<Place> => {
	return getPlaces(selection)
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