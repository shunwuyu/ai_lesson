import { useEffect, useRef } from 'react';
import { useArticleListStore } from '../store/articleListStore';
import './ArticleList.css';

// Article list component with infinite scroll
const ArticleList = () => {
  const {
    articles,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    total,
    filters,
    loadMore,
    refresh,
    setFilters,
    resetFilters,
  } = useArticleListStore();

  const observerTarget = useRef(null);

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
      { threshold: 0.1 }
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

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.elements.search.value;
    setFilters({ keyword });
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    if (value === '') {
      setFilters({ [key]: undefined });
    } else {
      setFilters({ [key]: value });
    }
  };

  return (
    <div className="article-list">
      {/* Header */}
      <div className="article-list-header">
        <h1>Articles ({total})</h1>
        <button onClick={refresh} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* Search and Filters */}
      <form onSubmit={handleSearch} className="article-list-filters">
        <input
          type="text"
          name="search"
          placeholder="Search articles..."
          defaultValue={filters.keyword || ''}
        />
        <select
          onChange={(e) => handleFilterChange('category', e.target.value)}
          value={filters.category || ''}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Business">Business</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        <select
          onChange={(e) => handleFilterChange('status', e.target.value)}
          value={filters.status || ''}
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <button type="submit">Search</button>
        <button type="button" onClick={resetFilters}>
          Reset
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="article-list-error">
          {error}
          <button onClick={() => useArticleListStore.getState().clearError()}>
            Dismiss
          </button>
        </div>
      )}

      {/* Article List */}
      <div className="article-list-items">
        {articles.map((article) => (
          <div key={article.id} className="article-item">
            <h3>{article.title}</h3>
            <p className="article-meta">
              <span className="category">{article.category}</span>
              <span className="status">{article.status}</span>
              <span className="views">{article.views} views</span>
            </p>
            <p className="article-excerpt">{article.excerpt}</p>
            <p className="article-author">By {article.author}</p>
          </div>
        ))}
      </div>

      {/* Loading indicators */}
      {isLoading && <div className="loading">Loading initial articles...</div>}
      {isLoadingMore && <div className="loading">Loading more articles...</div>}

      {/* No more data */}
      {!hasMore && articles.length > 0 && (
        <div className="no-more">No more articles</div>
      )}

      {/* Observer target for infinite scroll */}
      <div ref={observerTarget} className="observer-target" />
    </div>
  );
};

export default ArticleList;
