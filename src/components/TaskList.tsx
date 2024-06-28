import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskListItem from "./TaskListItem";
import { useState } from "react";

type Task = {
  description: string;
};

const dummyTasks: Task[] = [
  { description: "First Task" },
  { description: "Second Task" },
  { description: "Third Task" },
];

export default function TaskList() {
  const [tasks, setTasks] = useState(dummyTasks);
  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>Todo</Text>
      </View>
      {/* List of tasks */}
      <FlatList
        data={tasks}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <TaskListItem task={item} />}
      />

      {/* New Task input */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101112",
    padding: 10,
    borderRadius: 5,
  },
  titlecontainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
});
