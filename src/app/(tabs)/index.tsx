import { useAudio } from "@/src/components/audioProvider";
// import Slider from "@react-native-community/slider";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setTabHeight } from "../../store/slices/uiSlice";
import { common } from "../../styles/common";

export default function Index() {
  const router = useRouter();
  // set bar height
  const dispatch = useAppDispatch();
  const tabHeight = useBottomTabBarHeight();

  const { setDetune, setPlaybackRate, setPlaybackFromSpeed } = useAudio();

  useEffect(() => {
    dispatch(setTabHeight(tabHeight));
  }, [tabHeight]);

  const speed = useAppSelector(state => state.location.speed);

  useEffect(() => {
    setPlaybackFromSpeed(speed)
  }, [speed])

  return (
    <View style={common.pageView}>
      <Text style={{ color: '#FFF' }}>work in progress lmao</Text>

      {/* <Text style={{ color: '#FFF' }}>{speed}</Text> */}
      <View />

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