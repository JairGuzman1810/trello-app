import { useEffect } from "react";
import { useAuth } from "@realm/react";

const AnonymousLogin = () => {
  const { logInWithAnonymous } = useAuth();

  useEffect(() => {
    logInWithAnonymous();
  }, [logInWithAnonymous]);

  return null;
};

export default AnonymousLogin;
