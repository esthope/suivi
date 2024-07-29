import { useState, ReactElement } from "react";
import {style} from 'constant/FormStyle';
import {View, TextInput, Text} from "react-native";
import {VStack, Input, Pressable, FlatList, Icon} from 'native-base'
import {fetchPlaces} from 'service/station';

const DropdownInput = ({ onSetStation, placeholder }): ReactElement => {
  const [station, setStation] = useState({}),
        [places, setPlaces] = useState([]),
		[displayList, setDisplayList] = useState(false);

  const searchPlacesForSel = async (value): void => {
  	setDisplayList(true);
  	let fetchedPlaces = [];
    if (value) {
      	fetchedPlaces = await fetchPlaces(value)
    	setPlaces(fetchedPlaces);
    } else {
    	console.log('vide')
		onSetStation('')
    	setPlaces([]);
    }
  }

  const onChangeText = (value) => {
	setStation(value)
	searchPlacesForSel(value)
  }

  const selectStation = (item) => {
	setStation(item.name)
	onSetStation(item.id)
	setDisplayList(false)
  }

  return (
    <VStack mb={5}>
	    <Input
	    	size="md"
        	style={style.input}
	        value={station}
          	onChangeText={(value)=>{onChangeText(value)}}
	        placeholder={placeholder}
	        // rightElement={(<Icon/>)}
	    />
	    {displayList &&
		<FlatList
			data={places}
			renderItem={({index, item})=>{
				return(
					<Pressable 
						key={item.id}
						onPress={()=>selectStation(item)}
						borderWidth=".5"
						borderColor="coolGray.300"
						p={1.5}
						bg="coolGray.100">
						<Text>{item.name}</Text>
					</Pressable>
				)
			}}
		/>}
    </VStack>
)};

export default DropdownInput;