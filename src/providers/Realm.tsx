import { PropsWithChildren } from "react";
import Realm from "realm";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { Task } from "@/models/Task";
import AnonymousLogin from "@/components/AnonymousLogin";

export default function RealmCustomProvider({ children }: PropsWithChildren) {
  // Get the app ID from environment variables
  const realmAppId = process.env.EXPO_PUBLIC_TRELLO_APP_ID;

  // Check if the app ID is defined
  if (!realmAppId) {
    throw new Error("Realm App ID must be defined in environment variables");
  }

  return (
    <AppProvider id={realmAppId}>
      <UserProvider fallback={AnonymousLogin}>
        <RealmProvider
          schema={[Task]}
          closeOnUnmount={false}
          sync={{
            onError: (_session, error) => {
              console.log(error);
            },
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(Task));
              },
              rerunOnOpen: true,
            },
          }}
        >
          {children}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
