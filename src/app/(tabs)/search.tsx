import { useAudio } from '@/src/components/audioProvider';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAudioLibrary, type AudioAssetWithMetadata } from '../../functions/scanLibrary';
import { common } from "../../styles/common";

type ItemProps = { title: string, onPress: () => void };

const Item = ({ title, onPress }: ItemProps) => (
    <Pressable style={styles.item} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
    </Pressable>
);

// const DATA = [
//     {
//         title: "First Item",
//     },
//     {
//         title: "Second Item",
//     },
//     {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     }, {
//         title: "Second Item",
//     },
// ];

export default function Search() {
    const [searchParam, setSearchParam] = useState("");

    const [mediaFiles, setMediaFiles] = useState<AudioAssetWithMetadata[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<AudioAssetWithMetadata[]>([]);
    // const handleSearch = async () => {
    //     const files = await searchLibrary();
    //     setMediaFiles(files);
    // }
    const { tracks, isLoading, loadLibrary } = useAudioLibrary();
    const { loadTrack } = useAudio();

    useEffect(() => {
        loadLibrary()
    }, [])

    useEffect(() => {
        setMediaFiles(tracks)
        setFilteredFiles(tracks);
    }, [tracks])

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
                />
            </View>
            {/* <Button title="search again" onPress={loadLibrary} /> */}
            <FlatList
                // data={DATA}
                data={filteredFiles}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Item title={item.title} onPress={() => loadTrack(item.uri, item.title,)} />}
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
        // marginVertical: 8,
        // marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        color: '#FFF'
    },
});