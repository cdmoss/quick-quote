import AsyncStorage from "@react-native-async-storage/async-storage"
import { quoteStore } from "./stores/quoteStore"

export const removeQuote = async (quoteId: string) => {
    console.log(quoteId)
    await AsyncStorage.removeItem(quoteId)
    if (quoteStore.quote.id === quoteId) {
        quoteStore.resetQuote()
    }
    quoteStore.setUpdate(true)
}