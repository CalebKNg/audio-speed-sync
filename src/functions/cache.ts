import { Buffer } from 'buffer';
import * as MediaLibrary from 'expo-media-library';
import * as mm from 'music-metadata';
import RNFS from 'react-native-fs';
import { createMMKV } from 'react-native-mmkv';
import { AudioAssetWithMetadata } from './scanLibrary';

// helper function to turn output into my metadata interface
export const createAudioAssetWithMetadata = (
    asset: { id: string; uri: string; filename: string },
    metadata: mm.IAudioMetadata
): AudioAssetWithMetadata => {
    const picture = metadata.common?.picture?.[0];

    // Convert picture → Base64 URI if it exists
    const pictureUri = picture?.data
        ? `data:${picture.format};base64,${Buffer.from(picture.data).toString('base64')}`
        : undefined;
    return {
        id: asset.id,
        uri: asset.uri,
        filename: asset.filename,
        artist: metadata.common?.artist || 'Unknown Artist',
        album: metadata.common?.album || 'Unknown Album',
        title: metadata.common?.title || asset.filename,
        // picture: metadata.common?.picture?.[0],
        picture: pictureUri
    };
}

// Initialize MMKV storage
export const metadataStorage = createMMKV({
    id: 'media-metadata-cache',
});

// get a type for processMetadata output 
export interface ProcessResult {
    asset: MediaLibrary.Asset,
    metadata: AudioAssetWithMetadata,
    fromCache: boolean,
    error?: string;
}

// Grab metadata - try cache first
// this only processes one song
export const processMetadata = async (asset: MediaLibrary.Asset): Promise<ProcessResult> => {
    try {
        const key = `metadata_${asset.id}`;
        // check cache first
        if (metadataStorage.contains(key)) {
            const cached = metadataStorage.getString(key);
            return {
                asset,
                metadata: cached ? JSON.parse(cached) : undefined,
                fromCache: true,
            }
        }
        // if we dont find it in the cache 
        // fetch the metadata using music-metadata
        const base64 = await RNFS.readFile(asset.uri.replace('file://', ''), 'base64');
        const buffer = Uint8Array.from(Buffer.from(base64, 'base64'));
        const metadata = (await mm.parseBuffer(buffer, 'audio/mpeg', { duration: false }));
        // const metadata = await mm.parseFile(asset.uri); idk if this works i will try after

        // convert into the object
        const saveMetadata: AudioAssetWithMetadata = createAudioAssetWithMetadata(asset, metadata);
        // cache it
        metadataStorage.set(key, JSON.stringify(saveMetadata))

        // trim    
        if (metadataStorage.size >= 4096) {
            metadataStorage.trim();
        }
        return {
            asset,
            metadata: saveMetadata,
            fromCache: false,
        }
    }
    catch (error) {
        console.log(error);
        // Return minimal metadata on error
        const fallbackTrack: AudioAssetWithMetadata = {
            id: asset.id,
            uri: asset.uri,
            filename: asset.filename,
            artist: 'Unknown Artist',
            album: 'Unknown Album',
            title: asset.filename,
        };

        return {
            asset: asset,
            metadata: fallbackTrack,
            fromCache: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// multiple at once (suggested by claude lmao)
export const batchProcessMetadata = async (
    assets: MediaLibrary.Asset[],
    concurrency: number = 5
): Promise<AudioAssetWithMetadata[]> => {
    const results: AudioAssetWithMetadata[] = [];

    for (let i = 0; i < assets.length; i += concurrency) {
        const chunk = assets.slice(i, i + concurrency);

        const processed = await Promise.all(
            chunk.map(asset => processMetadata(asset))
        );

        results.push(...processed.map(p => p.metadata));
    }

    return results;
}

export const clearMetadataCache = (): number => {
    try {
        const allKeys = metadataStorage.getAllKeys();
        const metadataKeys = allKeys.filter(key => key.startsWith('metadata_'));

        metadataKeys.forEach(key => {
            metadataStorage.remove(key);
        });

        console.log(`Cleared ${metadataKeys.length} metadata entries from cache`);
        return metadataKeys.length;
    } catch (error) {
        console.error('Error clearing metadata cache:', error);
        return 0;
    }
};