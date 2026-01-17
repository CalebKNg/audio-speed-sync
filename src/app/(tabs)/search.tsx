import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { common } from "../../styles/common";
import { searchLibrary } from '../features/scanner/scanLibrary';

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
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

    const [mediaFiles, setMediaFiles] = useState<MediaLibrary.Asset[]>([]);

    const handleSearch = async () => {
        const files = await searchLibrary();
        setMediaFiles(files);
    }

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
                renderItem={({ item }) => <Item title={item.filename} />}
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