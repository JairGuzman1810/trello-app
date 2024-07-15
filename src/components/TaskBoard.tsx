import { StyleSheet, View } from "react-native";
import React from "react";
import TaskList from "./TaskList";
import { LinearGradient } from "expo-linear-gradient";
import TaskDragArea from "./TaskDragArea";
import { BSON } from "realm";
import { Task } from "@/models/Task";
import { useRealm } from "@realm/react";
import { ItemHeight } from "./TaskListItem";

export default function TaskBoard() {
  const realm = useRealm();

  const updateItemPosition = (ItemID: BSON.ObjectID, y: number) => {
    // Get all tasks and sort them by their position
    const tasks = realm.objects(Task).sorted("position");
    const taskCount = tasks.length;

    // Calculate the new position based on the y-coordinate
    // Ensure newPosition is at least 1 and does not exceed the number of tasks
    const newPosition = Math.max(
      1,
      Math.min(Math.ceil((y - 73) / ItemHeight), taskCount),
    );

    realm.write(() => {
      // Find the task that needs to be updated
      const toUpdate = tasks.filtered("_id == $0", ItemID)[0];
      const oldPosition = toUpdate.position;

      // Only proceed if the new position is different from the old position
      if (newPosition !== oldPosition) {
        // Update positions of other tasks
        if (newPosition < oldPosition) {
          // If the new position is less than the old position
          // Increment the positions of tasks in the range [newPosition, oldPosition)
          tasks
            .filtered(
              "position >= $0 AND position < $1",
              newPosition,
              oldPosition,
            )
            .forEach((task) => (task.position += 1));
        } else {
          // If the new position is greater than the old position
          // Decrement the positions of tasks in the range (oldPosition, newPosition]
          tasks
            .filtered(
              "position > $0 AND position <= $1",
              oldPosition,
              newPosition,
            )
            .forEach((task) => (task.position -= 1));
        }

        // Update the position of the moved task
        toUpdate.position = newPosition;
      }
    });
  };

  return (
    <TaskDragArea updateItemPosition={updateItemPosition}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#8711c1", "#2472fc"]}
          style={StyleSheet.absoluteFill}
        />
        <TaskList />
      </View>
    </TaskDragArea>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});
