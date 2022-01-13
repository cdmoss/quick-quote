import React from "react"
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native"

interface SimpleButtonProps {
    disabled?: boolean, 
    onPress: () => void, 
    text: string, 
    containerStyle?: ViewStyle,
    textStyle?: TextStyle
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({disabled, onPress, text, containerStyle, textStyle}) => {
    return (
        <TouchableOpacity 
            disabled={disabled} 
            style={[
                !containerStyle?.backgroundColor ? {backgroundColor: 'dodgerblue'} : null,
                containerStyle,
                disabled ? {opacity: 0.3} : null, 
                {alignItems: 'center', justifyContent: 'center', }
            ]} 
            onPress={onPress}>
            <Text style={[!textStyle?.color ? {color: 'white'} : null, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}