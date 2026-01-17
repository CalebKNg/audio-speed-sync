import * as MediaLibrary from 'expo-media-library';

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

export async function searchLibrary() {
    const granted = await requestPermission();
    if (!granted) return [];
    const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        sortBy: 'default'
    })
    return media.assets;
}