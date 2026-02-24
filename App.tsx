import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/lib/queryClient";
import TodayScreen from "./src/features/TodayScreen";
import ChatScreen from "./src/features/ChatScreen";
import ReflectScreen from "./src/features/ReflectScreen";
import { ReflectAnswers } from "./src/lib/reflectState";
import { useState } from "react";
import { View, Pressable, Text } from "react-native";

export default function App() {
  const [tab, setTab] = useState<"home" | "chat" | "reflect">("home");

  const [reflectState, setReflectState] = useState<
    "GREEN" | "YELLOW" | "ORANGE" | "RED" | null
  >(null);

  const [reflectAnswers, setReflectAnswers] = useState<ReflectAnswers>({
    energy: 1,
    sleep: 1,
    anxiety: 1,
    control: 1,
  });


  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        {tab === "home" ? (
          <TodayScreen reflectState={reflectState} />
        ) : tab === "chat" ? (
          <ChatScreen />
        ) : (
          <ReflectScreen
            answers={reflectAnswers}
            setAnswers={setReflectAnswers}
            setReflectState={setReflectState}
            goHome={() => setTab("home")}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 12,
            borderTopWidth: 1,
            borderColor: "#00000010",
          }}
        >
          <Pressable onPress={() => setTab("home")}>
            <Text>Home</Text>
          </Pressable>

          <Pressable onPress={() => setTab("chat")}>
            <Text>Chat</Text>
          </Pressable>

          <Pressable onPress={() => setTab("reflect")}>
            <Text>Reflect</Text>
          </Pressable>
        </View>
      </View>
    </QueryClientProvider>
  );
}