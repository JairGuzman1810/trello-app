import { useFonts } from "expo-font";
import { useCallback } from "react";
import { StyleSheet, StatusBar, View, Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import TaskBoard from "@/components/TaskBoard";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Montserrat-Regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <TaskBoard />
      {Platform.OS === "android" && (
        <StatusBar
          animated={true}
          backgroundColor="#8711c1"
          barStyle="light-content"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
