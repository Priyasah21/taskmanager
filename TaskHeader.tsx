{/* Add this to the TaskHeader component */}
{onOpenAiDialog && (
  <Button
    variant="ghost"
    size="sm"
    onClick={onOpenAiDialog}
    className="flex items-center text-secondary hover:text-secondary-dark space-x-1"
  >
    <Sparkles className="h-5 w-5 mr-1" />
    <span>AI Assistant</span>
  </Button>
)}
