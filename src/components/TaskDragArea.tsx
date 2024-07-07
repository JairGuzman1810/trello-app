import { StyleSheet, View, useWindowDimensions } from "react-native";
import DraggingTask from "./DraggingTask";
import { BSON } from "realm";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  runOnJS,
  useSharedValue,
} from "react-native-reanimated";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type DraggingContextProps = {
  setDraggingTask: (id: BSON.ObjectID, y: number) => void;
  dragY?: SharedValue<number>;
  draggingTaskId: BSON.ObjectID | undefined;
};

const DraggingContext = createContext<DraggingContextProps>({
  setDraggingTask: () => {},
  draggingTaskId: undefined,
});

export default function TaskDragArea({ children }: PropsWithChildren) {
  const [draggingTaskId, setDraggingTaskId] = useState<
    BSON.ObjectID | undefined
  >(undefined); // Inicializar correctamente
  const { width } = useWindowDimensions();

  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);

  const pan = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((event, stateManager) => {
      if (draggingTaskId) {
        stateManager.activate();
      }
    })
    .onChange((event) => {
      dragX.value = dragX.value + event.changeX;
      dragY.value = dragY.value + event.changeY;
    })
    .onFinalize(() => {
      runOnJS(setDraggingTaskId)(undefined);
    });

  const setDraggingTask = (id: BSON.ObjectID, y: number) => {
    setDraggingTaskId(id);
    dragY.value = y;
    dragX.value = 0;
  };

  return (
    <DraggingContext.Provider
      value={{
        setDraggingTask,
        dragY: draggingTaskId ? dragY : undefined,
        draggingTaskId: draggingTaskId,
      }}
    >
      <GestureDetector gesture={pan}>
        <View style={styles.container}>
          {children}
          <Animated.View
            style={[
              styles.content,
              {
                width: width - 40,
                position: "absolute",
                top: dragY,
                left: dragX,
              },
            ]}
          >
            {draggingTaskId && <DraggingTask id={draggingTaskId} />}
          </Animated.View>
        </View>
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
