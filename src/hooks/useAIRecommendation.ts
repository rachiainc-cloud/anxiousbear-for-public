import { useQuery } from "@tanstack/react-query";
import { mockCallAssistant } from "../api/chat";

export function useAIRecommendation(input: string) {
  return useQuery({
    queryKey: ["ai", input],
    queryFn: () => mockCallAssistant(input),
    enabled: input.length > 0,
  });
}