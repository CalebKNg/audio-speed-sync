import { createSlice } from '@reduxjs/toolkit';

interface PlayerState {
    currentTrack: string | null;
    isPlaying: boolean;
    visible: boolean;
}

const initialState: PlayerState = {
    currentTrack: null,
    isPlaying: false,
    visible: false,
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        show: state => {
            state.visible = true;
        },
        hide: state => {
            state.visible = false;
        }
    }
})

export const { show, hide } = playerSlice.actions

export default playerSlice.reducer