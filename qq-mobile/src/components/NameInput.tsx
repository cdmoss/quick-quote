import React, { useState } from "react"
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from "react-native"
import { quoteStore } from "../stores/quoteStore"

export const NameInput: React.FC<{name: string, setName: (name: string) => void}> = ({name, setName}) => {
    const [nameFocused, toggleNameFocused] = useState<boolean>()    

    const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setName(e.nativeEvent.text)
        toggleNameFocused(false)
    }

    return (
        <TextInput 
            onFocus={() => toggleNameFocused(true)} 
            onBlur={_onBlur} 
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
            onChangeText={(text) => setName(text)}/>
    )
}