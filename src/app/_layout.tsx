import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import RealmCustomProvider from "@/providers/Realm";

export default function RootLayout() {
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
      <ThemeProvider value={DarkTheme}>
        <RealmCustomProvider>
          <Stack
            screenOptions={{
              headerTitleAlign: "center",
              headerTitleStyle: { fontFamily: "Montserrat-Bold" },
            }}
          >
            <Stack.Screen
              name="index"
              options={{ title: "Project Board" }}
            ></Stack.Screen>
          </Stack>
        </RealmCustomProvider>

        <StatusBar style="light" />
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
