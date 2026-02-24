//src/features/ReflectScreen.tsx
import React, { useMemo, useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { computeReflectResult, ReflectAnswers } from "../lib/reflectState";

type QKey = keyof ReflectAnswers;

const QuestionRow = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: 0 | 1 | 2;
  onChange: (v: 0 | 1 | 2) => void;
}) => {
  const opts: Array<{ label: string; v: 0 | 1 | 2 }> = [
    { label: "Low", v: 0 },
    { label: "Mid", v: 1 },
    { label: "High", v: 2 },
  ];

  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
        {title}
      </Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        {opts.map((o) => {
          const active = o.v === value;
          return (
            <Pressable
              key={o.label}
              onPress={() => onChange(o.v)}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: active ? "#F973A0" : "#00000020",
                backgroundColor: active ? "rgba(249,115,160,0.12)" : "white",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "700", color: active ? "#F973A0" : "#111" }}>
                {o.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default function ReflectScreen({
  answers,
  setAnswers,
  setReflectState,
  goHome,
}: {
    answers: ReflectAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<ReflectAnswers>>;
  setReflectState: (s: "GREEN" | "YELLOW" | "ORANGE" | "RED") => void;
  goHome: () => void;
}) {


  const result = useMemo(() => computeReflectResult(answers), [answers]);
  useEffect(() => {
    setReflectState(result.stateKey);
  }, [result.stateKey]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF7ED" }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 12 }}>
          Reflect (4 Questions)
        </Text>

        <QuestionRow
          title="1) Energy level"
          value={answers.energy}
          onChange={(v) => setAnswers((p) => ({ ...p, energy: v }))}
        />
        <QuestionRow
          title="2) Sleep quality"
          value={answers.sleep}
          onChange={(v) => setAnswers((p) => ({ ...p, sleep: v }))}
        />
        <QuestionRow
          title="3) Anxiety intensity"
          value={answers.anxiety}
          onChange={(v) => setAnswers((p) => ({ ...p, anxiety: v }))}
        />
        <QuestionRow
          title="4) Sense of control"
          value={answers.control}
          onChange={(v) => setAnswers((p) => ({ ...p, control: v }))}
        />

        <View
          style={{
            marginTop: 10,
            padding: 14,
            backgroundColor: "white",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#00000010",
          }}
        >
          <Text style={{ fontWeight: "800", marginBottom: 6 }}>
            State: {result.stateKey} (score {result.score}/8)
          </Text>
          <Text style={{ lineHeight: 22 }}>{result.bearMessage}</Text>
        </View>

         <Pressable
          onPress={goHome}
          style={{
            marginTop: 20,
            paddingVertical: 14,
            borderRadius: 14,
            backgroundColor: "#F973A0",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>
            Apply to Home 🐻
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}