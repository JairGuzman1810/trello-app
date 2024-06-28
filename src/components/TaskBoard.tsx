import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import TaskList from "./TaskList";
import { LinearGradient } from "expo-linear-gradient";

export default function TaskBoard() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8711c1", "#2472fc"]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView>
        <TaskList />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});
