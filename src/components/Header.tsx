import { BookOpen } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const navItems = ['Tools', 'Practice', 'Events', 'Job Board', 'Points'];

  return (
    <header className="bg-white border-b-4 border-amber-900 sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-none rotate-3 group-hover:rotate-6 transition-transform shadow-brutal flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white -rotate-3" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight leading-none">
                CA MONK
              </h1>
              <p className="text-xs text-amber-700 font-bold uppercase tracking-widest">
                Blog
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                className="relative text-stone-700 hover:text-amber-700 font-bold text-sm uppercase tracking-wide transition-colors group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-amber-600 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Profile Button */}
          <Button className="hover:translate-x-1 hover:translate-y-1">
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
