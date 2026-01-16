import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

// redux
import { show } from '../app/features/player/playerSlice';
import { useAppDispatch } from '../app/hooks';

type Props = {
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
};

export default function MiniPlayer() {
    const dispatch = useAppDispatch();
    return (
        <Pressable style={styles.container} onPress={() => dispatch(show())}>
            <View style={styles.info}>
                <Image source={require('@/assets//images//612I5v0KlEL.jpg')} style={styles.cover} />
                <View style={styles.infoText} >
                    <Text style={styles.title}>Meidei</Text>
                    <Text>Radwimps</Text>
                </View>
            </View>

            <Ionicons name="play" size={32} style={{ marginRight: 10 }} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '98%',
        // flex: 0.1,
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cover: {
        width: 'auto',
        height: '80%',
        aspectRatio: 1,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 16,
        // resizeMode: "stretch",
    },
    info: {
        flexDirection: 'row',
        flex: .5,
        justifyContent: 'flex-start'
    },
    infoText: {
        justifyContent: 'center'
    },
    title: {
        color: '#25292e',
        fontSize: 20,
    },
    artist: {
        color: '#25292e',
        opacity: .75,
    },

})