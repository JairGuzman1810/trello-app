import { StyleSheet, View, useWindowDimensions } from "react-native";
import DraggingTask from "./DraggingTask";
import { BSON } from "realm";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useSharedValue } from "react-native-reanimated";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type DraggingContextProps = {
  setDraggingTask: (id: BSON.ObjectID, y: number) => void;
};

const DraggingContext = createContext<DraggingContextProps>({
  setDraggingTask: () => {},
});

export default function TaskDragArea({ children }: PropsWithChildren) {
  const [draggingTaskId, setDraggingTaskId] = useState<
    BSON.ObjectID | undefined
  >();
  //new BSON.ObjectID("66881132032eee805441d971")
  const { width } = useWindowDimensions();

  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const pan = Gesture.Pan()
    .onChange((event) => {
      dragX.value = dragX.value + event.changeX;
      dragY.value = dragY.value + event.changeY;
    })
    .onFinalize(() => {
      runOnJS(setDraggingTaskId)(undefined);
    });

  const setDraggingTask = (id: BSON.ObjectID, y: number) => {
    setDraggingTaskId(id);
    dragY.value = y + 72;
    dragX.value = 0;
  };
  return (
    <DraggingContext.Provider value={{ setDraggingTask }}>
      {children}
      <GestureDetector gesture={pan}>
        {draggingTaskId ? (
          <View
            style={[
              styles.container,
              draggingTaskId && { backgroundColor: "rgba(100,100,100, 0.1)" },
            ]}
          >
            <Animated.View
              style={[
                styles.content,
                { width: width - 40, top: dragY, left: dragX },
              ]}
            >
              <DraggingTask id={draggingTaskId} />
            </Animated.View>
          </View>
        ) : (
          <View />
        )}
      </GestureDetector>
    </DraggingContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...(StyleSheet.absoluteFill as object),
  },
  content: {
    alignSelf: "center",
    transform: [{ rotateZ: "3deg" }],
  },
});

export const useDraggingContext = () => useContext(DraggingContext);
