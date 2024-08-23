import {useState, ReactElement, SetStateAction} from "react";
import {style} from 'constant/FormStyle';
import {Text} from "react-native";
import {VStack, Input, Pressable, FlatList} from 'native-base'
import {getPlaces} from 'service/station';
import {Place} from 'constant/interfaces';

const DropdownPlaceInput = ({ onSetChoice, placeholder }: { onSetChoice: Function, placeholder: string }): ReactElement => {
  const [station, setStation] = useState<string>(''),
        [places, setPlaces] = useState<Place[]>([]),
				[displayList, setDisplayList] = useState<boolean>(false);

  const searchPlacesForSel = async (value: string): Promise<void> => {
		try {
			if (!value) {
				console.log('vide');
				onSetChoice('');
				return;
			}

			getPlaces(value).then((res) => {
				const {data} = res,
					  	status = res.status;
		
				let result = data?.places ?? [];
				setPlaces(result);
				setDisplayList(true);

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
		onSetChoice(item.id);
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
				renderItem={({item}: any)=>{
					return(<Pressable 
						key={item.id}
						onPress={()=>selectPlace(item)}
						borderWidth=".5"
						borderColor="coolGray.300"
						p={1.5}
						bg="coolGray.100">
						<Text>{item.name}</Text>
					</Pressable>)}}
			/>}
    </VStack>
)}

export default DropdownPlaceInput;