import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from '@react-native-community/slider';
import { PropsWithChildren, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

//redux
import { hide } from "../app/features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function Player() {
    const [play, setPlay] = useState(true);
    const buttonColor = "#fff";

    const dispatch = useAppDispatch();
    const isExpanded = useAppSelector(state => state.player.visible);

    return (
        <Modal animationType="slide" transparent={true} visible={isExpanded} onRequestClose={() => dispatch(hide())}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPressOut={() => dispatch(hide())} style={{ padding: 12 }}>
                        <Ionicons name='chevron-down' size={32} color={buttonColor} />
                    </Pressable>
                </View>
                <Image source={require('@/assets//images//612I5v0KlEL.jpg')} style={styles.cover} />
                <View style={styles.trackInfo}>
                    <Text style={styles.title}>Meidei</Text>
                    <Text style={styles.artist}>Radwimps</Text>
                </View>
                <Slider
                    style={styles.slider}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor='#808080'
                    thumbTintColor="#FFFFFF"
                />
                <View style={styles.controls}>
                    <Pressable>
                        <Ionicons name="play-skip-back" size={32} color={buttonColor} />
                    </Pressable>
                    <Pressable onPressOut={() => setPlay(!play)}>
                        {play ?
                            <Ionicons name="play-circle" size={64} color={buttonColor} />
                            :
                            <Ionicons name="pause-circle" size={64} color={buttonColor} />
                        }
                    </Pressable>
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