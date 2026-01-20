import { useAudio } from "@/src/components/audioProvider";
import Slider from "@react-native-community/slider";
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

  const { setDetune, setPlaybackRate } = useAudio();

  useEffect(() => {
    dispatch(setTabHeight(tabHeight));
  }, [tabHeight]);
  const speed = useAppSelector(state => state.location.speed);
  return (
    <View style={common.pageView}>
      <Text style={{ color: '#FFF' }}>{speed}</Text>
      <Slider
        style={{
          width: '85%',
          marginHorizontal: 16
        }}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor='#808080'
        thumbTintColor="#FFFFFF"
        minimumValue={0.5}
        maximumValue={5}
        value={1}
        onValueChange={setPlaybackRate}
      />
      <Slider
        style={{
          width: '85%',
          marginHorizontal: 16
        }}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor='#808080'
        thumbTintColor="#FFFFFF"
        minimumValue={-1200}
        maximumValue={1200}
        value={0}
        onValueChange={(setDetune)}
      />
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