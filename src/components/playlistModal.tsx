import React, { useState } from "react";
import {
    Button,
    FlatList,
    GestureResponderEvent,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput
} from "react-native";

interface Playlist {
    name: string;
    songs: string[];
}

interface PlaylistModalProps {
    visible: boolean;
    onClose: () => void;
    // onCreate: (playlist: Playlist) => void;
}

export default function PlaylistModal({ visible, onClose, }: PlaylistModalProps) {
    const [playlistName, setPlaylistName] = useState<string>("");
    const [songs, setSongs] = useState<string[]>([]);

    const handleOuterPress = () => onClose();

    const handleInnerPress = (e: GestureResponderEvent) => {
        e.stopPropagation();
    };

    const handleCreate = () => {
        // onCreate({ name: playlistName, songs });
        setPlaylistName("");
        setSongs([]);
        onClose();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <Pressable style={styles.overlay} onPress={handleOuterPress}>
                <Pressable style={styles.modalContainer} onPress={handleInnerPress}>
                    <Text>Create New Playlist</Text>

                    <TextInput
                        placeholder="Enter playlist name"
                        value={playlistName}
                        onChangeText={setPlaylistName}
                    />

                    <FlatList
                        data={songs}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => <Text>{item}</Text>}
                        ListEmptyComponent={<Text>No songs yet</Text>}
                    />

                    <Button title="Create" onPress={handleCreate} />
                    <Button title="Cancel" onPress={onClose} />
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalContainer: {
        width: "90%",
        height: "50%",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
    },
});
