import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface uiState {
    tabHeight: number,
}

const initialState: uiState = {
    tabHeight: 0
};

export const uiSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setTabHeight: (state, action: PayloadAction<number>) => {
            state.tabHeight = action.payload;
        },
    }
})

export const { setTabHeight } = uiSlice.actions

export default uiSlice.reducer