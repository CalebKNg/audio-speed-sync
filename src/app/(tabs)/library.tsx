import AddSongsModal from "@/src/components/addSongsModal";
import CreatePlaylistModal from "@/src/components/createPlaylistModal";
import PlaylistModal from "@/src/components/playlistModal";
import { useAppDispatch } from "@/src/store/hooks";
import { hideNewPlaylist, hidePlaylist, showPlaylist } from "@/src/store/slices/uiSlice";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PlaylistView from '../../components/playlistView';
import { common } from "../../styles/common";
export default function Library() {
    // const visible = useAppSelector(state => state.playlist.isModalVisible);
    // const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch()
    const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
    const [showAddSongs, setShowAddSongs] = useState(false);
    return (
        <View style={common.pageView}>
            {/* <Button title="hi" onPress={() => dispatch(showNewPlaylist())} /> */}
            <PlaylistView onPlaylistSelect={(id) => {
                setSelectedPlaylistId(id);
                dispatch(showPlaylist());
            }} />


            <CreatePlaylistModal onClose={() => dispatch(hideNewPlaylist())} />
            <PlaylistModal playlistId={selectedPlaylistId} onClose={() => dispatch(hidePlaylist())} onAddSongs={() => setShowAddSongs(true)} />
            <AddSongsModal
                playlistId={selectedPlaylistId}
                visible={showAddSongs}
                onClose={() => setShowAddSongs(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginVertical: 10,
        // marginBottom: 20,
        height: 50,
        width: '100%',
        justifyContent: 'space-between'
        // flex: .1,
    },
    text: {
        color: '#fff',
    },
});