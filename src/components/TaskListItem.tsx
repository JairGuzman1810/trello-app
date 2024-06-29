import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Task } from "@/models/Task";
import { useRealm } from "@realm/react";

type TaskListItemProps = {
  task: Task;
};

export default function TaskListItem({ task }: TaskListItemProps) {
  const realm = useRealm();
  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  };

  return (
    <Link href={`/${task._id}`} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.text}>{task.description}</Text>
        <TouchableOpacity onPress={deleteTask}>
          <FontAwesome name="close" size={24} color="gray" />
        </TouchableOpacity>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D2125",
    padding: 15,
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
