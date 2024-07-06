import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Task } from "@/models/Task";
import { useRealm } from "@realm/react";
import { useDraggingContext } from "./TaskDragArea";

type TaskListItemProps = {
  task: Task;
  index: number;
};

export const ItemHeight = 60;

export default function TaskListItem({ task, index }: TaskListItemProps) {
  const realm = useRealm();
  const { setDraggingTask } = useDraggingContext();
  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  };

  return (
    <View style={styles.root}>
      <Link href={`/${task._id}`} asChild>
        <Pressable
          style={styles.container}
          onLongPress={() => setDraggingTask(task._id, index * ItemHeight)}
        >
          <Text style={styles.text}>
            {task.position}: {task.description}
          </Text>
          <TouchableOpacity onPress={deleteTask}>
            <FontAwesome name="close" size={24} color="gray" />
          </TouchableOpacity>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 3,
    height: ItemHeight,
  },
  container: {
    backgroundColor: "#1D2125",
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
});
