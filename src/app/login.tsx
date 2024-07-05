import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  AuthOperationName,
  useAuth,
  useEmailPasswordAuth,
  useUser,
} from "@realm/react";
import { Ionicons } from "@expo/vector-icons";
import { Credentials } from "realm";

export default function LoginScreen() {
  const { result, logInWithEmailPassword } = useAuth();
  const { register } = useEmailPasswordAuth();
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const linkCredentials = useCallback(async () => {
    const credentials = Credentials.emailPassword({ email, password });
    await user.linkCredentials(credentials);
  }, [email, password, user]);

  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      linkCredentials();
    }
  }, [linkCredentials, result, user]);

  // Check if the user is authenticated and redirect to Profile screen
  console.log(result);

  const isButtonDisabled = email === "" || password === "";

  return (
    <KeyboardAvoidingView
      style={styles.content}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoComplete="email"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoComplete="password"
          textContentType="password"
          placeholder="Password"
          placeholderTextColor="#aaa"
        />
        <Pressable
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color="#aaa"
          />
        </Pressable>
      </View>

      {result?.error?.operation ===
        AuthOperationName.LogInWithEmailPassword && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            There was an error logging in, please try again
          </Text>
        </View>
      )}

      {result?.error?.operation === AuthOperationName.Register && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            There was an error registering, please try again
          </Text>
        </View>
      )}

      <View style={styles.buttons}>
        <Pressable
          onPress={() => logInWithEmailPassword({ email, password })}
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          disabled={isButtonDisabled || result.pending}
        >
          {result.pending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => register({ email, password })}
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          disabled={isButtonDisabled || result.pending}
        >
          {result.pending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D2125",
    padding: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 15,
    position: "relative",
  },
  input: {
    backgroundColor: "#2D2D2D",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    color: "#fff",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    paddingRight: 40, // Add some padding to the right for the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }], // Half of the icon size (24/2)
  },
  errorContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFCDD2",
    borderRadius: 5,
  },
  errorText: {
    color: "#B71C1C",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
  buttons: {
    width: "80%",
    marginTop: 20,
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
    marginBottom: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#888",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    textAlign: "center",
  },
});
