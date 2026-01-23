import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface uiState {
    tabHeight: number,
    newPlaylistVisible: boolean,
}

const initialState: uiState = {
    tabHeight: 0,
    newPlaylistVisible: false
};

export const uiSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setTabHeight: (state, action: PayloadAction<number>) => {
            state.tabHeight = action.payload;
        },
        showNewPlaylist: (state) => {
            state.newPlaylistVisible = true
        },
        hideNewPlaylist: (state) => {
            state.newPlaylistVisible = false
        }
    }
})

export const { setTabHeight, showNewPlaylist, hideNewPlaylist } = uiSlice.actions

export default uiSlice.reducer