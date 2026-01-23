import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from "react-native";
import { useAppDispatch } from '../store/hooks';


export default function LibraryHeader() {
    const dispatch = useAppDispatch();
    return (
        <View style={styles.header}>
            <Pressable>
                <Ionicons name="options" size={32} style={{ paddingHorizontal: 16, color: '#FFF', }} />
            </Pressable>

            <Pressable >
                <Ionicons name="add" size={32} style={{ paddingHorizontal: 16, color: '#FFF', }} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        // marginVertical: 10,
        // marginBottom: 20,
        // height: 50,
        width: '100%',
        justifyContent: 'flex-end',
        alignContent: 'center'
        // flex: .1,
    },
    text: {
        color: '#fff',
    },
});