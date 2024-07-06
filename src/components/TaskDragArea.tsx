import { StyleSheet, View, useWindowDimensions } from "react-native";
import DraggingTask from "./DragginTask";
import { BSON } from "realm";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useSharedValue } from "react-native-reanimated";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type DraggingContextProps = {
  setDraggingTask: (id: BSON.ObjectID) => void;
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
    .onUpdate((event) => {
      dragX.value = event.absoluteX;
      dragY.value = event.absoluteY;
    })
    .onFinalize(() => {
      runOnJS(setDraggingTaskId)(undefined);
    });

  const setDraggingTask = (id: BSON.ObjectID) => {
    console.log("Implemented");

    setDraggingTaskId(id);
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
              style={{
                width: width - 40,
                alignSelf: "center",
                top: dragY,
                left: dragX,
              }}
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
});

export const useDraggingContext = () => useContext(DraggingContext);
