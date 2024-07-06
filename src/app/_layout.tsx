import { StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import "react-native-get-random-values";
import RealmCustomProvider from "@/providers/Realm";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

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
    <GestureHandlerRootView
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <ThemeProvider value={DarkTheme}>
        <RealmCustomProvider>
          <Stack
            initialRouteName="index"
            screenOptions={{
              headerTitleAlign: "center",
              headerTitleStyle: { fontFamily: "Montserrat-Bold" },
            }}
          >
            <Stack.Screen
              name="login"
              options={{
                title: "Login",
              }}
            />
            <Stack.Screen
              name="profile"
              options={{
                title: "Profile",
              }}
            />
          </Stack>
        </RealmCustomProvider>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
