import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import { Loader2, PenLine } from 'lucide-react';
import { Button } from './ui/button';
import type { Blog } from '@/types/blog';

const fetchBlogs = async (): Promise<Blog[]> => {
  const { data } = await axios.get('http://localhost:3001/blogs');
  return data;
};

interface BlogListProps {
  onBlogClick: (blogId: number) => void;
}

const BlogList = ({ onBlogClick }: BlogListProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { data: blogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-amber-600 mx-auto mb-4" strokeWidth={2.5} />
          <p className="text-stone-700 font-bold text-lg">Loading stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center bg-red-50 border-4 border-red-900 p-8 max-w-md shadow-brutal">
          <p className="text-red-900 font-bold mb-2 text-xl">Failed to load articles</p>
          <p className="text-red-700 font-medium">
            Make sure json-server is running: npm run server
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center mb-16 py-12">
        <div className="inline-block mb-4">
          <span className="inline-block px-6 py-2 bg-amber-600 text-amber-50 font-black uppercase tracking-widest text-xs rotate-[-1deg] shadow-brutal">
            Featured Stories
          </span>
        </div>
        <h1 className="text-7xl md:text-8xl font-black mb-6 text-stone-900 leading-[0.9] tracking-tighter">
          CA Monk<br/>
          <span className="text-amber-700">Chronicle</span>
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Insights, strategies, and stories for the modern chartered accountant
        </p>
      </div>

      {/* Latest Articles Section with Create Button */}
      <div className="mb-12 flex items-end justify-between border-b-4 border-stone-900 pb-4">
        <div>
          <h2 className="text-4xl font-black text-stone-900 flex items-baseline gap-3">
            Latest Articles
            <span className="text-lg font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              {blogs?.length || 0}
            </span>
          </h2>
          <p className="text-stone-600 mt-2 font-medium">Fresh perspectives every week</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          variant="secondary"
          className="shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2"
        >
          <PenLine className="w-5 h-5 mr-2" strokeWidth={3} />
          Write Story
        </Button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.map((blog, index) => (
          <BlogCard 
            key={blog.id} 
            blog={blog} 
            onClick={() => onBlogClick(blog.id)}
            index={index}
          />
        ))}
      </div>

      {/* Blog Form Modal */}
      <BlogForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default BlogList;
