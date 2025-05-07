{/* Floating Action Buttons (Mobile) */}
<div className="md:hidden fixed right-6 bottom-20 z-10 flex flex-col space-y-3">
  {/* AI Assistant Button */}
  <button 
    onClick={handleOpenAiDialog}
    className="bg-secondary hover:bg-secondary-dark text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
  >
    <Sparkles className="h-6 w-6" />
  </button>
  
  {/* Add Task Button */}
  <button 
    onClick={handleNewTask}
    className="bg-primary hover:bg-primary-dark text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
  >
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
</div>
