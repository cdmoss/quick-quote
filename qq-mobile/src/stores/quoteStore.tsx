import { action, makeObservable, observable } from "mobx";
import { Shape } from "../screens/QuoteBuilder";

export type DimensionList = {[label: string]:string}

export interface QuoteItem {
    id: string,
    name: string,
    area: number,
    dimensions: DimensionList
    price: number,
    type: Shape
}

export interface Quote {
    id: string,
    name: string,
    dateAdded: Date,
    items: QuoteItem[],
}

class QuoteStore {
    quote: Quote = {
        id: '',
        items: [],
        name: '',
        dateAdded: new Date()
    };
    quotesShouldUpdate: boolean = true;

    constructor () {
        makeObservable(this, {
            quote: observable,
            quotesShouldUpdate: observable,
            setUpdate: action,
            setQuote: action,
            resetQuote: action,
        })
    }

    setQuote(quote: Quote) {
        this.quote = quote
    }

    resetQuote() {
        quoteStore.setQuote({
            id: '',
            name: '',
            dateAdded: new Date(),
            items: []
        })
    }

    setUpdate(shouldUpdate: boolean) {
        this.quotesShouldUpdate = shouldUpdate
    }
}

export const quoteStore = new QuoteStore();