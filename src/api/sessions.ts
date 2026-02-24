export type Session = {
  id: string;
  text: string;
  completed: boolean;
};

export async function fetchTodaySessions(): Promise<Session[]> {
  await new Promise((r) => setTimeout(r, 300));

  return [
    { id: "1", text: "Read 5 pages", completed: false },
    { id: "2", text: "Stretch 10 min", completed: true },
  ];
}