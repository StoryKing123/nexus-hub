import React, { useState, useEffect, useCallback } from 'react';
import { Hero } from './components/Hero';
import { ToolCard } from './components/ToolCard';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { TOOLS } from './constants';
import { Category, SearchState, Tool } from './types';

const App = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    category: Category.ALL
  });
  const [filteredTools, setFilteredTools] = useState<Tool[]>(TOOLS);

  // Filter tools logic
  const performFiltering = useCallback(() => {
    let result = TOOLS;

    // 1. Category Filter
    if (searchState.category !== Category.ALL) {
      result = result.filter(tool => tool.category === searchState.category);
    }

    // 2. Query Filter (Standard String Matching)
    if (searchState.query.trim()) {
      const q = searchState.query.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    setFilteredTools(result);
  }, [searchState.category, searchState.query]);

  // Debounce effect for search
  useEffect(() => {
    const timer = setTimeout(() => {
      performFiltering();
    }, 300);

    return () => clearTimeout(timer);
  }, [performFiltering]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 grid-bg pointer-events-none opacity-100"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white text-lg">N</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">NexusHub</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Submit Tool</a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
            </nav>
            
            <div className="flex items-center space-x-4 border-l border-border pl-6">
               <ThemeToggle />
               <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
               </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-16 pb-24">
        <Hero 
          searchState={searchState} 
          setSearchState={setSearchState} 
        />

        {/* Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar justify-start md:justify-center">
             {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchState(prev => ({ ...prev, category: cat }))}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    searchState.category === cat
                      ? 'bg-foreground text-background shadow-lg'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground border border-border'
                  }`}
                >
                  {cat}
                </button>
             ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {searchState.query 
                  ? `Results for "${searchState.query}"` 
                  : searchState.category === Category.ALL 
                    ? "Featured Tools" 
                    : `${searchState.category} Tools`}
              </h2>
              <span className="text-sm text-muted-foreground">{filteredTools.length} resources found</span>
           </div>

           {filteredTools.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-xl bg-card/30">
                <div className="bg-secondary p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <p className="text-muted-foreground text-lg font-medium">No tools found</p>
                <p className="text-muted-foreground/70 text-sm mt-2">Try adjusting your search or category filter.</p>
             </div>
           )}
        </div>
      </main>

      <footer className="border-t border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
             <span className="font-bold text-lg text-foreground">NexusHub</span>
             <p className="text-sm text-muted-foreground mt-1">Curating the internet, one tool at a time.</p>
          </div>
          <div className="flex space-x-6">
             <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
             <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
             <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
