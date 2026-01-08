export enum Category {
  ALL = 'All',
  DESIGN = 'Design',
  DEVELOPMENT = 'Development',
  PRODUCTIVITY = 'Productivity',
  AI = 'Artificial Intelligence',
  MARKETING = 'Marketing',
  UTILITIES = 'Utilities'
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  tags: string[];
  icon: string; // URL to icon
  featured?: boolean;
}

export interface SearchState {
  query: string;
  category: Category;
}