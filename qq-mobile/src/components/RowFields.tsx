import React, { useState } from "react"
import { View, Text, TextInput, ViewStyle, KeyboardTypeOptions } from "react-native"

export const InputRow: React.FC<{keyboardType?: KeyboardTypeOptions, label: string, onChangeText: ((text: string) => void), value?: string, containerStyle?: ViewStyle, onFocus?: () => void, onBlur?: () => void}> = ({onChangeText, label, value, containerStyle, keyboardType, onFocus, onBlur}) => {
    const [focused, toggleFocused] = useState<boolean>()

    return (
        <View style={[containerStyle,{ flexDirection: 'row', marginBottom: 10, width: '70%', justifyContent: 'space-evenly', height: 25}]}>
            <Text style={{flex: 1, alignSelf: 'center', fontSize: 12}}>{label}:     </Text>
            <TextInput
                returnKeyType="done" 
                onFocus={() => toggleFocused(true)} 
                onBlur={() => toggleFocused(false)} 
                keyboardType={keyboardType ? keyboardType : 'decimal-pad'}
                value={value} 
                onChangeText={onChangeText} 
                style={[
                    {flex: 1, borderWidth: 1, textAlign: 'center', padding: 3},
                    focused ? {borderColor: 'dodgerblue'} : {borderColor: 'lightgray'}
                ]}/>
        </View>
    )
}

export const OutputRow: React.FC<{label: string, value?: string, style?: ViewStyle}> = ({label, value, style}) => {
    return (
        <View style={[style, {flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}]}>
            <Text>{label}:   {value}</Text>
        </View>
    )
}