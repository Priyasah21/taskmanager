import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAi } from "@/hooks/useAi";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Loader2, Sparkles } from "lucide-react";

interface AiTaskSuggestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (taskData: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    categoryId?: number;
  }) => void;
  categories: { id: number; name: string }[];
}

export default function AiTaskSuggestionDialog({
  isOpen,
  onClose,
  onTaskCreated,
  categories
}: AiTaskSuggestionDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [generatedTask, setGeneratedTask] = useState<{
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    category?: string;
  } | null>(null);
  
  const { generateTaskSuggestion, isLoading } = useAi();
  
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    const suggestion = await generateTaskSuggestion(prompt);
    if (suggestion) {
      setGeneratedTask(suggestion);
    }
  };
  
  const handleCreateTask = () => {
    if (!generatedTask) return;
    
    // Find category ID if a category was suggested
    let categoryId: number | undefined = undefined;
    
    if (generatedTask.category) {
      // Try to find matching category by name (case insensitive)
      const matchingCategory = categories.find(
        c => c.name.toLowerCase() === generatedTask.category?.toLowerCase()
      );
      
      if (matchingCategory) {
        categoryId = matchingCategory.id;
      }
    }
    
    onTaskCreated({
      title: generatedTask.title,
      description: generatedTask.description,
      priority: generatedTask.priority,
      categoryId
    });
    
    // Reset and close
    setPrompt("");
    setGeneratedTask(null);
    onClose();
  };

  const handleClose = () => {
    setPrompt("");
    setGeneratedTask(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Task with AI</DialogTitle>
          <DialogDescription>
            Describe what you need to do, and the AI will create a well-structured task for you.
          </DialogDescription>
        </DialogHeader>
        
        {!generatedTask ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">What task do you need help with?</Label>
              <Textarea
                id="prompt"
                placeholder="Example: Schedule a meeting with the marketing team to discuss Q3 campaign timeline"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={isLoading || !prompt.trim()} 
              className="w-full"
              variant="default"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Task with AI
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="title">Title</Label>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {generatedTask.priority.charAt(0).toUpperCase() + generatedTask.priority.slice(1)} Priority
                </span>
              </div>
              <Input
                id="title"
                value={generatedTask.title}
                readOnly
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={generatedTask.description}
                readOnly
                className="resize-none bg-gray-50"
                rows={3}
              />
            </div>
            
            {generatedTask.category && (
              <div className="space-y-2">
                <Label htmlFor="category">Suggested Category</Label>
                <Input
                  id="category"
                  value={generatedTask.category}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            )}
            
            <div className="pt-2 flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setGeneratedTask(null)}
                className="flex-1"
              >
                Try Again
              </Button>
              <Button
                variant="default"
                onClick={handleCreateTask}
                className="flex-1"
              >
                Create Task
              </Button>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
