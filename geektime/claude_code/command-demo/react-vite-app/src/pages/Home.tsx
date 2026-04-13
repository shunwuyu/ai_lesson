import { useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import './Home.css';

// Stat card component
interface StatCardProps {
  title: string;
  value: number;
  description: string;
  color: string;
}

const StatCard = ({ title, value, description, color }: StatCardProps) => {
  return (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <div className="stat-header">
        <h3>{title}</h3>
        <span className="stat-value" style={{ color }}>
          {value}
        </span>
      </div>
      <p className="stat-description">{description}</p>
    </div>
  );
};

// Home page component
const Home = () => {
  useEffect(() => {
    document.title = 'Home - Article Management';
  }, []);

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="home-header">
        <div className="header-content">
          <h1>Welcome to Article Management</h1>
          <p className="header-subtitle">
            Manage your articles with ease - create, edit, and organize your content
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">New Article</button>
          <button className="btn-secondary">Import</button>
        </div>
      </header>

      {/* Quick Stats Section */}
      <section className="stats-section">
        <h2>Quick Stats</h2>
        <div className="stats-grid">
          <StatCard
            title="Total Articles"
            value={50}
            description="All articles in database"
            color="#3b82f6"
          />
          <StatCard
            title="Published"
            value={32}
            description="Live and visible"
            color="#10b981"
          />
          <StatCard
            title="Drafts"
            value={12}
            description="Work in progress"
            color="#f59e0b"
          />
          <StatCard
            title="Total Views"
            value={15420}
            description="All time views"
            color="#8b5cf6"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card">
            <div className="action-icon">✏️</div>
            <h3>Create Article</h3>
            <p>Start writing a new article</p>
          </div>
          <div className="action-card">
            <div className="action-icon">📊</div>
            <h3>View Analytics</h3>
            <p>Check your article performance</p>
          </div>
          <div className="action-card">
            <div className="action-icon">🔍</div>
            <h3>Explore</h3>
            <p>Browse all articles</p>
          </div>
          <div className="action-card">
            <div className="action-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Manage your preferences</p>
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="recent-articles-section">
        <div className="section-header">
          <h2>Recent Articles</h2>
          <a href="/articles" className="view-all-link">
            View All →
          </a>
        </div>
        <ArticleList />
      </section>

      {/* Categories Overview */}
      <section className="categories-section">
        <h2>Categories</h2>
        <div className="categories-grid">
          {[
            { name: 'Technology', count: 15, icon: '💻' },
            { name: 'Lifestyle', count: 12, icon: '🌟' },
            { name: 'Business', count: 10, icon: '💼' },
            { name: 'Health', count: 8, icon: '🏥' },
            { name: 'Education', count: 5, icon: '📚' },
          ].map((category) => (
            <div key={category.name} className="category-card">
              <span className="category-icon">{category.icon}</span>
              <div className="category-info">
                <h3>{category.name}</h3>
                <span className="category-count">{category.count} articles</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
