import { useAudio } from '@/src/components/audioProvider';
import { useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { common } from "../../styles/common";
import { searchLibrary, type AudioAssetWithMetadata } from '../features/scanner/scanLibrary';

type ItemProps = { title: string, onPress: () => void };

const Item = ({ title, onPress }: ItemProps) => (
    <Pressable style={styles.item} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
    </Pressable>
);

const DATA = [
    {
        title: "First Item",
    },
    {
        title: "Second Item",
    },
    {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    }, {
        title: "Second Item",
    },
];

export default function Search() {
    const [searchParam, setSearchParam] = useState("");

    const [mediaFiles, setMediaFiles] = useState<AudioAssetWithMetadata[]>([]);

    const handleSearch = async () => {
        const files = await searchLibrary();
        setMediaFiles(files);
    }
    const { loadTrack } = useAudio();
    return (
        <View style={common.pageView} >
            <View style={styles.searchSpan}>
                <TextInput
                    style={styles.searchInput}
                    value={searchParam}
                    placeholder='What do you want to listen to?'
                />
            </View>
            <Button title="search again" onPress={handleSearch} />
            <FlatList
                // data={DATA}
                data={mediaFiles}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Item title={item.title} onPress={() => loadTrack(item.uri, item.title,)} />}
                keyboardDismissMode="on-drag"
                style={styles.list}
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