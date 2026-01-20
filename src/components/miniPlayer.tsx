import Ionicons from '@expo/vector-icons/Ionicons';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
// redux
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { show } from '../store/slices/playerSlice';
import { useAudio } from './audioProvider';

export default function MiniPlayer() {
    const dispatch = useAppDispatch();
    const { currentTrack, isPlaying, play, pause } = useAudio();
    const tabHeight = useAppSelector(state => state.ui.tabHeight);
    return (
        <Pressable style={[styles.container, { bottom: tabHeight }]} onPress={() => dispatch(show())}>
            <View style={styles.info}>
                <Image source={require('@/assets//images//612I5v0KlEL.jpg')} style={styles.cover} />
                <View style={styles.infoText} >
                    <Text style={styles.title}>{currentTrack}</Text>
                    <Text>Radwimps</Text>
                </View>
            </View>


            {isPlaying ?
                <Pressable onPressOut={pause}>
                    <Ionicons name="pause" size={32} style={{ marginRight: 10 }} />
                </Pressable>
                :
                <Pressable onPressOut={play}>
                    <Ionicons name="play" size={32} style={{ marginRight: 10 }} />
                </Pressable>
            }

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
        alignItems: 'center',

        // positioning
        position: 'absolute',
        // bottom is handled within the JS upstairs
        alignSelf: 'center',
        zIndex: 1000
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