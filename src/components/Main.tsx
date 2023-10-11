import useAuth from '../hooks/useAuth';

const Main = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-center flex-col gap-2">
      <p className="text-center">Hello {user?.userName}</p>
      <p>Your email {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Main;
