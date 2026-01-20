import * as MediaLibrary from 'expo-media-library';

export type AudioAssetWithMetadata = {
    id: string;
    uri: string;
    artist: string;
    album: string;
    title: string;
    genre: string;
    year: string;
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

    // const songsResults = await getAll({
    //     limit: 20,
    //     offset: 0,
    //     coverQuality: 50,
    //     minSongDuration: 1000,
    //     sortOrder: SortSongOrder.DESC,
    //     sortBy: SortSongFields.TITLE,
    // });

    // if (typeof songsResults === 'string') {
    //     console.error('Error getting music files:', songsResults);
    //     return [];
    // }

    // return songsResults.map((file: any): AudioAssetWithMetadata => ({
    //     id: file.id || file.path,
    //     uri: file.path,
    //     artist: file.artist || 'Unknown Artist',
    //     album: file.album || 'Unknown Album',
    //     title: file.title || file.fileName,
    //     genre: file.genre || 'Unknown Genre',
    //     year: file.year || '',
    // }));

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

    return media.assets.map((asset): AudioAssetWithMetadata => ({
        id: asset.id,
        uri: asset.uri,
        artist: 'Unknown Artist',
        album: 'Unknown Album',
        title: asset.filename.replace(/\.[^/.]+$/, ''),
        genre: 'Unknown Genre',
        year: '',
    }));
}