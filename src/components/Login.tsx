import React from 'react';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    login(formData.get('email') as string, formData.get('password') as string);
  };
  return (
    <form
      className="text-center w-80 gap-3 flex flex-col"
      onSubmit={formHandler}
    >
      <input
        className="rounded p-2"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        minLength={8}
        className="rounded p-2"
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
