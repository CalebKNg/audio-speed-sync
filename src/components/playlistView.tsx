import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { Playlist, PlaylistCache } from '../functions/playlists';
import { useAppSelector } from '../store/hooks';

type ItemProps = { title: string, onPress: () => void };

const Item = ({ title, onPress }: ItemProps) => (
    <Pressable style={styles.item} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
    </Pressable>
);

interface PlaylistViewProps {
    onPlaylistSelect: (playlistId: string) => void;
}

export default function PlaylistView({ onPlaylistSelect }: PlaylistViewProps) {

    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const playlistFlag = useAppSelector(state => state.ui.playlistFlag);

    useEffect(() => {
        const allPlaylists = PlaylistCache.getAll('Recents');
        setPlaylists(allPlaylists);
    }, [playlistFlag])

    return (
        <FlatList
            data={playlists}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Item
                    title={item.name}
                    onPress={() => onPlaylistSelect(item.id)}
                />
            )}
            style={styles.list}
            contentContainerStyle={{ paddingBottom: 80 }}
        />
    )
}

const styles = StyleSheet.create({
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