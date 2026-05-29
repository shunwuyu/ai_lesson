export default function App() {
  const user = { name: 'Andrew' }
  return <Page user={user} />
}

function Page({ user }) {
  return <Header user={user} />
}

function Header({ user }) {
  return <UserInfo user={user} />
}

function UserInfo({ user }) {
  return <div>{user.name}</div>
}
