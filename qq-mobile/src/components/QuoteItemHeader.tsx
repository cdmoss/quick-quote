import React from "react"
import { View, Text, TouchableOpacityBase, TouchableOpacity } from "react-native"
import { QuoteItem } from "../stores/quoteStore"
import { IconButton } from "./IconButton"

interface QuoteItemHeaderProps {
    item: QuoteItem, 
    removeItem: (id: string) => void
    setDisplayedItem: () => void
}

export const QuoteItemHeader: React.FC<QuoteItemHeaderProps> = ({item, removeItem, setDisplayedItem}) => {
    return (
        <TouchableOpacity onPress={setDisplayedItem} style={[
                {flexDirection: 'row', padding: 15, marginHorizontal: 15, borderColor: 'lightgray', justifyContent: 'space-between', borderBottomWidth: 1},
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%'}}>
                <Text style={{flex: 1, fontSize: 11}}>{item.name}</Text>
                <Text style={{flex: 1, fontSize: 11}}>{item.type}</Text>
                <Text style={{flex: 1, fontSize: 11}}>{item.area} sqft.</Text>
                <Text style={{flex: 1, fontSize: 11}}>${(item.price).toFixed(2)}/sqft</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                {/* <IconButton icon="pencil" size={20} onPress={() => console.log('edit')} color='dodgerblue'/> */}
                <IconButton style={{marginLeft: 15}} icon="close" size={20} onPress={() => removeItem(item.id)} color='red'/>
            </View>
        </TouchableOpacity>
    )
}