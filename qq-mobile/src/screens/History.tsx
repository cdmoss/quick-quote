import AsyncStorage from "@react-native-async-storage/async-storage"
import { format } from "date-fns"
import { FontAwesome } from "expo-vector-icons"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, ViewStyle } from "react-native"
import { DataTable } from "react-native-paper"
import { SwipeListView } from "react-native-swipe-list-view"
import { IconButton } from "../components/IconButton"
import { SimpleButton } from "../components/SimpleButton"
import { removeQuote } from "../data"
import { Quote, quoteStore } from "../stores/quoteStore"
import { getTotalPrice } from "../utils/helpers"
import { dateSorting, nameSorting, priceSorting, SortOrder, switchSort} from "../utils/sorting"

const History: React.FC<{toggleDrawer: (state: boolean) => void}> = ({toggleDrawer}) => {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [sortMethod, setSortMethod] = useState<(a: Quote, b: Quote) => number>()
    const [nameSortOrder, setNameSortOrder] = useState<SortOrder | undefined>()
    const [priceSortOrder, setPriceSortOrder] = useState<SortOrder>()
    const [dateSortOrder, setDateSortOrder] = useState<SortOrder | undefined>('ascending')

    useEffect(() => {
        const updateQuotes = async () => {
            if (quoteStore.quotesShouldUpdate) {
                console.log('Updating quotes...')
                const keyValuePairs = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys())
                const newQuotes: Quote[] = [] 
                keyValuePairs.forEach(quoteKeyVal => {
                    if (quoteKeyVal[1]) {
                        newQuotes.push(JSON.parse(quoteKeyVal[1]) as Quote)
                    }
                })
                
                console.log(newQuotes.sort(dateSorting['ascending']).map(quote => quote.dateAdded))

                setQuotes(newQuotes.sort(dateSorting['ascending']))

                quoteStore.setUpdate(false)
            }
        }
        updateQuotes()
    }, [quoteStore.quotesShouldUpdate])

    // useEffect(() => {
    //     console.log('sort changed, name now set to ' + nameSort)
    //     if (nameSort != 'none') {
    //         setQuotes(nameSorting[nameSort](quotes))   
    //     }
    // }, [nameSort])

    // useEffect(() => {
    //     console.log('sort changed, price now set to ' + priceSort)
    //     if (priceSort != 'none') {
    //         setQuotes(priceSorting[priceSort](quotes))   
    //     }
    // }, [priceSort])

    // useEffect(() => {
    //     console.log('sort changed, date now set to ' + dateSort)
    //     if (dateSort != 'none') {
    //         setQuotes(dateSorting[dateSort](quotes)) 
    //         console.log(quotes.map(quote => quote.dateAdded))  
    //     }
    // }, [dateSort])

    const goToDetails = async (quoteId: string) => {
        const quote = quotes.find(quote => quote?.id == quoteId)
        if (quote) {
            quoteStore.setQuote(quote)   
        }
        toggleDrawer(true)
    }

    // const ColumnHeaderButton: React.FC<{style?: ViewStyle, name: string, sortC: SortOrder}> = ({style, name}) => {
    //     return (
    //             <Text
    //                 style={[style, {marginRight: 5, fontSize: 12}]} 
    //                 onPress={() => setSortMethod()}>
    //                     {name}  { != 'none' ? <FontAwesome name={sortState == 'descending' ? 'arrow-up' : 'arrow-down'} /> : null}
    //             </Text>
    //     )
    // }

    return (
        <View style={{backgroundColor: 'white', padding: 20}}>
            {quotes.length > 0 ? 
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title onPress={() => {setNameSortOrder(switchSort(nameSortOrder))}} sortDirection={nameSortOrder ? nameSortOrder : undefined}>Name</DataTable.Title>
                    <DataTable.Title onPress={() => setPriceSortOrder(switchSort(priceSortOrder))} sortDirection={priceSortOrder ? priceSortOrder : undefined} >Price</DataTable.Title>
                    <DataTable.Title onPress={() => setDateSortOrder(switchSort(dateSortOrder))} sortDirection={dateSortOrder ? dateSortOrder : undefined}>Date</DataTable.Title>
                </DataTable.Header>
                    
                {/* <View style={{flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, paddingBottom: 10, marginHorizontal: -20, paddingHorizontal: 20}}>
                    <ColumnHeaderButton setSort={setNameSort} style={{flex: 1}} name="Name" sortState={nameSort} />
                    <ColumnHeaderButton setSort={setPriceSort} style={{flex: 1}} name="Price" sortState={priceSort} />
                    <ColumnHeaderButton setSort={setDateSort} style={{flex: 1}} name="Date (d/m/y)" sortState={dateSort} />
                    <View style={{flex: .3}} />
                </View>
                <ScrollView> */}
                {quotes?.map((quote, i) => {
                    if (quote) {
                        return (
                            // <TouchableOpacity key={i} style={{flexDirection:'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: 'lightgray'}} onPress={() => goToDetails(quote.id)}>
                            //     <Text style={HistoryStyles.rowValue}>{quote?.name}</Text>
                            //     <Text style={HistoryStyles.rowValue}>{`\$${getTotalPrice(quote.items).toFixed(2)}`}</Text>
                            //     <Text style={HistoryStyles.rowValue}>{format(new Date(quote?.dateAdded), 'd-M-y')}</Text>
                            //     <IconButton style={{flex: .3, alignSelf: 'flex-end'}} size={20} color="red" onPress={() => removeQuote(quote.id)} icon='close' />
                            // </TouchableOpacity>
                            <DataTable.Row onPress={() => goToDetails(quote.id)} key={i}>
                                <DataTable.Cell style={HistoryStyles.rowContainer}><Text style={HistoryStyles.rowText}>{quote?.name}</Text></DataTable.Cell>
                                <DataTable.Cell style={HistoryStyles.rowContainer}><Text style={HistoryStyles.rowText}>{getTotalPrice(quote?.items).toFixed(2)}</Text></DataTable.Cell>
                                <DataTable.Cell style={HistoryStyles.rowContainer}><Text style={HistoryStyles.rowText}>{format(new Date(quote?.dateAdded), 'd-M-y')}</Text></DataTable.Cell>
                                <DataTable.Cell onPress={() => removeQuote(quote.id)} style={{flex: .2, alignSelf: 'center'}}><FontAwesome name="close" color="red" size={20}/></DataTable.Cell>
                            </DataTable.Row>
                        )
                    }
                })}
                {/* </ScrollView> */}
            </DataTable> : 
            <View style={{alignItems: 'center'}}>
                <Text>No quotes yet</Text>
            </View>}
            
        </View>
    )
}

const HistoryStyles = StyleSheet.create({
    rowContainer: {
        textAlignVertical: 'center',
        textAlign: 'center',
        flex: 1,
        flexDirection: 'row',  
    },
    rowText: {
        fontSize: 12,
        alignSelf: 'center',
        
    }
})

export default observer(History)