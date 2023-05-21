import React from 'react';
import './App.css';
import Books from './components/Books';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Hello from './components/Hello';
import LogoutForm from './components/LogoutForm';
import BookDetail from './components/BookDetail';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/books" element={<Books />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/logout" element={<LogoutForm />} />
      <Route path="/hello" element={<Hello />} />

      </Routes>
    </div>
  );
}

export default App;
