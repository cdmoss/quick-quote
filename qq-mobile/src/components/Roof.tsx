import { parse } from "date-fns"
import React, { useEffect, useState } from "react"
import { View, Image, Text } from "react-native"
import { QuoteFormProps } from "../screens/QuoteBuilder"
import { InputRow } from "./RowFields"

const roofPic = require('../../assets/roof.png')

export const Roof: React.FC<QuoteFormProps> = ({clearItemSignal, sendClearItemSignal, setAnswer, setDimensions}) => {
    const [length, setLength] = useState<string>()
    const [width, setWidth] = useState<string>()
    const [pitch, setPitch] = useState<string>()
    const [pitchValid, setPitchValid] = useState<boolean>(false)

    useEffect(() => {
        calculateArea()
    }, [length, width, pitch])

    useEffect(() => {
        if (pitch) {
            if (pitch.includes(':')) {
                setPitchValid(!pitch.split(':').some(n => n == ''))
            }
            else if (pitch.includes('/')) {
                setPitchValid(!pitch.split('/').some(n => n == ''))
            }
            else {
                setPitchValid(!isNaN(Number(pitch)))
            }
        }
        else {
            setPitchValid(true)
        }
    }, [pitch])
    
    useEffect(() => {
        if (clearItemSignal) {
            if (width) setWidth('')
            if (length) setLength('')
            if (pitch) setPitch('')
            sendClearItemSignal(false)
        }
    }, [clearItemSignal])

    const calculateArea = () => {
        if (length && width && pitch) {
            const parsedPitch = parsePitch()
            console.log(parsedPitch)
            if (parsedPitch) {
                const halfWidth = parseFloat(width) / 2
                const roofHeight = halfWidth * parsedPitch
                const inclineLength = Math.sqrt(roofHeight^2 + halfWidth^2)
                const area = (inclineLength * Number(length)).toFixed(2)
                setAnswer(area)
                setDimensions({length: length, width: width, pitch: pitch})
            }
            else {
                setAnswer(undefined)
            }
        }
        else setAnswer(undefined)
    }

    const parsePitch = () => {
        let splitPitch: string[] = []
        if (pitch?.includes(':')) {
            splitPitch = pitch.split(':')
        }
        else if (pitch?.includes('/')) {
            splitPitch = pitch.split('/')
        }

        const [rise, run] = splitPitch?.map(n => Number(n))
        if (rise != NaN && run != NaN) {
            console.log(rise)
            console.log(run)
            return rise/run
        }
        else {
            return null
        }
    }

    return (
        <View style={{alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
            <InputRow label='length' onChangeText={text => setLength(text)} value={length} />
            <InputRow label='width' onChangeText={text => setWidth(text)} value={width} />
            <InputRow keyboardType={'numbers-and-punctuation'} label={'pitch'} onChangeText={text => setPitch(text)} value={pitch} />
            {!pitchValid ? <Text style={{marginBottom:10}}>Pitch must be in the form "rise : run" or "rise / run"</Text> : null}
            <Image source={roofPic} style={{resizeMode: 'contain', width: 300, height: 250}} />
        </View>
    )
}