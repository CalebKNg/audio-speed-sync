import PlaylistModal from "@/src/components/playlistModal";
import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import PlaylistView from '../../components/playlistView';
import { common } from "../../styles/common";

export default function Library() {
    // const visible = useAppSelector(state => state.playlist.isModalVisible);
    const [visible, setVisible] = useState(false);
    return (
        <View style={common.pageView}>
            <Button title="hi" onPress={() => setVisible(true)} />
            <PlaylistView />

            <PlaylistModal visible={visible} onClose={() => setVisible(false)} />
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