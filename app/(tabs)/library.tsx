import { StyleSheet, Text, View } from "react-native";
import { common } from "../styles/common";
export default function Library() {
    return (
        <View style={common.pageView}>
            <Text style={styles.text}>about me</Text>
            <Text style={styles.text}>about me</Text>
            <Text style={styles.text}>about me</Text>

            <Text style={styles.text}>about me</Text>


            {/* <MiniPlayer /> */}
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        color: '#fff',
    },
});