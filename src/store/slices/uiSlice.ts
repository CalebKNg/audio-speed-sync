import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface uiState {
    tabHeight: number,
    newPlaylistVisible: boolean,
    playlistVisible: boolean,
    playlistFlag: boolean,
}

const initialState: uiState = {
    tabHeight: 0,
    newPlaylistVisible: false,
    playlistVisible: false,
    playlistFlag: false,
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
        },
        showPlaylist: (state) => {
            state.playlistVisible = true
        },
        hidePlaylist: (state) => {
            state.playlistVisible = false
        },
        updatePlaylistFlag: (state) => {
            state.playlistFlag = !state.playlistFlag
        }
    }
})

export const { setTabHeight, showNewPlaylist, hideNewPlaylist, showPlaylist, hidePlaylist, updatePlaylistFlag } = uiSlice.actions

export default uiSlice.reducer