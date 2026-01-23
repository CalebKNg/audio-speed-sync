import { createSlice } from '@reduxjs/toolkit';

interface PlayerState {
    currentTrack: string | null;
    currentArtist: string | null;
    currentPicture: string | null;
    isPlaying: boolean;
    visible: boolean;
}

const initialState: PlayerState = {
    currentTrack: null,
    currentArtist: null,
    currentPicture: null,
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
        },
        setCurrentTrack: (state, action) => {
            state.currentArtist = action.payload.artist;
            state.currentTrack = action.payload.track;
            state.currentPicture = action.payload.picture;
        }
    }
})

export const { show, hide, setCurrentTrack } = playerSlice.actions

export default playerSlice.reducer