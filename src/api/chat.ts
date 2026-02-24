export async function mockCallAssistant(input: string) {
  await new Promise((r) => setTimeout(r, 500));

  const lower = input.toLowerCase();

  if (lower.includes("anxious") || lower.includes("불안")) {
    return {
      reply: "It sounds like you're feeling anxious. Try breaking the task into something very small.",
      suggestion: "Start with just 5 minutes.",
    };
  }

  return {
    reply:
      "I hear you. Let’s turn that feeling into one small action you can control.",
    task:
      "Write down the smallest next step and do it for 5 minutes.",
  };
}