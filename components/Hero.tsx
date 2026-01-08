import React from 'react';
import { SearchState } from '../types';

interface HeroProps {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

export const Hero: React.FC<HeroProps> = ({ searchState, setSearchState }) => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-24 text-center z-10">
      <div className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm mb-6 shadow-sm">
        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500"></span>
        Curated Directory of Future Tools
      </div>
      
      <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl mb-6">
        Discover the <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Nexus</span> <br className="hidden sm:block" /> of Innovation
      </h1>
      
      <p className="max-w-2xl text-lg text-muted-foreground mb-10">
        Explore a hand-picked collection of the best developer tools, design resources, and software. 
        Built for modern creators.
      </p>

      <div className="w-full max-w-xl relative group">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-background rounded-lg shadow-xl ring-1 ring-border">
          <div className="pl-4 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <input 
            type="text"
            value={searchState.query}
            onChange={(e) => setSearchState(prev => ({ ...prev, query: e.target.value }))}
            placeholder="Search for tools, tags, or categories..."
            className="w-full bg-transparent border-none p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
};
