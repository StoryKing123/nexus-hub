import React from 'react';
import { Tool } from '../types';
import { Badge } from './ui/Badge';

interface ToolHeaderProps {
  tool?: Tool | null;
  onMenuClick?: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onHideHeader: () => void;
}

export const Hero: React.FC<ToolHeaderProps> = ({ 
  tool, 
  onMenuClick, 
  isSidebarOpen, 
  onToggleSidebar,
  onHideHeader
}) => {
  if (!tool) return null;

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick} 
          className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground focus:outline-none rounded-md"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        {/* Desktop Sidebar Toggle */}
        <button 
          onClick={onToggleSidebar}
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          className="hidden md:flex p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`}>
             <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
             <line x1="9" y1="3" x2="9" y2="21"/>
           </svg>
        </button>

        <div className="flex items-center gap-3 overflow-hidden pl-2">
           <div className="h-10 w-10 flex-shrink-0 rounded-lg border border-border bg-secondary p-1.5 hidden sm:block">
              <img src={tool.icon} alt={tool.name} className="h-full w-full object-contain" />
           </div>
           <div className="min-w-0">
              <h1 className="text-lg font-bold text-foreground leading-tight truncate flex items-center gap-2">
                {tool.name}
                {tool.featured && <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" title="Featured"></span>}
              </h1>
              <p className="text-xs text-muted-foreground truncate max-w-md">{tool.description}</p>
           </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
         <div className="hidden lg:flex gap-1">
            {tool.tags.slice(0, 2).map(tag => (
               <Badge key={tag} variant="secondary" className="text-[10px] h-6 px-2">{tag}</Badge>
            ))}
         </div>
         <div className="h-6 w-px bg-border hidden sm:block"></div>
         
         <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 whitespace-nowrap"
         >
            <span className="hidden sm:inline">Open Site</span>
            <span className="sm:hidden">Open</span>
            <svg className="ml-2 -mr-0.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
         </a>

         {/* Collapse Header Button */}
         <button 
           onClick={onHideHeader}
           title="Maximize View (Collapse Header)"
           className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/>
            </svg>
         </button>
      </div>
    </div>
  );
};