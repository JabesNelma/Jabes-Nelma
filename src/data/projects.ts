import content from './content';

// Adapter: map content.projects (typed) to the shape expected by existing UI
export const projects = content.projects.map((p) => ({
  id: p.id,
  title: p.title,
  category: Array.isArray(p.category) && p.category.length > 0 ? p.category : ['other'],
  description: p.description || '',
  technologies: p.tech || p.tags || [],
  year: p.year || (p.date ? new Date(p.date).getFullYear() : ''),
  githubUrl: p.repo || '',
  demoUrl: p.demo || '',
  image: p.image || '',
}));

export default projects;

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string[];
  year: number | string;
  githubUrl: string;
  demoUrl: string;
  image: string;
}