import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AuthOperationName, useAuth, useUser } from "@realm/react";
import { useRouter } from "expo-router";
import * as Updates from "expo-updates";

export default function Profile() {
  const user = useUser();
  const { logOut, result } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
  };

  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.LogOut) {
      Updates.reloadAsync();
    }
  }, [result, router]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name="user-circle-o" size={100} color="lightgray" />
      </View>
      <Text style={styles.emailText}>
        {user?.profile?.email || "User Email"}
      </Text>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginBottom: 24,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 24,
    color: "#fff",
  },
  button: {
    backgroundColor: "#8711c1",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});