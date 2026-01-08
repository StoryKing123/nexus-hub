import React from 'react';
import { Tool } from '../types';
import { Badge } from './ui/Badge';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-md hover:shadow-indigo-500/10 hover:-translate-y-1">
      {/* Glow Effect */}
      <div className="absolute -inset-px -z-10 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary p-2 overflow-hidden group-hover:border-indigo-500/50 transition-colors">
            {tool.icon ? (
              <img src={tool.icon} alt={tool.name} className="h-full w-full object-contain" />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground leading-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
              {tool.name}
            </h3>
            <span className="text-xs text-muted-foreground font-medium">{tool.category}</span>
          </div>
        </div>
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center h-8 w-8 rounded-full border border-border bg-secondary text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </a>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {tool.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground border-border group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
