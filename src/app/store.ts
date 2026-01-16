import { configureStore } from '@reduxjs/toolkit';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import playerReducer from './features/player/playerSlice';
import uiReducer from './features/ui/uiSlice';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        ui: uiReducer,
    },
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>