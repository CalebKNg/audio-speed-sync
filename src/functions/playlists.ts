import { randomUUID } from 'expo-crypto';
import { metadataStorage } from "./cache";
import { AudioAssetWithMetadata } from './scanLibrary';

export interface Playlist {
    id: string,
    name: string,
    trackList: string[],
    listenedAt: number,
    updatedAt: number,
}

// ways of interacting with playlist cache
export const PlaylistCache = {
    // create blank playlist
    create: (name: string): Playlist => {
        const newId = randomUUID()
        const playlist: Playlist = {
            id: newId,
            name: name,
            trackList: [],
            listenedAt: Date.now(),
            updatedAt: Date.now(),
        }

        PlaylistCache.save(playlist);
        return playlist;
    },

    // save playlist to cache
    save: (playlist: Playlist) => {
        const key = `playlist_${playlist.id}`;
        metadataStorage.set(key, JSON.stringify(playlist));
    },

    // get playlist from cache
    get: (playlistId: string): Playlist | undefined => {
        const key = `playlist_${playlistId}`;
        const data = metadataStorage.getString(key);
        return data ? JSON.parse(data) : undefined;
    },

    // check if we have this playlist
    has: (playlistId: string): boolean => {
        const key = `playlist_${playlistId}`;
        return metadataStorage.contains(key)
    },

    // delete playlist
    remove: (playlistId: string): boolean => {
        return metadataStorage.remove(`playlist_${playlistId}`);
    },

    // return a list of all our playlists
    getAll: (sortedBy: 'alphabetical' | 'Recents' | 'RecentlyAdded'): Playlist[] => {
        const data = metadataStorage.getAllKeys().filter(key => key.startsWith('playlist_'))
            .map(key => metadataStorage.getString(key))
            .filter((data): data is string => data !== undefined)
            .map(data => JSON.parse(data))

        switch (sortedBy) {
            case 'alphabetical':
                return data.sort((a, b) => a.name.localeCompare(b.name))
            case 'Recents':
                return data.sort((a, b) => b.listenedAt - a.listenedAt)
            case 'RecentlyAdded':
                return data.sort((a, b) => b.updatedAt - a.updatedAt)
            default:
                return data;
        }
    },

    // add track to specific playlist

    addTrack: (playlistId: string, trackId: string) => {
        const playlist = PlaylistCache.get(playlistId);
        if (!playlist) return false;

        if (!playlist.trackList.includes(trackId)) {
            playlist.trackList.push(trackId);
            playlist.updatedAt = Date.now();
            PlaylistCache.save(playlist);
        }
        return true;
    },

    // remove track from specific playlist
    removeTrack: (playlistId: string, trackId: string) => {
        const playlist = PlaylistCache.get(playlistId);
        if (!playlist) return false;

        playlist.trackList = playlist.trackList.filter(id => id !== trackId);
        playlist.updatedAt = Date.now();
        PlaylistCache.save(playlist);
        return true;
    },

    // return playlist object as well as a list of metadata objects just in case
    getTracks: (playlistId: string): {
        playlist: Playlist;
        tracks: AudioAssetWithMetadata[];
    } | undefined => {
        const playlist = PlaylistCache.get(playlistId);
        if (!playlist) return undefined;

        const tracks = playlist.trackList
            .map(trackId => {
                const trackKey = `metadata_${trackId}`;
                const trackData = metadataStorage.getString(trackKey);
                return trackData ? JSON.parse(trackData) : undefined;
            })
            .filter((track): track is AudioAssetWithMetadata => track !== undefined);

        return { playlist, tracks };
    },
}