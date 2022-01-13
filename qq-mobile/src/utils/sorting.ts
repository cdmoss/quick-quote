import { toDate } from "date-fns";
import { Quote } from "../stores/quoteStore";
import { getTotalPrice } from "./helpers";

export type SortOrder = 'ascending' | 'descending'

export const dateSorting = {
    ascending: (a: Quote, b: Quote) => {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    },

    descending: (a: Quote, b: Quote) => {
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
    }
}

export const nameSorting = {
    descending: (a: Quote, b: Quote) => {
            return a.name.localeCompare(b.name)
    },

    ascending: (a: Quote, b: Quote) => {
        return b.name.localeCompare(a.name)
    },
}

export const priceSorting = {
    ascending: (a: Quote, b: Quote) => {
        return getTotalPrice(a.items) - getTotalPrice(b.items)
    },

    descending: (a: Quote, b: Quote) => {
            return getTotalPrice(b.items) - getTotalPrice(a.items)
    },
}

export const switchSort = (oldSortOrder?: SortOrder): SortOrder | undefined => {
    if (oldSortOrder == 'ascending') {
        return 'descending'
    }
    else if (oldSortOrder == 'descending') {
        return 'ascending'
    }

    else return undefined
}

