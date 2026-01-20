import { createSlice } from "@reduxjs/toolkit";

interface LocationState {
    speed: number;
    isTracking: boolean;
}

const initialState: LocationState = {
    speed: 0,
    isTracking: false,
}

export const locationSlice = createSlice({
    name: 'location',
    initialState: initialState,
    reducers: {
        updateLocation: (state, action) => {
            state.speed = (action.payload.coords.speed || 0) * 3.6;
        },
        setTracking: (state, action) => {
            state.isTracking = action.payload;
        }
    }
})

export const { updateLocation, setTracking } = locationSlice.actions;

export default locationSlice.reducer;


