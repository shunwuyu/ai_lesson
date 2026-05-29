import { useFetch } from '../hooks/useFetch';
import { useUserStore } from '../store/userStore';
import UserCard from '../components/UserCard';
import './HomePage.css';

// HomePage component
const HomePage = () => {
  const { data, loading, error } = useFetch('/api/users');
  const { users, addUser, removeUser } = useUserStore();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      <h1>User Management</h1>
      <div className="user-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={(user) => console.log('Edit:', user)}
            onDelete={(id) => removeUser(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
