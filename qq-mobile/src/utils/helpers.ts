import { Quote, QuoteItem } from "../stores/quoteStore"

export const getTotalArea = (quoteItems: QuoteItem[]) => {
    if (quoteItems.length > 0) {
        return quoteItems.reduce((prev, current) => ({name: '', id: 'none', price: 0, area: current.area + prev.area, type: 'Circle'})).area.toFixed(2)
    }
    else return ''
}

export const getTotalPrice = (quoteItems: QuoteItem[]) => {
    let totalPrice = 0 
    quoteItems.forEach(item => {
        totalPrice += item.area * item.price
    })

    return totalPrice
}