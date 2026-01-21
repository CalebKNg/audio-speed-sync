import { StyleSheet, Text, View } from "react-native";
import { common } from "../../styles/common";

export default function Settings() {
    return (
        <View style={common.pageView}>
            <Text style={styles.text}>setting</Text>

        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        color: '#fff',
    },
});