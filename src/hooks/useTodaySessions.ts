import { useQuery } from "@tanstack/react-query";
import { fetchTodaySessions } from "../api/sessions";

export function useTodaySessions() {
  return useQuery({
    queryKey: ["today-sessions"],
    queryFn: fetchTodaySessions,
  });
}