import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AiTaskSuggestion {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  category?: string;
}

export function useAi() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateTaskSuggestion = async (prompt: string): Promise<AiTaskSuggestion | null> => {
    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/ai/task-suggestion", { prompt });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error generating task suggestion:", error);
      toast({
        title: "AI Error",
        description: "Failed to generate task suggestion. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generateTaskSuggestion,
  };
}
