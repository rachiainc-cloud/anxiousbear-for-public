//src/features/TodayScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useTodayTasks } from "../hooks/useTodayTasks";
import { deriveHomeSummary } from "../lib/deriveHomeSummary";

export default function TodayScreen({
  reflectState,
}: {
  reflectState: "GREEN" | "YELLOW" | "ORANGE" | "RED" | null;
}) {
  const { tasks, addTask, toggleTask, removeTask } = useTodayTasks();
  const [taskText, setTaskText] = useState("");
  const [bubble, setBubble] = useState<string | null>(null);

  const home = deriveHomeSummary(tasks);

  const sessions = tasks;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF7ED" }}>
      <View style={{ flex: 1, padding: 20 }}>

        {/* 🐻 Bear Section */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>

          <Pressable
            onPress={() => {
              let msg = "";

            if (reflectState === "GREEN") {
              msg = "You're strong today. Stretch your goal slightly 🐻✨";
            } else if (reflectState === "YELLOW") {
              msg = "Keep it light. Start with 5 focused minutes.";
            } else if (reflectState === "ORANGE") {
              msg = "Lower the bar. One tiny action is enough.";
            } else if (reflectState === "RED") {
              msg = "Stabilize first. Breathe. One small task only.";
            } else {
              msg = "Tap Reflect to personalize your bear 🐻";
            }
              setBubble(msg);
              setTimeout(() => setBubble(null), 2500);
            }}
          >
            <View style={{ width: 200, height: 200 }}>

              {bubble ? (
                <View
                  pointerEvents="none"
                  style={{
                    position: "absolute",
                    top: -20,
                    width: 220,
                    alignItems: "center",
                    zIndex: 10,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      borderRadius: 18,
                      borderWidth: 1,
                      borderColor: "#00000010",
                      maxWidth: 240,
                    }}
                  >
                    <Text style={{ textAlign: "center", fontWeight: "600" }}>
                      {bubble}
                    </Text>
                  </View>
                </View>
              ) : null}

              <Image
                source={require("../../assets/BEAR_SAD.png")}
                style={{
                  width: 200,
                  height: 200,
                  opacity: home.bearOpacity,
                }}
                resizeMode="contain"
              />

              <BlurView
                intensity={home.bearBlur}
                tint="light"
                style={{
                  position: "absolute",
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                }}
              />
            </View>
          </Pressable>
        </View>

        {/* Anxiety Bar */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ textAlign: "center", opacity: 0.6 }}>
            Anxiety Level
          </Text>

          <View
            style={{
              height: 10,
              borderRadius: 999,
              overflow: "hidden",
              backgroundColor: "#00000010",
              marginTop: 6,
            }}
          >
            <LinearGradient
              colors={["#F973A0", "#FDE047"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: `${home.anxietyLevel}%`,
                height: "100%",
              }}
            />
          </View>
        </View>

        {/* Add Task */}
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <TextInput
            placeholder="What will you do today?"
            value={taskText}
            onChangeText={setTaskText}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#00000020",
              borderRadius: 10,
              padding: 12,
              backgroundColor: "white",
            }}
          />

          <Pressable
            onPress={() => {
              if (!taskText.trim()) return;
              addTask(taskText);
              setTaskText("");
            }}
            style={{
              marginLeft: 8,
              backgroundColor: "#F973A0",
              borderRadius: 10,
              justifyContent: "center",
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Add
            </Text>
          </Pressable>
        </View>

        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => toggleTask(item.id)}
              onLongPress={() => {
                Alert.alert(
                  "Delete Task?",
                  "This will remove the task from today.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => removeTask(item.id),
                    },
                  ]
                );
              }}
            >
              <Text style={{ fontSize: 16, marginBottom: 6 }}>
                {item.completed ? "✅" : "⬜"} {item.text}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}