import { INCREMEMT_COUNTER, DECREMENT_COUNTER } from "./testConstants";

export const incrementCounter = () => {
    return {
        type: INCREMEMT_COUNTER
    }
}

export const decrementCounter = () => {
    return {
        type: DECREMENT_COUNTER
    }
}


