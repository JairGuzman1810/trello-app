import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import TaskListItem from "./TaskListItem";
import { useState } from "react";

type Task = {
  description: string;
};

const dummyTasks: Task[] = [
  { description: "First Task" },
  { description: "Second Task" },
];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [newTask, setNewTask] = useState("");

  const createTask = () => {
    setTasks([...tasks, { description: newTask }]);
    setNewTask("");
  };
  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Todo</Text>
      </View>
      {/* List of tasks */}
      <FlatList
        data={tasks}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <TaskListItem task={item} />}
      />
      {/* New Task input */}
      <TextInput
        placeholder="New Task"
        value={newTask}
        onChangeText={setNewTask}
        placeholderTextColor={"gray"}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={createTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101112",
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  input: {
    color: "#fff",
    padding: 13.5,
    backgroundColor: "#1D2125",
    borderRadius: 5,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  button: {
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
});
