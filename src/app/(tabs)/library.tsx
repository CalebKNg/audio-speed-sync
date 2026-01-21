import { StyleSheet, View } from "react-native";
import PlaylistView from '../../components/playlistView';
import { common } from "../../styles/common";

export default function Library() {
    return (
        <View style={common.pageView}>
            <PlaylistView />
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        color: '#fff',
    },
});