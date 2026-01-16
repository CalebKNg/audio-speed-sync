import { Stack } from "expo-router";
import { StyleSheet, View } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});