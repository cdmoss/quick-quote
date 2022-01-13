import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { IconButton } from "./IconButton"

export const Header: React.FC<BottomTabHeaderProps> = () => {
    return (
        <SafeAreaView style={{flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: 1}}>
            <IconButton icon='file' color='black' onPress={() => console.log('quote')} size={20} />
        </SafeAreaView>
    )
}