// AI routes
app.post("/api/ai/task-suggestion", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ message: "Invalid prompt" });
    }
    
    const suggestion = await generateTaskSuggestion(prompt);
    return res.json(suggestion);
  } catch (error) {
    handleApiError(res, error);
  }
});
