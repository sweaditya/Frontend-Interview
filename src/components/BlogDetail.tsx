import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, Clock, TrendingUp, Briefcase, Scale, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import type { Blog } from '@/types/blog';

const fetchBlog = async (id: number): Promise<Blog> => {
  const { data } = await axios.get(`http://localhost:3001/blogs/${id}`);
  return data;
};

const fetchBlogs = async (): Promise<Blog[]> => {
  const { data } = await axios.get('http://localhost:3001/blogs');
  return data;
};

const categoryConfig = {
  FINANCE: {
    icon: TrendingUp,
    textColor: 'text-emerald-900',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-900',
  },
  CAREER: {
    icon: Briefcase,
    textColor: 'text-rose-900',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-900',
  },
  REGULATIONS: {
    icon: Scale,
    textColor: 'text-sky-900',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-900',
  },
} as const;

interface BlogDetailProps {
  blogId: number;
  onBack: () => void;
}

const BlogDetail = ({ blogId, onBack }: BlogDetailProps) => {
  const { data: blog, isLoading, error } = useQuery<Blog>({
    queryKey: ['blog', blogId],
    queryFn: () => fetchBlog(blogId),
  });

  const { data: allBlogs } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-stone-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center bg-red-50 border-4 border-red-900 p-8 max-w-md shadow-brutal">
          <p className="text-red-600 font-bold mb-4">Failed to load article</p>
          <Button onClick={onBack}>
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  const config = categoryConfig[blog.category];
  const Icon = config.icon;
  const latestArticles = allBlogs?.filter((b) => b.id !== blogId).slice(0, 3) || [];

  return (
    <div className="animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-600 hover:text-amber-700 mb-6 group transition-colors font-bold uppercase text-sm tracking-wide"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
        <span>Back to articles</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar - Latest Articles */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <div className="sticky top-24">
            <h2 className="text-lg font-black text-stone-900 mb-4 uppercase tracking-wide">Latest Articles</h2>
            <div className="space-y-4">
              {latestArticles.map((article) => {
                const articleConfig = categoryConfig[article.category];
                const ArticleIcon = articleConfig.icon;
                return (
                  <article
                    key={article.id}
                    className="group cursor-pointer p-4 bg-white border-2 border-stone-900 hover:border-amber-600 hover:shadow-lg transition-all"
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 px-2 py-1 ${articleConfig.bgColor} ${articleConfig.textColor} border ${articleConfig.borderColor} text-xs font-black mb-2 uppercase tracking-wide`}
                    >
                      <ArticleIcon className="w-3 h-3" strokeWidth={3} />
                      <span>{article.category}</span>
                    </div>
                    <h3 className="font-black text-stone-900 group-hover:text-amber-700 text-sm mb-1 line-clamp-2 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-2 font-medium">
                      {article.description}
                    </p>
                    <span className="text-xs text-stone-400 font-bold uppercase tracking-wide">{article.readTime}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 order-1 lg:order-2">
          <article className="bg-white border-4 border-stone-900 shadow-brutal overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-96 overflow-hidden bg-stone-100">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 ${config.bgColor} ${config.textColor} border-2 ${config.borderColor} font-black uppercase text-sm tracking-wider`}
                >
                  <Icon className="w-4 h-4" strokeWidth={3} />
                  <span>{blog.category}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <Clock className="w-4 h-4" strokeWidth={3} />
                  <span className="text-sm font-bold uppercase tracking-wide">{blog.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-stone-600 mb-8 leading-relaxed font-medium">
                {blog.description}
              </p>

              {/* Divider */}
              <div className="w-20 h-1 bg-amber-600 mb-8" />

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </p>
              </div>

              {/* Footer Tags/Actions */}
              <div className="mt-12 pt-8 border-t-4 border-stone-900">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-stone-200 text-stone-900 font-bold text-sm uppercase tracking-wide border-2 border-stone-900">
                      #{blog.category.toLowerCase()}
                    </span>
                    <span className="px-3 py-1 bg-stone-200 text-stone-900 font-bold text-sm uppercase tracking-wide border-2 border-stone-900">
                      #ca
                    </span>
                  </div>
                  <Button onClick={onBack} variant="secondary" className="shadow-brutal hover:shadow-none">
                    Read More Articles
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export default BlogDetail;
