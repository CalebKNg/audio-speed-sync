import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    GestureResponderEvent,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Playlist, PlaylistCache } from "../functions/playlists";
import { AudioAssetWithMetadata } from "../functions/scanLibrary";
import { useAppSelector } from "../store/hooks";


interface PlaylistDisplayModalProps {
    playlistId: string;
    onClose: () => void;
    onAddSongs: () => void;
    refreshTrigger?: number;
}

export default function PlaylistDisplayModal({ playlistId, onClose, onAddSongs, refreshTrigger }: PlaylistDisplayModalProps) {
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [tracks, setTracks] = useState<AudioAssetWithMetadata[]>([]);
    const visible = useAppSelector(state => state.ui.playlistVisible);

    useEffect(() => {
        if (visible && playlistId) {
            loadPlaylistData();
        }
    }, [visible, playlistId, refreshTrigger]);

    const loadPlaylistData = () => {
        const data = PlaylistCache.getTracks(playlistId);
        if (data) {
            setPlaylist(data.playlist);
            setTracks(data.tracks);
        }
    };

    const handleInnerPress = (e: GestureResponderEvent) => {
        e.stopPropagation();
    };

    const removeTrack = (trackId: string) => {
        PlaylistCache.removeTrack(playlistId, trackId);
        loadPlaylistData();
    };

    const renderTrack = ({ item }: { item: AudioAssetWithMetadata }) => {
        return (
            <View style={styles.trackItem}>
                <Image
                    source={item.picture ? { uri: item.picture } : require('@/assets/images/missing_cover.jpg')}
                    style={styles.trackImage}
                />
                <View style={styles.trackInfo}>
                    <Text style={styles.trackTitle}>{item.title}</Text>
                    <Text style={styles.trackArtist}>{item.artist}</Text>
                </View>
                <Pressable onPress={() => removeTrack(item.id)}>
                    <Text style={styles.removeButton}><Ionicons name="remove" /></Text>
                </Pressable>
            </View>
        );
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.modal} onPress={handleInnerPress}>
                    <Text style={styles.title}>{playlist?.name || 'Playlist'}</Text>


                    <Text style={styles.subtitle}>{tracks.length} songs</Text>
                    <View style={styles.header}>
                        <Pressable onPress={onAddSongs}>
                            <Ionicons name="add" size={32} style={{ paddingHorizontal: 16, color: '#FFF', }} />
                        </Pressable>
                        <Pressable>
                            <Ionicons name="play-circle" size={48} style={{ paddingHorizontal: 16, color: '#FFF', }} />
                        </Pressable>

                    </View>

                    <FlatList
                        data={tracks}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTrack}
                        style={styles.list}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No songs in this playlist</Text>
                        }
                    />

                    {/* <Pressable style={styles.addButton} onPress={onAddSongs}>
                        <Text style={styles.addButtonText}>+ Add Songs</Text>
                    </Pressable> */}

                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Close</Text>
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
        marginBottom: 5,
    },
    header: {
        flexDirection: 'row',
        // alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    subtitle: {
        color: '#888',
        fontSize: 14,
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
    removeButton: {
        // color: '#FF5252',
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginLeft: 5
    },
    emptyText: {
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 16,
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