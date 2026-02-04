import React, { useState, useEffect, useCallback } from 'react';
import { Hero } from './components/Hero';
import { Sidebar } from './components/Sidebar';
import { TOOLS } from './constants';
import { Tool } from './types';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(TOOLS[0]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>(TOOLS);
  
  // Layout States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Filter tools logic
  const performFiltering = useCallback(() => {
    let result = TOOLS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    setFilteredTools(result);
  }, [searchQuery]);

  // Debounce effect for search
  useEffect(() => {
    const timer = setTimeout(() => {
      performFiltering();
    }, 300);

    return () => clearTimeout(timer);
  }, [performFiltering]);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300 font-sans">
      
      {/* Mobile Sidebar Overlay */}
       {mobileMenuOpen && (
         <div 
           className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
           onClick={() => setMobileMenuOpen(false)}
         />
       )}

       {/* Sidebar Container */}
       <div className={`
         fixed md:static inset-y-0 left-0 z-50 
         transform transition-all duration-300 ease-in-out 
         shadow-xl md:shadow-none overflow-hidden bg-card
         ${mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'}
         ${isSidebarOpen ? 'md:w-72' : 'md:w-0'}
       `}>
         <div className="w-72 h-full"> {/* Inner container to maintain width during collapse */}
           <Sidebar 
              tools={filteredTools}
              selectedToolId={selectedTool?.id}
              onSelectTool={(tool) => {
                setSelectedTool(tool);
                setMobileMenuOpen(false);
              }}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
           />
         </div>
       </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 bg-secondary/20">
        
        {/* Header (Hero) */}
        {isHeaderVisible && (
          <Hero 
            tool={selectedTool} 
            onMenuClick={() => setMobileMenuOpen(true)}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onHideHeader={() => setIsHeaderVisible(false)}
          />
        )}

        {/* Floating Restore UI Button (Visible when header is hidden) */}
        {!isHeaderVisible && (
          <button
            onClick={() => setIsHeaderVisible(true)}
            className="absolute top-4 right-4 z-50 p-2 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg hover:bg-foreground hover:text-background transition-all"
            title="Show Header"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
          </button>
        )}
        
        {/* Floating Sidebar Toggle (Visible when Sidebar is closed AND header is visible, optional convenience, or relying on Header button) */}
        {/* Actually, if Header is hidden, user probably wants immersive. But if sidebar is closed via Header button, we have the button in Header. */}
        
        <main className="flex-1 overflow-hidden relative w-full h-full">
           {selectedTool ? (
             <div className="w-full h-full flex flex-col">
                <div className="flex-1 relative bg-white">
                  {/* Iframe Loading/Disclaimer Overlay - Visually behind the iframe */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-zinc-50 dark:bg-zinc-900 -z-10">
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
                     <p className="text-muted-foreground">Loading {selectedTool.name}...</p>
                     <p className="text-xs text-muted-foreground/60 mt-2 max-w-md">
                       If the content doesn't appear, the website might prevent embedding. 
                       <br/>Use the "Open Site" button above.
                     </p>
                  </div>
                  
                  <iframe 
                    key={selectedTool.id} // Re-mount on tool change to ensure history reset
                    src={selectedTool.url}
                    className="w-full h-full border-0"
                    title={`${selectedTool.name} Preview`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation"
                    loading="lazy"
                  />
                </div>
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 mb-6">
                  <span className="font-bold text-white text-3xl">N</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Welcome to NexusHub</h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Select a tool from the sidebar to preview it directly in this window.
                </p>
                <div className="mt-8 flex gap-4">
                  <button onClick={() => setIsSidebarOpen(true)} className="text-indigo-500 hover:underline">Open Sidebar</button>
                </div>
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

export default App;