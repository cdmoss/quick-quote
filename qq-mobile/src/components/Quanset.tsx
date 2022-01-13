import { useStaticRendering } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { View, Image } from "react-native"
import { QuoteFormProps } from "../screens/QuoteBuilder"
import { InputRow } from "./RowFields"

const quansetPic = require('../../assets/quanset-basic.png')

export const Quanset: React.FC<QuoteFormProps> = ({clearItemSignal, sendClearItemSignal, setAnswer, focusedInput, setFocusedInput, setDimensions}) => {
    const [width, setWidth] = useState<string>()
    const [height, setHeight] = useState<string>()
    const [length, setLength] = useState<string>()
    const [exact, setExact] = useState<boolean>()
    const [corregation, setCorregation] = useState<string>('1')

    useEffect(() => {
        calculateArea()
    }, [width, length, corregation])

    useEffect(() => {
        if (clearItemSignal) {
            if (width) setWidth('')
            if (length) setLength('')
            if (height) setHeight('')
            if (exact) setExact(false)
            if (parseFloat(corregation) > 1) setCorregation('1')

            sendClearItemSignal(false)
        }
    }, [clearItemSignal])

    const calculateArea = () => {
        if (width && length && corregation) {
            const sidewalls = Math.PI * parseFloat(width) / 2   
            const roof = Math.PI * parseFloat(width) / 2 * parseFloat(length)

            setAnswer(((sidewalls + roof) * parseFloat(corregation)).toFixed(2).toString())
            setDimensions({width: width, length: length, corregation: corregation})
        }
        else setAnswer(undefined)
    }

    return (
        <View style={{alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
            <InputRow label='width' onChangeText={text => setWidth(text)} value={width} />
            {exact ? <InputRow label='height' onChangeText={text => setHeight(text)} value={width} /> : null}
            <InputRow label='length' onChangeText={text => setLength(text)} value={length} />
            <InputRow 
                label='corregation' 
                onBlur={() => {
                    if (!corregation) {
                        setCorregation('1')   
                    }
                }}
                onChangeText={text => {
                    if (parseInt(text) != 0) {
                        setCorregation(text)   
                    }
                    else {
                        setCorregation('1')   
                    }
                }} 
                value={corregation} />
                <Image source={quansetPic} style={{width: 350, height: 175}} />
        </View>
    )
}