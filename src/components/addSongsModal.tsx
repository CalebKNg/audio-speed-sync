import React, { useEffect, useState } from "react";
import {
    FlatList,
    GestureResponderEvent,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { PlaylistCache } from "../functions/playlists";
import { AudioAssetWithMetadata, useAudioLibrary } from "../functions/scanLibrary";

interface AddSongsModalProps {
    playlistId: string;
    visible: boolean;
    onClose: () => void;
}

export default function AddSongsModal({ playlistId, visible, onClose }: AddSongsModalProps) {
    const [allTracks, setAllTracks] = useState<AudioAssetWithMetadata[]>([]);
    const [filteredTracks, setFilteredTracks] = useState<AudioAssetWithMetadata[]>([]);
    const [searchParam, setSearchParam] = useState("");
    const [playlistTrackIds, setPlaylistTrackIds] = useState<string[]>([]);
    const { tracks, loadLibrary } = useAudioLibrary();

    useEffect(() => {
        if (visible) {
            loadLibrary();
            loadPlaylistData();
        }
    }, [visible, playlistId]);

    useEffect(() => {
        setAllTracks(tracks);
    }, [tracks]);

    useEffect(() => {
        if (searchParam.trim() === "") {
            setFilteredTracks(allTracks);
        } else {
            const filtered = allTracks.filter(item =>
                item.title.toLowerCase().includes(searchParam.toLowerCase()) ||
                item.artist.toLowerCase().includes(searchParam.toLowerCase())
            );
            setFilteredTracks(filtered);
        }
    }, [searchParam, allTracks]);

    const loadPlaylistData = () => {
        const playlist = PlaylistCache.get(playlistId);
        if (playlist) {
            setPlaylistTrackIds(playlist.trackList);
        }
    };

    const handleInnerPress = (e: GestureResponderEvent) => {
        e.stopPropagation();
    };

    const toggleTrack = (trackId: string) => {
        if (playlistTrackIds.includes(trackId)) {
            PlaylistCache.removeTrack(playlistId, trackId);
        } else {
            PlaylistCache.addTrack(playlistId, trackId);
        }
        loadPlaylistData();
    };

    const renderTrack = ({ item }: { item: AudioAssetWithMetadata }) => {
        const inPlaylist = playlistTrackIds.includes(item.id);

        return (
            <Pressable
                style={styles.trackItem}
                onPress={() => toggleTrack(item.id)}
            >
                <Image
                    source={item.picture ? { uri: item.picture } : require('@/assets/images/missing_cover.jpg')}
                    style={styles.trackImage}
                />
                <View style={styles.trackInfo}>
                    <Text style={styles.trackTitle}>{item.title}</Text>
                    <Text style={styles.trackArtist}>{item.artist}</Text>
                </View>
                <Text style={styles.checkbox}>{inPlaylist ? '✓' : '+'}</Text>
            </Pressable>
        );
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.modal} onPress={handleInnerPress}>
                    <Text style={styles.title}>Add Songs</Text>

                    <TextInput
                        style={styles.search}
                        value={searchParam}
                        onChangeText={setSearchParam}
                        placeholder="Search songs..."
                        placeholderTextColor="#888"
                    />

                    <FlatList
                        data={filteredTracks}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTrack}
                        style={styles.list}
                    />

                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Done</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "90%",
        height: "80%",
        backgroundColor: "#25292e",
        borderRadius: 10,
        padding: 20,
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    search: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    list: {
        flex: 1,
    },
    trackItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1a1d21',
        marginBottom: 5,
        borderRadius: 5,
    },
    trackImage: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 3,
    },
    trackInfo: {
        flex: 1,
    },
    trackTitle: {
        color: '#FFF',
        fontSize: 14,
    },
    trackArtist: {
        color: '#888',
        fontSize: 12,
    },
    checkbox: {
        color: '#4CAF50',
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#555',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    closeText: {
        color: '#FFF',
        fontSize: 16,
    },
});