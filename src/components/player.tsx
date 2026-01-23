import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from '@react-native-community/slider';
import { PropsWithChildren, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { useAudio } from "./audioProvider";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hide } from "../store/slices/playerSlice";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

function formatTime(seconds: number) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function Player() {
    // const [play, setPlay] = useState(true);
    const { isPlaying, currentTime, duration, play, pause, seek } = useAudio();
    const buttonColor = "#fff";

    // for the slider and local number updating: localTime is the value the user is currently dragging the slider to
    const [localTime, setLocalTime] = useState(currentTime);
    const [isSliding, setIsSliding] = useState(false);

    const dispatch = useAppDispatch();

    const isExpanded = useAppSelector(state => state.player.visible);

    // grab information from global redux store
    const { currentArtist, currentTrack, currentPicture } = useAppSelector(state => ({
        currentArtist: state.player.currentArtist,
        currentTrack: state.player.currentTrack,
        currentPicture: state.player.currentPicture,
    }));


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
                <Image source={currentPicture ? { uri: currentPicture } : require('@/assets//images//612I5v0KlEL.jpg')} style={styles.cover} />
                <View style={styles.trackInfo}>
                    <Text style={styles.title}>{currentTrack}</Text>
                    <Text style={styles.artist}>{currentArtist}</Text>
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
                    onSlidingComplete={(time) => { setIsSliding(false); seek(time) }}
                    onSlidingStart={() => setIsSliding(true)}
                    onValueChange={(time) => setLocalTime(time)}
                />
                {/* for the time */}
                <View style={styles.time}>
                    <Text style={{ color: '#FFF' }}>{formatTime(isSliding ? localTime : currentTime)}</Text>
                    <Text style={{ color: '#FFF' }}>{formatTime(duration)}</Text>
                </View>
                <View style={styles.controls}>
                    <Pressable onPressOut={() => console.log("hi")}>
                        <Ionicons name="play-skip-back" size={32} color={buttonColor} />
                    </Pressable>
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
    time: {
        flexDirection: 'row', justifyContent: "space-between", width: "75%"
    },
    slider: {
        width: '85%',
        marginHorizontal: 16,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
    },


});