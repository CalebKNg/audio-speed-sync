import { Button, View } from 'react-native';
import { AudioContext } from 'react-native-audio-api';

export default function AudioPlayer() {
    const handlePlay = async () => {
        const audioContext = new AudioContext();

        const audioBuffer = await fetch('https://software-mansion.github.io/react-native-audio-api/audio/music/example-music-01.mp3')
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));
        const playerNode = audioContext.createBufferSource();
        playerNode.buffer = audioBuffer;

        playerNode.connect(audioContext.destination);
        playerNode.start(audioContext.currentTime);
        playerNode.stop(audioContext.currentTime + 10);
    }

    return (
        <View>
            <Button onPress={handlePlay} title="play sound" />
        </View>
    )
}