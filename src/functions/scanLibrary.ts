import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { batchProcessMetadata, clearMetadataCache } from './cache';

export type AudioAssetWithMetadata = {
    id: string;
    uri: string;
    filename: string;
    artist: string;
    album: string;
    title: string;
    // picture?: mm.IPicture;
    picture?: string;
};

async function requestPermission() {
    // console.log("r setn")
    const { status } = await MediaLibrary.requestPermissionsAsync();
    console.log(status)

    if (status !== 'granted') {
        alert('Permission required to access music files');
        return false;
    }
    return true;
}

// we can export this as a hook
export const useAudioLibrary = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tracks, setTracks] = useState<AudioAssetWithMetadata[]>([])

    const loadLibrary = async () => {
        setIsLoading(true);

        try {
            const granted = await requestPermission();
            if (!granted) return;

            // grab all audio files
            const media = await MediaLibrary.getAssetsAsync({
                mediaType: 'audio',
                sortBy: 'default'
            })
            const getTracks = await batchProcessMetadata(media.assets, 5);
            setTracks(getTracks);

            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const clearCache = () => {
        clearMetadataCache();
        loadLibrary();
    }

    return { tracks, isLoading, loadLibrary, clearCache };
}