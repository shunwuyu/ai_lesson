import { useEffect, useRef, useState } from 'react';
import { useArticleListStore } from '../store/articleListStore';
import './MasonryGrid.css';

// Masonry grid component with infinite scroll
const MasonryGrid = () => {
  const {
    articles,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
    setFilters,
  } = useArticleListStore();

  const observerTarget = useRef(null);
  const [columns, setColumns] = useState(3);

  // Calculate columns based on screen width
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Initial load
  useEffect(() => {
    refresh();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, isLoadingMore, loadMore]);

  // Distribute articles across columns
  const distributeArticles = () => {
    const columnArticles: Array<typeof articles> = Array.from({ length: columns }, () => []);

    articles.forEach((article, index) => {
      const columnIndex = index % columns;
      columnArticles[columnIndex].push(article);
    });

    return columnArticles;
  };

  const columnArticles = distributeArticles();

  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = (e.currentTarget.elements[0] as HTMLInputElement).value;
    setFilters({ keyword });
  };

  return (
    <div className="masonry-grid">
      {/* Header */}
      <div className="masonry-header">
        <div className="masonry-title">
          <h1>📚 Article Gallery</h1>
          <p>Discover amazing content with masonry layout</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="masonry-search">
          <input
            type="text"
            name="search"
            placeholder="🔍 Search articles..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="masonry-error">
          <span>⚠️ {error}</span>
          <button
            onClick={() => useArticleListStore.getState().clearError()}
            className="error-dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Masonry Layout */}
      <div className="masonry-container" style={{ columnCount: columns }}>
        {articles.map((article) => (
          <div key={article.id} className="masonry-item">
            <div className="item-image">
              <div className="image-placeholder">
                <span className="image-icon">📰</span>
              </div>
              <span className={`item-badge ${article.status}`}>
                {article.status}
              </span>
            </div>

            <div className="item-content">
              <div className="item-category">
                <span className="category-dot"></span>
                {article.category}
              </div>

              <h3 className="item-title">{article.title}</h3>

              <p className="item-excerpt">{article.excerpt}</p>

              <div className="item-meta">
                <span className="meta-item">
                  <span className="meta-icon">👁️</span>
                  {article.views.toLocaleString()}
                </span>
                <span className="meta-item">
                  <span className="meta-icon">✍️</span>
                  {article.author}
                </span>
                <span className="meta-item">
                  <span className="meta-icon">📅</span>
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="item-actions">
                <button className="action-button primary">Read More</button>
                <button className="action-button secondary">Save</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicators */}
      {isLoading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading articles...</p>
        </div>
      )}

      {isLoadingMore && (
        <div className="loading-more">
          <div className="spinner-small"></div>
          <p>Loading more articles...</p>
        </div>
      )}

      {/* No more data */}
      {!hasMore && articles.length > 0 && (
        <div className="end-message">
          <span>🎉 You've reached the end!</span>
          <p>{articles.length} articles loaded</p>
        </div>
      )}

      {/* Observer target */}
      <div ref={observerTarget} className="scroll-sentinel" />

      {/* Empty state */}
      {!isLoading && articles.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No articles found</h3>
          <p>Try adjusting your search or filters</p>
          <button onClick={() => setFilters({})} className="reset-button">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MasonryGrid;
