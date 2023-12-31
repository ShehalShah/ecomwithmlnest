import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const nav=useNavigate()
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-black mb-10 overflow-hidden">
      <div className="bg-black border border-white shadow-lg rounded-lg p-12 w-[30rem]">
        <h2 className="text-3xl font-semibold mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
        {isLogin ? (
          <LoginForm />
        ) : (
          <SignupForm />
        )}
        <div className="text-center mt-4">
          <button
            className=" hover:underline"
            onClick={handleSwitchForm}
          >
            {isLogin ? 'New User? Sign up!' : 'Login'}
          </button>
        </div>
      </div>
    </div>);
};

const LoginForm = () => {
  const nav=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      console.log(response.data); 
      sessionStorage.setItem('user', JSON.stringify(response.data));
      nav("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-white text-lg">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-white text-lg">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};

const SignupForm = () => {
  const nav=useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', { name, email, password });
      console.log(response.data);
      sessionStorage.setItem('user', JSON.stringify(response.data));
      nav("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-white text-lg">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-white text-lg">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-white text-lg">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
      >
        Signup
      </button>
    </form>
  );
};

export default LoginPage;
