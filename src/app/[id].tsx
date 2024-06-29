import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useObject, useRealm } from "@realm/react";
import { Task } from "@/models/Task";
import { BSON } from "realm";

const TaskDetails = () => {
  const { id } = useLocalSearchParams();

  const task = useObject<Task>(Task, new BSON.ObjectID(id as string));

  const [updatedDescription, setUpdatedDescription] = useState(
    task?.description || "",
  );

  const realm = useRealm();

  const updateDescription = () => {
    if (!task) {
      return;
    }
    realm.write(() => {
      task.description = updatedDescription;
    });
  };

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
      <TextInput
        value={updatedDescription}
        onChangeText={setUpdatedDescription}
        onEndEditing={updateDescription}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  notfoundcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },
  input: {
    color: "#fff",
    padding: 13.5,
    backgroundColor: "#1D2125",
    borderRadius: 5,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
});

export default TaskDetails;
