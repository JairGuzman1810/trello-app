import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Task } from "@/models/Task";
import { BSON } from "realm";
import { useObject } from "@realm/react";

type DraggingTaskProps = {
  id: BSON.ObjectID;
};

export default function DraggingTask({ id }: DraggingTaskProps) {
  const task = useObject(Task, id);

  if (!task) {
    return (
      <View style={styles.notfoundcontainer}>
        <Text style={styles.text}>Task not found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {task.position}: {task.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D2125",
    padding: 17.9,
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
  notfoundcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});