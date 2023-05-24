import React from 'react';
import './App.css';
import Books from './components/Books';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import BookDetail from './components/BookDetail';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BookItem from './components/BookItem';

function App() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/logout" element={<LogoutForm />} />
          <Route path="/book-item/:id" element={<BookItem />} />
          
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
  );
}

export default App;
