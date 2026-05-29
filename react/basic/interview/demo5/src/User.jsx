import React from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      isMounted: false
    };
    // this.isMounted = false;
  }

  componentDidMount() {
    console.log('User component mounted')
    this.setState({ 
        isMounted: true
    })
    this.fetchUser();
  }

  componentDidUpdate() {
    console.log('User component Updated')
  }

  componentWillUnmount() {

    this.setState({ 
        isMounted: false
    })
    
    console.log('Component will unmount');
  }

  fetchUser = async () => {
    
    this.setState({ loading: true });

    const response = await fetch(`https://api.github.com/users/octocat`);
    console.log(response, '////')
    const data = await response.json();

    if (this.state.isMounted) {
      this.setState({ user: data, loading: false });
    }
  };

  render() {
    const { user, loading } = this.state;

    if (loading) return <div>Loading...</div>;

    return (
      <div>
        <h2>User Info</h2>
        {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      </div>
    );
  }
}

export default User;