import { Tool, Category } from './types';

export const TOOLS: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Conversational AI model by OpenAI capable of understanding and generating natural language.',
    url: 'https://chat.openai.com',
    category: Category.AI,
    tags: ['Chatbot', 'LLM', 'Writing'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    featured: true
  },
  {
    id: '2',
    name: 'Figma',
    description: ' Collaborative interface design tool. Build better products as a team. Design, prototype, and gather feedback all in one place.',
    url: 'https://www.figma.com',
    category: Category.DESIGN,
    tags: ['UI/UX', 'Prototyping', 'Collaboration'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
    featured: true
  },
  {
    id: '3',
    name: 'Notion',
    description: 'A connected workspace where better, faster work happens. Wiki, docs, & projects. Together.',
    url: 'https://www.notion.so',
    category: Category.PRODUCTIVITY,
    tags: ['Notes', 'Wiki', 'Management'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png'
  },
  {
    id: '4',
    name: 'Vercel',
    description: 'Develop. Preview. Ship. The frontend cloud for frameworks like Next.js.',
    url: 'https://vercel.com',
    category: Category.DEVELOPMENT,
    tags: ['Hosting', 'Serverless', 'Frontend'],
    icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png'
  },
  {
    id: '5',
    name: 'Midjourney',
    description: 'Generative AI program and service created and hosted by San Francisco-based independent research lab Midjourney, Inc.',
    url: 'https://www.midjourney.com',
    category: Category.AI,
    tags: ['Image Generation', 'Art', 'Creative'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.png',
    featured: true
  },
  {
    id: '6',
    name: 'Tailwind CSS',
    description: 'Rapidly build modern websites without ever leaving your HTML.',
    url: 'https://tailwindcss.com',
    category: Category.DEVELOPMENT,
    tags: ['CSS', 'Framework', 'Styling'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg'
  },
  {
    id: '7',
    name: 'Linear',
    description: 'Linear is a better way to build products. Streamline issues, sprints, and product roadmaps.',
    url: 'https://linear.app',
    category: Category.PRODUCTIVITY,
    tags: ['Issue Tracking', 'Agile', 'Software'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Linear_logo.svg'
  },
  {
    id: '8',
    name: 'Canva',
    description: 'Free-to-use online graphic design tool. Use it to create social media posts, presentations, posters, videos, logos and more.',
    url: 'https://www.canva.com',
    category: Category.DESIGN,
    tags: ['Graphic Design', 'Social Media', 'Simple'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg'
  },
  {
    id: '9',
    name: 'Excalidraw',
    description: 'Virtual whiteboard for sketching hand-drawn like diagrams.',
    url: 'https://excalidraw.com',
    category: Category.UTILITIES,
    tags: ['Whiteboard', 'Diagram', 'Sketch'],
    icon: 'https://excalidraw.com/favicon-32x32.png'
  },
  {
    id: '10',
    name: 'Raycast',
    description: 'Raycast is a blazingly fast, totally extendable launcher. It lets you complete tasks, calculate, share common links, and much more.',
    url: 'https://www.raycast.com',
    category: Category.PRODUCTIVITY,
    tags: ['Launcher', 'Mac', 'Efficiency'],
    icon: 'https://www.raycast.com/favicon-production.png'
  },
  {
    id: '11',
    name: 'Supabase',
    description: 'Supabase is an open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.',
    url: 'https://supabase.com',
    category: Category.DEVELOPMENT,
    tags: ['Backend', 'Database', 'Postgres'],
    icon: 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png'
  },
  {
    id: '12',
    name: 'Gumroad',
    description: 'Gumroad is a powerful, simple e-commerce platform for creators to sell digital products.',
    url: 'https://gumroad.com',
    category: Category.MARKETING,
    tags: ['E-commerce', 'Creators', 'Sales'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Gumroad_Logo_2021.png'
  },
  {
    id: '13',
    name: 'TinyPNG',
    description: 'Smart WebP, PNG and JPEG compression for faster websites.',
    url: 'https://tinypng.com',
    category: Category.UTILITIES,
    tags: ['Compression', 'Images', 'Optimization'],
    icon: 'https://tinypng.com/images/panda-chewing-2x.png'
  },
  {
    id: '14',
    name: 'Gemini',
    description: 'Google’s most capable and general AI model, built to be multimodal.',
    url: 'https://deepmind.google/technologies/gemini/',
    category: Category.AI,
    tags: ['LLM', 'Multimodal', 'Google'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg'
  },
   {
    id: '15',
    name: 'Unsplash',
    description: 'The internet’s source for visuals. Powered by creators everywhere.',
    url: 'https://unsplash.com',
    category: Category.DESIGN,
    tags: ['Photos', 'Stock', 'Creative'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Unsplash_wordmark_logo.svg'
  }
];
