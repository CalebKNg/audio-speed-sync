import { useAudio } from '@/src/components/audioProvider';
import { setCurrentTrack } from '@/src/store/slices/playerSlice';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAudioLibrary, type AudioAssetWithMetadata } from '../../functions/scanLibrary';
import { useAppDispatch } from "../../store/hooks";
import { common } from "../../styles/common";

type ItemProps = { title: string, artist: string, imageUri: string | undefined, onPress: () => void };

const Item = ({ title, artist, imageUri, onPress }: ItemProps) => (
    <Pressable style={styles.item} onPress={onPress}>
        <Image source={
            imageUri ? { uri: imageUri } : require('@/assets/images/missing_cover.jpg')}
            style={{ height: 40, width: 'auto', aspectRatio: 1, marginRight: 10 }
            } />
        <View style={{ flexDirection: 'column', alignContent: 'center' }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.artist}>{artist}</Text>
        </View>
    </Pressable>
);

export default function Search() {
    const [searchParam, setSearchParam] = useState("");

    // keep track of files loaded into search
    const [mediaFiles, setMediaFiles] = useState<AudioAssetWithMetadata[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<AudioAssetWithMetadata[]>([]);
    // const handleSearch = async () => {
    //     const files = await searchLibrary();
    //     setMediaFiles(files);
    // }
    const { tracks, isLoading, loadLibrary } = useAudioLibrary();
    const { loadTrack } = useAudio();

    //redux 
    const dispatch = useAppDispatch();

    // grab songs on init
    useEffect(() => {
        loadLibrary()
    }, [])

    // synchronize local copy of music with the audio library
    useEffect(() => {
        setMediaFiles(tracks)
        setFilteredFiles(tracks);
    }, [tracks])

    // update filtered files when search bar changes
    useEffect(() => {
        if (searchParam.trim() === "") {
            setFilteredFiles(mediaFiles);
        } else {
            const filtered = mediaFiles.filter(item =>
                item.title.toLowerCase().includes(searchParam.toLowerCase())
            );
            setFilteredFiles(filtered);
        }
    }, [searchParam, mediaFiles]);

    return (
        <View style={common.pageView} >
            <View style={styles.searchSpan}>
                <TextInput
                    style={styles.searchInput}
                    value={searchParam}
                    onChangeText={setSearchParam}
                    placeholder='What do you want to listen to?'
                    placeholderTextColor="#888888" // change this to any color you want
                />
            </View>
            {/* <Button title="search again" onPress={loadLibrary} /> */}
            <FlatList
                // data={DATA}
                data={filteredFiles}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Item title={item.title} artist={item.artist} imageUri={item.picture} onPress={() => { loadTrack(item.uri, item.title,); dispatch(setCurrentTrack({ artist: item.artist, track: item.title, picture: item.picture })) }} />}
                keyboardDismissMode="on-drag"
                style={styles.list}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchSpan: {
        flexDirection: 'row',
        marginVertical: 10,
        // marginBottom: 20,
        height: 50,
        width: '100%',
        justifyContent: 'center'
        // flex: .1,
    },
    searchInput: {
        backgroundColor: '#fff',
        flex: .95,
        borderRadius: 5,
        // to bump the placeholder a bit ot the right
        paddingLeft: 10,
        // flex: .5
        // height: 50,
        // width: 50,
    },
    list: {
        width: '100%'
    },
    item: {
        backgroundColor: '#25292e',
        padding: 20,
        flexDirection: 'row',
        alignContent: 'center'
        // borderColor: '#000',
        // borderWidth: 1
        // marginVertical: 8,
        // marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        color: '#FFF'
    },
    artist: {
        fontSize: 10,
        color: '#FFF'
    },
});