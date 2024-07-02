import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useAuth } from "@realm/react";

const Login = () => {
  const { logInWithAnonymous, result } = useAuth();

  const guestLogin = () => {
    logInWithAnonymous();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={guestLogin}
        style={styles.button}
        disabled={result.pending}
      >
        {result.pending ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue as Guest</Text>
        )}
      </TouchableOpacity>
      {result.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {result.error.message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D2125",
    padding: 20,
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
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    textAlign: "center",
  },
  errorContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFCDD2",
    borderRadius: 5,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#B71C1C",
  },
});

export default Login;
