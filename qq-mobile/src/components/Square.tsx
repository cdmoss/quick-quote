import React, { useEffect, useState } from "react"
import { View, Image } from "react-native"
import { QuoteFormProps } from "../screens/QuoteBuilder"
import { InputRow } from "./RowFields"

const squarePic = require('../../assets/square.png')

export const Square: React.FC<QuoteFormProps> = ({clearItemSignal, sendClearItemSignal, setAnswer, setDimensions}) => {
    const [square, setLength] = useState<string>()

    useEffect(() => {
        calculateArea()
    }, [square])

    useEffect(() => {
        if (clearItemSignal) {
            if (square) setLength('')

            sendClearItemSignal(false)
        }
    }, [clearItemSignal])

    const calculateArea = () => {
        if (square) {
            setAnswer((Math.PI * parseInt(square) / 2).toFixed(2).toString())
            setDimensions({width: square})
        }
        else setAnswer(undefined)
    }

    return (
        <View style={{alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
            <InputRow label='length' onChangeText={text => setLength(text)} value={square} />
            <Image source={squarePic} style={{width: 250, height: 250}} />
        </View>
    )
}