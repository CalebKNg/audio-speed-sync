import * as MediaLibrary from 'expo-media-library';

import * as mm from 'music-metadata';
import RNFS from 'react-native-fs';


export type AudioAssetWithMetadata = {
    id: string;
    uri: string;
    artist: string;
    album: string;
    title: string;
    picture?: mm.IPicture;
};

async function requestPermission() {
    console.log("r setn")
    const { status } = await MediaLibrary.requestPermissionsAsync();
    console.log(status)

    if (status !== 'granted') {
        alert('Permission required to access music files');
        return false;
    }
    return true;
}

export async function searchLibrary(): Promise<AudioAssetWithMetadata[]> {
    const granted = await requestPermission();
    if (!granted) return [];
    // grab all audio files

    const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        sortBy: 'default'
    })
    //lets grab their metadata too
    // const grabExif = await Promise.all(
    //     media.assets.map(async (asset): Promise<AudioAssetWithMetadata> => {
    //         const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
    //         const exif = assetInfo.exif as Record<string, any> || {};
    //         // Log to see what's actually available
    //         if (media.assets.length > 0) {
    //             console.log('Full Asset Object:', JSON.stringify(media.assets[0], null, 2));
    //         }
    //         return {
    //             id: asset.id,
    //             uri: asset.uri,
    //             artist: exif.Artist || 'Unknown Artist',
    //             album: exif.Album || 'Unknown Album',
    //             title: exif.Title || asset.filename,
    //             genre: exif.Genre || 'Unknown Genre',
    //             year: exif.DateTimeOriginal || '',
    //         };
    //     })
    // )
    // return grabExif;

    //lets grab their metadata too
    const grabExif = Promise.allSettled(
        media.assets.map(async (asset): Promise<AudioAssetWithMetadata> => {
            const base64 = await RNFS.readFile(asset.uri.replace('file://', ''), 'base64');
            const buffer = Uint8Array.from(Buffer.from(base64, 'base64'));
            const metadata = await mm.parseBuffer(buffer, 'audio/mpeg', { duration: false });
            // print common tags only
            // console.log('--- Common tags ---');
            // console.log(metadata.common);
            return {
                id: asset.id,
                uri: asset.uri,
                artist: metadata.common.artist || 'Unknown Artist',
                album: metadata.common.album || 'Unknown Album',
                title: metadata.common.title || asset.filename,
                picture: metadata.common.picture?.[0],
            };
        })
    )
    const result: Promise<AudioAssetWithMetadata[]> = grabExif
        .then((results: PromiseSettledResult<AudioAssetWithMetadata>[]) =>
            results
                .filter(
                    (r): r is PromiseFulfilledResult<AudioAssetWithMetadata> => r.status === 'fulfilled'
                )
                .map((r) => r.value)
        );
    return result;

}