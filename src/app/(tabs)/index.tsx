import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import MiniPlayer from "../../components/miniPlayer";
import Player from "../../components/player";
import { common } from "../../styles/common";

// Redux imports
import { hide, show } from "../features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function Index() {
  // redux
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector(state => state.player.visible)

  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <View style={common.pageView}>
      <View></View>
      {/* <Player isVisible={isVisible} onClose={() => setIsVisible(!isVisible)} /> */}
      <Player isVisible={isExpanded} onClose={() => dispatch(hide())} />

      {/* <MiniPlayer onPress={() => setIsVisible(!isVisible)} /> */}
      <MiniPlayer onPress={() => dispatch(show())} />
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