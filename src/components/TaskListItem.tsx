import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Task } from "@/models/Task";
import { useRealm } from "@realm/react";
import { useDraggingContext } from "./TaskDragArea";
import Animated, {
  useAnimatedStyle,
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
  const isDragging = draggingTaskId
    ? draggingTaskId.toString() === task._id.toString()
    : false;
  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    //If not selected then, the margin top reset to 0, so there are not spaces
    if (!dragY)
      return {
        marginTop: 0,
      };

    const itemY = index * ItemHeight + 72;

    //above the first item, will make a space (margin)
    if (index === 0 && dragY.value < itemY + ItemHeight) {
      return {
        marginTop: withTiming(ItemHeight),
      };
    }
    //if top of the current time
    return {
      marginTop: withTiming(
        dragY?.value > itemY && dragY.value < itemY + ItemHeight
          ? ItemHeight
          : 0,
      ),
    };
  });

  if (isDragging) {
    return <Animated.View style={animatedStyle} />;
  }

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      <Link href={`/${task._id}`} asChild>
        <Pressable
          style={styles.container}
          onLongPress={() => setDraggingTask(task._id, index * ItemHeight + 72)}
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
