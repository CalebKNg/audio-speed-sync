import React, { useState } from "react";
import {
    Button,
    GestureResponderEvent,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useAppSelector } from "../store/hooks";

interface Playlist {
    name: string;
    songs: string[];
}

interface createPlaylistModalProps {
    // visible: boolean;
    onClose: () => void;
    // onCreate: (playlist: Playlist) => void;
}

export default function CreatePlaylistModal({ onClose, }: createPlaylistModalProps) {
    const [playlistName, setPlaylistName] = useState<string>("");
    const [songs, setSongs] = useState<string[]>([]);
    const visible = useAppSelector(state => state.ui.newPlaylistVisible)
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
                    <Text style={styles.title}>Create Playlist</Text>

                    <TextInput
                        placeholder="Enter playlist name"
                        value={playlistName}
                        onChangeText={setPlaylistName}
                        style={styles.input}
                    />
                    {/* 
                    <FlatList
                        data={songs}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => <Text>{item}</Text>}
                        ListEmptyComponent={<Text>No songs yet</Text>}
                    /> */}
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Button title="Cancel" onPress={onClose} />

                        <Button title="Create" onPress={handleCreate} />
                    </View>

                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center", // push modal to the bottom
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalContainer: {
        width: "90%",
        height: "30%",
        backgroundColor: "#25292e",
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    title: {
        color: '#FFF',
        fontSize: 25,

    },
    input: {
        // backgroundColor: '#FFF',
        width: '90%',
        fontSize: 20,
        // justifyContent: 'center'
        borderColor: '#FFF',
        borderBottomWidth: 1,
        color: '#FFF'
    }
});
