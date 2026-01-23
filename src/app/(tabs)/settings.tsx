import { useAudio } from "@/src/components/audioProvider";
import { Button, StyleSheet, Switch, Text, View } from "react-native";
import { useAudioLibrary } from '../../functions/scanLibrary';
import { common } from "../../styles/common";


export default function Settings() {
    const { clearCache } = useAudioLibrary();
    const { isNormalSpeedLocked, toggleNormalSpeedLock } = useAudio()
    return (
        <View style={common.pageView}>
            {/* <Text style={styles.text}>setting</Text> */}
            <Button title='reset Cache' onPress={clearCache} />
            <View style={{ alignContent: 'center' }}>
                <Text style={{ color: '#FFF' }}>Toggle Normal Mode :/</Text>
                <Switch
                    style={{ alignSelf: 'center' }}
                    value={isNormalSpeedLocked}
                    onValueChange={toggleNormalSpeedLock}

                />
            </View>

            <View />
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        color: '#fff',
    },
});