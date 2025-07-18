import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    value: {
        count: 0,
        isPaid: false,
    }
}

export const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.value.count += action.payload;
        },
        decrement: (state) => {
            state.value.count -= 1;
        },
        reset: (state) => {
            state.value = {
                count: 0
            };
        },
        payment: (state) => {
            state.value.isPaid = true;
        }
    },
})

export default CounterSlice.reducer
export const { increment, decrement, reset, payment } = CounterSlice.actions;