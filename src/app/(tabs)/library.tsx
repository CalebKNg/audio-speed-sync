import CreatePlaylistModal from "@/src/components/createPlaylistModal";
import { useAppDispatch } from "@/src/store/hooks";
import { hideNewPlaylist } from "@/src/store/slices/uiSlice";
import { StyleSheet, View } from "react-native";
import PlaylistView from '../../components/playlistView';
import { common } from "../../styles/common";
export default function Library() {
    // const visible = useAppSelector(state => state.playlist.isModalVisible);
    // const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch()
    return (
        <View style={common.pageView}>
            {/* <Button title="hi" onPress={() => dispatch(showNewPlaylist())} /> */}
            <PlaylistView />

            <CreatePlaylistModal onClose={() => dispatch(hideNewPlaylist())} />
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