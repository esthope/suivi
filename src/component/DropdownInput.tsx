import { useState, ReactElement, SetStateAction } from "react";
import {style} from 'constant/FormStyle';
import {Text} from "react-native";
import {VStack, Input, Pressable, FlatList} from 'native-base'
import {getPlaces} from 'service/station';
import {Place} from 'constant/interfaces';

const DropdownInput = ({ onSetStation, placeholder }: { onSetStation:Function, placeholder:string }): ReactElement => {
  const [station, setStation] = useState<string>(),
        [places, setPlaces] = useState<Place>(),
		[displayList, setDisplayList] = useState<boolean>(false);

  const searchPlacesForSel = async (value:string): void => {
		try
		{
			setDisplayList(true);
			if (value) {
				getPlaces(value)
				.then((res) => {
					const {data} = res,
						  status = res.status;
			
					if (data?.places) 
					{
						data.places.map((place:any)=>{
							delete place.stop_area;
							delete place.quality;
						})
						setPlaces(data.places);
					}
				})
				.catch((err) => {
					console.log('noooon ', err?.code, err?.request?.responseURL ?? err?.message)
				})
			} else {
				console.log('vide')
				onSetStation('')
			}
		}
		catch(err)
		{
			console.log(err)
		}
  }

  const onChangeText = (value:string) => {
	setStation(value)
	searchPlacesForSel(value)
  }

  const selectStation = (item:any) => {
	setStation(item.name)
	onSetStation(item.id)
	setDisplayList(false)
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
	    {displayList &&
		<FlatList
			data={places}
			renderItem={({item}:any)=>{
				return(<Pressable 
					key={item.id}
					onPress={()=>selectStation(item)}
					borderWidth=".5"
					borderColor="coolGray.300"
					p={1.5}
					bg="coolGray.100">
					<Text>{item.name}</Text>
				</Pressable>)}}
		/>}
    </VStack>
)}

export default DropdownInput;