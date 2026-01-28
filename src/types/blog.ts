export interface Blog {
  id: number;
  title: string;
  category: 'FINANCE' | 'CAREER' | 'REGULATIONS';
  description: string;
  content: string;
  coverImage: string;
  readTime: string;
}

export type BlogFormData = Omit<Blog, 'id'>;
