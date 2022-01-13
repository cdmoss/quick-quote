import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/core";
import { FontAwesome } from "expo-vector-icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import { Badge, TouchableRipple } from "react-native-paper";
import QuoteDetails from "../components/QuoteDetails";
import History from "../screens/History";
import QuoteBuilder from "../screens/QuoteBuilder";
import { quoteStore } from "../stores/quoteStore";

type MainTabsParamsList = {
    Quote: undefined,
    History: undefined,
}

const MainTabsNavigator = createBottomTabNavigator<MainTabsParamsList>();

export type MainTabsNavigationProp = NavigationProp<MainTabsParamsList>;

const MainTabs: React.FC = () => {
    const [drawerOpen, toggleDrawer] = useState<boolean>()
    const [quoteLength, setQuoteLength] = useState<number>(0)

    useEffect(() => {
        setQuoteLength(quoteStore.quote.items.length)
    }, [quoteStore.quote.items])

    return (
        <View style={{flex: 1}}>
            <Modal 
                propagateSwipe={true}
                isVisible={drawerOpen} 
                animationIn="slideInUp"
                animationOut="slideOutDown"
                useNativeDriver={true}
                useNativeDriverForBackdrop={true}
                onBackdropPress={() => toggleDrawer(false)}
                style={{alignSelf: 'flex-end', alignItems: 'flex-end', height: '100%', width: "100%", margin: 0}}>
                <View style={{backgroundColor: 'white', alignSelf: 'flex-end', height: Dimensions.get('window').height - 50, width: '100%'}}>
                    <TouchableRipple style={{flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#ededed'}} onPress={() => toggleDrawer(false)}>
                        <><Text style={{fontWeight: 'bold', fontSize: 16}}>Current quote</Text>
                        <FontAwesome name='chevron-down' color='black' size={20} style={{}}/></>
                    </TouchableRipple>
                    <QuoteDetails toggleDrawer={toggleDrawer}/>
                </View>
            </Modal>
            <MainTabsNavigator.Navigator 
            initialRouteName='Quote'
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarActiveBackgroundColor: 'white',
                tabBarInactiveBackgroundColor: 'white',
                headerRightContainerStyle: {paddingRight: 20},
                headerBackgroundContainerStyle: {justifyContent: 'center', alignItems: 'center'},
                headerRight: () => (
                    <TouchableOpacity onPress={() => {toggleDrawer(true); console.log('test')}}>
                        <FontAwesome name="file" color='black' size={20}/>
                        <Badge size={15} style={{marginTop: -8, marginRight: -5}} visible={quoteLength > 0} >{quoteLength}</Badge>
                    </TouchableOpacity>
                ) 
            }}>
                <MainTabsNavigator.Screen 
                    name="Quote" 
                    options={{
                        tabBarLabel: 'Build quote', 
                        headerTitle: 'Build quote', 
                        tabBarLabelStyle: {marginBottom:5}, 
                        tabBarIconStyle: {marginTop: 3}, 
                        tabBarStyle: {height: 60}, 
                        tabBarIcon: ({color}) => (<FontAwesome name="quote-right" size={17} color={color}/>)}} >
                    {() => <QuoteBuilder toggleDrawer={toggleDrawer} />}
                </MainTabsNavigator.Screen>
                <MainTabsNavigator.Screen name="History" options={{tabBarLabelStyle: {marginBottom:5}, tabBarIconStyle: {marginTop: 3}, tabBarStyle: {height: 60}, tabBarIcon: ({color}) => (<FontAwesome name="book" size={17} color={color}/>)}}>
                    {() => <History toggleDrawer={toggleDrawer} />}
                </MainTabsNavigator.Screen>
            </MainTabsNavigator.Navigator>
        </View>
    )
}

export default observer(MainTabs)