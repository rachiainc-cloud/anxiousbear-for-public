//src/features/ChatScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockCallAssistant } from "../api/chat";
import { useTodayTasks } from "../hooks/useTodayTasks";

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string; suggestedTask?: string }[]
  >([]);

  const [editTask, setEditTask] = useState<string | null>(null);
  const { addTask } = useTodayTasks();


  async function handleSend() {
    if (!input.trim()) return;

    const text = input.trim();
    setInput("");

    const userMsg = { role: "user" as const, text };
    setMessages((prev) => [...prev, userMsg]);

    const ai = await mockCallAssistant(text);

    const assistantMsg = {
      role: "assistant" as const,
      text: ai.reply,
      suggestedTask: ai.task,
    };

    setMessages((prev) => [...prev, assistantMsg]);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF7ED" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ flex: 1, padding: 20 }}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
            AI Chat (Mock)
          </Text>

          {messages.map((m, idx) => (
            <View
              key={idx}
              style={{
                marginBottom: 14,
                alignItems: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <View
               style={{
                  maxWidth: "85%",
                  padding: 14,
                  borderRadius: 16,
                  backgroundColor:
                    m.role === "user" ? "#FBCFE8" : "white",
                  borderWidth: m.role === "assistant" ? 1 : 0,
                  borderColor: "#00000010",
                }}
              >
                <Text>{m.text}</Text>

                {m.suggestedTask && (
                  <Pressable
                    onPress={() => setEditTask(m.suggestedTask!)}
                    style={{
                      marginTop: 10,
                      paddingVertical: 8,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "#F9A8D4",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#F472B6", fontWeight: "600" }}>
                      Recommend Task
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))}

        </ScrollView>

        {/* Input Area (Fixed Bottom) */}
        <View
          style={{
            padding: 14,
            borderTopWidth: 1,
            borderColor: "#00000010",
            backgroundColor: "white",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <TextInput
            placeholder="What’s on your mind?"
            value={input}
            onChangeText={setInput}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 10,
            }}
          />

          <Pressable
            onPress={handleSend}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#FBCFE8",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "900" }}>↑</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {/* Edit Suggested Task */}
      {editTask && (
        <View
          style={{
            position: "absolute",
            bottom: 80,
            left: 20,
            right: 20,
            backgroundColor: "white",
            padding: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#00000010",
          }}
        >
          <Text style={{ fontWeight: "700", marginBottom: 6 }}>
            Refine Task
          </Text>
          <TextInput
            value={editTask}
            onChangeText={setEditTask}
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 12,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <Pressable
             onPress={() => {
              if (!editTask?.trim()) return;

              // ✅ 실제 Home에 추가
              addTask(editTask.trim());

              // 모달 닫기
              setEditTask(null);
            }}
            style={{
              backgroundColor: "#FBCFE8",
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "700" }}>Add to Home</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}