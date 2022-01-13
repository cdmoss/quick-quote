import { FontAwesome } from "expo-vector-icons"
import React from "react"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"

interface ButtonProps {
    onPress: () => void,
    style?: StyleProp<ViewStyle>
}

interface IconButtonProps extends ButtonProps {
    icon: string,
    color: string,
    size: number
}

export const IconButton: React.FC<IconButtonProps> = ({onPress, style, size, color, icon}) => {
    return(
        <TouchableOpacity style={[style, {justifyContent: 'center', alignItems: 'center'}]} onPress={onPress}>
            <FontAwesome size={size} color={color} name={icon as any}/>
        </TouchableOpacity>
    )
}