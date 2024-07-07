import { StyleSheet, View } from "react-native";
import React from "react";
import TaskList from "./TaskList";
import { LinearGradient } from "expo-linear-gradient";
import TaskDragArea from "./TaskDragArea";

export default function TaskBoard() {
  return (
    <TaskDragArea>
      <View style={styles.container}>
        <LinearGradient
          colors={["#8711c1", "#2472fc"]}
          style={StyleSheet.absoluteFill}
        />
        <TaskList />
      </View>
    </TaskDragArea>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});
