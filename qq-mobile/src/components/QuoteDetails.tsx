import { useNavigation } from "@react-navigation/core"
import React, { LegacyRef, useRef, useState } from "react"
import { ScrollView, Text, View, TextInput, Dimensions } from "react-native"
import Toast, { ToastContainer } from "react-native-root-toast"
import uuid from 'react-native-uuid'
import { MainTabsNavigationProp } from "../navigation/MainTabs"
import QuoteBuilder from "../screens/QuoteBuilder"
import { Quote, quoteStore } from "../stores/quoteStore"
import { IconButton } from "./IconButton"
import { InputRow, OutputRow } from "./RowFields"
import { SimpleButton } from "./SimpleButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { format } from "date-fns"
import { getTotalArea, getTotalPrice } from "../utils/helpers"
import { NameInput } from "./NameInput"
import { observer } from "mobx-react"
import { QuoteItemHeader } from "./QuoteItemHeader"
import Collapsible from "react-native-collapsible"

const QuoteDetails: React.FC<{toggleDrawer: (state: boolean) => void}> = ({toggleDrawer}) => {
    const [name, setName] = useState<string>(quoteStore.quote.name)
    const [nameFocused, toggleNameFocused] = useState<boolean>()
    const [displayedItem, setDisplayedItem] = useState<number>(-1)

    const navigation = useNavigation<MainTabsNavigationProp>()

    const nameRef = useRef<TextInput>()

    const goToQuoteBuilder = () => {
        navigation.navigate('Quote')
        toggleDrawer(false)
    }

    const saveQuote = async (forceCreate: boolean) => {
        toggleDrawer(false)
        if (name) {
            if (quoteStore.quote.id && !forceCreate) {
                const existingQuoteString = await AsyncStorage.getItem(quoteStore.quote.id)
                const existingQuote = existingQuoteString ? JSON.parse(existingQuoteString) as Quote : undefined
                if (existingQuote) {
                    await AsyncStorage.removeItem(quoteStore.quote.id)
                    await AsyncStorage.setItem(quoteStore.quote.id, JSON.stringify({...existingQuote, name: name, items: quoteStore.quote.items}))
                }
            }
            else {
                const id = uuid.v4().toString()
                await AsyncStorage.setItem(id, JSON.stringify({...quoteStore.quote, id: id, name: name, dateAdded: new Date()}))
            }

            quoteStore.setUpdate(true)
            Toast.show('Quote saved', {position: Toast.positions.TOP, onPress: () => navigation.navigate('History')})
            quoteStore.resetQuote()
        }
    }

    const removeItem = (itemId: string) => {
        quoteStore.setQuote({...quoteStore.quote, items: quoteStore.quote.items.filter(i => i.id != itemId)})
        if (quoteStore.quote.items.length === 0) {
            quoteStore.resetQuote();
        }
    }

    const nameIsNull = () => {
        if (name) {
            return false
        }
        return true
    }

    const toggleItem = (index: number) => {
        console.log(quoteStore.quote.items[index].dimensions)
        if (index == displayedItem) {
            setDisplayedItem(-1)
        }
        else {
            setDisplayedItem(index)
        }
    }

    return (
        <View style={{marginHorizontal: 20, marginTop: 20, justifyContent: 'flex-start', flex: 1}}>
            {quoteStore.quote.items.length == 0 ? 
            <View style={{justifyContent: 'space-evenly'}}>
                <Text style={{alignSelf: 'center', marginBottom: 20}}>No items</Text>
                <SimpleButton 
                    onPress={goToQuoteBuilder} 
                    text="Add item" 
                    containerStyle={{backgroundColor: 'lightgray', height: 60, borderRadius: 5,}} 
                    textStyle={{color: 'black'}} />
            </View> :
            <>
                <ScrollView style={{borderWidth: 1, borderColor: 'lightgray', marginBottom: 5}}>
                    {quoteStore.quote.items.map((item, index) => {
                        return (
                            <View style={{borderBottomWidth: displayedItem === index ? 1 : 0, borderColor:  'lightgray'}} key={index}>
                                <QuoteItemHeader setDisplayedItem={() => toggleItem(index)} removeItem={removeItem} item={item} />
                                <Collapsible collapsed={displayedItem !== index}>
                                    
                                    <View style={{marginHorizontal: 15, marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                    {Object.keys(item.dimensions).map((dim, index) => {
                                    return (
                                            <Text>{dim}: {item.dimensions[dim]}{index !== Object.keys(item.dimensions).length - 1 ? ',' : null}</Text>
                                    )})}
                                    </View>
                                </Collapsible>
                            </View>
                        )
                    })} 
                </ScrollView> 
                {/* <TextInput 
                    onFocus={() => toggleNameFocused(true)} 
                    onBlur={() => toggleNameFocused(false)} 
                    style={[{
                        flex: 1, 
                        maxHeight: 40, 
                        paddingLeft: 10,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        color: 'black' },
                        nameFocused ? {borderColor: 'dodgerblue', color: 'dodgerblue'} : {borderColor: 'gray'}]}
                    placeholder="Enter quote name..." 
                    placeholderTextColor={nameFocused ? 'dodgerblue' : 'gray'}
                    returnKeyType="done" 
                    value={name} 
                    onChangeText={(text) => setName(text)}/> */}
                    <NameInput name={name} setName={setName} />
                <View style={{justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 20, borderBottomWidth: 1, borderColor: 'lightgray'}}>
                    <OutputRow style={{marginBottom: 10}} label="Number of items" value={quoteStore.quote.items.length.toString()} />
                    <OutputRow style={{marginBottom: 10}} label="Total SQFT" value={getTotalArea(quoteStore.quote.items)} />
                    <OutputRow style={{marginBottom: 10}} label="Total price" value={`\$${getTotalPrice(quoteStore.quote.items)?.toFixed(2)}`} />
                </View>
                <View style={{justifyContent: 'space-between', marginBottom: 10}}>
                    <SimpleButton containerStyle={{width: '100%', height: 30, borderRadius: 5, backgroundColor: 'gray', marginBottom: 10}} text={quoteStore.quote.id ? 'Cancel edit' : 'Clear items'} onPress={() => {toggleDrawer(false); quoteStore.resetQuote()}} />
                    {quoteStore.quote.id? 
                    <SimpleButton disabled={nameIsNull()} containerStyle={{width: '100%', height: 30, borderRadius: 5, marginBottom: 10}} text="Overwrite quote" onPress={() => saveQuote(false)} />: null}
                    <SimpleButton disabled={nameIsNull()} containerStyle={{width: '100%', height: 30, borderRadius: 5, marginBottom: 10, backgroundColor: 'limegreen'}} text="Save as new quote" onPress={() => saveQuote(true)} />
                </View>
            </> }
        </View>
    )
}

export default observer(QuoteDetails)