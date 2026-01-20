import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { common } from "../../styles/common";
import { setTabHeight } from "../features/ui/uiSlice";
import { useAppDispatch } from "../hooks";


export default function Index() {
  const router = useRouter();
  // set bar height
  const dispatch = useAppDispatch();
  const tabHeight = useBottomTabBarHeight();

  useEffect(() => {
    dispatch(setTabHeight(tabHeight));
  }, [tabHeight]);

  return (
    <View style={common.pageView}>
      <View>
        {/* <AudioPlayer /> */}
      </View>
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