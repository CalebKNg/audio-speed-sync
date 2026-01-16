import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import MiniPlayer from "../../components/miniPlayer";
import Player from "../../components/player";
import { common } from "../../styles/common";

export default function Index() {
  const router = useRouter();

  return (
    <View style={common.pageView}>
      <View></View>
      <Player />
      <MiniPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff'
  }
})