import { Stack } from "expo-router";
import { StyleSheet, View } from 'react-native';
import { Provider } from "react-redux";
import MiniPlayer from "../components/miniPlayer";
import Player from "../components/player";
import { store } from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <Player />
        <MiniPlayer />
      </View>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
});