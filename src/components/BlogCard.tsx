import { TrendingUp, Briefcase, Scale, Clock, Flame } from 'lucide-react';
import type { Blog } from '@/types/blog';

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

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
  index: number;
}

const BlogCard = ({ blog, onClick, index }: BlogCardProps) => {
  const config = categoryConfig[blog.category];
  const Icon = config.icon;
  const isFeatured = index === 0;

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-white border-4 border-stone-900 hover:border-amber-600 transition-all duration-300 shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 overflow-hidden animate-slideUp"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-stone-100">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {isFeatured && (
          <div className="absolute top-4 right-4 bg-amber-500 text-stone-900 px-4 py-2 font-black uppercase text-xs tracking-widest flex items-center gap-2 shadow-brutal rotate-3">
            <Flame className="w-4 h-4 fill-amber-900" strokeWidth={0} />
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${config.bgColor} ${config.textColor} border-2 ${config.borderColor} font-black uppercase text-xs tracking-wider`}>
            <Icon className="w-4 h-4" strokeWidth={3} />
            {blog.category}
          </div>
          <div className="flex items-center gap-1.5 text-stone-500 text-xs font-bold uppercase tracking-wide">
            <Clock className="w-3.5 h-3.5" strokeWidth={3} />
            {blog.readTime}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-stone-900 mb-3 group-hover:text-amber-700 transition-colors leading-tight line-clamp-2">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-4 font-medium">
          {blog.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-stone-200 group-hover:border-amber-400 transition-colors">
          <span className="text-xs text-stone-500 font-bold uppercase tracking-wide">2 days ago</span>
          <button className="text-stone-900 text-sm font-black uppercase tracking-wider group-hover:text-amber-700 flex items-center gap-2 transition-all">
            Read Story
            <span className="inline-block group-hover:translate-x-1 transition-transform text-lg">
              →
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
