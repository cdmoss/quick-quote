import React, { useEffect, useState } from "react"
import { View, Image } from "react-native"
import { QuoteFormProps } from "../screens/QuoteBuilder"
import { InputRow } from "./RowFields"

const circlePic = require('../../assets/circle.png')

export const Circle: React.FC<QuoteFormProps> = ({clearItemSignal, sendClearItemSignal, setAnswer, setDimensions}) => {
    const [diameter, setDiameter] = useState<string>()

    useEffect(() => {
        calculateArea()
    }, [diameter])

    useEffect(() => {
        if (clearItemSignal) {
            if (diameter) setDiameter('')

            sendClearItemSignal(false)
        }
    }, [clearItemSignal])

    const calculateArea = () => {
        if (diameter) {
            setAnswer((Math.PI * parseInt(diameter) / 2).toFixed(2).toString())
            setDimensions({diameter: diameter})
        }
        else setAnswer(undefined)
    }

    return (
        <View style={{alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
            <InputRow label='diameter' onChangeText={text => setDiameter(text)} value={diameter} />
            <Image source={circlePic} style={{width: 250, height: 250}} />
        </View>
    )
}