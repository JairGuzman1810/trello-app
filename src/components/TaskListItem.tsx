import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Task } from "@/models/Task";
import { useRealm } from "@realm/react";
import { useDraggingContext } from "./TaskDragArea";
import Animated, {
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type TaskListItemProps = {
  task: Task;
  index: number;
};

export const ItemHeight = 60;

export default function TaskListItem({ task, index }: TaskListItemProps) {
  const realm = useRealm();
  const { setDraggingTask, dragY, draggingTaskId } = useDraggingContext();

  const marginTop = useSharedValue(0);

  const isDragging = draggingTaskId
    ? draggingTaskId.toString() === task._id.toString()
    : false;

  useAnimatedReaction(
    () => dragY?.value,
    (newDragY) => {
      if (!newDragY) return (marginTop.value = 0);

      const itemY = index * ItemHeight + 73;

      //above the first item, will make a space (margin)
      if (index === 0 && newDragY < itemY + ItemHeight) {
        marginTop.value = withTiming(ItemHeight);
      }
      //if top of the current time
      marginTop.value = withTiming(
        newDragY >= itemY && newDragY < itemY + ItemHeight ? ItemHeight : 0,
      );
    },
  );

  useEffect(() => {
    const itemY = index * ItemHeight + 73;
    if (draggingTaskId && dragY) {
      marginTop.value =
        dragY?.value >= itemY && dragY?.value < itemY + ItemHeight
          ? ItemHeight
          : 0;
    } else {
      marginTop.value = 0;
    }
  }, [dragY, draggingTaskId, index, marginTop]);

  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  };

  if (isDragging) {
    return <Animated.View style={{ marginTop }} />;
  }

  return (
    <Animated.View style={[styles.root, { marginTop }]}>
      <Link href={`/${task._id}`} asChild>
        <Pressable
          style={styles.container}
          onLongPress={() => setDraggingTask(task._id, index * ItemHeight + 73)}
        >
          <Text style={styles.text}>
            {task.position}: {task.description}
          </Text>
          <TouchableOpacity onPress={deleteTask}>
            <FontAwesome name="close" size={24} color="gray" />
          </TouchableOpacity>
        </Pressable>
      </Link>
    </Animated.View>
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
  placeholder: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    backgroundColor: "#1D2125",
    height: "100%",
    borderStyle: "dashed",
  },
});
