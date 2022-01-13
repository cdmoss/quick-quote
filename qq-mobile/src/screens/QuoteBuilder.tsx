import { FontAwesome } from "expo-vector-icons";
import React, { useEffect, useState } from "react";
import { Keyboard, Platform, Text, View } from "react-native";
import Picker from "react-native-picker-select";
import { Circle } from "../components/Circle";
import { Square } from "../components/Square";
import { Quanset } from "../components/Quanset";
import { InputRow, OutputRow } from "../components/RowFields";
import { SimpleButton } from "../components/SimpleButton";
import { Rectangle } from "../components/Rectangle";
import { Triangle } from "../components/Triangle";
import { IconButton } from "../components/IconButton";
import { DimensionList, quoteStore } from "../stores/quoteStore";
import uuid from 'react-native-uuid';
import Toast from "react-native-root-toast";
import { NameInput } from "../components/NameInput";
import { observer } from "mobx-react-lite";
import { Roof } from "../components/Roof";

export interface QuoteFormProps {
    answer?: string,
    setAnswer: (text?: string) => void
    setDimensions: (dimensions?: DimensionList) => void
    focusedInput?: string,
    setFocusedInput: (type?: string) => void
    clearItemSignal: boolean,
    sendClearItemSignal: (state:boolean) => void
}

export type Shape = "Quanset" | "Square" | "Circle" | "Rectangle" | "Triangle" | 'Roof Panel'

const QuoteBuilder: React.FC<{toggleDrawer: (state: boolean) => void}> = ({toggleDrawer}) => {
    const [selectedShape, setShape] = useState<Shape>('Quanset')
    const shapes = ["Quanset", "Square" , "Circle" , "Rectangle" , "Triangle", 'Roof Panel']
    const [keyboardShown, setKeyboard] = useState<boolean>()
    const [answer, setAnswer] = useState<string>()
    const [dimensions, setDimensions] =  useState<DimensionList>()
    const [price, setPrice] = useState<string>()
    const [focusedInput, setFocusedInput] = useState<string>()
    const [name, setName] = useState<string>('New item')
    const [clearItemSignal, sendClearItemSignal] = useState<boolean>(false)

    useEffect(() => {
        Keyboard.addListener('keyboardWillShow', () => {
            setKeyboard(true)
        })
        Keyboard.addListener('keyboardWillHide', () => {
            setKeyboard(false)
        })
    }, [])

    const renderForm = () => {
        switch (selectedShape) {
            case 'Quanset':    
                return (<Quanset setDimensions={setDimensions} sendClearItemSignal={sendClearItemSignal} clearItemSignal={clearItemSignal} setAnswer={setAnswer} setFocusedInput={setFocusedInput} focusedInput={focusedInput} />)
            case 'Circle':
                return (<Circle setDimensions={setDimensions} sendClearItemSignal={sendClearItemSignal} clearItemSignal={clearItemSignal} setAnswer={setAnswer} setFocusedInput={setFocusedInput} focusedInput={focusedInput} />)
            case 'Square':
                return (<Square setDimensions={setDimensions} sendClearItemSignal={sendClearItemSignal} clearItemSignal={clearItemSignal} setAnswer={setAnswer} setFocusedInput={setFocusedInput} focusedInput={focusedInput} />)
            case 'Rectangle':
                return (<Rectangle setDimensions={setDimensions} sendClearItemSignal={sendClearItemSignal} clearItemSignal={clearItemSignal} setAnswer={setAnswer} setFocusedInput={setFocusedInput} focusedInput={focusedInput} />)
            case 'Triangle':
                return (<Triangle setDimensions={setDimensions} sendClearItemSignal={sendClearItemSignal} clearItemSignal={clearItemSignal} setAnswer={setAnswer} setFocusedInput={setFocusedInput} focusedInput={focusedInput} />)
            case 'Roof Panel':
                return (<Roof setDimensions={setDimensions} sendClearItemSignal={sendClearItemSignal} clearItemSignal={clearItemSignal} setAnswer={setAnswer} setFocusedInput={setFocusedInput} focusedInput={focusedInput} />)
            default:
                break;
        }
    }

    const addToQuote = () => {
        if (answer && price && name && dimensions) {
            quoteStore.setQuote({
                ...quoteStore.quote, 
                items: [...quoteStore.quote.items, {
                    name: name, 
                    id: uuid.v4().toString(), 
                    price: parseFloat(price), 
                    area: parseFloat(answer), 
                    type: selectedShape, 
                    dimensions: dimensions
                }] 
            })
            
            console.log(quoteStore.quote.items.length)

            sendClearItemSignal(true)
            setPrice('')
            setName('New item')
        }

        Toast.show('Item added to quote', {position: 100, onPress: () => toggleDrawer(true), })
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white'}}>
            <View style={{flex: 9, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'space-evenly', width: '100%'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 20, marginBottom: 20}}>
                    {answer ? <OutputRow label='Total SQFT' value={answer} /> : <Text>Fill in all the fields</Text> }
                    {answer && price ? <OutputRow label="Total price" value={`\$${(parseFloat(answer) * parseFloat(price)).toFixed(2)}`} /> : null}
                </View>
                <View style={{alignItems: 'center'}}>
                    <InputRow keyboardType="default" label="Item name" value={name} onChangeText={(text) => setName(text)} />
                    <InputRow label="price/sqft" value={price} onChangeText={(text) => setPrice(text)} />
                    {renderForm()}
                </View>
                <SimpleButton disabled={!answer || !price} text="Add to quote" onPress={addToQuote} containerStyle={{backgroundColor: 'dodgerblue', height: 50, padding: 15, margin: 10, borderRadius: 5, width: '100%'}} />
            </View>
            <Picker
                style={{
                    viewContainer: {backgroundColor: 'black', flex: 1, justifyContent: 'center', paddingHorizontal: 20, marginTop: 20}, 
                    iconContainer: Platform.OS === 'android' ? {marginRight: 20} : {marginRight: 0},
                    placeholder: {color: 'white',  textAlignVertical: 'center'},
                    inputIOS: {color: 'white'},
                    inputAndroid: {color: 'white'}
                }}
                placeholder={{}}
                Icon={() => <FontAwesome name="chevron-up" color='white' size={20} />}
                value={selectedShape}
                useNativeAndroidPickerStyle={true}
                items={shapes.map(structure => {return {key: structure, label: structure, value: structure}})}
                onValueChange={value => setShape(value)} />
        </View>
    )
}

export default observer(QuoteBuilder)
