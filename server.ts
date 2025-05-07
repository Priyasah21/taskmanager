import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface AiTaskSuggestion {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  category?: string;
}

export async function generateTaskSuggestion(prompt: string): Promise<AiTaskSuggestion> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are an AI task assistant that helps users organize their tasks. " +
            "Generate a well-structured task based on user input. " +
            "Your response should be in JSON format with the following structure: " +
            "{ \"title\": \"Task title\", \"description\": \"Detailed description\", \"priority\": \"low|medium|high\", \"category\": \"Suggested category\" }"
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    // Make sure content exists before parsing
    const content = completion.choices[0].message.content || "{}";
    const result = JSON.parse(content);
    
    return {
      title: result.title || "Task",
      description: result.description || "",
      priority: (result.priority || "medium") as "low" | "medium" | "high",
      category: result.category
    };
  } catch (error) {
    console.error("Error generating AI task suggestion:", error);
    throw new Error("Failed to generate task suggestion");
  }
}
