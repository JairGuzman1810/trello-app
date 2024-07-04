import TaskBoard from "@/components/TaskBoard";
import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "@realm/react"; // Adjust the import according to your setup

export default function HomeScreen() {
  const user = useUser();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Project Board",
          headerRight: () =>
            user.identities.length > 1 ? (
              <Link href={"/profile"}>
                <FontAwesome name="user-circle-o" size={22} color="lightgray" />
              </Link>
            ) : (
              <Link href={"/login"}>
                <FontAwesome name="sign-in" size={22} color="lightgray" />
              </Link>
            ),
          headerBackVisible: false,
        }}
      />
      <TaskBoard />
    </View>
  );
}
