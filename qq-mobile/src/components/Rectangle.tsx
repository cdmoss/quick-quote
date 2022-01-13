import React, { useEffect, useState } from "react"
import { View, Image } from "react-native"
import { QuoteFormProps } from "../screens/QuoteBuilder"
import { InputRow } from "./RowFields"

const rectPic = require('../../assets/rect.png')

export const Rectangle: React.FC<QuoteFormProps> = ({clearItemSignal, sendClearItemSignal, setAnswer, setDimensions}) => {
    const [length, setLength] = useState<string>()
    const [width, setWidth] = useState<string>()

    useEffect(() => {
        calculateArea()
    }, [length, width])
    
    useEffect(() => {
        if (clearItemSignal) {
            if (width) setWidth('')
            if (length) setLength('')
            sendClearItemSignal(false)
        }
    }, [clearItemSignal])

    const calculateArea = () => {
        if (length && width) {
            setAnswer((parseInt(width) * parseInt(length)).toFixed(2).toString())
            setDimensions({length: length, width: width})
        }
        else setAnswer(undefined)
    }

    return (
        <View style={{alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
            <InputRow label='length' onChangeText={text => setLength(text)} value={length} />
            <InputRow label='width' onChangeText={text => setWidth(text)} value={width} />
            <Image source={rectPic} style={{width: 300, height: 225}} />
        </View>
    )
}