import React from 'react';
import './App.css';
import Books from './components/Books';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import BookDetail from './components/BookDetail';
import Home from './components/Home';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/logout" element={<LogoutForm />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
