import { useAuth } from "@realm/react";

const AnonymousLogin = () => {
  const { logInWithAnonymous } = useAuth();

  logInWithAnonymous();

  return null;
};

export default AnonymousLogin;
