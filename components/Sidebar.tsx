import React, { useMemo, useState } from 'react';
import { Tool, Category } from '../types';
import { ThemeToggle } from './ui/ThemeToggle';

interface SidebarProps {
  tools: Tool[];
  selectedToolId?: string;
  onSelectTool: (tool: Tool) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  tools, 
  selectedToolId, 
  onSelectTool, 
  searchQuery, 
  setSearchQuery,
  className = '' 
}) => {
  
  // State to track collapsed categories. Key = category name, Value = true (collapsed)
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group tools by category
  const groupedTools = useMemo(() => {
    const groups: Partial<Record<Category, Tool[]>> = {};
    
    tools.forEach(tool => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category]?.push(tool);
    });
    
    // Sort categories alphabetically
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [tools]);

  return (
    <div className={`flex flex-col h-full border-r border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 text-card-foreground ${className}`}>
      {/* Header / Logo */}
      <div className="p-4 border-b border-border shrink-0">
        <div className="flex items-center space-x-2 mb-4">
           <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white text-lg">N</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">NexusHub</span>
        </div>
        
        {/* Search Input inside Sidebar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="block w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          />
        </div>
      </div>

      {/* Navigation / Tool List */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {groupedTools.length > 0 ? (
          groupedTools.map(([category, categoryTools]) => {
            const isCollapsed = collapsedCategories[category];
            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex w-full items-center justify-between px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group focus:outline-none"
                >
                  <span>{category}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={`transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`}
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                
                {!isCollapsed && (
                  <div className="space-y-1">
                    {categoryTools.map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => onSelectTool(tool)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group ${
                          selectedToolId === tool.id
                            ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <div className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/10 ${selectedToolId === tool.id ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            {tool.icon ? (
                               <img src={tool.icon} alt="" className="h-4 w-4 object-contain" />
                            ) : (
                               <span className="h-2 w-2 rounded-full bg-current" />
                            )}
                        </div>
                        <span className="truncate">{tool.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="px-4 text-center text-sm text-muted-foreground">
            No tools found.
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/20 shrink-0">
        <div className="flex items-center justify-between">
           <span className="text-xs text-muted-foreground">v1.0.0</span>
           <ThemeToggle />
        </div>
      </div>
    </div>
  );
};