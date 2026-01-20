import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from '@react-native-community/slider';
import { PropsWithChildren } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { useAudio } from "./audioProvider";

//redux
import { hide } from "../app/features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function Player() {
    // const [play, setPlay] = useState(true);
    const { isPlaying, currentTime, duration, play, pause } = useAudio();
    const buttonColor = "#fff";

    const dispatch = useAppDispatch();
    const isExpanded = useAppSelector(state => state.player.visible);

    return (
        // return modal so it sits on top
        <Modal animationType="slide" transparent={true} visible={isExpanded} onRequestClose={() => dispatch(hide())}>
            {/* main view */}
            <View style={styles.container}>
                {/*  header for the back button for now */}
                <View style={styles.header}>
                    <Pressable onPressOut={() => dispatch(hide())} style={{ padding: 12 }}>
                        <Ionicons name='chevron-down' size={32} color={buttonColor} />
                    </Pressable>
                </View>
                {/*  main image */}
                <Image source={require('@/assets//images//612I5v0KlEL.jpg')} style={styles.cover} />
                <View style={styles.trackInfo}>
                    <Text style={styles.title}>Meidei</Text>
                    <Text style={styles.artist}>Radwimps</Text>
                </View>
                {/* scrubber */}
                <Slider
                    style={styles.slider}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor='#808080'
                    thumbTintColor="#FFFFFF"
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                    step={0.01}
                />
                <View style={styles.controls}>
                    <Pressable onPressOut={() => console.log("hi")}>
                        <Ionicons name="play-skip-back" size={32} color={buttonColor} />
                    </Pressable>
                    {/* <Pressable onPressOut={() => play}>
                        {isPlaying ?
                            <Ionicons name="play-circle" size={64} color={buttonColor} />
                            :
                            <Ionicons name="pause-circle" size={64} color={buttonColor} />
                        }
                    </Pressable> */}
                    {isPlaying ?
                        <Pressable onPressOut={pause}>
                            <Ionicons name="pause-circle" size={64} color={buttonColor} />
                        </Pressable>
                        :
                        <Pressable onPressOut={play}>
                            <Ionicons name="play-circle" size={64} color={buttonColor} />
                        </Pressable>
                    }
                    <Pressable>
                        <Ionicons name="play-skip-forward" size={32} color={buttonColor} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        position: 'absolute',
        top: 16,
        left: 16,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cover: {
        width: '80%',
        height: 'auto',
        aspectRatio: 1,
        borderRadius: 16,
        // margin: 16,
        resizeMode: "stretch",
    },
    trackInfo: {
        width: '80%',
        // flex: 0.1,
        margin: 16,
        alignItems: "flex-start"
    },
    title: {
        color: '#FFFFFF',
        fontSize: 30,
    },
    artist: {
        color: '#FFFFFF',
        opacity: .75,
    },
    slider: {
        width: '80%',
        margin: 16,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
    },


});