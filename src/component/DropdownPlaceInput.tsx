import {useState, ReactElement, SetStateAction} from "react";
import {style} from 'constant/FormStyle';
import {Text} from "react-native";
import {VStack, Input, Pressable, FlatList} from 'native-base'
import {getPlaces} from 'service/station';
import {Place} from 'constant/interfaces';

const DropdownPlaceInput = ({ onSetStation, placeholder }: { onSetStation: Function, placeholder: string }): ReactElement => {
  const [station, setStation] = useState<string>(),
        [places, setPlaces] = useState<Place[]>(),
		[displayList, setDisplayList] = useState<boolean>(false);

  const searchPlacesForSel = async (value: string): Promise<void> => {
		try {
			setDisplayList(true);

			if (!value) {
				console.log('vide');
				onSetStation({});
				return;
			}

			getPlaces(value).then((res) => {
				const {data} = res,
					  	status = res.status;
		
				if (data?.places) {
					data.places.map((place: any) => {
						delete place.stop_area;
						delete place.quality;
					})
					setPlaces(data.places);
				}
			}).catch((err) => {
				console.log('PROMESSE', err?.code, err?.request?.responseURL ?? err?.message);
			})
		} catch(err) {
			console.log('TRY AGAIN B*TCH', err);
		}
  }

  const onChangeText = (value: string) => {
		setStation(value);
		searchPlacesForSel(value);
  }

  const selectPlace = (item: any) => {
		setStation(item.name);
		onSetStation(item);
		setDisplayList(false);
  }

  return (
    <VStack mb={5}>
	    <Input
	    	size='md'
        	style={style.input}
	        value={station}
          	onChangeText={(value)=>{onChangeText(value)}}
	        placeholder={placeholder}
	        // rightElement={(<Icon/>)}
	    />
	    {displayList && <FlatList
				data={places}
				renderItem={({placeItem}: any)=>{
					return(<Pressable 
						key={placeItem.id}
						onPress={()=>selectPlace(placeItem)}
						borderWidth=".5"
						borderColor="coolGray.300"
						p={1.5}
						bg="coolGray.100">
						<Text>{placeItem.name}</Text>
					</Pressable>)}}
			/>}
    </VStack>
)}

export default DropdownPlaceInput;