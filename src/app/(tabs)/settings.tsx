import { Button, StyleSheet, Text, View } from "react-native";
import { useAudioLibrary } from '../../functions/scanLibrary';
import { common } from "../../styles/common";


export default function Settings() {
    const { clearCache } = useAudioLibrary();
    return (
        <View style={common.pageView}>
            <Text style={styles.text}>setting</Text>
            <Button title='reset Cache' onPress={clearCache} />
            <View />
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        color: '#fff',
    },
});