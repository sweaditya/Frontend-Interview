import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

type View = 'list' | 'detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  const handleBlogClick = (blogId: number) => {
    setSelectedBlogId(blogId);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedBlogId(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-grain">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-7xl">
          {currentView === 'list' ? (
            <BlogList onBlogClick={handleBlogClick} />
          ) : (
            <BlogDetail blogId={selectedBlogId!} onBack={handleBackToList} />
          )}
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
