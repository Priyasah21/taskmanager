// AI Dialog State and Handler
const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

const handleOpenAiDialog = () => {
  setIsAiDialogOpen(true);
};

const handleCloseAiDialog = () => {
  setIsAiDialogOpen(false);
};

const handleCreateAiTask = (taskData: {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  categoryId?: number;
}) => {
  createTask({
    ...taskData,
    completed: false
  });
};

// Then in the JSX:
<TaskHeader 
  title={viewTitle}
  sortBy={sortBy}
  onSortChange={setSortBy}
  onOpenAiDialog={handleOpenAiDialog}
/>

// And at the end of the component:
<AiTaskSuggestionDialog
  isOpen={isAiDialogOpen}
  onClose={handleCloseAiDialog}
  onTaskCreated={handleCreateAiTask}
  categories={categories}
/>
