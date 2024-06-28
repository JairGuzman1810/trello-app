import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

type Task = {
  description: string;
};

type TaskListItemProps = {
  task: Task;
};

export default function TaskListItem({ task }: TaskListItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{task.description}</Text>
      <FontAwesome name="close" size={24} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D2125",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
});
