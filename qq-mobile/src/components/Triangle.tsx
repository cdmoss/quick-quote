import React, { useEffect, useState } from "react"
import { View, Image } from "react-native"
import { QuoteFormProps } from "../screens/QuoteBuilder"
import { InputRow } from "./RowFields"

const trianglePic = require('../../assets/triangle.png')

export const Triangle: React.FC<QuoteFormProps> = ({clearItemSignal, sendClearItemSignal, setAnswer, setDimensions}) => {
    const [height, setHeight] = useState<string>()
    const [base, setBase] = useState<string>()

    useEffect(() => {
        calculateArea()
    }, [height, base])

    useEffect(() => {
        if (clearItemSignal) {
            if (base) setBase('')
            if (height) setHeight('')

            sendClearItemSignal(false)
        }
    }, [clearItemSignal])

    const calculateArea = () => {
        if (height && base) {
            setAnswer((parseInt(base) * parseInt(height) / 2).toFixed(2).toString())
            setDimensions({height: height, base: base})
        }
        else setAnswer(undefined)
    }

    return (
        <View style={{alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
            <InputRow label='height' onChangeText={text => setHeight(text)} value={height} />
            <InputRow label='base' onChangeText={text => setBase(text)} value={base} />
            <Image source={trianglePic} style={{width: 250, height: 250}} />
        </View>
    )
}