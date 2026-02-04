import React, { useState, useEffect, useCallback } from 'react';
import { Hero } from './components/Hero';
import { Sidebar } from './components/Sidebar';
import { TOOLS } from './constants';
import { Tool } from './types';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize with the first tool or null
  const [selectedTool, setSelectedTool] = useState<Tool | null>(TOOLS[0]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>(TOOLS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

       {/* Sidebar */}
       <div className={`
         fixed md:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
         ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
       `}>
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 bg-secondary/20">
        <Hero 
          tool={selectedTool} 
          onMenuClick={() => setMobileMenuOpen(true)}
        />

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
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

export default App;