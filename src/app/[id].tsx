import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const TaskDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Task Details" }}></Stack.Screen>
      <Text style={styles.text}>Id: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  text: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat-Regular",
  },
});

export default TaskDetails;
