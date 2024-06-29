import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useObject } from "@realm/react";
import { Task } from "@/models/Task";
import { BSON } from "realm";

const TaskDetails = () => {
  const { id } = useLocalSearchParams();

  const task = useObject<Task>(Task, new BSON.ObjectID(id as string));

  if (!task) {
    return (
      <View style={styles.notfoundcontainer}>
        <Stack.Screen options={{ title: "Task Details" }}></Stack.Screen>
        <Text style={styles.text}>Task not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Task Details" }}></Stack.Screen>
      <Text style={styles.text}>{task.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notfoundcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: { padding: 10 },
  text: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat-Regular",
  },
});

export default TaskDetails;
