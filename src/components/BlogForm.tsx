import { useState, FormEvent, ChangeEvent } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import type { Blog, BlogFormData } from '@/types/blog';

const createBlog = async (blogData: Blog): Promise<Blog> => {
  const { data } = await axios.post('http://localhost:3001/blogs', blogData);
  return data;
};

interface BlogFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlogForm = ({ isOpen, onClose }: BlogFormProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    category: 'FINANCE',
    description: '',
    content: '',
    coverImage: '',
    readTime: '5 min read',
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setFormData({
        title: '',
        category: 'FINANCE',
        description: '',
        content: '',
        coverImage: '',
        readTime: '5 min read',
      });
      onClose();
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newBlog: Blog = {
      ...formData,
      id: Date.now(),
    };
    
    mutation.mutate(newBlog);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-amber-50 border-8 border-stone-900 w-full max-w-5xl my-8 animate-scaleIn shadow-brutal">
        {/* Header */}
        <div className="bg-stone-900 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-7 h-7 text-amber-400" strokeWidth={3} />
                <h2 className="text-4xl font-black text-amber-50 tracking-tight">Write Your Story</h2>
              </div>
              <p className="text-amber-200 font-bold uppercase tracking-widest text-xs">Share Your Expertise</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-amber-600 transition-colors border-2 border-amber-400"
              type="button"
            >
              <X className="w-6 h-6 text-amber-50" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Story Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter a compelling headline..."
                  className="mt-3"
                />
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-3 w-full px-5 py-4 border-4 border-stone-900 focus:border-amber-600 outline-none transition-all text-stone-900 font-bold bg-white"
                  >
                    <option value="FINANCE">💰 Finance</option>
                    <option value="CAREER">💼 Career</option>
                    <option value="REGULATIONS">⚖️ Regulations</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="5 min read"
                    className="mt-3"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <Label htmlFor="coverImage">Cover Image URL *</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  type="url"
                  value={formData.coverImage}
                  onChange={handleChange}
                  required
                  placeholder="https://images.pexels.com/..."
                  className="mt-3"
                />
                <div className="mt-3 p-4 bg-amber-100 border-2 border-amber-600">
                  <p className="text-xs text-stone-900 font-bold uppercase tracking-wide">
                    💡 Use <a href="https://pexels.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-700">Pexels</a> or <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-700">Unsplash</a>
                  </p>
                </div>
              </div>

              {/* Image Preview */}
              {formData.coverImage && (
                <div>
                  <Label>Preview</Label>
                  <div className="mt-3 relative border-4 border-stone-900 h-48 overflow-hidden">
                    <img
                      src={formData.coverImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Write a compelling summary..."
                  className="mt-3"
                />
                <p className="text-xs text-stone-600 mt-2 font-bold uppercase tracking-wide">
                  {formData.description.length} characters
                </p>
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content">Full Story Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={14}
                  placeholder="Share your insights and knowledge..."
                  className="mt-3"
                />
                <p className="text-xs text-stone-600 mt-2 font-bold uppercase tracking-wide">
                  {formData.content.length} characters
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-8 border-t-4 border-stone-900">
            <div className="flex items-center gap-2 text-sm text-stone-700 font-bold uppercase tracking-wide">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              Ready to publish
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="secondary"
                disabled={mutation.isPending}
                className="shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                {mutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-4 border-stone-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" strokeWidth={3} />
                    Publish Story
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Messages */}
          {mutation.isError && (
            <div className="mt-6 p-6 bg-red-50 border-4 border-red-900 animate-fadeIn">
              <p className="text-red-900 font-black uppercase tracking-wide flex items-center gap-2">
                <X className="w-5 h-5" strokeWidth={3} />
                Failed to publish. Please try again.
              </p>
            </div>
          )}

          {mutation.isSuccess && (
            <div className="mt-6 p-6 bg-emerald-50 border-4 border-emerald-900 animate-fadeIn">
              <p className="text-emerald-900 font-black uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-5 h-5" strokeWidth={3} />
                Story published successfully! 🎉
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
